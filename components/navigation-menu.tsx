"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface NavigationMenuProps {
  title: string;
  icon: React.ReactNode;
  navLink: string;
}

const NavigationMenu = ({ title, icon, navLink }: NavigationMenuProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={navLink}
      className={cn(
        "flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:text-primary hover:bg-secondary group",
        pathname === navLink &&
          "bg-secondary text-primary font-bold transition-all duration-300 text-balance"
      )}
    >
      <div className={cn(" ", pathname === navLink && "")}>{icon}</div>
      {title}
    </Link>
  );
};

export default NavigationMenu;
