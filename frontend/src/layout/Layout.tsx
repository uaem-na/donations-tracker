import { Header, Sidebar, SidebarMobile } from "@components/Layouts";
import { siteLinks } from "@constants/SiteLinks";
import { createContext, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

export type LayoutContextType = {
  mobileNavIsOpen: boolean;
  updateMobileNavIsOpen: (state?: boolean) => void;
};
export const LayoutContext = createContext<LayoutContextType | null>(null);

const LayoutProvider = ({ children }) => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  const updateMobileNavIsOpen = (state?: boolean) => {
    setMobileNavIsOpen(state ?? !mobileNavIsOpen);
  };

  const value = useMemo(() => {
    return { mobileNavIsOpen, updateMobileNavIsOpen };
  }, [mobileNavIsOpen, updateMobileNavIsOpen]);

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

const Layout = () => {
  const name = "UAEM";

  return (
    <LayoutProvider>
      <SidebarMobile name={name} siteLinks={siteLinks} />
      <Sidebar name={name} siteLinks={siteLinks} />
      <Header />
      <div className="lg:pl-20 h-[calc(100vh-64px)]">
        <Outlet />
      </div>
    </LayoutProvider>
  );
};

export { Layout, LayoutProvider };
