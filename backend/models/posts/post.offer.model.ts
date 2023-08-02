import { Model, Schema } from "mongoose";
import { PostDiscriminator, PostType } from "../../constants";
import { Post, PostDocument } from "../../types";
import PostModel from "./post.base.model";

const OfferPostSchema: Schema<Post> = new Schema({});

OfferPostSchema.pre("validate", function (next) {
  this.type = PostType.OFFER;

  next();
});

export const OfferPostModel: Model<PostDocument> =
  PostModel.discriminator<PostDocument>(
    PostDiscriminator.OFFER,
    OfferPostSchema
  );
