import { signIn } from "@/auth";

export const SignIn = () => {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("resend", formData);
      }}
    >
      <input type="email" name="email" placeholder="Email" />
      <button type="submit">Sign In</button>
    </form>
  );
};
