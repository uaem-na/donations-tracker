import { Document } from "mongoose";
import {
  Location,
  LocationDocument,
  Post,
  PostDocument,
  PostItem,
  PostItemDocument,
  UserDocument,
} from "../../types";
import { LocationDto } from "../common";
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
  location: PostLocationDto | undefined;
  item: PostItemDto;
  type: "request" | "offer";
  status: "open" | "in-progress" | "closed" | "pending-approval";
  views: number;
  createdAt: string;
  updatedAt: string;

  private constructor(id: string, post: Post) {
    const { author, location, item, type, status, views } = post;
    this.id = id;
    this.type = type;
    this.status = status;
    this.views = views;
    this.createdAt = post.createdAt.toISOString();
    this.updatedAt = post.updatedAt.toISOString();

    this.author = UserDto.fromUserDocument(author as UserDocument)!;

    if (location) {
      this.location = LocationDto.fromLocationDocument(
        location as LocationDocument
      );
    }

    // convert PostItem object to PostItemDto
    const { _id: itemId, image, ...itemRest } = item as PostItemDocument;

    // convert binary image data to base64 string
    const b64Image = image?.data.toString("base64");

    this.item = {
      id: itemId,
      ...(b64Image && { image: b64Image }),
      ...itemRest,
    };
  }

  static fromDocument(document: Document): PostDto {
    const post = document.toObject() as Post;
    return new PostDto(document.id, post);
  }

  static fromPostDocument(post: PostDocument): PostDto {
    return new PostDto(post._id, post);
  }
}
