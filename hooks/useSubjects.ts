import subjectClient from "@/services/subjects.service";
import { useQuery } from "@tanstack/react-query";

const useSubjects = () =>
  useQuery({
    queryKey: ["subjects"],
    queryFn: subjectClient.getAll,
  });

export default useSubjects;
