import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { ensureAuthenticated } from "../middlewares";
import { UserService } from "../services/user.service";

// * middleware function to create route handlers
const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// * wire up routes with controller
router.get("/", ensureAuthenticated, userController.getAllUsers);
router.post("/update", ensureAuthenticated, userController.updateUser);
router.post("/password", ensureAuthenticated, userController.updatePassword);
router.delete("/:id", ensureAuthenticated, userController.deleteUser);

export default router;
