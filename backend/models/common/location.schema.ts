import { Schema } from "mongoose";
import { Location } from "../../types";

export const LocationSchema: Schema<Location> = new Schema({
  lat: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => {
        return v >= -90 && v <= 90;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (props: any) => `${props.value} is not a valid latitude!`,
    },
  },
  lng: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => {
        return v >= -180 && v <= 180;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (props: any) => `${props.value} is not a valid longitude!`,
    },
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
});
