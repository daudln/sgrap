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
import useSchools from "@/hooks/useSchools";
import { UpdateProfileInput, updateProfileSchema } from "@/schema/profile";
import { UserData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateTeacher } from "../_actions/actions";

interface UpdateProfileProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  profile: UserData;
}

const UpdateTeacherForm = ({ profile, setOpen }: UpdateProfileProps) => {
  const [firstName, middleName, lastName] = profile.name?.split(" ")!;
  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: profile.email as string | undefined,
      uuid: profile.id,
      phoneNumber: profile.Profile.phoneNumber,
      school: profile.Profile.school.uuid as string | undefined,
    },
  });
  const handleOptionChange = useCallback(
    (value: string) => {
      form.setValue("school", value);
    },
    [form]
  );
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useSchools();
  const SCHOOLS = data?.data.map((school) => ({
    label: school.name,
    value: school.uuid,
  }));

  const updateMutation = useMutation({
    mutationFn: updateTeacher,
    onSuccess: async ({ data }) => {
      toast.success(data?.message, {
        id: "update-profile",
      });

      await queryClient.invalidateQueries({
        queryKey: ["teachers"],
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

  const onSubmit = (data: UpdateProfileInput) => {
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
                <FormControl className="w-full">
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
          <FormField
            control={form.control}
            name="uuid"
            render={({ field }) => (
              <FormItem className="flex flex-col my-2" hidden>
                <FormLabel hidden>UUID</FormLabel>
                <FormControl hidden className="w-full">
                  <FormItem hidden>
                    <FormLabel hidden></FormLabel>
                    <FormControl hidden>
                      <Input {...field} hidden readOnly disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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

export default UpdateTeacherForm;
