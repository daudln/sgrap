import profilesClient from "@/services/profiles.service";
import { useQuery } from "@tanstack/react-query";

const useTeachers = () =>
  useQuery({
    queryKey: ["profiles"],
    queryFn: profilesClient.getAll,
  });

export default useTeachers;
