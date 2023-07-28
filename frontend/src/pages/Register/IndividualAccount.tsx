import { IndividualRegistrationForm } from "@features/auth";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const IndividualAccount = () => {
  return (
    <div
      className="flex flex-col min-h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url('../login_img.png')` }}
    >
      <div className="my-auto sm:mx-auto sm:w-full sm:max-w-[650px]">
        <div className="bg-white px-6 pb-12 shadow sm:rounded-md sm:px-12">
          <Link
            to="/register"
            className="mt-6 bg-white text-gray-600 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 ring-1 ring-gray-300 cursor-pointer sm:ml-6"
          >
            <span className="sr-only">Back</span>
            <FontAwesomeIcon className="w-3 h-3" icon={faChevronLeft} />
          </Link>
          <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <h1 className="text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
              Registering as an individual user
            </h1>
            <div className="mt-10">
              <IndividualRegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
