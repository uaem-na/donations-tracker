import Locate from "@components/GoogleMapWrapper/Locate";
import { Marker, MarkerUtils } from "@components/GoogleMapWrapper/MarkerUtils";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { PostApiResponse, useGetPostsQuery } from "@services/posts";
import { GeoCluster } from "@utils/GeoCluster";
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
  handleVisiblePosts: (posts: PostApiResponse[]) => void;
}

// TODO: add search integration?
export const GoogleMapWrapper = ({
  post,
  handleVisiblePosts,
}: IGoogleMapWrapperProps) => {
  const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const render = useCallback(
    (status: Status) => {
      switch (status) {
        case Status.LOADING:
          return <>Loading</>;
        case Status.FAILURE:
          return <>Error loading map</>;
        case Status.SUCCESS:
          return (
            <GoogleMap
              zoom={8}
              center={center}
              post={post}
              handleVisiblePosts={handleVisiblePosts}
            />
          );
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
  handleVisiblePosts,
}: PropsWithChildren<
  google.maps.MapOptions & { post; handleVisiblePosts }
>) => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const [markers, setMarkers] = useState<Marker[]>();
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setMap(new google.maps.Map(ref.current, options));
    }
  }, []);

  const getVisiblePosts = () => {
    const bounds = map?.getBounds();

    const markersInView = markers?.filter((m) => {
      const marker = m as google.maps.marker.AdvancedMarkerElement;
      if (bounds?.contains(marker.position!) === true) {
        return marker;
      }
    });

    let data = markersInView!.map((x) => {
      return x["data"];
    });
    const ids = Array.prototype.concat.apply([], data);
    const p = posts?.filter((x) => ids.includes(x.id));

    handleVisiblePosts(p);
  };

  useEffect(() => {
    if (map && posts) {
      const m: Marker[] = [];
      const coords = posts.map((p) => {
        return [p.location.lat!, p.location.lng!, p.id];
      });
      const geocluster = new GeoCluster(coords, 0.01);
      const geolocationPosts = geocluster.getGeoCluster();

      geolocationPosts.map(({ centroid, points, ids }) => {
        const [lat, lng] = centroid;
        const p = posts.filter((x) => ids.includes(x.id));
        const marker = createMarker({ lat, lng }, p);

        // This is required, otherwise JSX event handler does nothing kinda hacky
        marker.addListener("click", () => {});
        m.push(marker);
      });
      setMarkers(m);
    }
  }, [map, posts]);

  useEffect(() => {
    if (markers) {
      const markerCluster = new MarkerClusterer({
        markers,
      });
      markerCluster.setMap(map!);

      google.maps.event.addListener(map!, "idle", () => {
        getVisiblePosts();
      });
    }
  }, [markers]);

  const createMarker = useCallback(
    ({ lat, lng }: google.maps.LatLngLiteral, posts: PostApiResponse[]) => {
      if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
        const div = document.createElement("div");
        const root = createRoot(div);
        const el = createPortal(<CustomMarker posts={posts} />, div);
        root.render(el);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat, lng },
          content: div,
        });
        marker["data"] = posts.map((p) => p.id);
        return marker;
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
      map.setZoom(10);
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

const CustomMarker = ({ posts }) => {
  return (
    <>
      <div
        className={`rounded-full w-[35px] h-[35px] ring-1 ring-inset flex items-center justify-center p-[4px] relative transition ease-out delay-150
                    after:border-l-[9px] after:border-l-transparent after:border-r-[9px] after:border-r-transparent after:border-t-[9px]  after:left-[50%] after:absolute after:top-[90%] after:h-0 after:content-['']
                    after:translate-x-[-50%] after:z-[1] bg-purple-800 text-white ring-purple-700/10 after:border-t-purple-800`}
      >
        <span className="text-lg font-semibold">{posts.length}</span>
      </div>
    </>
  );
};
