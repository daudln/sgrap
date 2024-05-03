"use client";

import ActionButton from "@/components/action-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateSchoolInput, createSchoolSchema } from "@/schema/school";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createSchool } from "../_actions/actions";

interface CreateSchoolProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateSchoolForm = ({ setOpen }: CreateSchoolProps) => {
  const form = useForm<CreateSchoolInput>({
    resolver: zodResolver(createSchoolSchema),
    defaultValues: {
      name: "",
      motto: "",
    },
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createSchool,
    onSuccess: async ({ data }) => {
      toast.success(data?.message, {
        id: "create-new-school",
      });

      await queryClient.invalidateQueries({
        queryKey: ["schools"],
      });
      form.reset();
      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "create-new-school",
      });
    },
  });

  const onSubmit = (data: CreateSchoolInput) => {
    createMutation.mutate(data);
  };
  return (
    <Form {...form}>
      <form
        className="w-full max-w-lg flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ikola Secondary School" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motto</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Juhudi Elimu na Kazi" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ActionButton label="Create" status={createMutation.status} />
      </form>
    </Form>
  );
};

export default CreateSchoolForm;
