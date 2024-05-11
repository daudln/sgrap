import prisma from "@/lib/utils";
import React from "react";
import SubjectDetail from "../_components/subject-detail";

interface Props {
  params: { id: string };
}
const Page = async ({ params }: Props) => {
  return <SubjectDetail id={params.id} />;
};

export default Page;
