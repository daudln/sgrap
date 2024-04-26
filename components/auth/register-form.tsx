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
import { RegisterInput, registerSchema } from "@/schema/auth";
import { register } from "@/server/auth/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormResponseMessage from "../form-response-message";
import ActionButton from "../action-button";
import CardWrapper from "../card-wrapper";

export function RegisterForm() {
  const [error, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { execute, status, result } = useAction(register, {
    onSuccess: (data) => {
      if (!data.success) {
        setMessage(data.message);
      }
      if (data.success) {
        setSuccess(data.message);
      }
      form.reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
      headerLabel="Register"
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
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="student" />
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

      <div className="mt-4">
        {error && <FormResponseMessage message={error} type="error" />}
        {success && <FormResponseMessage message={success} type="success" />}
      </div>
    </CardWrapper>
  );
}
