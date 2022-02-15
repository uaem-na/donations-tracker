import { useState, useEffect } from "react";
import { ChangeProfile } from "./changeProfile";

export const Profile = () => {
    const [showChange, setChange] = useState(false)
    const [userFirstName, setUserFirstName] = useState("John")
    const [userLastName, setUserLastName] = useState("Doe")
    const [userOrg, setUserOrg] = useState("McGill University")
    const [email] = useState("hello@uaem.mcgill.ca")
    let profileChangeString
    if(!showChange){
        profileChangeString = "Need to edit your profile?"
    } else {
        profileChangeString = "Close changes."
    }

    return(
        <div className="w-full">
            <div className="w-1/2 h-screen bg-gradient-to-tr from-blue-800 to-purple-700 flex items-center justify-center">
                <div className="w-2/3">
                    <div className="shadow-4xl bg-white font-semibold text-center rounded-3xl border shadow-lg p-8 pt-16 relative">
                        <div className="flex justify-center">
                            <div className="shadow-lg rounded-full bg-gradient-to-tr from-[#FFDB10] to-[#FF8510] mx-auto absolute -top-20 w-32 h-32 border-4 border-white flex items-center justify-center">
                            <h1 className="-mt-2 text-6xl text-white">{userFirstName.charAt(0)}{userLastName.charAt(0)}</h1>
                            </div>
                        </div>
                        <h1 className="text-2xl text-gray-700">Welcome back, {userFirstName} {userLastName}.</h1>
                        <h3 className="text-lg text-gray-500 ">{userOrg}</h3>
                        <p className="text-sm text-gray-400 my-4 hover:text-blue-500 cursor-pointer" onClick={() => setChange(!showChange)}>
                            {profileChangeString}
                        </p>
                        {showChange && <ChangeProfile firstName={userFirstName} setFirst={setUserFirstName} lastName={userLastName} setLast={setUserLastName} org={userOrg} setOrg={setUserOrg} email={email}/>}
                    </div>
                </div>
            </div>
            <div className="w-1/2">

            </div>
        </div>
    )
}

export default Profile