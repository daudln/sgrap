import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const useGetStudents = () =>
  useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await client.api.subjects.$get();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return response.json();
    },
  });

export default useGetStudents;
