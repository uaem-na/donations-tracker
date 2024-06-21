import { MarkerF, MarkerProps } from "@react-google-maps/api";
import { ApiModel } from "@store/services/types";

// is omitting position really necessary to hide location information?
// 1. post filter by location / cluster on the side
interface PostMarkerProp extends Omit<MarkerProps, "position"> {
  post: ApiModel.Post;
  clickable?: boolean;
}

const onLoad = (marker) => {
  console.log("marker: ", marker);
};

export const PostMarker = ({ post, clusterer }: PostMarkerProp) => {
  return (
    <MarkerF
      key={post.id}
      onLoad={onLoad}
      clusterer={clusterer}
      position={new google.maps.LatLng(post.location.lat!, post.location.lng!)}
    ></MarkerF>
  );
};
