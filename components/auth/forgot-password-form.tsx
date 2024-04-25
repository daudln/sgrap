"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ForgotPasswordInput, forgotPasswordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormResponseMessage from "../form-response-message";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPassword } from "@/server/auth/actions";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { execute, status, result } = useAction(forgotPassword, {
    onSuccess: (data) => {
      if (!data?.success) {
        setError(data?.message);
        setSuccess("");
      }
      if (data?.success) {
        setSuccess(data?.message);
        setError("");
      }
      form.reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    execute(data);
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your email below to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              <Button type="submit" className="w-full">
                Get Reset Link
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="register" className="underline">
            Sign up
          </Link>
        </div>
        <div className="mt-4">
          {error && <FormResponseMessage message={error} type="error" />}
          {success && <FormResponseMessage message={success} type="success" />}
        </div>
      </CardContent>
    </Card>
  );
}
