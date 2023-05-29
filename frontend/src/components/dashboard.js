import { useState, useEffect } from "react";
import axios from "../common/http-common";
import PPEOffers from "./profile/cards/ppe_offers";
import PPERequests from "./profile/cards/ppe_requests";

export const Dashboard = () => {
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`/offers`)
      .then((response) => {
        // console.log(response.data);
        setOffers(response.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
    axios
      .get(`/requests`)
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
