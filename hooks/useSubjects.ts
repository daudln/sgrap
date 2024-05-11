import { trpc } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const useSubjects = () =>
  useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await trpc.api.subjects.$get();
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      return response.json();
    },
  });

export default useSubjects;
