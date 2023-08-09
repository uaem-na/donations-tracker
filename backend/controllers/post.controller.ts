import debug from "debug";
import expressAsyncHandler from "express-async-handler";
import { body, param, query, validationResult } from "express-validator";
import {
  FilterPostType,
  FilterablePostTypes,
  PostCategories,
  PostStatus,
  PostTypes,
} from "../constants";
import { AuthorizationError, NotFoundError, ValidationError } from "../errors";
import { PostDto } from "../models/posts";
import { PostService, UserService } from "../services";
import { hasUser } from "../utils";
import { isEnumValue } from "../utils/isEnumValue";

const log = debug("backend:post");

export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  getAllPosts = expressAsyncHandler(async (req, res, next) => {
    await query("page")
      .optional()
      .isInt({
        min: 1,
        allow_leading_zeroes: false,
      })
      .run(req);
    await query("per_page")
      .optional()
      .isInt({
        min: 1,
        allow_leading_zeroes: false,
      })
      .run(req);
    await query("type").optional().isIn(FilterablePostTypes).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const type = req.query.type as string;
    const filterByPostType = isEnumValue(type, FilterPostType)
      ? type
      : FilterPostType.ALL;
    const page = parseInt(req.query.page as string) ?? 1;
    const perPage = parseInt(req.query.per_page as string) ?? 10;

    const posts = await this.postService.getPosts(
      page,
      perPage,
      filterByPostType
    );
    const postDtos = posts.map((post) => PostDto.fromDocument(post));

    res.json(postDtos || []);
  });

  createPost = expressAsyncHandler(async (req, res, next) => {
    if (!hasUser(req)) {
      throw new AuthorizationError("User not logged in.");
    }

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
      status: PostStatus.OPEN,
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

  getPostsByUsername = expressAsyncHandler(async (req, res, next) => {
    await param("username").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { username } = req.params;
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new NotFoundError(`Error finding user ${username}.`);
    }

    const posts = await this.postService.getPostsByUsername(user.username);

    res.json(posts.map((post) => PostDto.fromDocument(post)));
  });

  getItemCategories = expressAsyncHandler(async (req, res, next) => {
    const categories = this.postService.getItemCategories();

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
