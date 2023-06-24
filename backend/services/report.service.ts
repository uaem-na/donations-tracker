import { ReportModel } from "../models";
import { Report, ReportDocument } from "../types";

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

  async getReport(id: string): Promise<ReportDocument | null> {
    const report = await ReportModel.findById(id).populate("post");

    return report;
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
