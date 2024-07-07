import {
  faChartSimple,
  faFingerprint,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem } from "@pages/Account/components/NavLink";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface IAccountLayoutProps {}

export const AccountLayout = (
  props: PropsWithChildren<IAccountLayoutProps>,
) => {
  const { t } = useTranslation();
  return (
    <div className="lg:flex lg:gap-x-16 lg:px-8">
      <aside className="flex overflow-x-auto px-0.5 border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
        <nav className="flex-none px-4 sm:px-6 lg:px-0">
          <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
            <li>
              <NavItem
                to="/account/dashboard"
                name={t("account.dashboard")}
                icon={faChartSimple}
              ></NavItem>
            </li>
            <li>
              <NavItem
                to="/account/general"
                name={t("account.general")}
                icon={faUser}
              ></NavItem>
            </li>
            <li>
              <NavItem
                to="/account/security"
                name={t("account.security")}
                icon={faFingerprint}
              ></NavItem>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div className="divide-y divide-white/5">{props.children}</div>
        </div>
      </main>
    </div>
  );
};
