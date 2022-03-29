import { useState, useEffect } from "react";
import { ChangeProfile } from "./changeProfile";
import Userfront from "@userfront/core";
import { Link } from "react-router-dom";
import axios from "axios";
import PPEOffers from "./cards/ppe_offers";
import PPERequests from "./cards/ppe_requests";
const POST_URL = process.env.REACT_APP_POST_URL;

Userfront.init("8nwrppdb");

export const Profile = () => {
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);
  const userData = JSON.parse(JSON.stringify(Userfront.user, null, 2));
  const [showChange, setChange] = useState(false);
  const [userName, setUserName] = useState(userData.name);
  const [userOrg, setUserOrg] = useState(userData.data.accountOrganization);
  const [email] = useState(userData.email);
  let profileChangeString;
  if (!showChange) {
    profileChangeString = "Need to edit your profile?";
  } else {
    profileChangeString = "Close changes.";
  }

  useEffect(() => {
    // console.log(userData)
    axios
      .get(POST_URL + `/offers/user/${userData.username}`)
      .then((response) => {
        console.log(response.data);
        setOffers(response.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
    axios
      .get(POST_URL + `/requests/user/${userData.username}`)
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  return (
    <div className="w-full flex">
      <div className="fixed w-1/2 h-screen bg-gradient-to-tr from-blue-800 to-purple-700 flex items-center justify-center">
        <div className="w-2/3">
          <div className="shadow-4xl bg-white font-semibold text-center rounded-3xl border shadow-lg p-8 pt-16 relative">
            <div className="flex justify-center">
              <div className="shadow-lg rounded-full bg-gradient-to-tr from-[#FFDB10] to-[#FF8510] mx-auto absolute -top-20 w-32 h-32 border-4 border-white flex items-center justify-center">
                <h1 className="-mt-2 text-6xl text-white">
                  {userName.charAt(0)}
                </h1>
              </div>
            </div>
            <h1 className="text-2xl text-gray-700">
              Welcome back, {userName}.
            </h1>
            <h3 className="text-lg text-gray-500 ">{userOrg}</h3>
            <button className="py-2 px-4 rounded-full bg-purple-700 hover:bg-purple-500 text-md text-white m-2" onClick={Userfront.logout}>Logout</button>
            <p
              className="text-sm text-gray-400 mt-2 hover:text-blue-500 cursor-pointer"
              onClick={() => setChange(!showChange)}
            >
              {profileChangeString}
            </p>
            {showChange && (
              <ChangeProfile
                name={userName}
                setName={setUserName}
                org={userOrg}
                setOrg={setUserOrg}
                email={email}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2"></div>
      <div className="w-1/2">
        <div class="flex flex-col bg-white m-auto p-auto">
          <h1 class="text-4xl text-gray-700 p-10 pb-0 font-bold ml-2">
            PPE Requests
          </h1>
          <PPEOffers offers={offers}/>
        </div>
        <div class="flex flex-col bg-white m-auto p-auto">
          <h1 class="text-4xl text-gray-700 px-10 font-bold ml-2">
            PPE Offers
          </h1>
        </div>
        <PPERequests requests={requests}/>
      </div>
    </div>
  );
};

export default Profile;
