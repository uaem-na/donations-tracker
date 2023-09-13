import { Document } from "mongoose";
import { PostDocument, Report, UserDocument } from "../../types";
import { PostDto } from "../posts";
import { UserDto } from "../users";

export class ReportDto {
  id: string;
  reporter: UserDto;
  resolver: UserDto | null;
  post: PostDto;
  status: "resolved" | "unresolved";
  notes: string;

  private constructor(id: string, report: Report) {
    const { reporter, resolver, post, status, notes } = report;
    this.id = id;
    this.reporter = UserDto.fromUserDocument(reporter as UserDocument)!;
    this.resolver = UserDto.fromUserDocument(resolver as UserDocument);
    this.post = PostDto.fromPostDocument(post as PostDocument);
    this.status = status;
    this.notes = notes;
  }

  static fromDocument(document: Document): ReportDto {
    const report = document.toObject() as Report;
    return new ReportDto(document.id, report);
  }
}

export class ReportedPostDto {
  id: string;
  outstanding_reports: number;
  post: PostDto;

  private constructor(id: string, reports, post) {
    this.id = id;
    this.outstanding_reports = reports;
    this.post = post;
  }

  static fromDocument(document: {
    _id: string;
    outstanding_reports: number;
    post: PostDocument;
  }): ReportedPostDto {
    return new ReportedPostDto(
      document._id,
      document.outstanding_reports,
      document.post
    );
  }
}
