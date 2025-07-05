"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { NAVIGATION_LINK } from "@/lib/navlinks";
import NavigationMenu from "./navigation-menu";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <nav className="grid gap-2 text-lg font-medium">
            {NAVIGATION_LINK.map((link) => (
              <NavigationMenu
                key={link.link}
                navLink={link.link}
                title={link.title}
                icon={link.icon}
                clickCallback={() => setIsOpen((prev) => !prev)}
              />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navbar;
