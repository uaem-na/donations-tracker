import { Button } from "@components/Controls";
import { useToast } from "@components/Toast";
import {
  useGetSessionQuery,
  useResendEmailVerificationMutation,
} from "@store/services/api";
import { classMerge } from "@utils";
import { getErrorMessage } from "@utils/GetErrorMessage";
import { useEffect } from "react";

type ResendEmailVerificationButtonProps = {
  className?: string;
};

export const ResendEmailVerificationButton = ({
  className,
}: ResendEmailVerificationButtonProps) => {
  const toast = useToast();
  const { data: session } = useGetSessionQuery();
  const [resendEmailVerificationApi, { isLoading, isSuccess, error, data }] =
    useResendEmailVerificationMutation();

  // * handle success event
  useEffect(() => {
    if (isSuccess) {
      const message =
        data?.message ?? "Email verification link sent to your email.";

      toast.open({
        type: "success",
        duration: 5,
        content: message,
      });
    }
  }, [isSuccess]);

  // * handle error message
  useEffect(() => {
    if (error) {
      const message = getErrorMessage(error);
      toast.open({
        type: "error",
        duration: 5,
        content: message,
      });
    }
  }, [error]);

  if (session?.isEmailVerified) {
    return null;
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    resendEmailVerificationApi();
  };

  return (
    <Button
      intent={"secondary"}
      disabled={isLoading}
      className={classMerge("ml-auto", className)}
      onClick={handleClick}
    >
      Verify
    </Button>
  );
};
