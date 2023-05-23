import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import OfferCard from "./profile/cards/offer_card";
import RequestCard from "./profile/cards/request_card";
import PPEOffers from "./profile/cards/ppe_offers";
import PPERequests from "./profile/cards/ppe_requests";
const POST_URL = process.env.REACT_APP_BACKEND_URL;

export const Dashboard = () => {
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(POST_URL + `/offers`)
      .then((response) => {
        // console.log(response.data);
        setOffers(response.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
    axios
      .get(POST_URL + `/requests`)
      .then((response) => {
        // console.log(response.data);
        setRequests(response.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl p-4 font-semibold">Offers</h1>
        <PPEOffers offers={offers} />
      </div>
      <div className="p-6 pt-0">
        <h1 className="text-3xl p-4 font-semibold">Requests</h1>
        <PPERequests requests={requests} />
      </div>
    </div>
  );
};

export default Dashboard;
