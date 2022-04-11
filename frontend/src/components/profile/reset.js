import { useState, useEffect, cloneElement } from "react";
import { ChangeProfile } from "./changeProfile";
import Userfront from "@userfront/core";
import axios from "axios";
import PPEOffers from "./cards/ppe_offers";
import PPERequests from "./cards/ppe_requests";
const POST_URL = process.env.REACT_APP_POST_URL;

Userfront.init("8nwrppdb");

export const Reset = () => {
    const [offers, setOffers] = useState([]);
    const [requests, setRequests] = useState([]);
    const userData = JSON.parse(JSON.stringify(Userfront.user, null, 2));
    const [showChange, setChange] = useState(false);
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState(userData.name);
    const [userOrg, setUserOrg] = useState(userData.data.accountOrganization);
    const [email] = useState(userData.email);
    const handleSubmit = (event) => {
        event.preventDefault();
        Userfront.resetPassword({
          password: password,
        }).then((res) => {console.log(res + " reset link has been sent.")})
        .catch((error) => {
            console.log(error.message);
        });
        
    };

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
        <div className="w-full">
            <div className="flex items-center justify-center pt-28">
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
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                        <label htmlFor="default" className="text-gray-500 select-none font-medium ">Password</label>
                        <input
                            className="pl-2 outline-none border-none"
                            type="password"
                            name=""
                            id=""
                            onChange={(e) => setPassword(e.target.value)}
                            defaultValue={''}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                    >
                        Change password
                    </button>
                </div>
            </div>
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
        </div>
    );
};

export default Reset;
