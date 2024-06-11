import {
  GoogleMap,
  GoogleMapProps,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { ApiModel, useGetPostsForLandingPageQuery } from "@services/api";
import {
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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
  clickableIcons: false,
};

interface IMapClusterWrapperProps {
  post: ApiModel.Post | null;
  handleVisiblePosts: (posts: ApiModel.Post[]) => void;
}

export const MapClusterWrapper = ({
  post,
  handleVisiblePosts,
}: IMapClusterWrapperProps) => {
  const { isLoaded } = useJsApiLoader({
    id: MAP_ID,
    googleMapsApiKey: KEY,
  });

  return isLoaded ? (
    <>
      <MapWrapper
        center={center}
        zoom={8}
        post={post}
        handleVisiblePosts={handleVisiblePosts}
      />
    </>
  ) : (
    <>Loading</>
  );
};

const MapWrapper = ({
  post,
  handleVisiblePosts,
}: PropsWithChildren<GoogleMapProps & { post; handleVisiblePosts }>) => {
  const { data: postResponse } = useGetPostsForLandingPageQuery();
  const [posts, setPosts] = useState<ApiModel.Post[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);

  // calculating marker positions when map and posts are loaded
  useEffect(() => {
    // const map = useGoogleMap();
    if (postResponse) {
      setPosts(postResponse.data);
    }
  });

  // get visible posts so that parent component can filter them
  const getVisiblePosts = useCallback(() => {
    if (map && postResponse) {
      const bounds = map?.getBounds();
    }
  }, [map, postResponse]);
  console.log(posts);
  // const map = useMap();
  // const [zoomBias, setZoomBias] = useState<number>(2);

  // const handleZoomChanged = useCallback(() => {
  //   if (map) {
  //     const zoom = map.getZoom() as number;

  //     let bias = (1.5 / zoom ** 2) * 100;
  //     bias = Math.min(Math.max(bias, 0), 10); // set min 0 and max 10 for bias

  //     setZoomBias(bias);
  //   }
  // }, [map]);

  // adding zoom_changed event listener to the map
  // useEffect(() => {
  //   if (map) {
  //     const zoomListener = google.maps.event.addListener(
  //       map,
  //       "zoom_changed",
  //       handleZoomChanged
  //     );

  //     return () => {
  //       google.maps.event.removeListener(zoomListener);
  //     };
  //   }
  // }, [map, handleZoomChanged]);

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={center}
      zoom={8}
      options={mapOptions}
    >
      <Markers posts={posts} />
    </GoogleMap>
  );
};

const Markers = ({ posts }: { posts: ApiModel.Post[] }) => {
  const markers = posts.map((post) => {
    return (
      <MarkerF
        key={post.id}
        position={{ lat: post.location.lat!, lng: post.location.lng! }}
      />
    );
  });

  return <>{markers}</>;
};

export default memo(MapClusterWrapper);
