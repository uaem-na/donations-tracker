import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AccountLayout } from "@pages/Account/components/AccountLayout";
import { Post, useGetPostsQuery } from "@services/posts";

/*
 * Work in progress, temporary design for dashboard. Selecting on an item will bring user to another page? or dialog popup?
 * Or replace list with some sort of datatable?
 *
 * Refactor out tabs to components make it reusable.
 * */
export const DashboardPage = () => {
  const { data: posts, isLoading } = useGetPostsQuery();

  return (
    <AccountLayout>
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option selected>Requests</option>
            <option>Offers</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            <a
              href="#"
              className="bg-purple-100 text-purple-800 rounded-md px-3 py-2 text-sm font-medium"
            >
              Requests
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md px-3 py-2 text-sm font-medium"
            >
              Offers
            </a>
          </nav>
        </div>
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-2"
      >
        {posts
          ?.filter((post: Post) => post.type === "request")
          .map((post: Post) => {
            return (
              <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <a href="#">
                        <span className="absolute inset-x-0 -top-px bottom-0"></span>
                        {post.title}
                      </a>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                      <span className="relative truncate hover:underline"></span>
                      {post.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {post.status}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {/*Created <time dateTime="2023-01-23T13:23Z">3h ago</time>*/}
                      Created {post.createdAt}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    icon={faChevronRight}
                  />
                </div>
              </li>
            );
          })}
      </ul>
    </AccountLayout>
  );
};
