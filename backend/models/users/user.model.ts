import { passwordStrength } from "check-password-strength";
import {
  PassportLocalDocument,
  PassportLocalModel,
  Schema,
  model,
} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { UserDocument } from "../../types";
import { LocationSchema } from "../common";

// ! TODO: reset password mechanism
const UserSchema: Schema<UserDocument & PassportLocalDocument> = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: (props: any) => `${props.value} is not a valid email address!`,
      },
    },
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => {
          return /^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$/.test(v);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: (props: any) => `${props.value} is not a valid first name!`,
      },
    },
    lastName: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => {
          return /^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$/.test(v);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: (props: any) => `${props.value} is not a valid last name!`,
      },
    },
    location: { type: LocationSchema, required: false },
    active: { type: Boolean, default: true }, // TODO: add deactivation mechanism
    recoveryEmail: { type: String, required: false }, // TODO: add recovery email mechanism
  },
  // ! when updating discriminatorKey, existing keys must be updated as well
  { discriminatorKey: "kind", timestamps: true }
);

// salt and hash added by passport-local-mongoose
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

UserSchema.virtual("postalCode").get(function (this: UserDocument) {
  return (
    this.location?.postalCode ||
    this.organization?.address?.postalCode ||
    "ERROR: no postal code found"
  );
});

export const UserModel: PassportLocalModel<
  UserDocument & PassportLocalDocument
> = model<UserDocument & PassportLocalDocument>("User", UserSchema);

export default UserModel;
