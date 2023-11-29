import { Guide, GuideProps } from "@components/Users/Guide";
import { useRole } from "@hooks/useRole";
export const RenderAdminGuide = ({
  // role,
  guideType,
}: {
  // role?: string;
  guideType: GuideProps;
}) => {
  const role = useRole();
  // if (role === undefined) return;

  if (role === "admin") {
    return <Guide guideType={guideType.guideType} />;
  }
};
