import { UserRole } from "@/constants";
import { useGetUsersQuery } from "@services/users";

type Role = (typeof UserRole)[keyof typeof UserRole];

interface UserTableProps {
  role: Role;
}

// TODO: Add pagination, sorting, and filtering
export const UserTable = ({ role }: UserTableProps) => {
  const { data: users, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50"
                  >
                    Active
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users &&
                  users.length > 0 &&
                  users
                    .filter((user) => user.role === role)
                    .map((user) => (
                      <tr key={user.id}>
                        <td>
                          {user.lastName}, {user.firstName}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.active}</td>
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
