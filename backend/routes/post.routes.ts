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
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.get("/items/categories", postController.getItemCategories);

// * wire up protected routes with controller
router.post("/", ensureAuthenticated, postController.createPost);
router.post("/:id", ensureAuthenticated, postController.updatePost);
router.delete("/:id", ensureAuthenticated, postController.deletePost);

router.get(
  "/user/:username",
  ensureAuthenticated,
  postController.getPostsByUsername
);

export default router;
