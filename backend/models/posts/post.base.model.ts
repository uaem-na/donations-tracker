import { Model, model, Schema } from "mongoose";
import { ModelName, PostStatus, PostType } from "../../constants";
import { Post, PostDocument, PostItem } from "../../types";
import { ImageSchema, LocationSchema } from "../common";

const ItemSchema: Schema<PostItem> = new Schema({
  name: { type: String, required: true, maxlength: 256 },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: false, maxlength: 1024 },
  category: { type: String, required: true },
  image: { type: ImageSchema, required: false },
});

// a post can have multiple "item"s
const PostSchema: Schema<Post> = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: ModelName.USER,
      required: true,
    },
    location: { type: LocationSchema, required: true },
    title: { type: String, required: true, maxlength: 256 },
    items: { type: [ItemSchema], required: true },
    // * index for author and type for faster queries
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
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PostModel: Model<PostDocument> = model(ModelName.POST, PostSchema);

export type PostModel = typeof PostModel;

export default PostModel;
