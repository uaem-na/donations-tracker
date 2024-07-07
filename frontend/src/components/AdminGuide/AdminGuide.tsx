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
import { useCurrentPath } from "@hooks/useCurrentPath";
import { useRole } from "@hooks/useRole";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export type AdminGuideProps = {
  guideType: "users" | "posts" | "reports";
};

export const AdminGuide = ({ guideType }: AdminGuideProps) => {
  const role = useRole();
  const pathname = useCurrentPath();
  const { t } = useTranslation();
  const [showGuideTooltip, setShowGuideTooltip] = useState(false);

  if (!role || role.toLowerCase() !== "admin") {
    return null;
  }

  if (pathname.indexOf("admin") === -1) {
    return null;
  }

  const toggleShowGuideTooltip = () => {
    setShowGuideTooltip(!showGuideTooltip);
  };

  const guideTitle = t(`${guideType}.admin_guide_title`);
  const guideContentArray = t(`${guideType}.admin_guide_description`, {
    returnObjects: true,
  }) as Array<string>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Tooltip asChild message={t(`${guideType}.admin_guide`)}>
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="mx-2"
              onMouseEnter={toggleShowGuideTooltip}
              onMouseLeave={toggleShowGuideTooltip}
            />
          </Tooltip>
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle className="ml-5 text-xl">{guideTitle}</DialogTitle>
        </DialogHeader>
        <div className="border border-gray-200 rounded-md p-5 mt-1">
          {guideContentArray.map((desc, idx) => {
            if (
              desc.match("As admins, you must:") ||
              desc.match("En tant qu'administrateurs, vous devez :")
            ) {
              return (
                <p
                  key={idx}
                  className=" text-base font-medium leading-5 pb-2 pt-3 text-gray-900"
                >
                  {desc}
                </p>
              );
            }
            return (
              <p key={idx} className="text-sm leading-5 pb-4 text-gray-700">
                {desc}
              </p>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
