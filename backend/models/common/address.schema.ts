import { Schema } from "mongoose";
import { Address } from "../../types";

export const AddressSchema: Schema<Address> = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true, enum: ["Montréal", "Montreal"] },
  province: {
    type: String,
    required: true,
    enum: [
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Northwest Territories",
      "Nova Scotia",
      "Nunavut",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
      "Yukon",
    ],
  },
  postalCode: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        // should accept H2X 1X1, H2X1X1, H2X-1X1, H2X 1X1
        return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(v);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (props: any) => `${props.value} is not a valid postal code!`,
    },
  },
  country: { type: String, default: "Canada" },
});
