import { AccountLayout } from "@pages/Account/components/AccountLayout";
import { UpdatePasswordForm } from "@pages/Account/components/UpdatePasswordForm";

export const SecurityPage = () => {
  return (
    <AccountLayout>
      <UpdatePasswordForm />
    </AccountLayout>
  );
};
