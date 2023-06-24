import { Model, model, Schema } from "mongoose";
import { ReportDocument, ReportUser } from "../types";

// embed reporter and resolver as subdocuments of Report
const UserSchema: Schema<ReportUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
});

const ReportSchema: Schema<ReportDocument> = new Schema(
  {
    reporter: { type: UserSchema, required: true },
    resolver: { type: UserSchema, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    status: { type: String, enum: ["resolved", "unresolved"], required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

export const ReportModel: Model<ReportDocument> = model("Report", ReportSchema);
export default ReportModel;
