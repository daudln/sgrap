import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const useGetTeachers = () =>
  useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const response = await client.api.teachers.$get();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    },
  });

export default useGetTeachers;
