import { Badge } from "@components/Badge";
import { Button, Tooltip } from "@components/Controls";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@components/Drawer";
import { PostDetails } from "@components/Posts/PostDetails";
import { PostType } from "@constants";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostApiResponse } from "@services/api";
import { capitalizeFirstLetter } from "@utils";
import { getStatusIndicator } from "@utils/GetStatusIndicator";
import formatDistance from "date-fns/formatDistance";
import { useEffect, useState } from "react";

interface IPostsProp {
  posts: PostApiResponse[];
  handleLocateClick?: (post: PostApiResponse) => void;
}

export const Posts = ({ posts, handleLocateClick }: IPostsProp) => {
  const postsPerPage = 10;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedPosts, setPaginatedPosts] = useState<PostApiResponse[]>();

  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (posts) {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      setPaginatedPosts(posts.slice(indexOfFirstPost, indexOfLastPost));

      setTotalPages(Math.ceil(posts.length / postsPerPage));
    }
  }, [posts, currentPage]);

  // reset current page whenever there's change
  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);

  const handlePrev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {paginatedPosts?.length ? (
        <>
          <ul className="divide-y divide-gray-200">
            {paginatedPosts?.slice(0, 10)?.map((post) => {
              return (
                <li key={post.id} className="relative flex flex-col">
                  <div className="flex items-center space-x-4 py-4">
                    <div className="min-w-0 flex-auto">
                      <div className="flex items-center gap-x-3">
                        <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-500">
                          <div className="flex gap-x-2">
                            <span className="truncate">{post.item.name}</span>
                          </div>
                        </h2>
                      </div>
                      <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                        <div className="truncate">
                          <div className="flex justify-center items-center">
                            {getStatusIndicator(post.status)}
                            <span className="ml-1">
                              {capitalizeFirstLetter(post.status)}
                            </span>
                          </div>
                        </div>
                        &mdash;
                        <p className="whitespace-nowrap">
                          {formatDistance(new Date(post.createdAt), new Date())}{" "}
                          ago
                        </p>
                      </div>
                    </div>
                    <Badge
                      color={post.type === PostType.OFFER ? "purple" : "blue"}
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
                          <PostDetails id={post.id} onError={() => {}} />
                        </DrawerHeader>
                      </DrawerContent>
                    </Drawer>

                    {handleLocateClick && (
                      <Tooltip message="Locate" asChild>
                        <button
                          type="button"
                          className="rounded bg-red-500 px-2 py-1 text-xs text-gray-50 shadow-sm ring-1 ring-inset ring-red-600 hover:bg-red-600 cursor-pointer"
                          onClick={() => handleLocateClick(post)}
                        >
                          <FontAwesomeIcon icon={faLocationDot} />
                          <span className="sr-only">Locate</span>
                        </button>
                      </Tooltip>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white py-3  mt-2"
            aria-label="Pagination"
          >
            <div className="flex flex-1 justify-between sm:justify-end gap-1.5">
              {currentPage === 1 ? null : (
                <Button type="button" onClick={handlePrev} intent="secondary">
                  Previous
                </Button>
              )}
              {currentPage === totalPages ? null : (
                <Button type="button" onClick={handleNext} intent="secondary">
                  Next
                </Button>
              )}
            </div>
          </nav>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="mx-auto h-12 w-12 text-red-600"
          />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No offers or requests in view
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by navigating around the map!
          </p>
        </div>
      )}
    </>
  );
};
