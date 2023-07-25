import { PostType } from "@constants";
import { useGetPostsQuery } from "@services/posts";
import { capitalizeFirstLetter } from "@utils";

type Type = (typeof PostType)[keyof typeof PostType];

interface PostTableProps {
  type: Type;
}

// TODO: add pagination, sorting, filtering
export const PostTable = ({ type }: PostTableProps) => {
  const { data: posts, isLoading } = useGetPostsQuery();
  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {capitalizeFirstLetter(type)}
          </h1>
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase bg-gray-50"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase bg-gray-50"
                  >
                    Items
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase bg-gray-50"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase bg-gray-50"
                  >
                    Created At
                  </th>
                  <th scope="col" className="bg-gray-50 w-[120px]">
                    <span className="sr-only">Edit/Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts?.map((post) => {
                  return (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {post.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          TODO: list of items summary
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {post.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {post.createdAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit (for author/admin)
                        </a>
                        <a
                          href="#"
                          className="ml-4 text-red-600 hover:text-red-900"
                        >
                          Delete (for author/admin)
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
