import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const useGetData = (
  queryKey: string,
  apiEndpoint: "subjects" | "teachers" | "students" | "schools"
) =>
  useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await client.api[apiEndpoint].$get();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    },
  });

export default useGetData;
