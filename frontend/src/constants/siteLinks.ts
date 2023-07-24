import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleQuestion,
  faHome,
  faPersonCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

export interface ISiteLinks {
  name: string;
  path: string;
  menu: boolean;
  icon?: IconDefinition;
}

export const siteLinks: ISiteLinks[] = [
  { name: "Home", path: "/", menu: true, icon: faHome },
  {
    name: "About us",
    path: "/about-us",
    menu: true,
    icon: faPersonCircleQuestion,
  },
  { name: "FAQ", path: "/faq", menu: true, icon: faCircleQuestion },
];
