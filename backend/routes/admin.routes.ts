import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { ensureAdmin, ensureAuthenticated } from "../middlewares";
import { PostService, UserService } from "../services";

// * middleware function to create route handlers
const router = Router();

const postService = new PostService();
const userService = new UserService();
const adminController = new AdminController(postService, userService);

// * wire up routes with controller
router.get("/posts-to-verify", ensureAuthenticated, ensureAdmin);

export default router;
