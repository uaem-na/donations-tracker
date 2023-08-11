import { Alert } from "@components";
import { Badge } from "@components/Badge";
import { Button } from "@components/Controls";
import { PostType } from "@constants";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useDeletePostMutation,
  useGetPostQuery,
  useGetSessionQuery,
} from "@services/api";
import { capitalizeFirstLetter } from "@utils";
import { getStatusIndicator } from "@utils/GetStatusIndicator";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Type = (typeof PostType)[keyof typeof PostType];

interface PostDetailsProps {
  id: string;
  onError: (err) => void;
}

/*TODO: add email if current user is logged in*/
export const PostDetails = ({ id, onError }: PostDetailsProps) => {
  const { t } = useTranslation();
  const { data: currentSession } = useGetSessionQuery();
  const navigate = useNavigate();

  const [serverMessage, setServerMessage] = useState();

  const [deletePostApi, { isSuccess: isDeleteSuccess, error: deleteError }] =
    useDeletePostMutation();

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

  const onDelete = async () => {
    if (!post?.id) {
      onError({ status: 500, message: "Post ID must be available" });
      return;
    }
    deletePostApi({ id: post.id });
  };

  // handle successful requests
  useEffect(() => {
    if (isDeleteSuccess) {
      navigate(`/posts/list`);
    }
  }, [isDeleteSuccess]);

  // handle server error message
  useEffect(() => {
    if (deleteError) {
      handleServerErrors(deleteError);
    }
  }, [deleteError]);

  const handleServerErrors = (error) => {
    const err: any = "error" in error ? error.error : error.data;

    err.errors.length > 0
      ? setServerMessage(
          err.errors.join(",") ?? t("errors.unknown_server_error")
        )
      : setServerMessage(err.message ?? t("errors.unknown_server_error"));
  };

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  if (!post) {
    return <p>{t("errors.unknown_server_error")}</p>;
  }

  // display post and its properties and add labels for each property
  return (
    <div className="container mx-auto px-4 py-8 sm:px-8 sm:pb-14">
      <div className="mb-4">
        {serverMessage && <Alert type="error">{serverMessage}</Alert>}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          <Badge
            color={post.type === PostType.OFFER ? "purple" : "blue"}
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
        <div className="mt-4 flex justify-end gap-2.5">
          {currentSession && currentSession.id === post.author.id && (
            <>
              <Button
                type="button"
                intent="secondary"
                className="flex gap-1.5 justify-center items-center"
                onClick={() => navigate(`/posts/${post.id}/edit`)}
              >
                <FontAwesomeIcon icon={faEdit} />
                {t("edit")}
              </Button>

              <Button
                type="button"
                intent="danger"
                className="flex gap-1.5 justify-center items-center"
                onClick={onDelete}
              >
                <FontAwesomeIcon icon={faTrash} />
                {t("delete")}
              </Button>
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
