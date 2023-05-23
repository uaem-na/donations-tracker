const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    ppeProfiles: { type: [], required: true },
    postalCode: { type: String, required: true },
    reportIds: { type: [], required: false },
  },
  { timestamps: true }
);

module.exports.Offer = mongoose.model("Offer", offerSchema);
