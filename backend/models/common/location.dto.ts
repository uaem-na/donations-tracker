import { Document } from "mongoose";
import { Location } from "../../types";

export class LocationDto {
  id: string;
  lat: number;
  lng: number;
  postalCode: string;

  private constructor(id: string, location: Location) {
    const { lat, lng, postalCode } = location;

    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.postalCode = postalCode;
  }

  static fromDocument(document: Document): LocationDto {
    const location = document.toObject() as Location;
    return new LocationDto(document.id, location);
  }

  static fromLocation(location: Location): LocationDto {
    return new LocationDto(location._id, location);
  }
}
