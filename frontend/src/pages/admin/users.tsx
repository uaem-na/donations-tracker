// [Admin] Admin users page component
import { Button } from "@components/common/button";
import {
  PageParagraph,
  PageSubtitle,
  PageTitle,
} from "@components/common/typography";
import { useGetUsersQuery, useVerifyUserMutation } from "@services/users";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const AdminUsersPage = () => {
  const { data: users, isLoading, isSuccess } = useGetUsersQuery({});
  const [
    verifyUserApi,
    {
      isLoading: isVerifying,
      isSuccess: hasVerified,
      isError,
      error: serverError,
    },
  ] = useVerifyUserMutation();

  const [adminUsers, setAdminUsers] = useState([]);
  const [individualUsers, setIndividualUsers] = useState([]);
  const [orgUsers, setOrgUsers] = useState([]);
  const [danglingUsers, setDanglingUsers] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setAdminUsers(users.filter((user) => user.role === "admin"));
      setIndividualUsers(users.filter((user) => user.role === "individual"));
      setOrgUsers(users.filter((user) => user.role === "organization"));
      setDanglingUsers(users.filter((user) => !user.role));
    }
  }, [isSuccess, users]);

  useEffect(() => {
    if (isError && serverError) {
      console.error(serverError);
    }
  }, [isError, serverError]);

  useEffect(() => {
    if (hasVerified) {
      console.log("User has been verified");
    }
  }, [hasVerified]);

  const verifyUser = (userId) => {
    console.log("Verifying user with id: " + userId);
    verifyUserApi({ userId });
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!users) {
    return <>No users found</>;
  }

  // TODO: stylize table and consider refactoring it to a separate component
  return (
    <Wrapper>
      <ContentWrapper>
        <PageTitle>Users Administration</PageTitle>
        <PageSubtitle>Admins</PageSubtitle>
        <table>
          <thead>
            <tr>
              <th>E-mail</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PageSubtitle>Organization Users</PageSubtitle>
        <table>
          <thead>
            <tr>
              <th>E-mail</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Reports</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orgUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>0</td>
                <td>
                  <Button
                    onClick={(e) => verifyUser(user.id)}
                    disabled={isVerifying}
                  >
                    Verify users
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PageSubtitle>Individual Users</PageSubtitle>
        <table>
          <thead>
            <tr>
              <th>E-mail</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Reports</th>
            </tr>
          </thead>
          <tbody>
            {individualUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>0</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PageSubtitle>Dangling Users</PageSubtitle>
        <table>
          <thead>
            <tr>
              <th>E-mail</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Reports</th>
            </tr>
          </thead>
          <tbody>
            {danglingUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>0</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PageParagraph>
          TODO: unverify, deactivate/reactivate, delete users
        </PageParagraph>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  padding-left: clamp(5%, 20px, 15%);
  padding-right: clamp(5%, 20px, 15%);
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  max-width: 800px;
`;

export default AdminUsersPage;
