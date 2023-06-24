import { passwordStrength } from "check-password-strength";
import {
  PassportLocalDocument,
  PassportLocalModel,
  Schema,
  model,
} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { IUserDocument } from "../types";

// ! TODO: reset password mechanism
const UserSchema: Schema<IUserDocument & PassportLocalDocument> = new Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    organization: { type: String, required: true },
    admin: { type: Boolean, default: false }, // TODO: add admin mechanism
    active: { type: Boolean, default: true }, // TODO: add deactivation mechanism
    verified: { type: Boolean, default: false }, // TODO: add veritifcation mechanism for admin
  },
  { timestamps: true }
);

// TODO: I think we need to use username as login instead of email to easily support organization account
// email, salt and hash are added by passport-local-mongoose
UserSchema.plugin(passportLocalMongoose, {
  usernameLowerCase: true,
  limitAttempts: true,
  maxAttempts: 10,
  unlockInterval: 10 * 60 * 1000, // 10 minutes
  passwordValidator: (
    password: string,
    cb: (arg0: { message: string } | null) => unknown
  ) => {
    if (password.length >= 256) {
      return cb({
        message: `Password must be less than 256 characters.`,
      });
    }
    const result = passwordStrength(password);

    // diversityTest is only true if password meets all requirements
    const diversityTest = result.contains
      .map((type) => {
        return (
          type.indexOf("uppercase") > -1 ||
          type.indexOf("lowercase") > -1 ||
          type.indexOf("number") > -1 ||
          type.indexOf("symbol") > -1
        );
      })
      .every((value) => value === true);

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

export const User: PassportLocalModel<IUserDocument & PassportLocalDocument> =
  model<IUserDocument & PassportLocalDocument>("User", UserSchema);
export default User;
