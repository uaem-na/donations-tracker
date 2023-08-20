import debug from "debug";
import expressAsyncHandler from "express-async-handler";
import { body, param, validationResult } from "express-validator";
import { AuthorizationError, NotFoundError, ValidationError } from "../errors";
import { ReportDto } from "../models/reports";
import { PostService, ReportService, UserService } from "../services";
import { hasUser } from "./validators";

const log = debug("backend:report");

export class ReportController {
  constructor(
    private postService: PostService,
    private reportService: ReportService,
    private userService: UserService
  ) {}

  getAllReports = expressAsyncHandler(async (req, res, next) => {
    const reports = await this.reportService.getReports();
    const reportDtos = reports.map((report) => ReportDto.fromDocument(report));

    res.json(reportDtos || []);
  });

  createReport = expressAsyncHandler(async (req, res, next) => {
    if (!hasUser(req)) {
      throw new AuthorizationError("User not logged in.");
    }

    await body("postId").notEmpty().run(req);
    await body("notes").notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { postId, notes } = req.body;

    const reporter = await this.userService.getUserByUsername(
      req.user.username
    );
    if (!reporter) {
      throw new NotFoundError(`Error finding user ${req.user.username}.`);
    }

    const post = await this.postService.getPost(postId);
    if (!post) {
      throw new NotFoundError(`Error finding post with id ${postId}.`);
    }

    const report = await this.reportService.createReport({
      reporter,
      post,
      status: "unresolved",
      notes,
    });

    log(
      `Created report ${report._id} for user ${post.author.username} on post [${post.id}]`
    );

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
    if (!hasUser(req)) {
      throw new AuthorizationError("User not logged in.");
    }

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

    if (req.user.username !== report.reporter.username.toString()) {
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
