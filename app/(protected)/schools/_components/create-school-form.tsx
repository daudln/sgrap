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
import { createSchoolSchema } from "@/db/schema/school";
import useCreateSchool from "@/hooks/school/use-create-school";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateSchoolProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateSchoolForm = ({ setOpen }: CreateSchoolProps) => {
  const form = useForm<z.infer<typeof createSchoolSchema>>({
    resolver: zodResolver(createSchoolSchema),
    defaultValues: {
      name: "",
      motto: "",
    },
  });
  const mutation = useCreateSchool();

  const onSubmit = (data: z.infer<typeof createSchoolSchema>) => {
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

        <ActionButton label="Create" status={mutation.status} />
      </form>
    </Form>
  );
};

export default CreateSchoolForm;
