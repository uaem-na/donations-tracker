import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    ppeProfiles: { type: [], required: true },
    postalCode: { type: String, required: true },
    reportIds: { type: [], required: false },
  },
  { timestamps: true }
);

export const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
