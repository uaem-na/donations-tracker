import { SignIn } from "@/components/sign-in";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="text-sm leading-6 text-gray-500">
              Not a member?{" "}
              <Link href={"/register"}>Click here to register</Link>
            </p>
            <SignIn />
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src="/login_img.png"
          alt="purple abstract login image"
          layout="fill"
        />
      </div>
    </div>
  );
}
