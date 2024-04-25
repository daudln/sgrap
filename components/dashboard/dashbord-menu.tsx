import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Link, ShoppingCart } from "lucide-react";
import React from "react";

interface DashboardMenuProps {
  title: string;
  icon: React.ReactNode;
  navLink: string;
}

const DashboardMenu = ({ title, icon, navLink }: DashboardMenuProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={navLink}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            {icon}
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">{title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DashboardMenu;
