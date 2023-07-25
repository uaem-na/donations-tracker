import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faChartSimple,
  faFingerprint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";

interface IAccountLayoutProps {}

export const AccountLayout = (
  props: PropsWithChildren<IAccountLayoutProps>
) => {
  return (
    <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
      <aside className="flex overflow-x-auto px-0.5 border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
        <nav className="flex-none px-4 sm:px-6 lg:px-0">
          <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
            <li>
              <a
                href="#"
                className="text-gray-500 hover:text-purple-800 hover:bg-gray-50 group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
              >
                <FontAwesomeIcon
                  className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-purple-800"
                  icon={faChartSimple}
                />
                Dashboard
              </a>
            </li>
            <li>
              {/*Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" */}
              <a
                href="#"
                className="bg-gray-50 text-purple-800 group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
              >
                <FontAwesomeIcon
                  className="h-6 w-6 shrink-0 text-purple-800"
                  icon={faUser}
                />
                General
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-500 hover:text-purple-800 hover:bg-gray-50 group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
              >
                <FontAwesomeIcon
                  className="h-6 w-6 shrink-0 group-hover:text-purple-800"
                  icon={faFingerprint}
                />
                Security
              </a>
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
