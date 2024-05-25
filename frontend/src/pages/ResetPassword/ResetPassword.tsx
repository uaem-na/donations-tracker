import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { ResetPasswordForm } from "./components/ResetPasswordForm";

export const ResetPasswordPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!id || !token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset your password
            </h2>
            <ResetPasswordForm userId={id} token={token} />
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/login_img.png"
          alt="purple abstract"
        />
      </div>
    </div>
  );
};
