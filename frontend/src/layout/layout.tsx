import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../components/header";

const Layout = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <Outlet />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default Layout;
