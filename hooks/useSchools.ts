import schoolClient from "@/services/schools.service";
import { useQuery } from "@tanstack/react-query";

const useSchools = () =>
  useQuery({
    queryKey: ["schools"],
    queryFn: schoolClient.getAll,
  });

export default useSchools;
