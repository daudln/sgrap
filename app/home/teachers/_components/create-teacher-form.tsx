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
import { createTeacher } from "../_actions/actions";
import { CreateProfileInput, createProfileSchema } from "@/schema/profile";
import useSchools from "@/hooks/useSchools";

interface CreateTeacherProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateTeacherForm = ({ setOpen }: CreateTeacherProps & {}) => {
  const form = useForm<CreateProfileInput>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      school: "",
    },
  });

  const { data, isLoading, error } = useSchools();

  const SCHOOLS = data?.data.map((school) => ({
    label: school.name,
    value: school.uuid,
  }));

  const handleOptionChange = useCallback(
    (value: string) => {
      form.setValue("school", value);
    },
    [form]
  );
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: async ({ data }) => {
      toast.success(data?.message, {
        id: "create-new-teacher",
      });

      await queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
      form.reset();
      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "create-new-teacher",
      });
    },
  });

  const onSubmit = (data: CreateProfileInput) => {
    deleteMutation.mutate(data);
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="daudnamayala@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="+255712345678" />
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
                <FormControl>
                  <SelectInput
                    onChange={handleOptionChange}
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
        </div>

        <ActionButton label="Create" status={deleteMutation.status} />
      </form>
    </Form>
  );
};

export default CreateTeacherForm;
