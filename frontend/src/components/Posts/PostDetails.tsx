import { Badge } from "@components/Badge";
import { StatusIndicator } from "@components/StatusIndicator/StatusIndicator";
import { PostType } from "@constants";
import { useGetPostQuery } from "@store/services/posts";
import { capitalizeFirstLetter } from "@utils";
import { format } from "date-fns";
import { useEffect } from "react";

type Type = (typeof PostType)[keyof typeof PostType];

interface PostDetailsProps {
  id: string;
  type?: Type;
  onError: (err) => void;
}

/*TODO: add email if current user is logged in*/
export const PostDetails = ({ id, type, onError }: PostDetailsProps) => {
  const {
    data: post,
    isLoading,
    isError,
    error: postError,
  } = useGetPostQuery({ postId: id });

  useEffect(() => {
    if (isError) {
      onError(postError);
    }
  }, [isError]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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

  // display post and its properties and add labels for each property
  return (
    <>
      <div className="container mx-auto px-4 py-8 sm:px-8 sm:pb-14  ">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            <Badge
              color={post?.type === "offer" ? "purple" : "blue"}
              text={capitalizeFirstLetter(post?.type!)}
            />
            <span className="ml-2">{post?.title}</span>
          </h2>
          <div className="flex items-center gap-2">
            {renderStatusIndicator(post?.status)}
            <span className="text-sm">
              {capitalizeFirstLetter(post?.status!)}
            </span>
          </div>
        </div>
        <div className="mt-1 text-xs leading-6 text-gray-500">
          Created on{" "}
          <time dateTime={post?.createdAt}>
            {format(new Date(post?.createdAt!), "PPPP")}
          </time>
        </div>
        <div className="mt-4 pr-4 py-4">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            Contact information
          </h2>
          <dl className="mt-6 text-sm leading-6">
            <div>
              <dt className="inline text-gray-500 mr-3">Name</dt>
              <dd className="inline text-gray-700">
                {post?.author.firstName} {post?.author.lastName}
              </dd>
            </div>
          </dl>
        </div>

        <table className="mt-8 w-full text-left text-sm leading-6">
          <colgroup>
            <col className="w-full"></col>
            <col></col>
            <col></col>
          </colgroup>
          <thead className="border-b border-gray-200 text-gray-900">
            <tr>
              <th scope="col" className="px-0 py-3 font-semibold">
                Name
              </th>
              <th
                scope="col"
                className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {post?.items.map((i, index) => {
              return (
                <tr key={index} className="border-b border-gray-100">
                  <td className="max-w-0 px-0 py-5 align-top">
                    <div className="truncate font-medium text-gray-900">
                      <Badge color="gray" text={i.category} /> {i.name}
                    </div>
                    <div className="flex-wrap text-xs mt-2 text-gray-500">
                      {i.description}
                    </div>
                  </td>
                  <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                    {i.quantity}
                  </td>
                  <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                    {new Intl.NumberFormat("en-CA", {
                      style: "currency",
                      currency: "CAD",
                    }).format(i.price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-end mt-16">
          <span className="text-xs">
            Last modified on{" "}
            <time dateTime={post?.updatedAt}>
              {format(new Date(post?.updatedAt!), "PPPP")}
            </time>
          </span>
        </div>
      </div>
    </>
  );
};
