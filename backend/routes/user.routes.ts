import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { ensureAdmin, ensureAuthenticated } from "../middlewares";
import { PostService } from "../services";
import { UserService } from "../services/user.service";

// * middleware function to create route handlers
const router = Router();
const userService = new UserService();
const postService = new PostService();
const userController = new UserController(userService, postService);

// * wire up routes with controller
router.post("/update", ensureAuthenticated, userController.updateUser);
router.post("/password", ensureAuthenticated, userController.updatePassword);
router.delete("/:id", ensureAuthenticated, userController.deleteUser);
router.get("/:id/starred", ensureAuthenticated, userController.getStarredPosts);

// * admin actions
router.get("/", ensureAuthenticated, ensureAdmin, userController.getAllUsers);
router.post(
  "/verify",
  ensureAuthenticated,
  ensureAdmin,
  userController.verifyUser
);
router.put(
  "/:id/active",
  ensureAuthenticated,
  ensureAdmin,
  userController.setActive
);

export default router;
