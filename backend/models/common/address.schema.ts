import { Schema } from "mongoose";
import {
  CountryCode,
  CountryName,
  ProvinceCode,
  ProvinceName,
} from "../../constants";
import { Address } from "../../types";

export const AddressSchema: Schema<Address> = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: {
    type: String,
    required: true,
    enum: [
      ProvinceName.ALBERTA,
      ProvinceName.BRITISH_COLUMBIA,
      ProvinceName.MANITOBA,
      ProvinceName.NEW_BRUNSWICK,
      ProvinceName.NEWFOUNDLAND_AND_LABRADOR,
      ProvinceName.NORTHWEST_TERRITORIES,
      ProvinceName.NOVA_SCOTIA,
      ProvinceName.NUNAVUT,
      ProvinceName.ONTARIO,
      ProvinceName.PRINCE_EDWARD_ISLAND,
      ProvinceName.QUEBEC,
      ProvinceName.SASKATCHEWAN,
      ProvinceName.YUKON,
    ],
  },
  provinceCode: {
    type: String,
    required: true,
    enum: [
      ProvinceCode.ALBERTA,
      ProvinceCode.BRITISH_COLUMBIA,
      ProvinceCode.MANITOBA,
      ProvinceCode.NEW_BRUNSWICK,
      ProvinceCode.NEWFOUNDLAND_AND_LABRADOR,
      ProvinceCode.NORTHWEST_TERRITORIES,
      ProvinceCode.NOVA_SCOTIA,
      ProvinceCode.NUNAVUT,
      ProvinceCode.ONTARIO,
      ProvinceCode.PRINCE_EDWARD_ISLAND,
      ProvinceCode.QUEBEC,
      ProvinceCode.SASKATCHEWAN,
      ProvinceCode.YUKON,
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
  country: { type: String, default: CountryName.CANADA },
  countryCode: { type: String, default: CountryCode.CANADA },
});
