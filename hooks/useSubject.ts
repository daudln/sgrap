import subjectClient from "@/services/subjects.service";
import { useQuery } from "@tanstack/react-query";

const useSubject = (id: string) =>
  useQuery({
    queryKey: ["subjects", id],
    queryFn: () => subjectClient.get(id),
  });

export default useSubject;
