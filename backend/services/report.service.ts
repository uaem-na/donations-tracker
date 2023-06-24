import { Report } from "../models";
import { IReport, IReportDocument } from "../types";

export class ReportService {
  async createReport(report: Partial<IReport>) {
    const { userId, postId, status, notes, reportedBy } = report;

    const newReport = new Report({
      userId,
      postId,
      status,
      notes,
      reportedBy,
    });

    return await newReport.save();
  }

  async getReports(): Promise<IReportDocument[]> {
    // TODO: should we filter by status?
    const reports = await Report.find();

    return reports;
  }

  async getReport(id: string): Promise<IReportDocument | null> {
    const report = await Report.findById(id);

    return report;
  }

  async updateReport(id: string, update: Partial<IReport>) {
    const report = await this.getReport(id);

    if (!report) {
      throw new Error(`Error finding report ${id}.`);
    }

    Object.assign(report, update);

    return await report.save();
  }

  async deleteReport(id: string): Promise<void> {
    const result = await Report.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new Error(`Error deleting report ${id}.`);
    }
  }

  async getUserReports(userId: string): Promise<IReportDocument[]> {
    const reports = await Report.find({ userId: userId });

    return reports;
  }
}
