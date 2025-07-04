"use client";

import { StudentOutput } from "@/app/(protected)/_procedures/student";
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
import { CLASS_OPTIONS, GENDER_OPTIONS } from "@/lib/constants";
import { UpdateStudentSchema, updateStudentSchema } from "@/schema/student";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UpdateProfileProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  student: StudentOutput;
}

const UpdateStudentForm = ({ student, setOpen }: UpdateProfileProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const updateStudent = trpc.student.update.mutationOptions();
  const { data: schools, isLoading: schoolLoading } = useQuery(
    trpc.school.getAll.queryOptions({ pageSize: 100 })
  );

  const form = useForm<UpdateStudentSchema>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      name: student.name,
      email: student.email,
      schoolId: student.school.id,
      classLevel: student.classLevel,
      gender: student.gender ?? undefined,
      userType: "STUDENT",
      image: student.image ?? undefined,
      phoneNumber: student.phoneNumber ?? undefined,
      dateOfBirth: student.dateOfBirth
        ? new Date(student.dateOfBirth)
        : undefined,
      id: student.id,
    },
  });

  const handleSelectChange = useCallback(
    (field: keyof UpdateStudentSchema, value: string) => {
      form.setValue(field, value);
    },
    [form]
  );

  const SCHOOLS =
    schools?.schools.map((school) => ({
      label: school.name,
      value: school.id,
    })) || [];

  const mutation = useMutation({
    mutationFn: updateStudent.mutationFn,
    onSuccess: async () => {
      toast.success("Student updated successfully");
      queryClient.invalidateQueries({
        queryKey: trpc.student.getAll.queryKey(),
      });
      form.reset();
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong");
      setOpen(false);
    },
  });

  const onSubmit = (data: UpdateStudentSchema) => {
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
                  selectedValue={field.value}
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
                  selectedValue={field.value}
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
                  selectedValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ActionButton label="Update Student" status={mutation.status} />
      </form>
    </Form>
  );
};

export default UpdateStudentForm;
