import IndividualLogin from "./indv_log";
import { useState, useEffect } from "react";
import IndividualRegistration from "./signup/indv_reg";

export const Login = ({login}) => {
    const [isReg, setIsReg] = useState(!login)
    // true for sign in, false for reg

    // logic to change text based on state
    let action
    if (!isReg){
        action = "Login"
    } else {
        action = "Sign up"
    }
    let userTypeMessage
    let bg
    let butText
    //if set to individual
    userTypeMessage = `${action} to access your PPE dashboard and submit and edit PPE reports.`
    bg = "from-blue-800 to-purple-700"
    butText = "text-indigo-800"
    // if set to organization
    return (
    <div div className="h-screen flex">
      <div className={`flex w-3/5 bg-gradient-to-tr ${bg} i justify-around items-center`} >
        <div className="w-3/4 justify-items-start">
            <div className="my-4">
            <h1 className="text-white font-bold text-4xl my-4">{action}</h1>
            <p className="text-white mt-1">{userTypeMessage}</p>
            </div>
        </div>
      </div>
      <div className="flex w-2/5 justify-center items-center bg-white">
          {!isReg && <IndividualLogin handleReg={setIsReg}/>}
          {isReg && <IndividualRegistration handleReg={setIsReg}/>}
      </div>
    </div>
  );
};

export default Login;
