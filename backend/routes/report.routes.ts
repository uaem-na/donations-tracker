import { Router } from "express";
import { ReportController } from "../controllers";
import { ensureAuthenticated } from "../middlewares";
import { ReportService } from "../services";

// * middleware function to create route handlers
const router = Router();
const reportService = new ReportService();
const reportController = new ReportController(reportService);

// * wire up routes with controller
router.post("/", ensureAuthenticated, reportController.createReport);
router.get("/", ensureAuthenticated, reportController.getAllReports);
router.get("/:id", ensureAuthenticated, reportController.getReport);
router.post("/:id", ensureAuthenticated, reportController.updateReportStatus);
router.delete("/:id", ensureAuthenticated, reportController.deleteReport);
router.get(
  "/user/:userId",
  ensureAuthenticated,
  reportController.getUserReports
);

export default router;
