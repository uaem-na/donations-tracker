import { Model, Schema } from "mongoose";
import { PostDiscriminator, PostType } from "../../constants";
import { Post, PostDocument } from "../../types";
import PostModel from "./post.base.model";

const RequestPostSchema: Schema<Post> = new Schema({});

RequestPostSchema.pre("validate", function (next) {
  this.type = PostType.REQUEST;

  next();
});

export const RequestPostModel: Model<PostDocument> =
  PostModel.discriminator<PostDocument>(
    PostDiscriminator.REQUEST,
    RequestPostSchema
  );
