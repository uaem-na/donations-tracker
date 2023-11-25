import { Tooltip } from "@components/Controls";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/Dialog";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classMerge } from "@utils/ClassMerge";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as data from "../../../public/locales/en/common.json";

export type GuideProps = {
  className?: string;
  guideType: "users" | "posts" | "reports";
};

export const Guide = ({ className, guideType }: GuideProps) => {
  const { t } = useTranslation();
  const [showGuideTooltip, setShowGuideTooltip] = useState(false);

  const toggleShowGuideTooltip = () => {
    setShowGuideTooltip(!showGuideTooltip);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={classMerge("absolute mt-3 ml-16 items-center", className)}
        >
          <span>
            <Tooltip asChild message={t(`${guideType}.admin_guide`)}>
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="mx-2"
                onMouseEnter={toggleShowGuideTooltip}
                onMouseLeave={toggleShowGuideTooltip}
              />
            </Tooltip>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle className="ml-5 text-xl">
            {t(`${guideType}.admin_guide_title`)}
          </DialogTitle>
        </DialogHeader>
        <div className="border border-gray-200 rounded-md p-5 mt-1">
          {data[guideType].admin_guide_description.map((desc, idx) => {
            if (
              desc.match("As admins, you must:") ||
              desc.match("En tant qu'administrateurs, vous devez :")
            )
              return (
                <p
                  key={idx}
                  className=" text-base font-medium leading-5 pb-2 pt-3 text-gray-900"
                >
                  {desc}
                </p>
              );
            return (
              <p key={idx} className="text-sm leading-5 pb-4 text-gray-700">
                {t(desc)}
              </p>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
