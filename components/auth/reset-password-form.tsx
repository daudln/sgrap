"use client";

import FormResponseMessage from "@/components/form-response-message";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResetPasswordInput, resetPasswordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ActionButton from "@/components/action-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPassword } from "@/server/auth/actions";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

export function ResetPasswordForm({ token }: { token: string }) {
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
      token: token,
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setMessage] = useState<string | undefined>("");
  const { execute, status, result } = useAction(resetPassword, {
    onSuccess: (data) => {
      if (!data.success) {
        setError(data.message);
        setMessage("");
      }
      if (data.success) {
        setMessage(data.message);
        setError("");
      }
      form.reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: ResetPasswordInput) => {
    execute(data);
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password. Please make sure to remember it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="********"
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
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <div className="flex items-center">
                      <FormLabel>Confirm Password</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-center text-sm space-y-2">
              <ActionButton status={status} label="Reset Password" />
            </div>
          </form>
        </Form>
        <div className="mt-4">
          {error && <FormResponseMessage message={error} type="error" />}
          {success && <FormResponseMessage message={success} type="success" />}
        </div>
      </CardContent>
    </Card>
  );
}
