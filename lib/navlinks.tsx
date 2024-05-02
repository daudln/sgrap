import { HomeIcon } from "lucide-react";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { RxSection } from "react-icons/rx";
import { PiExam } from "react-icons/pi";

export const NAVIGATION_LINK = [
  {
    title: "Dashboard",
    link: "/",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    title: "Students",
    link: "/students",
    icon: <PiStudent className="h-5 w-5" />,
  },
  {
    title: "Teachers",
    link: "/teachers",
    icon: <FaChalkboardTeacher className="h-5 w-5" />,
  },
  {
    title: "Schools",
    link: "/schools",
    icon: <FaSchool className="h-5 w-5" />,
  },
  {
    title: "Subjects",
    link: "/subjects",
    icon: <MdSubject className="h-5 w-5" />,
  },
  {
    title: "Exams",
    link: "/exams",
    icon: <PiExam className="h-5 w-5" />,
  },
  {
    title: "Terms",
    link: "/terms",
    icon: <RxSection className="h-5 w-5" />,
  },
  {
    title: "Settings",
    link: "/settings",
    icon: <IoSettingsOutline className="h-5 w-5" />,
  },
];
