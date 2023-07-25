import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { ensureAdmin, ensureAuthenticated } from "../middlewares";
import { UserService } from "../services/user.service";

// * middleware function to create route handlers
const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// * wire up routes with controller
router.post("/update", ensureAuthenticated, userController.updateUser);
router.post("/password", ensureAuthenticated, userController.updatePassword);
router.delete("/:id", ensureAuthenticated, userController.deleteUser);

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
