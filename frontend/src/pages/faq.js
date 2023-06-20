// [Public] FAQ page component
// Contains: list of frequently asked questions
// Content available on Google Docs
import React from "react";
import styled from "styled-components";
import {
  ExternalLink,
  Highlight,
  PageList,
  PageParagraph,
  PageSubtitle,
  PageTitle,
} from "../components/typography";

export const FaqPage = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <PageTitle>FAQ</PageTitle>
        <PageSubtitle>
          How is Donations Trackers different from other product-sharing
          websites?
        </PageSubtitle>
        <PageParagraph>
          Although there is the option to sell/purchase items on this website,
          Donations Trackers stands out from other product-sharing platforms in
          the sense that it promotes donation sharing. The development team
          realized that despite there being numerous platforms to sell/purchase
          products, there is a lack of donation-promoting websites. By making
          donations more accessible, Donations Trackers hopes to enhance
          community morale and well-being.
        </PageParagraph>
        <PageSubtitle>
          What is the difference between registering as{" "}
          <Highlight>an individual vs. organization?</Highlight>
        </PageSubtitle>
        <PageParagraph>
          Registering as an individual doesn't require that the user be
          associated with an organization (e.g. NGO, company). There are no
          geographic restraints for individual users (i.e. individual users
          don't have to be living in the Greater Montréal area). However,
          individual users can only offer donations/products (not request).
          Registering as an organization makes it mandatory that the user be
          associated with a legitimate organization. The legitimacy of the
          organization will be approved by the website administrators during
          registration. For the purpose of the website, for now, it is required
          that the organization be based in the Greater Montréal area.
          Organization users can make both offers and requests.
        </PageParagraph>
        <PageSubtitle>
          How can users be sure that the website is secure?
        </PageSubtitle>
        <PageParagraph>
          As a group of university students behind this website, we understand
          that the security of this platform could be questionable. Our web
          development team has worked vigorously to ensure that your privacy and
          authentication information is managed safely on our platform. Some of
          the methods that we have implemented to ensure you have a safe and
          secure experience are listed below.
          <StyledList>
            <li>
              If a user registers as an organization, website administrators
              will go through a mandatory authentication process to ensure that
              the organization is legitimate. Only then will the registration be
              completed, and the user would be able to use the website.
            </li>
            <li>
              If you have reasonable doubt about another user's
              reliability/legitimacy, you can always report them by clicking on
              the <Highlight>Report User</Highlight> button, which can be found
              on TBD . Once a user has been reported, their activity will be
              temporarily blocked until the website administrators conduct a
              background check.
            </li>
          </StyledList>
        </PageParagraph>
        <PageSubtitle>
          If there are issues/errors with donations or monetary transactions,
          what should we do?
        </PageSubtitle>
        <PageParagraph>
          We completely understand that issues with donations/transactions may
          arise due to various causes (e.g. technical difficulties).{" "}
          <em>
            Donations Trackers is not responsible for any errors/issues that
            arise with a transaction/donation.
          </em>{" "}
          Such errors/issues include but are not limited to:
          <StyledList>
            <li>
              Damages to products - We encourage you to check that all products
              are in their desired condition before completing the
              transaction/donation.
            </li>
            <li>
              Products that are different from their description on the website
              - We encourage that you check all products are provided as posted
              on the website.
            </li>
            <li>Not receiving the fee after selling the product.</li>
            <li>
              Errors with transactions - Please contact the corresponding bank
              for any errors related to monetary transactions.
            </li>
          </StyledList>
          If during a donation/transaction, you find issues with a specific
          user, please report them using the “Report User” feature as soon as
          possible, so that the user's activity can be temporarily blocked.
          Donations Trackers thanks you for your understanding and cooperation.
        </PageParagraph>
        <PageParagraph>
          <i>
            If you have any other questions/concerns, please email{" "}
            <ExternalLink href="mailto: uaem@ssmu.ca">
              uaem@ssmu.ca
            </ExternalLink>
            .
          </i>
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

const StyledList = styled(PageList)`
  list-style: disc;
  list-style-position: inside;
  margin-top: 20px;
  margin-bottom: 20px;

  li:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export default FaqPage;
