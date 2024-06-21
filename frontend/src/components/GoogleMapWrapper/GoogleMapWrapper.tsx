import { Marker, MarkerUtils } from "@components/GoogleMapWrapper/MarkerUtils";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { ApiModel, useGetPostsForLandingPageQuery } from "@services/api";
import { GeoCluster } from "@utils";
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
  post: ApiModel.Post | null;
  handleVisiblePosts: (posts: ApiModel.Post[]) => void;
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

type Cluster = {
  centroid: [number, number];
  ids: string[];
  points: [number, number];
};

const GoogleMap = ({
  post,
  handleVisiblePosts,
}: PropsWithChildren<
  google.maps.MapOptions & { post; handleVisiblePosts }
>) => {
  const { data: postsResponse } = useGetPostsForLandingPageQuery();
  const [map, setMap] = useState<google.maps.Map>();
  const [postCluster, setPostCluster] = useState<Cluster[]>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [zoomBias, setZoomBias] = useState(2);
  const ref = useRef(null);

  // create a new map instance when the ref changes
  useEffect(() => {
    if (ref.current) {
      setMap(new google.maps.Map(ref.current, options));
    }
  }, []);

  // handle zoom bias
  const handleZoomChanged = useCallback(() => {
    if (map) {
      const zoom = map.getZoom() as number;

      // higher zoom level = zoomed in
      // lower zoom level = zoomed out
      // higher bias = cluster larger area
      // lower bias = cluster smaller area
      let bias = (1.5 / zoom ** 2) * 100;
      bias = Math.min(Math.max(bias, 0), 10); // set min 0 and max 10 for bias

      setZoomBias(bias);
    }
  }, [map]);

  // get visible posts so that parent component can filter posts
  const getVisiblePosts = useCallback(() => {
    if (map && postsResponse && markers) {
      const bounds = map?.getBounds();
      const markersInView = markers?.filter((m) => {
        const marker = m as google.maps.marker.AdvancedMarkerElement;
        if (bounds?.contains(marker.position!) === true) {
          return marker;
        }
      });

      let data = markersInView.map((x) => {
        return x["data"];
      });
      const ids = Array.prototype.concat.apply([], data);
      const p = postsResponse?.data.filter((x) => ids.includes(x.id));
      handleVisiblePosts(p);
    }
  }, [map, markers, postsResponse]);

  // add zoom_changed event listener to map
  useEffect(() => {
    if (map) {
      const zoomListener = google.maps.event.addListener(
        map,
        "zoom_changed",
        handleZoomChanged
      );

      return () => {
        google.maps.event.removeListener(zoomListener);
      };
    }
  }, [map, handleZoomChanged]);

  // add center_changed event listener to map
  useEffect(() => {
    if (map) {
      if (markers.length > 0) {
        getVisiblePosts();
      }

      const centerListener = google.maps.event.addListener(
        map,
        "center_changed",
        getVisiblePosts
      );

      return () => {
        google.maps.event.removeListener(centerListener);
      };
    }
  }, [map, getVisiblePosts]);

  const handleMarkerClick = (
    marker: google.maps.Marker | google.maps.marker.AdvancedMarkerElement
  ) => {
    if (!map || !marker) {
      return;
    }

    if (marker instanceof google.maps.marker.AdvancedMarkerElement) {
      const { lat, lng } = marker.position!;
      map.panTo({
        lat: lat as number,
        lng: lng as number,
      });
    } else {
      const position = marker.getPosition();
      if (position) {
        map.panTo(position);
      }
    }
  };

  // calculate marker positions when map and posts are ready
  useEffect(() => {         
    if (map && postsResponse) {
      const coords = postsResponse.data.map((post) => {
        return [post.location.lat!, post.location.lng!, post.id];
      });

      if (coords.length === 0) {
        return;
      }
      const cluster = new GeoCluster(coords, zoomBias);
      const postCluster: Cluster[] = cluster.getGeoCluster();
      setPostCluster(postCluster);

      return () => {
        setPostCluster([]);
      };
    }
  }, [map, postsResponse, zoomBias]);

  // function to remove all markers from map
  const removeAllMarkers = () => {
    markers?.map((m) => {
      // clear all event listeners, if any
      google.maps.event.clearInstanceListeners(m);

      // remove marker from map
      MarkerUtils.setMap(m, null);
    });
  };

  // function to create marker
  const createMarker = useCallback(
    (
      { lat, lng }: google.maps.LatLngLiteral,
      posts: ApiModel.Post[]
    ): google.maps.marker.AdvancedMarkerElement => {
      if (!MarkerUtils.isAdvancedMarkerAvailable(map)) {
        throw new Error(
          "AdvancedMarkerElement is not available, make sure to set Map ID"
        );
      }
      const div = document.createElement("div");
      const root = createRoot(div);
      const el = createPortal(<CustomMarker posts={posts} />, div);
      root.render(el);
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat, lng },
        gmpClickable: true,
        content: div,
      });
      marker["data"] = posts.map((p) => p.id);
      return marker;
    },
    [map, postsResponse]
  );

  // based on clusters, create markers
  useEffect(() => {
    if (postCluster && postCluster.length > 0) {
      removeAllMarkers();

      postCluster.forEach(({ centroid, points, ids }) => {
        const [lat, lng] = centroid;
        const p = postsResponse?.data.filter((x) => ids.includes(x.id));
        const marker = createMarker({ lat, lng }, p!);
        setMarkers((prev) => {
          return [...prev, marker];
        });
      });

      // clean up markers
      return () => {
        removeAllMarkers();
        setMarkers([]);
      };
    }
  }, [postCluster]);

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
      {/* <Locate panTo={panTo} /> */}
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
