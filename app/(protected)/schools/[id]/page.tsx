import prisma from "@/lib/utils";
import React from "react";
import SchoolDetail from "../_components/school-detail";

interface Props {
  params: { id: string };
}
const Page = async ({ params }: Props) => {
  return <SchoolDetail id={params.id} />;
};

export default Page;
