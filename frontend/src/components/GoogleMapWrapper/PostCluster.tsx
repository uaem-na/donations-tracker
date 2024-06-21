import { useEffect } from 'react';
import { MarkerClustererF, MarkerF, useGoogleMap } from "@react-google-maps/api";
import { useGetPostsForLandingPageQuery } from "@store/services/api";
import { useLandingContext } from "@contexts/LandingContext";

type PostMarker = google.maps.Marker & { postId: string };

export const PostCluster = () => {
  const map = useGoogleMap();
  const { data: postResponse } = useGetPostsForLandingPageQuery();
  const { setVisiblePosts, postToLocate } = useLandingContext();

  useEffect(() => {
    if (map && postToLocate) {
      map.panTo(new google.maps.LatLng(postToLocate.location.lat!, postToLocate.location.lng!))
      map.setZoom(13)
    }
  }, [map, postToLocate])

  if (postResponse === undefined) {
    return;
  }

  const posts = postResponse?.data;

  return (
    <MarkerClustererF
      onClusteringEnd={(clusterer) => {
        const addedMarkers = clusterer.getMarkers().filter((marker) => marker.isAdded) as PostMarker[]
        const visiblePosts = posts.filter((post) => addedMarkers.some((marker) => marker.postId === post.id))
        setVisiblePosts(visiblePosts)
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
              // icon={{
              //   url: '/compass.svg',
              // }}
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
