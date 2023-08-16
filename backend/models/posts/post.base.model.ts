import { Model, model, Schema } from "mongoose";
import {
  ModelName,
  PostCategory,
  PostStatus,
  PostType,
  UserRole,
} from "../../constants";
import { Post, PostDocument, PostItem } from "../../types";
import { ImageSchema, LocationSchema } from "../common";

const ItemSchema: Schema<PostItem> = new Schema({
  name: { type: String, required: true, maxlength: 256 },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: false, maxlength: 2048 },
  category: {
    type: String,
    required: true,
    index: true,
    enum: [
      PostCategory.BOOK,
      PostCategory.CLOTHING,
      PostCategory.CUTLERY,
      PostCategory.ELECTRONICS,
      PostCategory.FOOD,
      PostCategory.FURNITURE,
      PostCategory.PPE,
      PostCategory.STATIONARY,
      PostCategory.TOY,
      PostCategory.OTHER,
    ],
  },
  image: { type: ImageSchema, required: false },
});

const PostSchema: Schema<Post> = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: ModelName.USER,
      required: true,
    },
    location: { type: LocationSchema, required: true },
    item: { type: ItemSchema, required: true },
    authorType: {
      type: String,
      enum: [UserRole.ORGANIZATION, UserRole.INDIVIDUAL],
      required: true,
      default: UserRole.INDIVIDUAL,
    },
    type: {
      type: String,
      enum: [PostType.OFFER, PostType.REQUEST],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: [PostStatus.OPEN, PostStatus.IN_PROGRESS, PostStatus.CLOSED],
      required: true,
      default: PostStatus.OPEN,
      indes: true,
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PostModel: Model<PostDocument> = model(ModelName.POST, PostSchema);

export type PostModel = typeof PostModel;

export default PostModel;
