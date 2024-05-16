import { InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.subjects)[":id"]["$delete"]
>;

export const useDeleteSubject = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subjects[":id"]["$delete"]({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Subject deleted!");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
  return mutation;
};

export default useDeleteSubject;
