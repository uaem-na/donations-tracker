import { Document } from "mongoose";
import { Location, Post, PostItem } from "../../types";
import { UserDto } from "../users";

type PostItemDto = Omit<PostItem, "image"> & {
  image?: string;
};

export class PostDto {
  id: string;
  author: UserDto;
  location: Location;
  title: string;
  items: PostItemDto[];
  type: "request" | "offer";
  status: "open" | "in-progress" | "closed";
  views: number;
  createdAt: string;
  updatedAt: string;

  private constructor(id: string, post: Post) {
    const { author, location, title, items, type, status, views } = post;
    this.id = id;
    this.author = author;
    this.location = location;
    this.title = title;
    this.items = items.map((item) => {
      const { image, ...rest } = item;

      // convert binary image data to base64 string
      const b64Image = image?.data.toString("base64");

      return {
        ...(b64Image && { image: b64Image }),
        ...rest,
      };
    });
    this.type = type;
    this.status = status;
    this.views = views;
    this.createdAt = post.createdAt.toISOString();
    this.updatedAt = post.updatedAt.toISOString();
  }

  static fromDocument(document: Document): PostDto {
    const post = document.toObject() as Post;
    return new PostDto(document.id, post);
  }

  static fromPost(post: Post): PostDto {
    return new PostDto(post.id, post);
  }
}
