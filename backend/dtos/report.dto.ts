import { Document } from "mongoose";
import { IReport } from "../types";

export class ReportDto {
  userId: string;
  postId: string;
  status: "resolved" | "unresolved";
  notes: string;
  reportedBy: string;
  resolvedBy: string;

  private constructor(report: IReport) {
    const { userId, postId, status, notes, reportedBy, resolvedBy } = report;
    this.userId = userId.toString();
    this.postId = postId.toString();
    this.status = status;
    this.notes = notes;
    this.reportedBy = reportedBy.toString();
    this.resolvedBy = resolvedBy.toString();
  }

  static fromDocument(document: Document): ReportDto {
    const report = document.toObject() as IReport;
    return new ReportDto(report);
  }
}
