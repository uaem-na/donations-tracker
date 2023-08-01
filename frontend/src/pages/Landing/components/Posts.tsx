import { Badge } from "@components/Badge";
import { Tooltip } from "@components/Controls";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/Drawer";
import { StatusIndicator } from "@components/StatusIndicator/StatusIndicator";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostDrawerDetail } from "@pages/Landing/components/PostDrawerDetail";
import { PostApiResponse, useGetPostsQuery } from "@services/posts";
import { capitalizeFirstLetter } from "@utils";
import formatDistance from "date-fns/formatDistance";
import { useCallback } from "react";

interface IPostsProp {
  handleLocateClick: (post: PostApiResponse) => void;
}

export const Posts = ({ handleLocateClick }: IPostsProp) => {
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
          <li key={post.id} className="relative flex flex-col">
            <div className="flex items-center space-x-4 py-4">
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
            </div>
            <div className="flex justify-end gap-x-2 mb-1">
              <Drawer>
                <DrawerTrigger asChild>
                  <button
                    type="button"
                    className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                  >
                    Details
                  </button>
                </DrawerTrigger>
                <DrawerContent size="medium">
                  <DrawerHeader>
                    <DrawerTitle>{post.title}</DrawerTitle>
                    <DrawerDescription>
                      <PostDrawerDetail post={post} />
                    </DrawerDescription>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>

              <Tooltip message="Locate" asChild>
                <button
                  type="button"
                  className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleLocateClick(post)}
                >
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span className="sr-only">Locate</span>
                </button>
              </Tooltip>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
