import { Badge } from "@components/Badge";
import { StatusIndicator } from "@components/StatusIndicator/StatusIndicator";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostApiResponse, useGetPostsQuery } from "@services/posts";
import { capitalizeFirstLetter } from "@utils";
import formatDistance from "date-fns/formatDistance";
import { useCallback } from "react";

interface IPostsProp {
  handlePostClick: (post: PostApiResponse) => void;
}

export const Posts = ({ handlePostClick }: IPostsProp) => {
  const { data: posts, isLoading } = useGetPostsQuery();

  const renderStatusIndicator = useCallback((status) => {
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
  }, []);

  return (
    <ul className="divide-y divide-gray-200">
      {posts?.map((post) => {
        return (
          <li
            key={post.id}
            className="relative flex items-center space-x-4 py-4 cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-500">
                  <div className="flex gap-x-2">
                    <span className="truncate">{post.title}</span>
                  </div>
                </h2>
              </div>
              <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                <div className="truncate">
                  <div className="flex justify-center items-center">
                    {renderStatusIndicator(post.status)}
                    <span className="ml-1">
                      {capitalizeFirstLetter(post.status)}
                    </span>
                  </div>
                </div>
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
  );
};
