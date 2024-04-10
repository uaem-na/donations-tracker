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
router.get(
  "/posts",
  ensureAuthenticated,
  ensureAdmin,
  adminController.getPostsToApprove
);

router.put(
  "/posts/:id/approve",
  ensureAuthenticated,
  ensureAdmin,
  adminController.approvePost
);

router.get(
  "/users",

  adminController.getUsersToVerify
);

router.get(
  "/users/:id",
  ensureAuthenticated,
  ensureAdmin,
  adminController.getUserById
);

router.put(
  "/users/:id/verify",
  ensureAuthenticated,
  ensureAdmin,
  adminController.verifyUser
);

router.put(
  "/users/:id/active",
  ensureAuthenticated,
  ensureAdmin,
  adminController.toggleUserActive
);

export default router;
