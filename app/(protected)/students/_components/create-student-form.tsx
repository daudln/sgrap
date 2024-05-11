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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createStudent } from "../_actions/actions";
import { CreateStudentInput, createStudentSchema } from "@/schema/student";
import useSchools from "@/hooks/useSchools";
import { Gender, StudentClass } from "@prisma/client";
import { CLASS_OPTIONS, GENDER_OPTIONS } from "@/lib/constants";

interface CreateStudentProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateStudentForm = ({ setOpen }: CreateStudentProps) => {
  const form = useForm<CreateStudentInput>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "" as Gender,
      school: "",
      classLevel: "" as StudentClass,
    },
  });

  const { data, isLoading, error } = useSchools();

  const SCHOOLS = data?.data.map((school) => ({
    label: school.name,
    value: school.uuid,
  }));

  const handleSchoolChange = useCallback(
    (value: string) => {
      form.setValue("school", value);
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
      form.setValue("classLevel", value as StudentClass);
    },
    [form]
  );
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: async ({ data }) => {
      toast.success(data?.message, {
        id: "create-new-student",
      });

      await queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      form.reset();
      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "create-new-student",
      });
    },
  });

  const onSubmit = (data: CreateStudentInput) => {
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
            name="school"
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