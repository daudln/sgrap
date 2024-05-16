"use client";

// import useSubject from "@/hooks/useSubject";

interface Props {
  id: string;
}

const SubjectDetail = ({ id }: Props) => {
  // const { data } = useSubject(id);
  return <div>{id}</div>;
};

export default SubjectDetail;
