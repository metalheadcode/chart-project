import { CgInfo, CgScreen } from "react-icons/cg";

import { IoNewspaper } from "react-icons/io5";
import { RiAlertFill } from "react-icons/ri";

export const menuList = [
  {
    id: 1,
    title: "Current Info",
    icon: (
      <CgInfo
        color="white"
        size={23}
      />
    ),
    iconActive: (
      <CgInfo
        className="text-green-500"
        size={23}
      />
    ),
  },
  {
    id: 2,
    title: "Indicator List",
    icon: (
      <CgScreen
        color="white"
        size={23}
      />
    ),
    iconActive: (
      <CgScreen
        className="text-green-500"
        size={23}
      />
    ),
  },
  {
    id: 3,
    title: "News",
    icon: (
      <IoNewspaper
        color="white"
        size={21}
      />
    ),
    iconActive: (
      <IoNewspaper
        className="text-green-500"
        size={21}
      />
    ),
  },
  {
    id: 4,
    title: "Alert",
    icon: (
      <RiAlertFill
        color="white"
        size={21}
      />
    ),
    iconActive: (
      <RiAlertFill
        className="text-green-500"
        size={21}
      />
    ),
  },
];
