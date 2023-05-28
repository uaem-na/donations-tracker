import { useCallback } from 'react';
import { InfoWindow } from "@react-google-maps/api";
import "./index.css";

const InfoBox = ({ lat, lng, setInfoBox, setOffers, setRequests }) => {

    const onCloseClick = useCallback(() => {
        setInfoBox(null)
    });
    const onOfferClick = useCallback(() => {
        const newOffer = {
            lat: lat,
            lng: lng,
            time: new Date(),
          }
        setOffers((currentOffers) => [
          ...currentOffers,
          newOffer,
        ]);
        setInfoBox(null);
    });
    const onRequestClick = useCallback(() => {
        const newRequest = {
            lat: lat,
            lng: lng,
            time: new Date(),
        }
        setRequests((currentRequests) => [
            ...currentRequests,
            newRequest,
        ]);
        setInfoBox(null);
    });

    return (
        <InfoWindow 
            position={{ lat: lat, lng: lng }} 
            onCloseClick={onCloseClick}
        >
            <div className="h-auto w-auto flex flex-col items-center justify-center">
                <button 
                    className="text-lg text-gray-800 hover:text-gray-500"
                    onClick={onOfferClick}
                >
                    Add Offer
                </button>
                <button 
                    className="text-lg text-gray-800 hover:text-gray-500"
                    onClick={onRequestClick}
                >
                    Add Request
                </button>
                <button 
                    className="text-lg text-gray-800 hover:text-gray-500"
                >
                    See Posts
                </button>
            </div>
        </InfoWindow>
    )
}

export default InfoBox
