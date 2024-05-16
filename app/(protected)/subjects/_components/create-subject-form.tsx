"use client";

import { createSubject } from "@/app/(protected)/subjects/_actions/actions";
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
import useCreateSubject from "@/hooks/subject/use-create-subject";
import { CreateSubjectInput, createSubjectSchema } from "@/schema/subject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  defaultValues?: CreateSubjectInput;
}

const CreateSubjectForm = ({
  setOpen,
  defaultValues,
}: CreateSubjectProps & {}) => {
  const mutation = useCreateSubject();
  const form = useForm<CreateSubjectInput>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: defaultValues,
  });
  const handleOptionChange = useCallback(
    (value: string) => {
      form.setValue("category", value as "ART" | "SCIENCE");
    },
    [form]
  );

  const deleteMutation = useMutation({
    mutationFn: createSubject,
    onSuccess: async ({ data }) => {
      toast.success(data?.message, {
        id: "create-new-subject",
      });

      form.reset();
      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "create-new-subject",
      });
    },
  });

  const onSubmit = (data: CreateSubjectInput) => {
    mutation.mutate(data);
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
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="KSW" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Description (optional)" />
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
                    onChange={handleOptionChange}
                    className="w-full"
                    options={SUBJECT_CATEGORIES}
                    label="Category"
                    placeholder="Select category"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ActionButton label="Create" status={deleteMutation.status} />
      </form>
    </Form>
  );
};

export default CreateSubjectForm;
