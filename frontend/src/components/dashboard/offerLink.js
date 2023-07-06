import formatDistance from "date-fns/formatDistance";
import { Link } from "react-router-dom";

export const OfferLink = ({ id, postalCode, ppeProfiles, createdAt }) => {
  return (
    <Link className="cursor" to={`/offer/${id}`}>
      <div className="inline-block px-3 font-semibold">
        <div className="p-6 w-64 h-80 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl text-gray-700 mb-2">
            {formatDistance(new Date(createdAt), new Date())} ago
          </h2>
          <h3 className="text-gray-700">Offered PPE:</h3>
          <div className="mb-2">
            <ul className="list-disc">
              {ppeProfiles.map((ppe) => (
                <li className="ml-4">{ppe.description}</li>
              ))}
            </ul>
          </div>
          <h3 className="text-gray-600">Postal:</h3>
          <p className="text-gray-600">{postalCode}</p>
          <h3 className="text-gray-400 text-sm">ID:</h3>
          <p className="text-gray-400 text-sm">{id}</p>
        </div>
      </div>
    </Link>
  );
};

export default OfferLink;
