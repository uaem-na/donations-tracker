import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

type GeocodeResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
};

const API_KEY = process.env.GOOGLE_GEOCODE_API_KEY;

export const geocode = async (
  postalCode: string
): Promise<[number, number]> => {
  if (!API_KEY) {
    throw new Error("No Google Geocode API key found.");
  }

  try {
    const response = await axios.get<GeocodeResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${API_KEY}`
    );

    if (response.data.results.length === 0) {
      throw new Error("No results found for the given postal code.");
    }
    
    const { lat, lng } = response.data.results[0].geometry.location;

    return [lat, lng];
  }catch (error) {
    if (axios.isAxiosError(error)) 
      console.error("Axios error:", error.message);
    else if (error instanceof Error)
      console.error("Geocode error:", error.message);
    else 
      console.error("Unknown error:", error);
    return [0, 0];
  }
};
