import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const useGetSchools = () =>
  useQuery({
    queryKey: ["schools"],
    queryFn: async () => {
      const response = await client.api.schools.$get();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    },
  });

export default useGetSchools;

export const useSchoolOptions = () => {
  const { data: schools } = useGetSchools();
  return schools?.data.map((school) => ({
    label: school.name,
    value: school.id,
  }));
};
