import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  link: string;
}

const ViewData = ({ link }: Props) => {
  return (
    <Link
      href={link}
      className="flex items-center gap-2 text-primary cursor-pointer"
    >
      <Eye className="h-4 w-4" />
      View
    </Link>
  );
};

export default ViewData;
