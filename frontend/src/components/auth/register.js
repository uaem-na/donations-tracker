import Userfront from "@userfront/core";
import { useState } from "react";
import { Link } from "react-router-dom";

Userfront.init("8nwrppdb");

export const Register = ({ handleReg }) => {
  const [email, setEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [org, setOrg] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const handleName = (e) => {
    setAccountName(e.target.value);
  };

  const handleOrg = (e) => {
    setOrg(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordVerify = (e) => {
    setPasswordVerify(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handle the form submission by calling Userfront.signup()
  const handleSubmit = (event) => {
    console.log("submitting");
    event.preventDefault();
    var success = true;
    // Call Userfront.signup()
    Userfront.signup({
      method: "password",
      name: accountName,
      email: email,
      password: password,
      data: {
        accountOrganization: org,
      },
    }).catch((error) => {
      success = false;
      console.log(error.message);
    });
    console.log("submitted");
    if (success) {
      console.log("good, redirect");
    }
  };

  return (
    <div className="min-h-full flex flex-grow items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="shadow sm:rounded-md p-8 max-w-md w-full space-y-8">
        <div>
          <h1 className="text-5xl font-bold block text-center">UAEM</h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <label className="ml-1 text-gray-700 font-bold text-sm" htmlFor="email-address">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={accountName}
                onChange={handleName}
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label className="ml-1 text-gray-700 font-bold text-sm" htmlFor="email-address">
                Organization
              </label>
              <input
                id="org"
                name="org"
                type="text"
                value={org}
                onChange={handleOrg}
                autoComplete="org"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label className="ml-1 text-gray-700 font-bold text-sm" htmlFor="email-address">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={handleEmail}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label className="ml-1 text-gray-700 font-bold text-sm" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePassword}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <label htmlFor="password" className="sr-only">
                Verify Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={passwordVerify}
                onChange={handlePasswordVerify}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Verify Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
