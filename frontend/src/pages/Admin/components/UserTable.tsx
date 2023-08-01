import { Button } from "@components/Controls";
import { UserRole } from "@constants";
import { useGetSessionQuery } from "@services/auth";
import { useGetUsersQuery, useSetUserActiveMutation } from "@services/users";
import { capitalizeFirstLetter } from "@utils";

type Role = (typeof UserRole)[keyof typeof UserRole];

interface UserTableProps {
  role: Role;
}

// TODO: Add pagination, sorting, and filtering
export const UserTable = ({ role }: UserTableProps) => {
  const { data: currentUser, isLoading: isSessionLoading } =
    useGetSessionQuery();
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery();
  const [setUserActive] = useSetUserActiveMutation();

  if (isSessionLoading || isUsersLoading) {
    return <>Loading...</>;
  }

  const handleActivate = (id: string) => {
    setUserActive({ userId: id, active: true });
  };

  const handleDeactivate = (id: string) => {
    setUserActive({ userId: id, active: false });
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Type: {capitalizeFirstLetter(role.toString())}
          </h1>
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase bg-gray-50"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase bg-gray-50"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase bg-gray-50"
                  >
                    Role
                  </th>
                  <th scope="col" className="bg-gray-50 w-[120px]">
                    <span className="sr-only">Activate/Deactivate</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users &&
                  users.length > 0 &&
                  users
                    .filter((user) => user.role === role)
                    .filter((user) => user.id !== currentUser?.id)
                    .map((user) => (
                      <tr key={user.id}>
                        <td>
                          {user.lastName}, {user.firstName}
                        </td>
                        <td>{user.email}</td>
                        <td className="text-center">{user.role}</td>
                        <td className="text-center py-1">
                          {user.active ? (
                            <Button
                              color="text-red-500 bg-red-100 hover:bg-red-200"
                              onClick={() => {
                                handleDeactivate(user.id);
                              }}
                            >
                              Deactivate
                            </Button>
                          ) : (
                            <Button
                              color="text-green-500 bg-green-100 hover:bg-green-200"
                              onClick={() => {
                                handleActivate(user.id);
                              }}
                            >
                              Activate
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
