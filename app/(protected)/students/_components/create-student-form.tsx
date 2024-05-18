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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  CLASS_OPTIONS,
  Gender,
  GENDER_OPTIONS,
  StudentClassLevel,
} from "@/lib/constants";
import useGetSchools from "@/hooks/school/use-get-schools";
import useCreateStudent from "@/hooks/student/use-create-student";
import { z } from "zod";
import { createStudentSchema } from "@/db/schema/student";

interface CreateStudentProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateStudentForm = ({ setOpen }: CreateStudentProps) => {
  const form = useForm<z.infer<typeof createStudentSchema>>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "" as Gender,
      schoolId: "",
      classLevel: "" as StudentClassLevel,
    },
  });

  const { data, isLoading, error } = useGetSchools();

  const SCHOOLS = data?.data.map((school) => ({
    label: school.name,
    value: school.id,
  }));

  const handleSchoolChange = useCallback(
    (value: string) => {
      form.setValue("schoolId", value);
    },
    [form]
  );

  const handleGenderChange = useCallback(
    (value: string) => {
      form.setValue("gender", value as Gender);
    },
    [form]
  );
  const handleClassChange = useCallback(
    (value: string) => {
      form.setValue("classLevel", value as StudentClassLevel);
    },
    [form]
  );
  const queryClient = useQueryClient();

  const mutation = useCreateStudent();

  const onSubmit = (data: z.infer<typeof createStudentSchema>) => {
    mutation.mutate(data);
  };
  return (
    <Form {...form}>
      <form
        className="w-full max-w-lg flex flex-col gap-4"
        // onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Daud" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Linus (optional)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Namayala" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <SelectInput
                    onChange={handleGenderChange}
                    className="w-full"
                    options={GENDER_OPTIONS || []}
                    label="Gender"
                    placeholder="Select Gender"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schoolId"
            render={({ field }) => (
              <FormItem className="flex flex-col my-2">
                <FormLabel>School</FormLabel>
                <FormControl className="w-full">
                  <SelectInput
                    onChange={handleSchoolChange}
                    className="w-full"
                    options={SCHOOLS || []}
                    label="School"
                    placeholder="Select School"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="classLevel"
            render={({ field }) => (
              <FormItem className="flex flex-col my-2">
                <FormLabel>Class</FormLabel>
                <FormControl className="w-full">
                  <SelectInput
                    onChange={handleClassChange}
                    className="w-full"
                    options={CLASS_OPTIONS}
                    label="Class"
                    placeholder="Select class"
                  />
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

export default CreateStudentForm;
