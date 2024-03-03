import { Router } from "express";
import { AuthController } from "../controllers";
import { AuthService, ResendService } from "../services";

// * middleware function to create route handlers
const router = Router();
const authService = new AuthService();
const resendService = new ResendService();
const authController = new AuthController(authService, resendService);

// * wire up routes with controller
router.get("/session", authController.getSession);
router.get("/verify/:id", authController.verifyEmail);
router.post("/register", authController.register);
router.post("/login", authController.localStrategy, authController.login);
router.post("/logout", authController.logout);

// * reset password routes
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

export default router;
