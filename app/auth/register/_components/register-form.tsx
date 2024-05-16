"use client";

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
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import ActionButton from "@/components/action-button";
import CardWrapper from "@/components/card-wrapper";
import { RegisterInput, registerSchema } from "@/schema/auth";
import { signUp } from "../../_actions/actions";
import { toast } from "sonner";

export function RegisterForm() {
  const { execute, status } = useAction(signUp, {
    onSuccess: (data) => {
      if (!data.success) {
        toast.dismiss("registering-user");
        toast.error(data.message);
      }
      if (data.success) {
        toast.dismiss("registering-user");
        toast.success(data.message);
      }

      form.reset();
    },
  });

  if (status === "executing") {
    toast.loading("Registering...", {
      id: "registering-user",
    });
  }

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: RegisterInput) => {
    execute(data);
  };
  return (
    <CardWrapper
      headerLabel="Register to SGRAP"
      backButtonLabel="Already have an account? Sign in"
      cardDescription="Provide your details below to create an account"
      backButtonHref="/auth/login"
      showSocialButtons
    >
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Daud Linus Namayala" />
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
                      placeholder="daudnamayala@example.com"
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
                    <Input {...field} type="password" placeholder="********" />
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
                    <Input {...field} type="password" placeholder="********" />
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
