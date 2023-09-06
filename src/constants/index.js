import { BiHomeCircle, BiSolidLayerPlus, BiBookBookmark } from "react-icons/bi";
import { RiFilePaper2Line } from "react-icons/ri";
import { BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs";
import { FaUsersCog } from "react-icons/fa";

export const getSidebarData = (type) => {
  const commonItems = [
    {
      icon: BiHomeCircle,
      title: "Home",
      link: "/",
    },
    {
      icon: BiBookBookmark,
      title: "Courses",
      link: "/courses",
    },
    {
      icon: BsFillPersonPlusFill,
      title: "Add New Student",
      link: "/newstudent",
    },
    {
      icon: BsFillPersonFill,
      title: "Students List",
      link: "/student",
    },
  ];

  const superItems = [
    ...commonItems,
    {
      icon: BiSolidLayerPlus,
      title: "Add New Center",
      link: "/newcenter",
    },
    {
      icon: BsFillPersonPlusFill,
      title: "Centers List",
      link: "/centers",
    },
    // {
    //   icon: FaUsersCog,
    //   title: "Add Center Admin",
    //   link: "/newAdmin",
    // },
    // {
    //   icon: BiSolidLayerPlus,
    //   title: "Center Admin List",
    //   link: "/centeradmins",
    // },
  ];

  const regularItems = [...commonItems];

  return type === "Super" ? superItems : regularItems;
};
