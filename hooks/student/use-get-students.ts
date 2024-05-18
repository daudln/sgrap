import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const useGetStudents = () =>
  useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await client.api.students.$get();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    },
  });

export default useGetStudents;
