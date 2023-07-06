import { Schema } from "mongoose";
import { ImageFile } from "../../types";

export const ImageSchema: Schema<ImageFile> = new Schema({
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});
