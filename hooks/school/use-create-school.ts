import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.schools.$post>;
type RequestType = InferRequestType<typeof client.api.schools.$post>["json"];

export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.schools.$post({ json });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("School created");
      queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: ({ name, message }) => {
      toast.error(message);
    },
  });
  return mutation;
};

export default useCreateSchool;
