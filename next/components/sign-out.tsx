import { signOut } from "@/auth";

export const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <input type="email" name="email" placeholder="Email" />
      <button type="submit">Sign In</button>
    </form>
  );
};
