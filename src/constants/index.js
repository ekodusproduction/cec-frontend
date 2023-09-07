import { BiHomeCircle, BiBookBookmark } from "react-icons/bi";
import { BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs";

export const getSidebarData = () => {
  return [
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
};
