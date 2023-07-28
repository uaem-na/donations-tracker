import { UpdatePasswordForm } from "@features/users";
import { AccountLayout } from "@pages/Account/components/AccountLayout";

export const SecurityPage = () => {
  return (
    <AccountLayout>
      <UpdatePasswordForm />
    </AccountLayout>
  );
};
