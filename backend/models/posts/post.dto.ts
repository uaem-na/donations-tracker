import { Document } from "mongoose";
import { Location, Post, PostItem } from "../../types";
import { UserDto } from "../users";

type PostItemDto = Omit<PostItem, "image"> & {
  image?: string;
};

export class PostDto {
  author: UserDto;
  location: Location;
  title: string;
  items: PostItemDto[];
  type: "request" | "offer";
  status: "open" | "in-progress" | "closed";
  views: number;
  createdAt: Date;
  updatedAt: Date;

  private constructor(post: Post) {
    const { author, location, title, items, type, status, views } = post;
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
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }

  static fromDocument(document: Document): PostDto {
    const post = document.toObject() as Post;
    return new PostDto(post);
  }
}
