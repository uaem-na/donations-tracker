import { Document } from "mongoose";
import { Location, Post, PostItem } from "../../types";
import { UserDto } from "../users";

type PostLocationDto = Omit<Location, "_id"> & {
  id: string;
};

type PostItemDto = Omit<PostItem, "image" | "_id"> & {
  image?: string;
  id: string;
};

export class PostDto {
  id: string;
  author: UserDto;
  location: PostLocationDto;
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
    this.title = title;
    this.type = type;
    this.status = status;
    this.views = views;
    this.createdAt = post.createdAt.toISOString();
    this.updatedAt = post.updatedAt.toISOString();

    // convert User object to UserDto
    this.author = UserDto.fromUser(author);

    // convert location._id to location.id
    const { _id: locationId, ...rest } = location;
    this.location = {
      id: locationId,
      ...rest,
    };

    // convert PostItem object to PostItemDto
    this.items = items.map((item) => {
      const { _id, image, ...rest } = item;

      // convert binary image data to base64 string
      const b64Image = image?.data.toString("base64");

      return {
        id: _id,
        ...(b64Image && { image: b64Image }),
        ...rest,
      };
    });
  }

  static fromDocument(document: Document): PostDto {
    const post = document.toObject() as Post;
    return new PostDto(document.id, post);
  }

  static fromPost(post: Post): PostDto {
    return new PostDto(post._id, post);
  }
}
