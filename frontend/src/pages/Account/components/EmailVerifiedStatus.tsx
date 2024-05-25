import { Alert } from "@components/Alert";
import { useGetSessionQuery } from "@store/services/api";
import { ResendEmailVerificationButton } from "./ResendEmailVerificationButton";

export const EmailVerifiedStatus = () => {
  const { data: session } = useGetSessionQuery();

  if (!session) {
    return null;
  }

  if (session.isEmailVerified) {
    return (
      <div>
        <Alert type="success" className="flex items-center">
          Your email address is verified.
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <Alert type="warn" className="flex items-center">
        Please verify your email address.
        <ResendEmailVerificationButton />
      </Alert>
    </div>
  );
};
