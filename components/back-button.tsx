import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  backHref?: string;
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}
const BackButton = ({ label, backHref, variant }: BackButtonProps) => {
  return (
    <Button className="w-full" size="sm" variant={variant || "link"} asChild>
      {backHref && (
        <Link href={backHref} className="text-sm !text-gray-600">
          {label}
        </Link>
      )}
    </Button>
  );
};

export default BackButton;
