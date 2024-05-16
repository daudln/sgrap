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
import { subjectCategory } from "@/db/schema/subject";
import useGetSubject from "@/hooks/subject/use-get-subject";
import useUpdateSubject from "@/hooks/subject/use-update-subject";
import { UpdateSubjectInput, updateSubjectSchema } from "@/schema/subject";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
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
  subjectId: string;
}

const UpdateSubjectForm = ({ subjectId }: UpdateSubjectProps) => {
  const mutation = useUpdateSubject();
  const { data } = useGetSubject(subjectId);
  console.log(data);
  const form = useForm<UpdateSubjectInput>({
    resolver: zodResolver(updateSubjectSchema),
    defaultValues: {
      name: data?.data.name,
      code: data?.data.code,
      description: data?.data.description ?? undefined,
      category: data?.data.category,
      id: data?.data.id,
    },
  });

  const handleOptionChange = useCallback(
    (value: string) => {
      form.setValue("category", value as z.infer<typeof subjectCategory>);
    },
    [form]
  );

  const onSubmit = (data: UpdateSubjectInput) => {
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem hidden>
                <FormControl>
                  <Input {...field} hidden readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <ActionButton label="Update" status={mutation.status} />
      </form>
    </Form>
  );
};

export default UpdateSubjectForm;
