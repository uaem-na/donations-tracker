import { Router } from "express";
import { ReportController } from "../controllers";
import { ensureAuthenticated } from "../middlewares";
import { PostService, ReportService, UserService } from "../services";

// * middleware function to create route handlers
const router = Router();
const postService = new PostService();
const reportService = new ReportService();
const userService = new UserService();
const reportController = new ReportController(
  postService,
  reportService,
  userService
);

// * wire up routes with controller
router.post("/", ensureAuthenticated, reportController.createReport);
router.get("/", ensureAuthenticated, reportController.getAllReports);
router.get("/post/:id", ensureAuthenticated, reportController.getReportedPost);
router.post("/:id", ensureAuthenticated, reportController.updateReportStatus);
router.delete("/:id", ensureAuthenticated, reportController.deleteReport);
router.get(
  "/user/:userId",
  ensureAuthenticated,
  reportController.getUserReports
);

export default router;
