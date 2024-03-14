import { Router } from "express";
import { PostController } from "../controllers";
import { ensureAuthenticated } from "../middlewares";
import { PostService, UserService } from "../services";

// * middleware function to create route handlers
const router = Router();
const postService = new PostService();
const userService = new UserService();
const postController = new PostController(postService, userService);

// * wire up public routes with controller
router.get("/", postController.getPublicPosts);
router.get("/landing", postController.getAllPosts);
router.get("/search", postController.findPosts);
router.get("/:id", postController.getPost);
router.get("/items/categories", postController.getItemCategories);

// * wire up protected routes with controller
router.post("/", ensureAuthenticated, postController.createPost);
router.post("/:id", ensureAuthenticated, postController.updatePost);
router.delete("/:id", ensureAuthenticated, postController.deletePost);
router.post("/:id/star", ensureAuthenticated, postController.starPost);

router.get(
  "/user/:userId",
  ensureAuthenticated,
  postController.getPostsByUserId
);

export default router;
