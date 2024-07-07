import { PostStatus } from "@constants";
import { classMerge, getStatusIndicator } from "@utils";
import { useTranslation } from "react-i18next";

type TranslatedPostStatusProps = {
  status: string;
  className?: string;
};

export const TranslatedPostStatus = ({
  status,
  className,
}: TranslatedPostStatusProps) => {
  const { t } = useTranslation();
  let translated = "";
  switch (status) {
    case PostStatus.PENDING_APPROVAL:
      translated = t("posts.status.pending_approval");
      break;
    case PostStatus.REJECTED:
      translated = t("posts.status.rejected");
      break;
    case PostStatus.IN_PROGRESS:
      translated = t("posts.status.in_progress");
      break;
    case PostStatus.CLOSED:
      translated = t("posts.status.closed");
      break;
    default:
      translated = t("posts.status.open");
  }
  return (
    <>
      {getStatusIndicator(status)}
      <span className={classMerge("text-sm", className)}>{translated}</span>
    </>
  );
};
