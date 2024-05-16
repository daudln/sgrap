import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.subjects)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.subjects)[":id"]["$patch"]
>["json"];

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.subjects.$post({ json });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Subject updated!");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: ({ name, message }) => {
      toast.error(message);
    },
  });
  return mutation;
};

export default useUpdateSubject;
