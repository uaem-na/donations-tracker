const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    reportedPostId: { type: String, required: true },
    status: { type: String, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports.Report = mongoose.model("Report", reportSchema);
