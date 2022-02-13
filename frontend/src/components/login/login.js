import IndividualLogin from "./indv";
import OrganizationLogin from "./org";
import { useState, useEffect } from "react";
import IndividualRegistration from "./signup/indv_reg";
import OrganizationRegistration from "./signup/org_reg";

export const Login = () => {
    const [userType, setUserType] = useState(true)
    // true is indv, false is org
    const [isReg, setIsReg] = useState(false)
    // true for sign in, false for reg

    // logic to change text based on state
    let action
    if (!isReg){
        action = "Login"
    } else {
        action = "Sign up"
    }
    let userTypeType
    let userOpposite
    let userTypeMessage
    let bg
    let butText
    //if set to individual
    if (userType){
        userTypeType = "individual"
        userOpposite = "organization"
        userTypeMessage = `${action} to access your PPE dashboard and submit and edit PPE reports.`
        bg = "from-blue-800 to-purple-700"
        butText = "text-indigo-800"
    // if set to organization
    } else {
        userTypeType = "organization"
        userOpposite = "individual"
        userTypeMessage = `${action} to manage your organization.`
        bg = "from-orange-600 to-orange-400"
        butText = "text-orange-800"
    }
    return (
    <div div className="h-screen flex">
      <div className={`flex w-3/5 bg-gradient-to-tr ${bg} i justify-around items-center`} >
        <div className="w-3/4 justify-items-start">
            <div className="my-4">
            <h1 className="text-white font-bold text-4xl my-4">{action} as a {userTypeType}</h1>
            <p className="text-white mt-1">{userTypeMessage}</p>
            </div>
            <button
                onClick={() => setUserType(!userType)}
                className={`block bg-white ${butText} p-8 mt-4 py-2 rounded-2xl font-bold mb-2`}
            >
                {action} as an {userOpposite}
            </button>
        </div>
      </div>
      <div className="flex w-2/5 justify-center items-center bg-white">
          {!isReg && userType && <IndividualLogin handleReg={setIsReg}/>}
          {!isReg && !userType && <OrganizationLogin handleReg={setIsReg}/>}
          {isReg && userType && <IndividualRegistration handleReg={setIsReg}/>}
          {isReg && !userType && <OrganizationRegistration handleReg={setIsReg}/>}
      </div>
    </div>
  );
};

export default Login;
