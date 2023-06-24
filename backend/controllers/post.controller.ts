import debug from "debug";
import expressAsyncHandler from "express-async-handler";
import { body, param, validationResult } from "express-validator";
import { PostDto, UserDto } from "../dtos";
import { AuthorizationError, NotFoundError, ValidationError } from "../errors";
import { PostService } from "../services";

const log = debug("backend:post");

export class PostController {
  constructor(private postService: PostService) {}

  getAllPosts = expressAsyncHandler(async (req, res, next) => {
    const posts = await this.postService.getPosts();
    const postDtos = posts.map((post) => PostDto.fromDocument(post));

    res.json(postDtos || []);
  });

  createPost = expressAsyncHandler(async (req, res, next) => {
    await body("title").notEmpty().run(req);
    await body("description").notEmpty().run(req);
    await body("type").notEmpty().isIn(["request", "offer"]).run(req);
    await body("location").notEmpty().run(req);
    await body("tags").isArray().run(req);
    await body("images").isArray().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { type, title, description, location, tags, images } = req.body;
    const currentUser = req.user as UserDto;
    const currentUserId = currentUser.id as string;

    const post = await this.postService.createPost({
      title,
      description,
      images,
      location,
      author: currentUserId,
      type,
      status: "open",
      tags,
    });

    log(`Created post ${post._id} for user ${currentUserId}.`);

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
    await param("id").notEmpty().run(req);
    await body("title").notEmpty().run(req);
    await body("description").notEmpty().run(req);
    await body("type").notEmpty().isIn(["request", "offer"]).run(req);
    await body("location").notEmpty().run(req);
    await body("tags").isArray().run(req);
    await body("images").isArray().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { id } = req.params;
    const post = await this.postService.getPost(id);
    if (!post) {
      throw new NotFoundError(`Error finding post ${id}.`);
    }

    const currentUser = req.user as UserDto;
    const currentUserId = currentUser.id as string;
    if (currentUserId !== post.author.toString()) {
      throw new AuthorizationError(
        `User ${currentUserId} is not authorized to update post ${id}.`
      );
    }

    const { type, title, description, location, tags, images } = req.body;

    const updatedPost = await this.postService.updatePost(id, {
      title,
      description,
      images,
      location,
      tags,
      type,
    });

    log(`Updated post ${id} for user ${currentUserId}.`);

    res.json(PostDto.fromDocument(updatedPost));
  });

  deletePost = expressAsyncHandler(async (req, res, next) => {
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

    const currentUser = req.user as UserDto;
    const currentUserId = currentUser.id as string;
    if (currentUserId !== post.author.toString()) {
      throw new AuthorizationError(
        `User ${currentUserId} is not authorized to delete post ${id}.`
      );
    }

    await this.postService.deletePost(id);

    log(`Deleted post ${id} for user ${currentUserId}.`);

    res.status(204).end();
  });
}
