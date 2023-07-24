import { UserRole } from "@/constants";
import { LayoutContext, LayoutContextType } from "@/layout/layout";
import { ISiteLinks } from "@constants/siteLinks";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetSessionQuery } from "@services/auth";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

interface NavListProps {
  siteLinks: ISiteLinks[];
  isUserAdmin?: boolean;
}

const NavList = ({ siteLinks, isUserAdmin = false }: NavListProps) => {
  return (
    <nav className="flex flex-1 flex-col">
      <ul className="-mx-2 flex-1 space-y-1">
        {siteLinks
          .filter(({ menu, adminOnly }) => menu && (!adminOnly || isUserAdmin))
          .map(({ name, path }) => (
            <NavItem key={name} to={path} name={name}></NavItem>
          ))}
      </ul>
    </nav>
  );
};

const NavItem = ({ to, name }) => {
  const { updateMobileNavIsOpen } = useContext(
    LayoutContext
  ) as LayoutContextType;

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
            isActive
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`
        }
        onClick={() => updateMobileNavIsOpen(false)}
      >
        {name}
      </NavLink>
    </li>
  );
};

interface ISidebarMobileProps {
  name: string;
  siteLinks: ISiteLinks[];
}

export const SidebarMobile = ({ name, siteLinks }: ISidebarMobileProps) => {
  const { data: session, isLoading } = useGetSessionQuery();
  const { mobileNavIsOpen, updateMobileNavIsOpen } = useContext(
    LayoutContext
  ) as LayoutContextType;

  if (isLoading) {
    return <div className="hidden">Loading...</div>;
  }

  return (
    mobileNavIsOpen && (
      <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-900/80" />

        <div className="fixed inset-0 flex">
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => updateMobileNavIsOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <FontAwesomeIcon
                  className="h-6 w-6 text-white"
                  icon={faClose}
                />
              </button>
            </div>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <div className="h-8 w-auto text-gray-100 font-light">
                  {name}
                </div>
              </div>

              <NavList
                siteLinks={siteLinks}
                isUserAdmin={session?.role?.includes(UserRole.ADMIN)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};
