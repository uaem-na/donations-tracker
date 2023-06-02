import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { GlobalStyles } from "../globalStyles";
import Navbar from "../nav";

const Layout = () => {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Navbar />
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
