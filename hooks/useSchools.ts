import schoolClient from "@/services/schools.service";
import { useQuery } from "@tanstack/react-query";

const useSchools = () =>
  useQuery({
    queryKey: ["schools"],
    queryFn: schoolClient.getAll,
  });

export default useSchools;

export const useSchoolFilter = () => {
  const { data: schools } = useSchools();

  return {
    label: "Schools",
    key: "school",
    options:
      schools?.data.map((school) => ({
        label: school.name,
        value: school.name,
      })) || [],
  };
};

export const useSchoolOptions = () => {
  const { data: schools } = useSchools();
  return schools?.data.map((school) => ({
    label: school.name,
    value: school.uuid,
  }));
};
