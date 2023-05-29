const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const User = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userOrg: { type: String, required: true }, // TODO: seems like this should be an ObjectId
    orgName: { type: String, required: true }, // TODO: seems like a duplicate property
    admin: { type: Boolean, default: false }, // TODO: add admin mechanism
    active: { type: Boolean, default: true }, // TODO: add deactivation mechanism
    verified: { type: Boolean, default: false }, // TODO: add veritifcation mechanism for admin
  },
  { timestamp: true }
);

// email, salt and hash are added by passport-local-mongoose
User.plugin(passportLocalMongoose, {
  usernameField: "email",
  limitAttempts: true,
  maxAttempts: 10,
  unlockInterval: 10 * 60 * 1000, // 10 minutes
});

module.exports = mongoose.model("User", User);
