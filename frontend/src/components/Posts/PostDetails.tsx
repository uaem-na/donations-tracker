import { Badge } from "@components/Badge";
import { PostType } from "@constants";
import { useGetPostQuery, useGetSessionQuery } from "@services/api";
import { capitalizeFirstLetter } from "@utils";
import { getStatusIndicator } from "@utils/GetStatusIndicator";
import { format } from "date-fns";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

type Type = (typeof PostType)[keyof typeof PostType];

interface PostDetailsProps {
  id: string;
  onError: (err) => void;
}

/*TODO: add email if current user is logged in*/
export const PostDetails = ({ id, onError }: PostDetailsProps) => {
  const { t } = useTranslation();
  const { data: currentSession } = useGetSessionQuery();

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
    return <p>{t("loading")}</p>;
  }

  if (!post) {
    return <p>{t("errors.unknown_server_error")}</p>;
  }

  // display post and its properties and add labels for each property
  return (
    <div className="container mx-auto px-4 py-8 sm:px-8 sm:pb-14  ">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          <Badge
            color={post.type === "offer" ? "purple" : "blue"}
            text={capitalizeFirstLetter(post.type)}
          />
          <span className="ml-2">{post.item.name}</span>{" "}
        </h2>
        <div className="flex items-center gap-2">
          {getStatusIndicator(post.status)}
          <span className="text-sm">{capitalizeFirstLetter(post.status)}</span>
        </div>
      </div>
      <div className="mt-1 text-xs leading-6 text-gray-500">
        <time dateTime={post.createdAt}>
          {t("posts.created_on", {
            date: format(new Date(post.createdAt), "PPPP"),
          })}
        </time>
      </div>
      <div className="mt-4 pr-4 py-4">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          {t("posts.contact_information")}
        </h2>
        <dl className="mt-6 text-sm leading-6">
          <div>
            <dt className="inline text-gray-500 mr-3">{t("posts.author")}</dt>
            <dd className="inline text-gray-700">
              {post.author.firstName} {post.author.lastName}
            </dd>
          </div>
          {currentSession && (
            <div>
              <dt className="inline text-gray-500 mr-3">{t("email")}</dt>
              <dd className="inline text-gray-700">
                <a href={`mailto:${post.author.email}`}>{post.author.email}</a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-4 pr-4 py-4">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          {t("posts.item_details")}
        </h2>
        <dl className="mt-6 text-sm leading-6">
          <div>
            <dt className="inline text-gray-500 mr-3">{t("posts.name")}</dt>
            <dd className="inline text-gray-700">{post.item.name}</dd>
          </div>
          <div>
            <dt className="inline text-gray-500 mr-3">{t("posts.category")}</dt>
            <dd className="inline truncate text-gray-700">
              <Badge color="gray" text={post.item.category} />{" "}
            </dd>
          </div>
          <div>
            <dt className="inline text-gray-500 mr-3">{t("posts.quantity")}</dt>
            <dd className="inline text-gray-700">{post.item.quantity}</dd>
          </div>
          <div>
            <dt className="inline text-gray-500 mr-3">{t("posts.price")}</dt>
            <dd className="inline text-gray-700">
              {new Intl.NumberFormat("en-CA", {
                style: "currency",
                currency: "CAD",
              }).format(post.item.price)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Button groups for edit or deleting if the current user matches the author id */}
      <div>
        <div className="mt-4 flex justify-start gap-2.5">
          {currentSession && currentSession.id === post.author.id && (
            <>
              <NavLink
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                to={`/posts/${post.id}/edit`}
              >
                {t("edit")}
              </NavLink>
              <NavLink
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                to={`delete`}
              >
                {t("delete")}
              </NavLink>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-16">
        <span className="text-xs">
          <time dateTime={post.updatedAt}>
            {t("posts.last_modified_on", {
              date: format(new Date(post.updatedAt), "PPPP"),
            })}
          </time>
        </span>
      </div>
    </div>
  );
};
