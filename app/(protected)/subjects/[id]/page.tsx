import React from "react";
import SubjectDetail from "../_components/subject-detail";

interface Props {
  params: Promise<{ id: string }>;
}
const Page = async (props: Props) => {
  const params = await props.params;
  return <SubjectDetail id={params.id} />;
};

export default Page;
