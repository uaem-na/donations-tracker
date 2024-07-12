import formatDistance from "date-fns/formatDistance";
import { enCA, frCA } from "date-fns/locale";
import { useTranslation } from "react-i18next";

type TimeAgoProps = {
  date: Date;
};

export const TimeAgo = ({ date }: TimeAgoProps) => {
  const { i18n } = useTranslation();

  const distance = formatDistance(date, new Date(), {
    locale: i18n.language === "en" ? enCA : frCA,
  });

  if (i18n.language === "en") {
    return <>{distance} ago</>;
  }
  return <>il y a {distance}</>;
};
