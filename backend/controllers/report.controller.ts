import debug from "debug";
import expressAsyncHandler from "express-async-handler";
import { body, param, validationResult } from "express-validator";
import { ReportDto, UserDto } from "../dtos";
import { AuthorizationError, NotFoundError, ValidationError } from "../errors";
import { ReportService } from "../services";

const log = debug("backend:report");

export class ReportController {
  constructor(private reportService: ReportService) {}

  getAllReports = expressAsyncHandler(async (req, res, next) => {
    const reports = await this.reportService.getReports();
    const reportDtos = reports.map((report) => ReportDto.fromDocument(report));

    res.json(reportDtos || []);
  });

  createReport = expressAsyncHandler(async (req, res, next) => {
    await body("userId").notEmpty().run(req);
    await body("postId").notEmpty().run(req);
    await body("status").notEmpty().isIn(["resolved", "unresolved"]).run(req);
    await body("notes").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { userId, postId, status, notes } = req.body;
    const currentUser = req.user as UserDto;
    const currentUserId = currentUser.id as string;

    const report = await this.reportService.createReport({
      userId,
      postId,
      status,
      notes,
      reportedBy: currentUserId,
    });

    log(`Created report ${report._id} for user ${userId} on post ${postId}.`);

    res.status(201).json(ReportDto.fromDocument(report));
  });

  getReport = expressAsyncHandler(async (req, res, next) => {
    await param("id").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { id } = req.params;
    const report = await this.reportService.getReport(id);

    if (!report) {
      throw new NotFoundError(`Error finding report ${id}.`);
    }

    res.status(200).json(ReportDto.fromDocument(report));
  });

  updateReportStatus = expressAsyncHandler(async (req, res, next) => {
    await param("id").notEmpty().run(req);
    await body("status").notEmpty().isIn(["resolved", "unresolved"]).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { id } = req.params;
    const { status } = req.body;

    const updatedReport = await this.reportService.updateReport(id, { status });

    log(`Updated report ${id} status to ${status}.`);

    res.status(200).json(ReportDto.fromDocument(updatedReport));
  });

  deleteReport = expressAsyncHandler(async (req, res, next) => {
    await param("id").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { id } = req.params;
    const report = await this.reportService.getReport(id);

    if (!report) {
      throw new NotFoundError(`Error finding report ${id}.`);
    }

    const currentUser = req.user as UserDto;
    const currentUserId = currentUser.id as string;

    if (currentUserId !== report.reportedBy.toString()) {
      throw new AuthorizationError(
        "User must be the one who filed the report to delete the report."
      );
    }

    await this.reportService.deleteReport(id);

    log(`Deleted report ${id}.`);

    res.status(200).json({ message: `Deleted report ${id}.` });
  });

  getUserReports = expressAsyncHandler(async (req, res, next) => {
    await param("userId").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { userId } = req.params;

    const reports = await this.reportService.getUserReports(userId);

    res
      .status(200)
      .json(reports.map((report) => ReportDto.fromDocument(report)));
  });
}
