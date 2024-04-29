"use client";

import { createSubject } from "@/app/home/subjects/_actions/actions";
import ActionButton from "@/components/action-button";
import DialogBox from "@/components/dialog-box";
import { SelectInput } from "@/components/select-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateSubjectInput, createSubjectSchema } from "@/schema/subject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { PiPlus } from "react-icons/pi";
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

const CreateSubjectForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateSubjectInput>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  });
  const handleOptionChange = useCallback(
    (value: string) => {
      form.setValue("category", value as "ART" | "SCIENCE");
    },
    [form]
  );
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: createSubject,
    onSuccess: async ({ data }) => {
      toast.success(data?.message, {
        id: "create-new-subject",
      });

      await queryClient.invalidateQueries({
        queryKey: ["subjects"],
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
    deleteMutation.mutate(data);
  };
  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      triger={
        <Button variant="outline" size="sm">
          <PiPlus className="mr-2" /> Subject
        </Button>
      }
      title="Create Subject"
      description="Fill the form below to create a new subject"
    >
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

          <ActionButton label="Create" status={deleteMutation.status} />
        </form>
      </Form>
    </DialogBox>
  );
};

export default CreateSubjectForm;
