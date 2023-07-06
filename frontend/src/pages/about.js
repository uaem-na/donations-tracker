// [Public] About page component
// Contains: information about the website, UAEM, UAEM McGill, and the developers
// Content available on Google Docs
import styled from "styled-components";
import {
  ExternalLink,
  PageList,
  PageListItem,
  PageParagraph,
  PageSubtitle,
  PageTitle,
} from "../components/common/typography";

export const AboutUsPage = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <PageTitle>About Us</PageTitle>
        <PageParagraph>
          Donations Trackers was developed by members of{" "}
          <ExternalLink href="https://www.uaem.org">
            Universities Allied for Essential Medicines
          </ExternalLink>{" "}
          (UAEM) and an astounding group of student web developers at McGill
          University.
        </PageParagraph>
        <PageSubtitle>Donations Trackers</PageSubtitle>
        <PageParagraph>
          Donations Trackers is a website that provides a platform for users to
          efficiently and effectively share donations in the Greater Montréal
          area. The project was concocted by a group of McGill UAEM members
          through a design sprint called{" "}
          <ExternalLink href="https://www.ignitetheidea.org/innovate4health-about">
            Innovate4Health
          </ExternalLink>{" "}
          organized by{" "}
          <ExternalLink href="https://www.reactgroup.org">ReAct</ExternalLink>,
          <ExternalLink href="https://ifmsa.org">IFMSA</ExternalLink>{" "}
          (International Federation of Medical Students Association), and the{" "}
          <ExternalLink href="https://www.ignitetheidea.org">
            IDEA Initiative
          </ExternalLink>{" "}
          at Johns Hopkins Bloomberg School of Public Health. Originally, the
          website aimed to increase transparency in personal protective
          equipment (PPE) distribution amid the shortage during the COVID-19
          pandemic. With the pandemic gradually (and fortunately) coming to an
          end, the team decided to adapt the website to increase accessibility
          to making/receiving donations in general (e.g. canned food, essential
          goods, worn clothes, etc.).
        </PageParagraph>
        <PageSubtitle>UAEM Chapter of McGill</PageSubtitle>
        <PageParagraph>
          <ExternalLink href="https://www.uaem.org">UAEM</ExternalLink> is a
          global network of university students striving to increase access and
          affordability to life-saving medicines. Considering that universities
          are key stakeholders in the drug development pipeline, students can
          promote equitable licensing practices by encouraging university policy
          changes. The UAEM chapter of McGill is one of the most active chapters
          in North America. Currently, the chapter's main projects include
          Donations Trackers, as well as the{" "}
          <ExternalLink href="https://newcanada.globalhealthgrades.org">
            UAEM Canadian Report Card
          </ExternalLink>
          , Open Science, and more.
        </PageParagraph>
        <PageList>
          <PageListItem>
            Email:{" "}
            <ExternalLink href="mailto:uaem@ssmu.ca">uaem@ssmu.ca</ExternalLink>
          </PageListItem>
          <PageListItem>
            Facebook:{" "}
            <ExternalLink href="http://www.facebook.com/UAEMMcGill">
              UAEMMcGill
            </ExternalLink>
          </PageListItem>
          <PageListItem>
            Instagram:{" "}
            <ExternalLink href="https://www.instagram.com/uaem_mcgill/">
              @uaem_mcgill
            </ExternalLink>
          </PageListItem>
        </PageList>
        <PageSubtitle>Web Developers</PageSubtitle>
        <PageList>
          <PageListItem>Lucas Nelson (Spring 2021 - present)</PageListItem>
          <PageListItem>
            <ExternalLink href="https://github.com/shjryan">
              Ryan Seo (Summer 2023)
            </ExternalLink>
          </PageListItem>
        </PageList>
        <PageSubtitle>Previous Web Developers</PageSubtitle>
        <PageList>
          <PageListItem>Edgar Chang (Fall 2021 - Winter 2022)</PageListItem>
          <PageListItem>Tristan Stevens (Fall 2021 - Winter 2022)</PageListItem>
          <PageListItem>Gaby Le Bideau (Fall 2021 - Winter 2022)</PageListItem>
          <PageListItem>Jinho Yoon (Fall 2021)</PageListItem>
          <PageListItem>Arneet Kalra (Spring 2021 - Summer 2021)</PageListItem>
          <PageListItem>James Ting (Spring 2021 - Summer 2021)</PageListItem>
          <PageListItem>Paul (Spring 2021 - Summer 2021)</PageListItem>
          <PageListItem>
            Simarjit Bilkhu (Spring 2021 - Summer 2021)
          </PageListItem>
          <PageListItem>Zhekai Jiang (Spring 2021 - Summer 2021)</PageListItem>
        </PageList>
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

export default AboutUsPage;
