import { Router } from "express";
import { AuthController } from "../controllers";
import { AuthService } from "../services";

// * middleware function to create route handlers
const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

// * wire up routes with controller
router.get("/session", authController.getSession);
router.post("/register", authController.register);
router.post("/login", authController.localStrategy, authController.login);
router.post("/logout", authController.logout);

export default router;
