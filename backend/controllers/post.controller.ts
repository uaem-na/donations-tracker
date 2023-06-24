import debug from "debug";
import expressAsyncHandler from "express-async-handler";
import { body, param, validationResult } from "express-validator";
import { PostDto } from "../dtos";
import { AuthorizationError, NotFoundError, ValidationError } from "../errors";
import { PostService, UserService } from "../services";
import { hasUser } from "../utils";

const log = debug("backend:post");

export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  getAllPosts = expressAsyncHandler(async (req, res, next) => {
    const posts = await this.postService.getPosts();
    const postDtos = posts.map((post) => PostDto.fromDocument(post));

    res.json(postDtos || []);
  });

  createPost = expressAsyncHandler(async (req, res, next) => {
    if (!hasUser(req)) {
      throw new AuthorizationError("User not logged in.");
    }

    await body("title").notEmpty().run(req);
    await body("type").notEmpty().isIn(["request", "offer"]).run(req);
    await body("items").isArray().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { title, type, items } = req.body;
    const user = await this.userService.getUserByUsername(req.user.username);
    if (!user) {
      throw new NotFoundError(`Error finding user ${req.user.username}.`);
    }

    const post = await this.postService.createPost({
      title,
      type,
      items,
      author: { ...user },
      location: user.location,
      status: "open",
    });

    log(`Created post [${post._id}] ${post.title} by user ${user.username}.`);

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
    await body("title").notEmpty().run(req);
    await body("type").notEmpty().isIn(["request", "offer"]).run(req);
    await body("items").isArray().run(req);

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

    const { title, type, items } = req.body;

    const updatedPost = await this.postService.updatePost(id, {
      title,
      type,
      items,
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
}
