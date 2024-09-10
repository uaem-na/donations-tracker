import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { ensureAdmin, ensureAuthenticated } from "../middlewares";
import { PostService, ResendService, UserService, ReportService } from "../services";

// * middleware function to create route handlers
const router = Router();

const postService = new PostService();
const userService = new UserService();
const resendService = new ResendService();
const reportService = new ReportService();
const adminController = new AdminController(
  postService,
  userService,
  resendService,
  reportService,
);

// * wire up routes with controller
router.get(
  "/posts",
  ensureAuthenticated,
  ensureAdmin,
  adminController.getPostsToApprove,
);

router.put(
  "/posts/:id/approve",
  ensureAuthenticated,
  ensureAdmin,
  adminController.approvePost,
);

router.put(
  "/posts/:id/reject",
  ensureAuthenticated,
  ensureAdmin,
  adminController.rejectPost,
);

router.get(
  "/users",
  ensureAuthenticated,
  ensureAdmin,
  adminController.getUsersToVerify,
);

router.get(
  "/users/:id",
  ensureAuthenticated,
  ensureAdmin,
  adminController.getUserById,
);

router.put(
  "/users/:id/verify",
  ensureAuthenticated,
  ensureAdmin,
  adminController.verifyUser,
);

router.put(
  "/users/:id/active",
  ensureAuthenticated,
  ensureAdmin,
  adminController.toggleUserActive,
);

export default router;
