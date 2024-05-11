"use client";

import useSubject from "@/hooks/useSubject";

interface Props {
  id: string;
}

const SubjectDetail = ({ id }: Props) => {
  const { data } = useSubject(id);
  return <div>{data?.data?.name}</div>;
};

export default SubjectDetail;
