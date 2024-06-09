import axios from "axios";

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

    const { lat, lng } = response.data.results[0].geometry.location;

    return [0,0];
    //return [lat, lng];
  }catch (error) {
    console.error(error);
    return [0, 0];
  }
};
