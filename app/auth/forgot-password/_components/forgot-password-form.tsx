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
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { forgotPassword } from "../../_actions/actions";

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { execute, status } = useAction(forgotPassword, {
    onSuccess: (data) => {
      if (!data.success) {
        toast.dismiss("forgot-password");
        toast.error(data.message);
      }
      if (data.success) {
        toast.dismiss("forgot-password");
        toast.success(data.message);
      }
      if (status === "executing") toast.loading("Sending reset link...");
      if (status === "idle") toast.dismiss("forgot-password");

      form.reset();
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    execute(data);
  };
  return (
    <CardWrapper
      headerLabel="Forgot Password"
      backButtonLabel="Don't have an account?"
      // backButtonHref="/auth/register"
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
            <ActionButton label="Get Reset Link" status={status} />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
