import { Badge } from "@components/Badge";
import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useGetSessionQuery, useStarPostMutation } from "@services/api";
import { capitalizeFirstLetter } from "@utils";
import { getStatusIndicator } from "@utils/GetStatusIndicator";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface PostItemProps {
  id: string;
  title: string;
  status: string;
  displayName: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export const PostItem = ({
  id,
  title,
  status,
  displayName,
  category,
  price,
  quantity,
  createdAt,
  updatedAt,
  type,
}: PostItemProps) => {
  const { t } = useTranslation();
  const { data: currentSession } = useGetSessionQuery();
  const [starPostApi, { data: starResponse, isSuccess: isStarred }] =
    useStarPostMutation();
  const [starred, setStarred] = useState(false);

  useEffect(() => {
    if (currentSession) {
      currentSession.starred?.find((postId) => postId === id)
        ? setStarred(true)
        : setStarred(false);
    }
  }, [currentSession]);

  useEffect(() => {
    if (isStarred) {
      setStarred(starResponse ?? false);
    }
  }, [isStarred, starResponse]);

  const shouldDisplayCreatedAt = () => {
    return createdAt === updatedAt;
  };

  const handleTrackClick = () => {
    starPostApi({ id });
  };

  return (
    <li className="flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
      {currentSession && (
        <div className="relative flex-none flex items-center justify-center">
          <VisuallyHidden>{t("posts.star")}</VisuallyHidden>
          <span
            className="absolute inset-0 cursor-pointer -mx-4 -my-5 peer"
            onClick={handleTrackClick}
          ></span>
          <FontAwesomeIcon
            className={
              "h-5 w-5 flex-none " +
              (starred
                ? "text-yellow-400 peer-hover:text-yellow-500"
                : "text-gray-200 peer-hover:text-yellow-500")
            }
            icon={faStar}
          />
        </div>
      )}
      <div className="grow relative flex">
        <div className="grow flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <Link to={`/posts/${id}`}>
                <span className="absolute inset-0 -mx-4 -my-5"></span>
                <Badge
                  color={type === "offer" ? "purple" : "blue"}
                  text={t(`posts.${type}`)}
                  width="w-16"
                />
                <span className="mx-2">{`[${category}] ${title}`}</span>
              </Link>
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              CAD {price} • {quantity} {t("posts.available")}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              {displayName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <span className="flex items-center gap-2">
              {getStatusIndicator(status)}
              <span className="text-sm">{capitalizeFirstLetter(status)}</span>
            </span>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              {shouldDisplayCreatedAt()
                ? t("posts.created_at", { date: createdAt })
                : t("posts.updated_at", { date: updatedAt })}
            </p>
          </div>
          <FontAwesomeIcon
            className="h-5 w-5 flex-none text-gray-400"
            icon={faChevronRight}
          />
        </div>
      </div>
    </li>
  );
};
