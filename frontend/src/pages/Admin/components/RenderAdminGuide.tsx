import { AdminGuide, AdminGuideProps } from "@components/AdminGuide";
import { useCurrentPath } from "@hooks/useCurrentPath";
import { useRole } from "@hooks/useRole";

export const RenderAdminGuide = ({
  guideType,
}: {
  guideType: AdminGuideProps;
}) => {
  const role = useRole();
  const pathname = useCurrentPath();

  if (pathname.indexOf("admin") > -1 && role === "admin") {
    return <AdminGuide guideType={guideType.guideType} />;
  } else {
    return null;
  }
};
