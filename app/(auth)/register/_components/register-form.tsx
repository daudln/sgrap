"use client";

import { register } from "@/app/(auth)/_actions/actions";
import ActionButton from "@/components/action-button";
import CardWrapper from "@/components/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function RegisterForm() {
  const { execute, status } = useAction(register, {
    onSettled: ({ result: { data } }) => {
      toast.dismiss("registering-user");
      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.error(data?.message);
      }
    },
    onSuccess: ({}) => {
      form.reset();
    },
  });

  if (status === "executing") {
    toast.loading("Registering...", {
      id: "registering-user",
    });
  }

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    execute(data);
  };

  return (
    <CardWrapper
      headerLabel="Register to SGRAP"
      backButtonLabel="Already have an account? Sign in"
      cardDescription="Provide your details below to create an account"
      backButtonHref="/login"
      showSocialButtons
    >
      <Form {...form}>
        <form
          className="grid gap-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="•••••••••" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="•••••••••" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-center text-sm space-y-2">
            <ActionButton status={status} label="Signup" />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
