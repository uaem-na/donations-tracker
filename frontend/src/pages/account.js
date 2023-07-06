// [Private] My Account page component
// Contains: dashboard, account information and actions to make offers/requests
import styled from "styled-components";
import { Button } from "../components/common/button";
import { Tooltip } from "../components/common/tooltip";
import Offers from "../components/dashboard/offers";
import Requests from "../components/dashboard/requests";
import { DEVICES } from "../constants";
import { UpdatePasswordForm } from "../features/users/updatePasswordForm";
import { UpdateUserInfoForm } from "../features/users/updateUserInfoForm";
import { useGetSessionQuery } from "../store/services/auth";
import { useGetPostsQuery } from "../store/services/posts";

const VerifiedStatus = () => {
  const { data: user } = useGetSessionQuery();

  if (user.verified) {
    return <>verified</>;
  } else {
    return <>not verified</>;
  }
};

const AccountPage = () => {
  const { data: user } = useGetSessionQuery();
  const { data: posts } = useGetPostsQuery();

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
            <Offers offers={posts} />
          </DashboardRow>
          <DashboardRow>
            <Heading>Requests</Heading>
            <Requests requests={posts} />
          </DashboardRow>
        </DashboardColumn>
        <InformationColumn>
          <Heading>Account Information</Heading>
          <ReadonlyData>
            <p>
              Email:&nbsp;
              <Tooltip message="Please contact the administrator to update your email.">
                {`${user.email}`}
              </Tooltip>
            </p>
            <p>
              Organization:&nbsp;
              <Tooltip
                message={
                  "Please contact the administrator to update your organization."
                }
              >{`${user.organization}`}</Tooltip>
            </p>
            <p>
              Verification:&nbsp;
              <Tooltip
                message={
                  "Please contact the administrator to get the current status."
                }
              >
                <VerifiedStatus />
              </Tooltip>
            </p>
          </ReadonlyData>
          <EditableData>
            <UpdateUserInfoForm />
            <UpdatePasswordForm />
          </EditableData>
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

const ReadonlyData = styled.span`
  font-size: 1.2rem;
`;

const EditableData = styled.span``;

export default AccountPage;
