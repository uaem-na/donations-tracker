import { Guide, GuideProps } from "@components/Users/Guide";
import { useRole } from "@hooks/useRole";
export const RenderAdminGuide = ({
  role,
  guideType,
}: {
  role?: string;
  guideType: GuideProps;
}) => {
  if (role === undefined) return;

  if (role === "fulfilled") {
    return <Guide guideType={guideType.guideType} />;
  }
};
