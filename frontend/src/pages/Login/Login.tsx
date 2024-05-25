import { Link } from "@components/Controls";
import { LoginForm } from "./components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="text-sm leading-6 text-gray-500">
              Not a member? <Link to="/register">Click here to register</Link>
            </p>
            <LoginForm />
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
