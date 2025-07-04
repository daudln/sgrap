"use client";

import ActionButton from "@/components/action-button";
import DatePicker from "@/components/date-picker";
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
  CLASS_OPTIONS,
  GENDER_OPTIONS,
  Gender,
  StudentClassLevel,
} from "@/lib/constants";
import { createStudentSchema } from "@/schema/student";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreateStudentForm = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createStudent = trpc.student.create.mutationOptions();
  const { data: schools, isLoading: schoolLoading } = useQuery(
    trpc.school.getAll.queryOptions({ pageSize: 100 })
  );

  const form = useForm<z.infer<typeof createStudentSchema>>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      schoolId: "",
      classLevel: "" as StudentClassLevel,
      gender: "" as Gender,
      userType: "STUDENT",
      image: "",
      isActive: true,
      phoneNumber: "",
      dateOfBirth: undefined,
    },
  });

  const SCHOOLS =
    schools?.schools.map((school) => ({
      label: school.name,
      value: school.id,
    })) || [];

  // Field handlers
  const handleSelectChange = useCallback(
    (field: keyof z.infer<typeof createStudentSchema>, value: string) => {
      form.setValue(field, value);
    },
    [form]
  );

  const mutation = useMutation({
    mutationFn: createStudent.mutationFn,
    onSuccess: async () => {
      toast.success("Student created successfully");
      queryClient.invalidateQueries({
        queryKey: trpc.student.getAll.queryKey(),
      });
      form.reset();
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: z.infer<typeof createStudentSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Daud Namayala" />
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
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="name@mail.com" />
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
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="+255 123 456 789"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker
                  className="w-full"
                  value={field.value ?? undefined}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Select: Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <SelectInput
                  onChange={(value) => handleSelectChange("gender", value)}
                  options={GENDER_OPTIONS}
                  className="w-full"
                  label="Gender"
                  placeholder="Select Gender"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Select: School */}
        <FormField
          control={form.control}
          name="schoolId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School</FormLabel>
              <FormControl>
                <SelectInput
                  onChange={(value) => handleSelectChange("schoolId", value)}
                  options={SCHOOLS}
                  isLoading={schoolLoading}
                  className="w-full"
                  label="School"
                  placeholder="Select School"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Select: Class */}
        <FormField
          control={form.control}
          name="classLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <FormControl>
                <SelectInput
                  onChange={(value) => handleSelectChange("classLevel", value)}
                  options={CLASS_OPTIONS}
                  className="w-full"
                  label="Class"
                  placeholder="Select Class"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ActionButton label="Create Student" status={mutation.status} />
      </form>
    </Form>
  );
};

export default CreateStudentForm;
