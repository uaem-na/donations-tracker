import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    ppeProfiles: { type: [], required: true },
    status: { type: String, required: true },
    postalCode: { type: String, required: true },
    reportIds: { type: [], required: false },
  },
  { timestamps: true }
);

module.exports.Request = mongoose.model("Request", requestSchema);
