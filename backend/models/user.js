const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { passwordStrength } = require("check-password-strength");

const User = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    organization: { type: String, required: true },
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
  passwordValidator: (password, cb) => {
    if (password.length >= 256) {
      return cb({
        message: `Password must be less than 256 characters.`,
      });
    }
    const result = passwordStrength(password);
    const diversityTest = result.contains
      .map((type) => {
        return (
          type.indexOf("uppercase") > -1 ||
          type.indexOf("lowercase") > -1 ||
          type.indexOf("number") > -1 ||
          type.indexOf("symbol") > -1
        );
      })
      .every((value) => value > -1);

    console.log(diversityTest);

    if (result.length >= 8 && diversityTest) {
      // password is strong enough, empty cb() for no error
      return cb(null);
    } else {
      // password is weak
      return cb({
        message: `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.`,
      });
    }
  },
});

module.exports.User = mongoose.model("User", User);
