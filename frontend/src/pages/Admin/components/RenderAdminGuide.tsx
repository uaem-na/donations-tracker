import { Guide, GuideProps } from "@components/Users/Guide";
import { useCurrentPath } from "@hooks/useCurrentPath";
import { useRole } from "@hooks/useRole";

export const RenderAdminGuide = ({ guideType }: { guideType: GuideProps }) => {
  const role = useRole();
  const pathname = useCurrentPath();

  if (pathname.indexOf("admin") > -1 && role === "admin") {
    return <Guide guideType={guideType.guideType} />;
  } else {
    return null;
  }
};
