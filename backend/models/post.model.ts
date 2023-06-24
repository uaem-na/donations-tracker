import { Model, model, Schema } from "mongoose";
import { Post, PostAuthor, PostDocument, PostItem } from "../types";
import { ImageSchema, LocationSchema } from "./schemas";

const ItemSchema: Schema<PostItem> = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  category: { type: String, required: true },
  image: { type: ImageSchema, required: false },
});

const AuthorSchema: Schema<PostAuthor> = new Schema({
  username: { type: String, required: true, index: true },
  email: { type: String, required: true },
});

// a post can have multiple "item"s
const PostSchema: Schema<Post> = new Schema(
  {
    author: { type: AuthorSchema, required: true, index: true },
    location: { type: LocationSchema, required: true },
    title: { type: String, required: true },
    items: { type: [ItemSchema], required: true },
    // * index for author and type for faster queries
    type: {
      type: String,
      enum: ["request", "offer"],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open",
      required: true,
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PostModel: Model<PostDocument> = model("Post", PostSchema);
export default PostModel;
