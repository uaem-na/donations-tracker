import Userfront from "@userfront/core";
import { useNavigate } from "react-router-dom";
// import Userfront from "@userfront/react";

Userfront.init("8nwrppdb");

// const PasswordResetForm = Userfront.build({
//   toolId: "mraonn"
// })

export const ChangeProfile = ({ name, setName, org, setOrg, email, handleSubmit }) => {
  const navigate = useNavigate();
  const sendResetLink = async () => {
    const res = await Userfront.sendResetLink(email)
    //use hardcoded substring for now, will change to email reset link later when hosted.
    navigate(res.result.url.substring(21))
    // Userfront.resetPassword({
    //   password: '65659898',
    // }).then((res) => {console.log(res + " reset link has been sent.")});
  }
  return (
    <form className="text-left text-sm" onSubmit={handleSubmit}>
      <div className="p-2">
        <p className="text-gray-500 select-none font-medium">User information:</p>
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
        <label htmlFor="default" className="text-gray-500 select-none font-medium ">Name</label>
        <input
          className="pl-2 outline-none border-none"
          type="text"
          name=""
          id=""
          onChange={(e) => setName(e.target.value)}
          defaultValue={`${name}`}
        />
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <label htmlFor="default" className="text-gray-500 select-none font-medium ">Organization</label>
        <input
          className="pl-2 outline-none border-none"
          type="text"
          name=""
          id=""
          onChange={(e) => setOrg(e.target.value)}
          defaultValue={`${org}`}
        />
      </div>
      <div className="p-2">
        <p className="text-gray-400 select-none font-medium text-sm">Please contact an admin to change your email.</p>
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
        <input
          className="text-gray-500 pl-2 outline-none border-none"
          type="email"
          name=""
          id=""
          value={`${email}`}
          disabled />
      </div>
      <div className="p-2">
        <p className="text-gray-500 select-none font-medium">Set a new password:</p>
      </div>
      <button
        onClick={sendResetLink}
        type='button'
        className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
      >
        Send password reset link
      </button>
      <button
        type="submit"
        className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
      >
        Save Changes
      </button>
    </form>
  )
}

export default ChangeProfile