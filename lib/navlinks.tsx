import { HomeIcon } from "lucide-react";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { RxSection } from "react-icons/rx";
import { PiExam } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

export const NAVIGATION_LINK = [
  {
    title: "Dashboard",
    link: "/home/dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    title: "Students",
    link: "/home/students",
    icon: <PiStudent className="h-5 w-5" />,
  },
  {
    title: "Teachers",
    link: "/home/teachers",
    icon: <FaChalkboardTeacher className="h-5 w-5" />,
  },
  {
    title: "Schools",
    link: "/home/schools",
    icon: <FaSchool className="h-5 w-5" />,
  },
  {
    title: "Classes",
    link: "/home/classes",
    icon: <SiGoogleclassroom className="h-5 w-5" />,
  },
  {
    title: "Subjects",
    link: "/home/subjects",
    icon: <MdSubject className="h-5 w-5" />,
  },
  {
    title: "Exams",
    link: "/home/exams",
    icon: <PiExam className="h-5 w-5" />,
  },
  {
    title: "Terms",
    link: "/home/terms",
    icon: <RxSection className="h-5 w-5" />,
  },
  {
    title: "Settings",
    link: "/home/settings",
    icon: <IoSettingsOutline className="h-5 w-5" />,
  },
];
