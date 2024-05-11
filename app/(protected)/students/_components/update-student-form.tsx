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
import { useSchoolOptions } from "@/hooks/useSchools";
import { CLASS_OPTIONS, GENDER_OPTIONS } from "@/lib/constants";
import { UpdateProfileInput } from "@/schema/profile";
import { UpdateStudentInput, updateStudentSchema } from "@/schema/student";
import { UserData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender, StudentClass } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateStudent } from "../_actions/actions";

interface UpdateProfileProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  profile: UserData;
}

const UpdateStudentForm = ({ profile, setOpen }: UpdateProfileProps) => {
  const [firstName, middleName, lastName] = profile.name?.split(" ")!;
  const form = useForm<UpdateStudentInput>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      uuid: profile.id,
      school: profile.Profile?.school?.name || "",
      gender: profile.Profile.gender as Gender,
      classLevel: profile.Profile?.Student?.classLevel || ("" as StudentClass),
    },
  });
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
  const SCHOOLS = useSchoolOptions();

  const updateMutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: async ({ data }) => {
      toast.success(data?.message, {
        id: "update-profile",
      });

      await queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      form.reset();
      setOpen((prev) => !prev);
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        id: "update-profile",
      });
    },
  });

  const onSubmit = (data: UpdateStudentInput) => {
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

        <ActionButton label="Create" status={updateMutation.status} />
      </form>
    </Form>
  );
};

export default UpdateStudentForm;