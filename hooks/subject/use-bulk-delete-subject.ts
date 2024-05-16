import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.subjects)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.subjects)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteSubject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.subjects["bulk-delete"]["$post"]({
        json,
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Subjects deleted");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: ({ name, message }) => {
      toast.error(message);
    },
  });
  return mutation;
};

export default useBulkDeleteSubject;
