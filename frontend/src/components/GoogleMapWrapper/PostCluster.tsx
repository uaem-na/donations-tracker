import { useLandingContext } from "@contexts/LandingContext";
import {
  MarkerClustererF,
  MarkerF,
  useGoogleMap,
} from "@react-google-maps/api";
import { useGetPostsForLandingPageQuery } from "@store/services/api";
import { useEffect } from "react";
import { MapPin } from "./MapPin";

type PostMarker = google.maps.Marker & { postId: string };

export const PostCluster = () => {
  const map = useGoogleMap();
  const { data: postResponse } = useGetPostsForLandingPageQuery();
  const { setVisiblePosts, postToLocate, locatePost } = useLandingContext();

  useEffect(() => {
    if (map && postToLocate) {
      map.panTo(
        new google.maps.LatLng(
          postToLocate.location.lat!,
          postToLocate.location.lng!
        )
      );
      map.setZoom(13);
    }
  }, [map, postToLocate]);

  if (postResponse === undefined) {
    return;
  }

  const posts = postResponse?.data;

  return (
    <MarkerClustererF
      onClusteringEnd={(clusterer) => {
        const addedMarkers = clusterer
          .getMarkers()
          .filter((marker) => marker.isAdded) as PostMarker[];
        const visiblePosts = posts.filter((post) =>
          addedMarkers.some((marker) => marker.postId === post.id)
        );
        setVisiblePosts(visiblePosts);
      }}
    >
      {(clusterer) => (
        <>
          {posts.map((post) => (
            <MarkerF
              key={post.id}
              clusterer={clusterer}
              onLoad={(marker) => {
                marker["postId"] = post.id;
              }}
              icon={{
                url: MapPin(post.type),
                scaledSize: new google.maps.Size(25, 30),
              }}
              onClick={() => locatePost(post)}
              position={
                new google.maps.LatLng(post.location.lat!, post.location.lng!)
              }
            />
          ))}
        </>
      )}
    </MarkerClustererF>
  );
};
