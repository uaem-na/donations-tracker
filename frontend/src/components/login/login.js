import IndividualLogin from "./indv";
import OrganizationLogin from "./org";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import Registration from "../signup/reg";
import IndividualRegistration from "../signup/indv_reg";
import OrganizationRegistration from "../signup/org_reg";

export const Login = () => {
    const [userType, setUserType] = useState(true)
    // true is indv, false is org
    const [isReg, setIsReg] = useState(false)
    // true for sign in, false for reg
    let action
    if (!isReg){
        action = "Login"
    } else {
        action = "Sign up"
    }
    let userTypeType
    let userTypeMessage
    let bg
    let butText
    if (userType){
        userTypeType = "user"
        userTypeMessage = `${action} to access your PPE dashboard and submit and edit PPE reports.`
        bg = "from-blue-800 to-purple-700"
        butText = "text-indigo-800"
    } else {
        userTypeType = "organization"
        userTypeMessage = `${action} to manage your organization.`
        bg = "from-orange-800 to-orange-600"
        butText = "text-orange-800"
    }
    return (
    <div div className="h-screen flex">
      <div className={`flex w-1/2 bg-gradient-to-tr ${bg} i justify-around items-center`} >
        <div className="w-3/4 justify-items-start">
            <div className="my-4">
            <h1 className="text-white font-bold text-4xl my-4">{action} as a {userTypeType}</h1>
            <p className="text-white mt-1">{userTypeMessage}</p>
            </div>
            <button
                onClick={() => setUserType(!userType)}
                className={`block bg-white ${butText} p-8 mt-4 py-2 rounded-2xl font-bold mb-2`}
            >
                Sign in as an {userTypeType}
            </button>
        </div>
      </div>
      <div className="flex w-1/2 justify-center items-center bg-white">
          {!isReg && userType && <IndividualLogin handleReg={setIsReg}/>}
          {!isReg && !userType && <OrganizationLogin handleReg={setIsReg}/>}
          {isReg && userType && <IndividualRegistration handleReg={setIsReg}/>}
          {isReg && !userType && <OrganizationRegistration handleReg={setIsReg}/>}
      </div>
    </div>
  );
};

export default Login;
