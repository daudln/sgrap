"use client";

import { Input } from "@/components/ui/input";
import { ForgotPasswordInput, forgotPasswordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { toast } from "sonner";
import authClient from "@/lib/auth-client";

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: ForgotPasswordInput) => {
    await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
      fetchOptions: {
        onError: (error) => {
          toast.dismiss("forgot-password");
          console.log(error);
        },

        onSuccess: () => {
          toast.dismiss("forgot-password");
          toast.success("Password reset link sent successfully");
        },
      },
    });
  };
  return (
    <CardWrapper
      headerLabel="Forgot Password"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      cardDescription="Provide your details below to reset your password"
    >
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                      placeholder="student@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-center text-sm space-y-2">
            <ActionButton label="Get Reset Link" />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
