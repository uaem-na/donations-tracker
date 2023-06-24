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

export const Request = mongoose.model("Request", requestSchema);
export default Request;
