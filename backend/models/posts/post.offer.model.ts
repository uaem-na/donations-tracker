import { Model, Schema } from "mongoose";
import { PostDiscriminator, PostType } from "../../constants";
import { OfferPost, PostDocument } from "../../types";
import PostModel from "./post.base.model";

const OfferPostSchema: Schema<OfferPost> = new Schema({});

OfferPostSchema.pre("validate", function (next) {
  this.type = PostType.OFFER;

  next();
});

export const OfferPostModel: Model<PostDocument> =
  PostModel.discriminator<PostDocument>(
    PostDiscriminator.OFFER,
    OfferPostSchema
  );
