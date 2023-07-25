import { UserTable } from "./components/UserTable";

export const AdminUsersPage = () => {
  return (
    <>
      <div className="px-8 py-8 flex flex-col gap-8">
        <UserTable role="admin" />
        <UserTable role="organization" />
        <UserTable role="individual" />
      </div>
    </>
  );
};

export default AdminUsersPage;
