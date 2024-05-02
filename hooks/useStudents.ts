import userClient from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

const useStudents = () =>
  useQuery({
    queryKey: ["students"],
    queryFn: () => userClient.getAll({ params: { type: "STUDENT" } }),
  });

export default useStudents;
