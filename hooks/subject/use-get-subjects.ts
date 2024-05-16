import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const useGetSubjects = () =>
  useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await client.api.subjects.$get();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    },
  });

export default useGetSubjects;
