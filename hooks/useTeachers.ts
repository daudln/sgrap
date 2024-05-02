import userClient from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

const useTeachers = () =>
  useQuery({
    queryKey: ["teachers"],
    queryFn: () => userClient.getAll({ params: { type: "TEACHER" } }),
  });

export default useTeachers;
