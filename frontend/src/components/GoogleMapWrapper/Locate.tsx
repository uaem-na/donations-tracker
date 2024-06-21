import { useGoogleMap } from "@react-google-maps/api";
import { useCallback } from "react";
export const Locate = () => {
  const map = useGoogleMap();

  const panTo = useCallback(
    ({ lat, lng }) => {
      if (map) {
        map.panTo({ lat, lng });
        map.setZoom(15);
      }
    },
    [map]
  );

  return (
    <button
      type="button"
      className="absolute top-3 right-3 z-10"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img
        className="w-[30px] cursor-pointer"
        src="/compass.svg"
        alt="compass - locate me"
      />
    </button>
  );
};
