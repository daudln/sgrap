import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.schools)["bulk-create"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.schools)["bulk-create"]["$post"]
>["json"];

export const useCreateSchools = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.schools["bulk-create"]["$post"]({
        json,
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Schools created");
      queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
  return mutation;
};

export default useCreateSchools;
