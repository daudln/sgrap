"use client";

import { updateSubject } from "@/app/home/subjects/_actions/actions";
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
import {
  CreateSubjectInput,
  createSubjectSchema,
  UpdateSubjectInput,
} from "@/schema/subject";
import { zodResolver } from "@hookform/resolvers/zod";
import { Subject, SubjectCategory } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
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

const UpdateSubjectForm = ({ subject }: { subject: Subject }) => {
  const form = useForm<UpdateSubjectInput>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: {
      name: subject.name,
      code: subject.code,
      description: subject.description ?? undefined,
      category: subject.category,
    },
  });
  const handleOptionChange = useCallback(
    (value: string) => {
      form.setValue("category", value as SubjectCategory);
    },
    [form]
  );
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateSubject,
    onSuccess: async ({ data }) => {
      toast.success(data?.message, {
        id: "create-new-subject",
      });

      await queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
      form.reset();
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        id: "create-new-subject",
      });
    },
  });

  const onSubmit = (data: CreateSubjectInput) => {
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
        </div>
        <ActionButton label="Update" status={updateMutation.status} />
      </form>
    </Form>
  );
};

export default UpdateSubjectForm;
