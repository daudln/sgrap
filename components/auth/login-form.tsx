"use client";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { LoginInput, loginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormResponseMessage from "@/components/form-response-message";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/server/auth/actions";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import ActionButton from "@/components/action-button";
import CardWrapper from "@/components/card-wrapper";

export function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { execute, status } = useAction(login, {
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

  const onSubmit = (data: LoginInput) => {
    execute(data);
  };
  return (
    <CardWrapper
      headerLabel="Login"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      cardDescription="Provide your details below to sign in"
      showSocialButtons
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
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="forgot-password"
                      className="ml-auto inline-block text-sm underline text-gray-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-center text-sm space-y-2">
            <ActionButton status={status} label="Login" variant="default" />
          </div>
        </form>
      </Form>
      <div className="mt-4">
        {error && <FormResponseMessage message={error} type="error" />}
        {success && <FormResponseMessage message={success} type="success" />}
      </div>
    </CardWrapper>
  );
}
