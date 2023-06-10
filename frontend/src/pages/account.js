// [Private] My Account page component
// Contains: dashboard, account information and actions to make offers/requests
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../common/http-common";
import { Button } from "../components/button";
import Offers from "../components/dashboard/offers";
import Requests from "../components/dashboard/requests";
import { DEVICES } from "../constants";

const AccountPage = () => {
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`/offers`)
      .then((response) => {
        setOffers(response.data);
      })
      .catch((e) => {
        console.error(e.response);
      });
    axios
      .get(`/requests`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((e) => {
        console.error(e.response);
      });
  }, []);

  const handleMakeOfferClick = (event) => {
    event.preventDefault();
    alert("Coming soon");
  };

  const handleMakeRequestClick = (event) => {
    event.preventDefault();
    alert("Coming soon");
  };

  return (
    <Wrapper>
      <ActionsWrapper>
        <FlexButton type="button" onClick={handleMakeOfferClick}>
          Make Offer
        </FlexButton>
        <FlexButton type="button" onClick={handleMakeRequestClick}>
          Make Request
        </FlexButton>
      </ActionsWrapper>
      <ResponsiveRow>
        <DashboardColumn>
          <DashboardRow>
            <Heading>Offers</Heading>
            <Offers offers={offers} />
          </DashboardRow>
          <DashboardRow>
            <Heading>Requests</Heading>
            <Requests requests={requests} />
          </DashboardRow>
        </DashboardColumn>
        <InformationColumn>
          <Heading>Account Information</Heading>
          <p>Coming soon</p>
        </InformationColumn>
      </ResponsiveRow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 12px 24px;
  width: 100%;
  column-gap: clamp(16px, 5vw, 24px);
`;

const FlexButton = styled(Button)`
  flex: 1;
  max-width: clamp(256px, 30vw, 768px);
`;

const ResponsiveRow = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding-left: 24px;
  padding-right: 24px;

  @media ${DEVICES.mobileL} {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media ${DEVICES.laptop} {
    padding-left: 40px;
    padding-right: 40px;
  }
`;

const DashboardColumn = styled.div`
  flex: 1;
  min-width: 320px;
  display: flex;
  flex-direction: column;
`;

const DashboardRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
  padding-top: 16px;
`;

const InformationColumn = styled.div`
  flex: 1;
  min-width: 320px;
`;

export default AccountPage;
