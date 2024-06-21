import { useLandingContext } from "@contexts/LandingContext";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { memo } from "react";
import { Locate } from "./Locate";
import { PostCluster } from "./PostCluster";

const center: google.maps.LatLngLiteral = {
  lat: 45.504717,
  lng: -73.576456,
};

const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;
const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapOptions: google.maps.MapOptions = {
  mapId: MAP_ID,
  disableDefaultUI: true,
  center,
  zoomControl: true,
  zoom: 10,
};

// TODO: add search integration?
export const MapClusterWrapper = () => {
  const { postToLocate } = useLandingContext();

  const { isLoaded } = useJsApiLoader({
    id: MAP_ID,
    googleMapsApiKey: KEY,
    libraries: ["marker"],
  });

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={8}
        options={mapOptions}
      >
        <PostCluster />
        <Locate />
      </GoogleMap>
    </>
  ) : (
    <>Loading</>
  );
};

export default memo(MapClusterWrapper);
