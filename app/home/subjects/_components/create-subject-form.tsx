"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createSubjectSchema, CreateSubjectInput } from "@/schema/subject";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import FormResponseMessage from "@/components/form-response-message";
import ActionButton from "@/components/action-button";
import DialogBox from "@/components/dialog-box";
import { Button } from "@/components/ui/button";
import { PiPlus } from "react-icons/pi";
import { createSubject } from "@/app/home/subjects/_actions/actions";

const CreateSubjectForm = () => {
  const [error, setError] = useState("");
  const form = useForm<CreateSubjectInput>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  });
  const { execute, status, result } = useAction(createSubject, {
    onSuccess: (data) => {
      if (!data.success) {
        setError(data.message);
      }
      form.reset();
      console.log(result.data?.status);
    },
  });
  const onSubmit = (data: CreateSubjectInput) => {
    execute(data);
  };
  return (
    <DialogBox
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
          </div>

          <ActionButton label="Create" status={status} />

          {error && (
            <FormResponseMessage
              message={error}
              type="error"
              classNames="w-full"
            />
          )}
        </form>
      </Form>
    </DialogBox>
  );
};

export default CreateSubjectForm;
