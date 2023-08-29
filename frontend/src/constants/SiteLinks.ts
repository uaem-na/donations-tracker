import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleQuestion,
  faClipboardCheck,
  faFileSignature,
  faFlag,
  faHome,
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
    name: "Posts",
    path: "/posts",
    menu: true,
    icon: faFileSignature,
  },
  { name: "FAQ", path: "/faq", menu: true, icon: faCircleQuestion },
  {
    name: "Users",
    path: "/admin/users",
    menu: true,
    icon: faUsers,
    adminOnly: true,
  },
  {
    name: "Posts",
    path: "/admin/posts",
    menu: true,
    icon: faClipboardCheck,
    adminOnly: true,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    menu: true,
    icon: faFlag,
    adminOnly: true,
  },
];
