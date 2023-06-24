import { Router } from "express";
import { PostController } from "../controllers";
import { ensureAuthenticated } from "../middlewares";
import { PostService } from "../services";

// * middleware function to create route handlers
const router = Router();
const postService = new PostService();
const postController = new PostController(postService);

// * wire up public routes with controller
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);

// * wire up protected routes with controller
router.post("/", ensureAuthenticated, postController.createPost);
router.post("/:id", ensureAuthenticated, postController.updatePost);
router.delete("/:id", ensureAuthenticated, postController.deletePost);

export default router;
