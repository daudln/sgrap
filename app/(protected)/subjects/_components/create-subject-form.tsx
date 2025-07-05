"use client";

import ActionButton from "@/components/action-button";
import { SelectInput } from "@/components/select-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createSubjectSchema } from "@/db/schema/subject";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SUBJECT_CATEGORIES = [
  {
    label: "Art",
    value: "ART",
  },
  {
    label: "Science",
    value: "SCIENCE",
  },
];

interface CreateSubjectProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateSubjectForm = ({ setOpen }: CreateSubjectProps & {}) => {
  const trpc = useTRPC();
  const createSubject = trpc.subject.create.mutationOptions();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof createSubjectSchema>>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: {
      name: "",
      category: "ART",
    },
  });

  const createMutation = useMutation({
    mutationFn: createSubject.mutationFn,
    onSuccess: async () => {
      toast.success("Subject updated successfully", {
        id: "create-subject",
      });
      queryClient.invalidateQueries({
        queryKey: trpc.subject.getAll.queryKey(),
      });
      form.reset();
      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "create-subject",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof createSubjectSchema>) => {
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
                  <Input {...field} placeholder="Kiswahili" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col my-2">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <SelectInput
                    onChange={(val) =>
                      form.setValue(
                        "category",
                        val as z.infer<typeof createSubjectSchema>["category"]
                      )
                    }
                    className="w-full"
                    options={SUBJECT_CATEGORIES}
                    label="Category"
                    selectedValue={form.getValues("category")}
                  />
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

export default CreateSubjectForm;
