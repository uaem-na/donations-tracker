import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleQuestion,
  faHome,
  faListUl,
  faPersonCircleQuestion,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export interface ISiteLinks {
  name: string;
  path: string;
  menu: boolean;
  icon?: IconDefinition;
  adminOnly?: boolean;
}

export const siteLinks: ISiteLinks[] = [
  { name: "Home", path: "/", menu: true, icon: faHome },
  {
    name: "About us",
    path: "/about-us",
    menu: true,
    icon: faPersonCircleQuestion,
  },
  {
    name: "Offers",
    path: "/offers",
    menu: true,
    icon: faListUl,
  },
  {
    name: "Requests",
    path: "/requests",
    menu: true,
    icon: faListUl,
  },
  { name: "FAQ", path: "/faq", menu: true, icon: faCircleQuestion },
  {
    name: "Users",
    path: "/admin/users",
    menu: true,
    icon: faUsers,
    adminOnly: true,
  },
];
