import { InfoWindow, Marker } from "@react-google-maps/api";
import { formatRelative } from "date-fns";

const Request = ({ selected, setSelected, request, setInfoBox, clusterer }) => {
  return (
    <Marker
      position={{ lat: request.lat, lng: request.lng }}
      onClick={() => {
        setSelected(request);
        setInfoBox(null);
      }}
      icon={{
        url: "green_triangle.png",
        scaledSize: new window.google.maps.Size(30, 30),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15),
      }}
      clusterer={clusterer}
    >
      {selected === request && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <h2>Request</h2>
            <p>Spotted {formatRelative(selected.time, new Date())}</p>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default Request;
