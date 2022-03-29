import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import OfferCard from "./profile/cards/offer_card";
import RequestCard from "./profile/cards/request_card";
const POST_URL = process.env.REACT_APP_POST_URL;

export const Dashboard = () => {
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(POST_URL + `/offers`)
      .then((response) => {
        console.log(response.data);
        setOffers(response.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
    axios
      .get(POST_URL + `/requests`)
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  return (
    <div>
      <div className="p-6">
      <h1 className="text-3xl p-4 font-semibold">Offers</h1>{offers.map((ppe) => (
        <OfferCard id={ppe._id} postalCode={ppe.postalCode} ppeProfiles={ppe.ppeProfiles} createdAt={ppe.createdAt}/>
      ))}
      </div>
      <div className="p-6 pt-0">
      <h1 className="text-3xl p-4 font-semibold">Requests</h1>
      {requests.map((ppe) => (
        <RequestCard status={ppe.status} id={ppe._id} postalCode={ppe.postalCode} ppeProfiles={ppe.ppeProfiles} createdAt={ppe.createdAt}/>
      ))}
      </div>
    </div>
  );
};

export default Dashboard;
