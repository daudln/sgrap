"use client";

import { SubjectOutput } from "@/app/(protected)/_procedures/subject";
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
import { updateSubjectSchema } from "@/db/schema/subject";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useCallback } from "react";
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

interface UpdateSubjectProps {
  subject: SubjectOutput;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const UpdateSubjectForm = ({ subject, setOpen }: UpdateSubjectProps) => {
  const trpc = useTRPC();
  const updateSubject = trpc.subject.update.mutationOptions();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof updateSubjectSchema>>({
    resolver: zodResolver(updateSubjectSchema),
    defaultValues: {
      id: subject.id,
      name: subject.name,
      category: subject.category,
    },
  });

  const handleSelectChange = useCallback(
    (field: keyof z.infer<typeof updateSubjectSchema>, value: string) => {
      form.setValue(field, value);
    },
    [form]
  );

  const updateMutation = useMutation({
    mutationFn: updateSubject.mutationFn,
    onSuccess: async () => {
      toast.success("Subject updated successfully", {
        id: "update-subject",
      });
      queryClient.invalidateQueries({
        queryKey: trpc.subject.getAll.queryKey(),
      });
      form.reset();
      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "update-subject",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof updateSubjectSchema>) => {
    updateMutation.mutate(data);
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
                        val as z.infer<typeof updateSubjectSchema>["category"]
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
        <ActionButton label="Update" status={updateMutation.status} />
      </form>
    </Form>
  );
};

export default UpdateSubjectForm;
