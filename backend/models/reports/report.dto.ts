import { Document } from "mongoose";
import { Report } from "../../types";
import { PostDto } from "../posts";
import { UserDto } from "../users";

export class ReportDto {
  reporter: UserDto;
  resolver: UserDto;
  post: PostDto;
  status: "resolved" | "unresolved";
  notes: string;

  private constructor(report: Report) {
    const { reporter, resolver, post, status, notes } = report;
    this.reporter = reporter;
    this.resolver = resolver;
    this.post = PostDto.fromPost(post);
    this.status = status;
    this.notes = notes;
  }

  static fromDocument(document: Document): ReportDto {
    const report = document.toObject() as Report;
    return new ReportDto(report);
  }
}
