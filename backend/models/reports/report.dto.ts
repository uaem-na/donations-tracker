import { Document } from "mongoose";
import { Report } from "../../types";
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
    this.reporter = UserDto.fromUser(reporter)!;
    this.resolver = UserDto.fromUser(resolver);
    this.post = PostDto.fromPost(post);
    this.status = status;
    this.notes = notes;
  }

  static fromDocument(document: Document): ReportDto {
    const report = document.toObject() as Report;
    return new ReportDto(document.id, report);
  }
}
