import { InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.students)[":id"]["$delete"]
>;

export const useDeleteStudent = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.students[":id"]["$delete"]({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Student deleted!");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
  return mutation;
};

export default useDeleteStudent;
