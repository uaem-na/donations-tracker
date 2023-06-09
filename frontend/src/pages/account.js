// [Private] My Account page component
// Contains: dashboard, account information and actions to make offers/requests
import React from "react";
import styled from "styled-components";
import { Button } from "../components/button";

const AccountPage = () => {
  return (
    <Wrapper>
      <h1>My Account</h1>
      <ActionsWrapper>
        <Button>Make Offer</Button>
        <Button>Make Request</Button>
      </ActionsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export default AccountPage;
