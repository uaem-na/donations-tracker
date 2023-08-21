// [Private] My Account page component
// Contains: dashboard, account information and actions to make offers/requests

import { AccountLayout } from "@pages/Account/components/AccountLayout";
import { UpdateUserInfoForm } from "@pages/Account/components/UpdateUserInfoForm";

export const GeneralPage = () => {
  return (
    <AccountLayout>
      <UpdateUserInfoForm />
    </AccountLayout>
  );
};
