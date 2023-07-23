import { Sidebar, SidebarMobile } from "@components/layouts";
import { Header } from "@components/layouts/header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { siteLinks } from "../constants/siteLinks";

const Layout = () => {
  return (
    <>
      <SidebarMobile />
      <Sidebar name="UAEM" siteLinks={siteLinks} />
      <div className="lg:pl-20 h-[calc(100vh-64px)]">
        <Header />
        <Outlet />
      </div>
    </>
    // <>
    //   <Wrapper>
    //     <Header />
    //     <Outlet />
    //   </Wrapper>
    // </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default Layout;
