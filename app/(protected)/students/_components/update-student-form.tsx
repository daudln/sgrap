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
import { createStudentSchema } from "@/db/schema/student";
import { useSchoolOptions } from "@/hooks/school/use-get-schools";
import { useUpdateStudent } from "@/hooks/student/use-update-student";
import {
  CLASS_OPTIONS,
  Gender,
  GENDER_OPTIONS,
  StudentClassLevel,
} from "@/lib/constants";
import { StudentData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateProfileProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  profile: StudentData;
}

const UpdateStudentForm = ({ profile, setOpen }: UpdateProfileProps) => {
  const [firstName, middleName, lastName] = profile.user.name?.split(" ")!;
  const form = useForm<z.infer<typeof createStudentSchema>>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      schoolId: profile.school.name || "",
      gender: profile.profile.gender as Gender,
      classLevel: profile.student?.classLevel as StudentClassLevel,
    },
  });
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
  const SCHOOLS = useSchoolOptions();

  const mutation = useUpdateStudent(profile.user.id);

  const onSubmit = (data: z.infer<typeof createStudentSchema>) => {
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

export default UpdateStudentForm;
