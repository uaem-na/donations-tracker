import { Document } from "mongoose";
import { Report, ReportPost, ReportUser } from "../../types";

export class ReportDto {
  reporter: ReportUser;
  resolver: ReportUser;
  post: ReportPost;
  status: "resolved" | "unresolved";
  notes: string;

  private constructor(report: Report) {
    const { reporter, resolver, post, status, notes } = report;
    this.reporter = reporter;
    this.resolver = resolver;
    this.post = post;
    this.status = status;
    this.notes = notes;
  }

  static fromDocument(document: Document): ReportDto {
    const report = document.toObject() as Report;
    return new ReportDto(report);
  }
}
