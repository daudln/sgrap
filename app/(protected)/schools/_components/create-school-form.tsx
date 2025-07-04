"use client";

import { Dispatch, SetStateAction } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { useTRPC } from "@/trpc/client";
import {
  createSchoolSchema,
  SchoolLevelEnum,
  SchoolTypeEnum,
} from "@/db/schema/school";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectInput } from "@/components/select-input";
import ActionButton from "@/components/action-button";

interface CreateSchoolProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateSchoolForm = ({ setOpen }: CreateSchoolProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createSchool = trpc.school.create.mutationOptions();

  const form = useForm<z.infer<typeof createSchoolSchema>>({
    resolver: zodResolver(createSchoolSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      level: "PRIMARY",
      phone: "",
      registrationNumber: "",
      type: "PRIVATE",
      website: "",
      regionId: "",
      districtId: "",
      wardId: "",
      streetId: "",
    },
  });

  const regionId = useWatch({ control: form.control, name: "regionId" });
  const districtId = useWatch({ control: form.control, name: "districtId" });
  const wardId = useWatch({ control: form.control, name: "wardId" });

  const { data: regions, isLoading: regionsLoading } = useQuery(
    trpc.setting.getRegions.queryOptions()
  );

  const { data: districts = [], isLoading: districtsLoading } = useQuery(
    trpc.setting.getDistricts.queryOptions(
      { regionId: regionId ?? "" },
      {
        enabled: !!regionId,
      }
    )
  );

  const { data: wards = [], isLoading: wardsLoading } = useQuery(
    trpc.setting.getWards.queryOptions(
      { districtId: districtId ?? "" },
      {
        enabled: !!districtId,
      }
    )
  );

  const { data: streets = [], isLoading: streetsLoading } = useQuery(
    trpc.setting.getStreets.queryOptions(
      { wardId: wardId ?? "" },
      {
        enabled: !!wardId,
      }
    )
  );

  const regionOptions =
    regions?.map((r) => ({ value: r.id, label: r.name })) ?? [];

  const districtOptions =
    districts?.map((d) => ({ value: d.id, label: d.name })) ?? [];

  const wardOptions = wards?.map((w) => ({ value: w.id, label: w.name })) ?? [];

  const streetOptions =
    streets?.map((s) => ({ value: s.id, label: s.name })) ?? [];

  const mutation = useMutation({
    mutationFn: createSchool.mutationFn,
    onSuccess: async () => {
      toast.success("School created", { id: "create-new-school" });
      queryClient.invalidateQueries({
        queryKey: trpc.school.getAll.queryKey(),
      });
      form.reset();
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong", { id: "create-new-school" });
    },
  });

  const onSubmit = (data: z.infer<typeof createSchoolSchema>) =>
    mutation.mutate({
      ...data,
      registrationNumber: data.registrationNumber.toUpperCase(),
      email: data.email?.toLowerCase(),
    });

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
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration No.</FormLabel>
              <FormControl>
                <Input {...field} placeholder="S.12345" className="uppercase" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={() => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <SelectInput
                  className="w-full"
                  onChange={(val) =>
                    form.setValue("type", val as SchoolTypeEnum)
                  }
                  options={[
                    { label: "Government", value: "GOVERNMENT" },
                    { label: "Private", value: "PRIVATE" },
                  ]}
                  label="Type"
                  placeholder="Select type"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={() => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <FormControl>
                <SelectInput
                  className="w-full"
                  onChange={(val) =>
                    form.setValue("level", val as SchoolLevelEnum)
                  }
                  options={[
                    { label: "Nursery", value: "NURSERY" },
                    { label: "Pre Primary", value: "PRE_PRIMARY" },
                    { label: "Primary", value: "PRIMARY" },
                    { label: "Secondary", value: "SECONDARY" },
                  ]}
                  label="Level"
                  placeholder="Select level"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="school@mail.ac.tz"
                  className="lowercase"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="4040, Mpanda"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="regionId"
          render={() => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <SelectInput
                  className="w-full"
                  options={regionOptions}
                  isLoading={regionsLoading}
                  label="Region"
                  placeholder="Select region"
                  onChange={(val) => {
                    form.setValue("regionId", val);
                    form.setValue("districtId", "");
                    form.setValue("wardId", "");
                    form.setValue("streetId", "");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="districtId"
          render={() => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <SelectInput
                  className="w-full"
                  options={districtOptions}
                  isLoading={districtsLoading}
                  disabled={!form.getValues("regionId")}
                  label="District"
                  placeholder="Select district"
                  onChange={(val) => {
                    form.setValue("districtId", val);
                    form.setValue("wardId", "");
                    form.setValue("streetId", "");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wardId"
          render={() => (
            <FormItem>
              <FormLabel>Ward</FormLabel>
              <FormControl>
                <SelectInput
                  className="w-full"
                  options={wardOptions}
                  isLoading={wardsLoading}
                  disabled={!form.getValues("districtId")}
                  label="Ward"
                  placeholder="Select ward"
                  onChange={(val) => {
                    form.setValue("wardId", val);
                    form.setValue("streetId", "");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="streetId"
          render={() => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <SelectInput
                  className="w-full"
                  options={streetOptions}
                  isLoading={streetsLoading}
                  disabled={!form.getValues("wardId")}
                  label="Street"
                  placeholder="Select street"
                  selectedValue={form.getValues("streetId")}
                  onChange={(val) => form.setValue("streetId", val)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ActionButton label="Create School" status={mutation.status} />
      </form>
    </Form>
  );
};

export default CreateSchoolForm;
