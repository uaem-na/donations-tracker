import { Badge } from "@components/Badge";
import { GoogleMapWrapper } from "@components/GoogleMapWrapper/GoogleMapWrapper";
import { StatusIndicator } from "@components/StatusIndicator/StatusIndicator";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetPostsQuery } from "@services/posts";
import { capitalizeFirstLetter } from "@utils";
import formatDistance from "date-fns/formatDistance";

export const LandingPage = () => {
  const { data: posts, isLoading } = useGetPostsQuery();

  // {
  //   "id": "64bda97cece96d9c2e6bdfe3",
  //   "title": "aliquam ex et",
  //   "type": "offer",
  //   "status": "open",
  //   "views": 0,
  //   "createdAt": "2023-07-23",
  //   "updatedAt": "2023-07-23",
  //   "author": {
  //   "id": "64bda97cece96d9c2e6bdfc0",
  //     "firstName": "Kenton",
  //     "lastName": "Strosin"
  // },
  //   "location": {
  //   "id": "64bda97cece96d9c2e6bdfe4",
  //     "lat": 40.7652,
  //     "lng": -64.2687,
  //     "postalCode": "E0S 2O2"
  // },
  //   "items": [
  //   {
  //     "id": "64bda97cece96d9c2e6bdfe5",
  //     "name": "Electronic Steel Tuna",
  //     "quantity": 1,
  //     "price": 15,
  //     "description": "The Football Is Good For Training And Recreational Purposes",
  //     "category": "Electronics"
  //   },
  //   {
  //     "id": "64bda97cece96d9c2e6bdfe6",
  //     "name": "Modern Cotton Car",
  //     "quantity": 2,
  //     "price": 77,
  //     "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
  //     "category": "Garden"
  //   }
  // ]
  // },
  const renderStatusIndicator = (status) => {
    switch (status) {
      case "open":
        return <StatusIndicator status="online" />;
      case "in-progress":
        return <StatusIndicator status="away" />;
      case "closed":
        return <StatusIndicator status="busy" />;
      default:
        return <StatusIndicator />;
    }
  };

  return (
    <div className="flex w-full h-full">
      <GoogleMapWrapper />
      <aside className="hidden w-[450px] overflow-y-auto border-r border-gray-200 px-4 py-4 xl:block">
        <ul className="divide-y divide-gray-200">
          {posts?.map((post) => {
            return (
              <li
                key={post.id}
                className="relative flex items-center space-x-4 py-4"
              >
                <div className="min-w-0 flex-auto">
                  <div className="flex items-center gap-x-3">
                    <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-500">
                      <a href="#" className="flex gap-x-2">
                        <span className="truncate">{post.title}</span>
                      </a>
                    </h2>
                  </div>
                  <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                    <p className="truncate">
                      <div className="flex justify-center items-center">
                        {renderStatusIndicator(post.status)}
                        <span className="ml-1">
                          {capitalizeFirstLetter(post.status)}
                        </span>
                      </div>
                    </p>
                    <svg
                      viewBox="0 0 2 2"
                      className="h-0.5 w-0.5 flex-none fill-gray-300"
                    >
                      <circle cx="1" cy="1" r="1" />
                    </svg>
                    <p className="whitespace-nowrap">
                      {formatDistance(new Date(post.createdAt), new Date())} ago
                    </p>
                  </div>
                </div>
                <Badge
                  color={post.type === "offer" ? "purple" : "blue"}
                  text={capitalizeFirstLetter(post.type)}
                />
                <FontAwesomeIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  icon={faChevronRight}
                />
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default LandingPage;
