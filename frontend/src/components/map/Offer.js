import {
    Marker,
    InfoWindow,
  } from "@react-google-maps/api";
  import { formatRelative } from "date-fns";
  
  const Offer = ({ selected, setSelected, offer, setInfoBox, clusterer }) => {
    return (
      <Marker  
        position={{ lat: offer.lat, lng: offer.lng }}
        onClick={() => {
            setSelected(offer);
            setInfoBox(null);
        }}
        icon={{ 
            url: 'red_triangle.png',
            scaledSize: new window.google.maps.Size(30,30),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15),
        }}
        clusterer={clusterer}
      >
        {selected === offer && 
        (<InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => { 
            setSelected(null);
            }}
        >
          <div>
            <h2>Offer</h2>
            <p>Spotted {formatRelative(selected.time, new Date())}</p>
          </div>
        </InfoWindow>)}
      </Marker>
    )
  }
  
  export default Offer