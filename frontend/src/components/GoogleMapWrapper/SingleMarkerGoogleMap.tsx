import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { ApiModel } from "@services/api";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { MarkerUtils } from "./MarkerUtils";
interface ISingleMarkerGoogleMapProps {
  post: ApiModel.Post;
}

export const SingleMarkerGoogleMap = ({
  post,
}: ISingleMarkerGoogleMapProps) => {
  const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const render = useCallback(
    (status: Status) => {
      switch (status) {
        case Status.LOADING:
          return <>Loading</>;
        case Status.FAILURE:
          return <>Error loading map</>;
        case Status.SUCCESS:
          return <GoogleMap zoom={8} center={center} post={post} />;
      }
    },
    [post]
  );

  return (
    <Wrapper
      apiKey={KEY}
      render={render}
      version="beta"
      libraries={["marker"]}
    />
  );
};

const center: google.maps.LatLngLiteral = {
  lat: 45.504717,
  lng: -73.576456,
};

const options: google.maps.MapOptions = {
  center,
  clickableIcons: false,
  disableDefaultUI: true,
  disableDoubleClickZoom: true,
  draggable: false,
  fullscreenControl: false,
  isFractionalZoomEnabled: false,
  keyboardShortcuts: false,
  mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
  zoomControl: true,
  zoom: 10,
};

const GoogleMap = ({
  post,
}: PropsWithChildren<google.maps.MapOptions & { post: ApiModel.Post }>) => {
  const ref = useRef(null);
  const [map, setMap] = useState<google.maps.Map>();

  // create a new map instance when the ref changes
  useEffect(() => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          ...options,
          center: {
            lat: post.location?.lat ?? center.lat,
            lng: post.location?.lng ?? center.lng,
          },
        })
      );
    }
  }, [post]);

  useEffect(() => {
    if (map && post) {
      const { lat, lng } = post.location;
      // check if lat and lng is not NaN and create a marker if map is available
      if (map && lat && lng && !isNaN(lat) && !isNaN(lng)) {
        createMarker({ lat, lng }, post.id, post.type);
      }
    }
  }, [map, post]);

  // function to create marker
  const createMarker = useCallback(
    (
      { lat, lng }: google.maps.LatLngLiteral,
      postId: string,
      postType: string
    ): google.maps.marker.AdvancedMarkerElement => {
      if (!MarkerUtils.isAdvancedMarkerAvailable(map)) {
        throw new Error(
          "AdvancedMarkerElement is not available, make sure to set Map ID"
        );
      }
      const div = document.createElement("div");
      const root = createRoot(div);
      const el = createPortal(<CustomMarker postType={postType} />, div);
      root.render(el);
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat, lng },
        content: div,
      });
      console.log(lat, lng, postId, map, div);
      marker["data"] = postId;
      return marker;
    },
    [map]
  );

  return (
    <div className="relative w-full h-full">
      <div ref={ref} id="map" className="w-full h-full"></div>
    </div>
  );
};

const CustomMarker = ({ postType }: { postType: string }) => {
  return (
    <>
      <div
        className={`rounded-full w-[25px] h-[25px] ring-1 ring-inset flex items-center justify-center p-[4px] relative transition ease-out delay-150
                    after:border-l-[9px] after:border-l-transparent after:border-r-[9px] after:border-r-transparent after:border-t-[9px]  after:left-[50%] after:absolute after:top-[90%] after:h-0 after:content-['']
                    after:translate-x-[-50%] after:z-[1] ${
                      postType === "offer"
                        ? "bg-purple-800 ring-purple-700/10 after:border-t-purple-800"
                        : "bg-blue-800 ring-blue-700/10 after:border-t-blue-800"
                    } text-white `}
      >
        <span className="text-lg font-semibold"></span>
      </div>
    </>
  );
};
