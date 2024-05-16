import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const useGetSubject = (id: string) =>
  useQuery({
    queryKey: ["subjects", id],
    queryFn: async () => {
      const response = await client.api.subjects[":id"].$get({
        param: { id: id },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    },
  });

export default useGetSubject;
