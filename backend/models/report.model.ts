import { Model, model, Schema } from "mongoose";
import { IReportDocument } from "../types";

const ReportSchema: Schema<IReportDocument> = new Schema(
  {
    reportedBy: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    status: { type: String, enum: ["resolved", "unresolved"], required: true },
    notes: { type: String, required: true },
    resolvedBy: { type: Schema.Types.ObjectId, required: false },
  },
  { timestamps: true }
);

export const Report: Model<IReportDocument> = model("Report", ReportSchema);
export default Report;
