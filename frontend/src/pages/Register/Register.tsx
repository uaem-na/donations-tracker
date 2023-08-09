import Link from "@components/Controls/Link/Link";
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetSessionQuery } from "@services/api";
import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { data: currentSession } = useGetSessionQuery();

  // redirect to account page if session exists
  useEffect(() => {
    if (currentSession) {
      navigate("/account/dashboard");
    }
  }, [currentSession, navigate]);

  const renderAccountTypeSelection = ({ name, icon, iconText, to, color }) => {
    return (
      <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-purple-700 hover:bg-gray-50">
        <div
          className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg ${color}`}
        >
          <FontAwesomeIcon icon={icon} className="h-6 w-6 text-white" />
          <span className="sr-only">{iconText}</span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-900">
            <RouterLink to={to} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true"></span>
              <span>{name}</span>
              <span aria-hidden="true"> &rarr;</span>
            </RouterLink>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col min-h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url('login_img.png')` }}
    >
      <div className="my-auto sm:mx-auto sm:w-full sm:max-w-[650px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-md sm:px-12">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            Register for an account
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose the type of account you want to register as:
          </p>
          <ul
            role="list"
            className="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2"
          >
            <li className="flow-root">
              {renderAccountTypeSelection({
                name: "Individual",
                icon: faUser,
                iconText: "User icon",
                to: "/register/individual-account",
                color: "bg-purple-800",
              })}
            </li>
            <li className="flow-root">
              {renderAccountTypeSelection({
                name: "Organization",
                icon: faBuilding,
                iconText: "Building icon",
                to: "/register/organization-account",
                color: "bg-lime-500",
              })}
            </li>
          </ul>
          <div className="mt-4 flex">
            <span className="text-sm">
              What is the difference between an individual vs organization user?
              Please see our{" "}
              <Link to="/faq" className="text-purple-800 hover:text-purple-600">
                FAQ
              </Link>{" "}
              page.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
