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
import { LoginInput, loginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import FormResponseMessage from "../form-response-message";

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
import ActionButton from "../action-button";

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
  const { execute, status, result } = useAction(login, {
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
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
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
              <ActionButton status={status} label="Login" />
              <Button variant="outline" className="w-full">
                <FcGoogle className="mr-2 h-5 w-5" />
                Continue with Google
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
