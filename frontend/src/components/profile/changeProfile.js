export const ChangeProfile = ({firstName, setFirst, lastName, setLast, org, setOrg, email}) => {
    return (
    <form className="text-left">
        <div className="p-2">
          <p className="text-gray-500 select-none font-medium">User information:</p>
          </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
      <label htmlFor="default" className="text-gray-500 select-none font-medium ">First Name</label>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name=""
              id=""
              onChange={(e) => setFirst(e.target.value)}
              defaultValue={`${firstName}`}
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <label htmlFor="default" className="text-gray-500 select-none font-medium ">Last Name</label>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name=""
              id=""
              onChange={(e) => setLast(e.target.value)}
              defaultValue={`${lastName}`}
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
             disabled/>
          </div>
          <div className="p-2">
          <p className="text-gray-500 select-none font-medium">Set a new password:</p>
          </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none"
            type="password"
            name=""
            id=""
            placeholder="Password"
          />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none"
            type="password"
            name=""
            id=""
            placeholder="Repeat Password"
          />
        </div>
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