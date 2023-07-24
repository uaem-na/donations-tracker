import { RegisterForm } from "@features/auth";
import background from "../../public/login_img.png";

export const RegisterPage = () => {
  return (
    <div
      className="flex flex-col min-h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="my-auto sm:mx-auto sm:w-full sm:max-w-[650px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-md sm:px-12">
          <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <h1 className="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
              Register for an account
            </h1>
            <div className="mt-10">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
