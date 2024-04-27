import Link from "next/link";
import React from "react";

interface DashboardMenuProps {
  title: string;
  icon: React.ReactNode;
  navLink: string;
}

const DashboardMenu = ({ title, icon, navLink }: DashboardMenuProps) => {
  return (
    <Link
      href={navLink}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      {icon}
      {title}
    </Link>
  );
};

export default DashboardMenu;
