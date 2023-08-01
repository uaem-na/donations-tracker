import Locate from "@components/GoogleMapWrapper/Locate";
import { Marker, MarkerUtils } from "@components/GoogleMapWrapper/MarkerUtils";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import { faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { PostApiResponse, useGetPostsQuery } from "@services/posts";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

const center: google.maps.LatLngLiteral = {
  lat: 45.504717,
  lng: -73.576456,
};

const options = {
  mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
  disableDefaultUI: true,
  center,
  zoomControl: true,
  zoom: 10,
  clickableIcons: false,
};

interface IGoogleMapWrapperProps {
  post: PostApiResponse | null;
}

// TODO: add search integration
export const GoogleMapWrapper = ({ post }: IGoogleMapWrapperProps) => {
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

const GoogleMap = ({
  post,
}: PropsWithChildren<google.maps.MapOptions & { post }>) => {
  const { data: posts, isLoading } = useGetPostsQuery();

  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setMap(new google.maps.Map(ref.current, options));
    }
  }, []);

  useEffect(() => {
    if (map) {
      const markers: Marker[] = [];
      posts?.map((post: PostApiResponse) => {
        const marker = createMarker(
          {
            lat: post.location.lat!,
            lng: post.location.lng!,
          },
          post
        );
        // This is required, otherwise JSX event handler does nothing kinda hacky
        marker.addListener("click", () => {});
        markers.push(marker);
      });

      const markerCluster = new MarkerClusterer({
        markers,
      });
      markerCluster.setMap(map);
    }
  }, [map, posts]);

  const createMarker = useCallback(
    ({ lat, lng }: google.maps.LatLngLiteral, data: PostApiResponse) => {
      if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
        const div = document.createElement("div");
        const root = createRoot(div);
        const el = createPortal(<CustomMarker type={data.type} />, div);
        root.render(el);
        return new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat, lng },
          content: div,
        });
      }
      return new google.maps.Marker({
        map,
        position: { lat, lng },
      });
    },
    [map]
  );

  useEffect(() => {
    if (post?.location.lat && post?.location.lng) {
      panTo({
        lat: post.location.lat,
        lng: post.location.lng,
      });
    }
  }, [post]);

  const panTo = useCallback(
    ({ lat, lng }) => {
      if (!map) {
        return;
      }
      map.panTo({ lat, lng });
      map.setZoom(16);
    },
    [map]
  );

  return (
    <div className="relative w-full">
      <Locate panTo={panTo} />
      <div ref={ref} id="map" className="w-full h-full" />
    </div>
  );
};

const CustomMarker = ({ type }) => {
  const markerColor = useCallback(() => {
    switch (type) {
      case "offer":
        return "bg-purple-800 text-white ring-purple-700/10 after:border-t-purple-800";
      case "request":
        return "bg-blue-700 text-white ring-blue-700/10 after:border-t-blue-700";
      default:
        return "bg-purple-800 text-white ring-purple-700/10 after:border-t-purple-800";
    }
  }, []);

  return (
    <div
      className={`rounded-full w-[35px] h-[35px] ring-1 ring-inset flex items-center justify-center p-[4px] relative transition ease-out delay-150
                    after:border-l-[9px] after:border-l-transparent after:border-r-[9px] after:border-r-transparent after:border-t-[9px]  after:left-[50%] after:absolute after:top-[90%] after:h-0 after:content-['']
                    after:translate-x-[-50%] after:z-[1] ${markerColor()}`}
    >
      {type === "offer" ? (
        <FontAwesomeIcon icon={faHandshake} />
      ) : (
        <FontAwesomeIcon icon={faFileSignature} />
      )}
    </div>
  );
};
