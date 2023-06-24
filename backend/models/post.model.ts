import { Model, model, Schema } from "mongoose";
import { IPostDocument, IPostImage, IPostLocation } from "../types";

const ImageSchema: Schema<IPostImage> = new Schema({
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});

const LocationSchema: Schema<IPostLocation> = new Schema({
  lat: { type: Number, required: false },
  lng: { type: Number, required: false },
  postalCode: { type: String, required: false },
});

const PostSchema: Schema<IPostDocument> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    images: { type: [ImageSchema], required: true },
    location: { type: LocationSchema, required: true },
    // * index for author and type for faster queries
    author: { type: Schema.Types.ObjectId, required: true, index: true },
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
    tags: { type: [String], required: true }, // TODO: is this scalable? should we use a separate collection for tags?
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Post: Model<IPostDocument> = model("Post", PostSchema);
export default Post;
