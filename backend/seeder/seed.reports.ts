import { faker } from "@faker-js/faker/locale/en_CA";
import { ReportStatus } from "../constants";
import { ReportModel } from "../models/reports";
import { PostDocument, ReportDocument, UserDocument } from "../types.js";

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

export const seedReports = async (
  destroy: boolean,
  reporter: UserDocument,
  posts: PostDocument[]
): Promise<ReportDocument[]> => {
  if (destroy) {
    console.log("🚀 ~ file: seed.reports.ts ~ seedReports ~ destroy:", destroy);
    // delete the whole collection
    await ReportModel.deleteMany({});
  }

  const reports: ReportDocument[] = [];
  const length = await ReportModel.countDocuments();
  if (length === 0) {
    // create random reports for each post
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const report = fakeReport(reporter, post);

      reports.push(report);
    }

    if (reports.length > 0) {
      const ops = reports.map((doc) => ({
        insertOne: { document: doc },
      }));
      const result = await ReportModel.bulkWrite(ops);
      const added = result.insertedCount;
      console.log("🚀 ~ file: seed.reports.ts ~ added:", added);
    }
  }

  return [];
};
