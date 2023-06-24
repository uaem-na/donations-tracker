import { Document, Types } from "mongoose";
import { IPost, IPostLocation } from "../types";

export class PostDto {
  author: Types.ObjectId | string;
  type: "request" | "offer";
  status: "open" | "in-progress" | "closed";
  title: string;
  description: string;
  location: IPostLocation;
  tags: string[];
  images: string[];
  views: number;

  private constructor(post: IPost) {
    const {
      author,
      type,
      status,
      title,
      description,
      location,
      tags,
      images,
      views,
    } = post;
    this.author = author;
    this.type = type;
    this.status = status;
    this.title = title;
    this.description = description;
    this.location = location;
    this.tags = tags;
    this.images = images.map((image) => image.data.toString("base64"));
    this.views = views;
  }

  static fromDocument(document: Document): PostDto {
    const post = document.toObject() as IPost;
    return new PostDto(post);
  }
}
