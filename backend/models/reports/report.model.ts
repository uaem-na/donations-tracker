import { faker } from "@faker-js/faker/locale/en_CA";
import { Model, model, Schema } from "mongoose";
import { ModelName, ReportStatus } from "../../constants";
import { PostDocument, ReportDocument, UserDocument } from "../../types";

const ReportSchema: Schema<ReportDocument> = new Schema(
  {
    reporter: {
      type: Schema.Types.ObjectId,
      ref: ModelName.USER,
      required: true,
    },
    resolver: {
      type: Schema.Types.ObjectId,
      ref: ModelName.USER,
    },
    post: { type: Schema.Types.ObjectId, ref: ModelName.POST, required: true },
    status: {
      type: String,
      enum: [ReportStatus.RESOLVED, ReportStatus.UNRESOLVED],
      required: true,
    },
    notes: { type: String, required: true, maxlength: 2048 },
  },
  { timestamps: true }
);

export const ReportModel: Model<ReportDocument> = model(
  ModelName.REPORT,
  ReportSchema
);
export default ReportModel;

export const fakeReport = (
  reporter: UserDocument,
  post: PostDocument
): ReportDocument => {
  const report = new ReportModel({
    reporter: reporter,
    post: post,
    status: ReportStatus.UNRESOLVED,
    notes: faker.word.words({ count: { min: 5, max: 100 } }),
  });

  return report;
};
