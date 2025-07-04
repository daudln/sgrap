import React from "react";
import SchoolDetail from "../_components/school-detail";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ id: string }>;
}
const Page = async (props: Props) => {
  const params = await props.params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.school.getOne.queryOptions({ id: params.id })
  );
  void queryClient.prefetchQuery(
    trpc.student.getAll.queryOptions({ schoolId: params.id })
  );
  return <SchoolDetail id={params.id} />;
};

export default Page;
