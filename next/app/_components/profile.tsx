import { auth } from "@/auth";
import Link from "next/link";
import { ProfileMenu } from "./profile-menu";

export const Profile = async () => {
  const session = await auth();

  if (!session) {
    return <Link href="/login">Login</Link>;
  }

  return <ProfileMenu />;
};
