import debug from "debug";
import expressAsyncHandler from "express-async-handler";
import { body, param, validationResult } from "express-validator";
import { FilterQuery } from "mongoose";
import {
  PostCategories,
  PostCategory,
  PostStatus,
  PostTypes,
} from "../constants";
import { AuthorizationError, NotFoundError, ValidationError } from "../errors";
import { PostDto } from "../models/posts";
import { PostService, UserService } from "../services";
import {
  OptionallyPaginatedListResponse,
  PaginatedResponse,
  PostDocument,
} from "../types";
import { tryParsePaginationQuery, tryParsePostFilterQuery } from "../utils";
import {
  hasUser,
  validateLocale,
  validatePaginationRequest,
  validatePostCreation,
  validatePostsFilterRequest,
} from "./validators";

const log = debug("backend:post");

export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  // this API is called on public post listings page without authentication
  getPublicPosts = expressAsyncHandler(async (req, res, next) => {
    await validatePaginationRequest({ req, optional: false });
    await validatePostsFilterRequest({ req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { page, limit } = tryParsePaginationQuery(req);
    const { postType, userType, categories } = tryParsePostFilterQuery(req);

    const filterQuery: FilterQuery<PostDocument> = {
      status: PostStatus.OPEN,
      ...(postType && { type: postType }),
      ...(userType && { authorType: userType }),
      ...(categories && {
        "item.category": { $in: categories },
      }),
    };

    const [posts, count] = await this.postService.getPaginatedPosts(
      page,
      limit,
      filterQuery,
      { updatedAt: -1, createdAt: -1 }
    );

    const postDtos = posts.map((post) => PostDto.fromDocument(post));

    const response: PaginatedResponse<PostDto> = {
      data: postDtos || [],
      page: page,
      per_page: limit,
      total: count,
    };

    res.json(response);
  });

  // this API is called on landing page
  getAllPosts = expressAsyncHandler(async (req, res, next) => {
    const posts = await this.postService.getPosts({
      status: PostStatus.OPEN,
    });

    const postDtos = posts.map((post) => PostDto.fromDocument(post));

    const response: OptionallyPaginatedListResponse<PostDto> = {
      data: postDtos || [],
    };

    res.json(response);
  });

  createPost = expressAsyncHandler(async (req, res, next) => {
    if (!hasUser(req)) {
      throw new AuthorizationError("User not logged in.");
    }

    await validatePostCreation({ req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { type, item } = req.body;
    const user = await this.userService.getUserByUsername(req.user.username);
    if (!user) {
      throw new NotFoundError(`Error finding user ${req.user.username}.`);
    }

    const post = await this.postService.createPost({
      type,
      item,
      author: { ...user },
      location: user.location,
      status:
        item.category === PostCategory.OTHER
          ? PostStatus.PENDING_APPROVAL
          : PostStatus.OPEN,
    });

    log(`Created post [${post._id}] by user ${user.username}.`);

    res.status(201).json(PostDto.fromDocument(post));
  });

  getPost = expressAsyncHandler(async (req, res, next) => {
    await param("id").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { id } = req.params;
    const post = await this.postService.getPost(id);

    if (!post) {
      throw new NotFoundError(`Error finding post ${id}.`);
    }

    res.json(PostDto.fromDocument(post));
  });

  updatePost = expressAsyncHandler(async (req, res, next) => {
    if (!hasUser(req)) {
      throw new AuthorizationError("User not logged in.");
    }

    await param("id").notEmpty().run(req);
    await body("type").trim().notEmpty().isIn(PostTypes).run(req);
    await body("item").isObject().run(req);
    await body("item.name")
      .trim()
      .notEmpty()
      .isString()
      .isLength({
        max: 256,
      })
      .run(req);
    await body("item.quantity")
      .trim()
      .notEmpty()
      .isInt({
        min: 1,
        allow_leading_zeroes: false,
      })
      .run(req);
    await body("item.price")
      .trim()
      .notEmpty()
      .isInt({
        min: 0,
        allow_leading_zeroes: false,
      })
      .run(req);
    await body("item.description")
      .trim()
      .notEmpty()
      .isString()
      .isLength({
        max: 2048,
      })
      .run(req);
    await body("item.category")
      .trim()
      .notEmpty()
      .isString()
      .isIn(PostCategories)
      .run(req);
    await body("item.image").optional().isObject().run(req);
    await body("item.image.data").optional().notEmpty().isBase64().run(req);
    await body("item.image.contentType")
      .optional()
      .trim()
      .notEmpty()
      .isString()
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { id } = req.params;
    const post = await this.postService.getPost(id);
    if (!post) {
      throw new NotFoundError(`Error finding post ${id}.`);
    }

    if (req.user.username !== post.author.username.toString()) {
      throw new AuthorizationError(
        `User ${req.user.username} is not authorized to update post ${id}.`
      );
    }

    const { type, item } = req.body;

    const updatedPost = await this.postService.updatePost(id, {
      type,
      item,
    });

    log(`Updated post ${id} for user ${req.user.username}.`);

    res.json(PostDto.fromDocument(updatedPost));
  });

  deletePost = expressAsyncHandler(async (req, res, next) => {
    if (!hasUser(req)) {
      throw new AuthorizationError("User not logged in.");
    }

    await param("id").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { id } = req.params;
    const post = await this.postService.getPost(id);
    if (!post) {
      throw new NotFoundError(`Error finding post ${id}.`);
    }

    if (req.user.username !== post.author.username.toString()) {
      throw new AuthorizationError(
        `User ${req.user.username} is not authorized to delete post ${id}.`
      );
    }

    await this.postService.deletePost(id);

    log(`Deleted post ${id} for user ${req.user.username}.`);

    res.status(204).end();
  });

  getPostsByUserId = expressAsyncHandler(async (req, res, next) => {
    await param("userId").notEmpty().run(req);
    await validatePaginationRequest({ req, optional: false });
    await validatePostsFilterRequest({ req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { page, limit } = tryParsePaginationQuery(req);
    const { postType, userType, categories } = tryParsePostFilterQuery(req);

    const { userId } = req.params;
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundError(`Error finding user ${userId}.`);
    }

    const filterQuery: FilterQuery<PostDocument> = {
      ...(postType && { type: postType }),
      ...(userType && { authorType: userType }),
      ...(userId && { author: { _id: userId } }),
      ...(categories && {
        "item.category": { $in: categories },
      }),
    };

    const [posts, count] = await this.postService.getPaginatedPosts(
      page,
      limit,
      filterQuery,
      { updatedAt: -1, createdAt: -1 }
    );
    const postDtos = posts.map((post) => PostDto.fromDocument(post));
    const response: PaginatedResponse<PostDto> = {
      data: postDtos || [],
      page: page,
      per_page: limit,
      total: count,
    };
    res.json(response);
  });

  getItemCategories = expressAsyncHandler(async (req, res, next) => {
    await validateLocale({ req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { locale } = req.query;

    const categories = this.postService.getItemCategories(
      locale as "en" | "fr"
    );

    res.json(categories);
  });

  starPost = expressAsyncHandler(async (req, res, next) => {
    if (!hasUser(req)) {
      throw new AuthorizationError("User not logged in.");
    }

    await param("id").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { id } = req.params;
    const result = await this.postService.starPost(id, req.user.id);

    log(`Starred post ${id} for user ${req.user.username}.`);

    res.json(result);
  });
}
