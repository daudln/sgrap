import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.students.$post>;
type RequestType = InferRequestType<typeof client.api.students.$post>["json"];

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.students.$post({ json });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Student created");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: ({ name, message }) => {
      toast.error(message);
    },
  });
  return mutation;
};

export default useCreateStudent;
