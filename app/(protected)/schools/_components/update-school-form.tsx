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
import { UpdateSchoolInput, updateSchoolSchema } from "@/schema/school";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateSchool } from "../_actions/actions";
import { School } from "./update-school-dialog";

interface UpdateSchoolProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  school: School;
}

const UpdateSchoolForm = ({ school, setOpen }: UpdateSchoolProps) => {
  const form = useForm<UpdateSchoolInput>({
    resolver: zodResolver(updateSchoolSchema),
    defaultValues: {
      name: school.name,
      motto: school.motto,
      uuid: school.id,
    },
  });

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateSchool,
    onSuccess: async ({ data }) => {
      toast.success("Subject created", {
        id: "create-new-subject",
      });

      await queryClient.invalidateQueries({
        queryKey: ["schools"],
      });
      form.reset();
      setOpen((prev) => !prev);
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        id: "create-new-subject",
      });
    },
  });

  const onSubmit = (data: UpdateSchoolInput) => {
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
            name="motto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motto</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Motto" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="uuid"
            render={({ field }) => (
              <FormItem hidden>
                <FormLabel>UUID</FormLabel>
                <FormControl>
                  <Input {...field} hidden readOnly disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <ActionButton label="Update" status={updateMutation.status} />
      </form>
    </Form>
  );
};

export default UpdateSchoolForm;
