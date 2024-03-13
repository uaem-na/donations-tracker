import { ForgotPasswordForm } from "./components/ForgotPasswordForm";

export const ForgotPasswordPage = () => {
  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset your password
            </h2>
            <p className="text-sm leading-6 text-gray-500">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
            <ForgotPasswordForm />
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
