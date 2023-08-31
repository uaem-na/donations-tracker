import { ObjectId } from "mongodb";
import { ReportModel } from "../models/reports";
import { PostDocument, Report, ReportDocument } from "../types";

export class ReportService {
  async createReport(report: Partial<Report>) {
    const newReport = new ReportModel({
      ...report,
    });

    return await newReport.save();
  }

  async getReports(): Promise<ReportDocument[]> {
    // TODO: should we filter by status?
    const reports = await ReportModel.find();

    return reports;
  }

  async getReportedPosts(
    page: number,
    limit: number
  ): Promise<
    [{ _id: string; outstanding_reports: number; post: PostDocument }[], number]
  > {
    if (!page || !limit || page < 0 || limit < 0) {
      throw new Error("Error paginating posts. Invalid page or limit.");
    }

    const pipeline = [
      {
        $match: {
          status: "unresolved",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "post",
          foreignField: "_id",
          as: "postDetails",
        },
      },
      {
        $unwind: {
          path: "$postDetails",
        },
      },
      {
        $group: {
          _id: "$post",
          reports: {
            $addToSet: "$$ROOT",
          },
        },
      },
      {
        $project: {
          _id: "$_id",
          post: {
            $arrayElemAt: ["$reports.postDetails", 0],
          },
          outstanding_reports: {
            $size: "$reports",
          },
        },
      },
    ];

    const reports = await ReportModel.aggregate<{
      _id: string;
      outstanding_reports: number;
      post: PostDocument;
    }>(pipeline)
      .skip((page - 1) * limit)
      .limit(limit);

    const reportCounts = await ReportModel.aggregate<{
      _id: string;
      outstanding_reports: number;
      post: PostDocument;
    }>(pipeline);

    return [reports || [], reportCounts.length];
  }

  async getReport(id: string): Promise<ReportDocument | null> {
    const report = await ReportModel.findById(id).populate("post");

    return report;
  }

  async getReportedPost(postId: string): Promise<ReportDocument[] | null> {
    const reports = await ReportModel.find({
      post: { _id: new ObjectId(postId) },
    })
      .populate("post")
      .populate("reporter")
      .populate("resolver");

    return reports;
  }

  async updateReport(id: string, update: Partial<Report>) {
    const report = await this.getReport(id);

    if (!report) {
      throw new Error(`Error finding report ${id}.`);
    }

    Object.assign(report, update);

    return await report.save();
  }

  async deleteReport(id: string): Promise<void> {
    const result = await ReportModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new Error(`Error deleting report ${id}.`);
    }
  }

  async getUserReports(userId: string): Promise<ReportDocument[]> {
    const reports = await ReportModel.find({ userId: userId });

    return reports;
  }
}
