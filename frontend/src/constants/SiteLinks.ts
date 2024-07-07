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
  translationKey: string;
}

export const siteLinks: ISiteLinks[] = [
  {
    name: "Home",
    path: "/",
    menu: true,
    icon: faHome,
    translationKey: "sites.home",
  },
  {
    name: "About us",
    path: "/about-us",
    menu: true,
    icon: faPersonCircleQuestion,
    translationKey: "sites.about_us",
  },
  {
    name: "Posts",
    path: "/posts",
    menu: true,
    icon: faFileSignature,
    translationKey: "sites.posts",
  },
  {
    name: "FAQ",
    path: "/faq",
    menu: true,
    icon: faCircleQuestion,
    translationKey: "sites.faq",
  },
  {
    name: "Users",
    path: "/admin/users",
    menu: true,
    icon: faUsers,
    adminOnly: true,
    translationKey: "sites.admin_users",
  },
  {
    name: "Posts",
    path: "/admin/posts",
    menu: true,
    icon: faClipboardCheck,
    adminOnly: true,
    translationKey: "sites.admin_posts",
  },
  {
    name: "Reports",
    path: "/admin/reports",
    menu: true,
    icon: faFlag,
    adminOnly: true,
    translationKey: "sites.admin_reports",
  },
];
