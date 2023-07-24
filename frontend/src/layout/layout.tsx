import { Sidebar, SidebarMobile } from "@components/layouts";
import { Header } from "@components/layouts/header";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { siteLinks } from "../constants/siteLinks";

export type LayoutContextType = {
  mobileNavIsOpen: boolean;
  updateMobileNavIsOpen: (state?: boolean) => void;
};
export const LayoutContext = createContext<LayoutContextType | null>(null);

const LayoutProvider = ({ children }) => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  const updateMobileNavIsOpen = (state?: boolean) => {
    setMobileNavIsOpen(state || !mobileNavIsOpen);
  };

  return (
    <LayoutContext.Provider value={{ mobileNavIsOpen, updateMobileNavIsOpen }}>
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider };

const Layout = () => {
  const name = "UAEM";

  return (
    <LayoutProvider>
      <SidebarMobile name={name} siteLinks={siteLinks} />
      <Sidebar name={name} siteLinks={siteLinks} />
      <div className="lg:pl-20 h-[calc(100vh-64px)]">
        <Header />
        <Outlet />
      </div>
    </LayoutProvider>
  );
};

export default Layout;
