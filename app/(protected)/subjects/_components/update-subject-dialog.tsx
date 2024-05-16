"use client";

import ActionButton from "@/components/action-button";
import DialogBox from "@/components/dialog-box";
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
  createSubjectSchema,
  Subject,
  subjectCategory,
} from "@/db/schema/subject";
import useUpdateSubject from "@/hooks/subject/use-update-subject";
import { UpdateSubjectInput } from "@/schema/subject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  open: boolean;
  subjectId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

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

function UpdateSubjectDialog({ subjectId, open, setOpen }: Props) {
  const mutation = useUpdateSubject();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<{ data: Subject[] }>(["subjects"]);
  const subject = data?.data?.find((subject) => subject.id === subjectId);
  const form = useForm<UpdateSubjectInput>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: {
      name: subject?.name,
      code: subject?.code,
      description: subject?.description ?? undefined,
      category: subject?.category,
      id: subject?.id,
    },
  });

  const handleOptionChange = useCallback(
    (value: string) => {
      form.setValue("category", value as z.infer<typeof subjectCategory>);
    },
    [form]
  );

  const onSubmit = (data: z.infer<typeof createSubjectSchema>) => {
    mutation.mutate(data);
  };

  return (
    <DialogBox
      open={open}
      onOpenChange={setOpen}
      title="Update Subject"
      description="Update the subject details"
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
    </DialogBox>
  );
}

export default UpdateSubjectDialog;
