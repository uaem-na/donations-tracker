import { Model, Schema } from "mongoose";
import { PostDiscriminator, PostType } from "../../constants";
import { PostDocument, RequestPost } from "../../types";
import PostModel from "./post.base.model";

const RequestPostSchema: Schema<RequestPost> = new Schema({});

RequestPostSchema.pre("validate", function (next) {
  this.type = PostType.REQUEST;

  next();
});

export const RequestPostModel: Model<PostDocument> =
  PostModel.discriminator<PostDocument>(
    PostDiscriminator.REQUEST,
    RequestPostSchema
  );
