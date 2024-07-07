import { LandingProvider, useLandingContext } from "@contexts/LandingContext";
import { ApiModel } from "@services/api";
import { useState } from "react";
import { LandingContainer } from "./components/LandingContainer";

/*
 * TODO: Mobile view
 * */
export const LandingPage = () => {
  return (
    <LandingProvider>
      <LandingContainer />
    </LandingProvider>
  );
};

export default LandingPage;
