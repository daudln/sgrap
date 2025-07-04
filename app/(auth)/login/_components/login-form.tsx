"use client";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { type LoginInput, loginSchema } from "@/schema/uaa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signIn } from "@/app/(auth)/_actions/actions";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { execute, status } = useAction(signIn, {
    onSettled: ({ result: { data } }) => {
      if (!data?.success) {
        toast.dismiss("logging-in");
        toast.error(data?.message);
      }
      if (data?.success) {
        toast.dismiss("logging-in");
        toast.success(data.message);
        router.push("/");
      }
    },
    onSuccess: ({ data }) => {
      form.reset();
    },
  });

  const onSubmit = (data: LoginInput) => {
    execute(data);
  };
  return (
    <CardWrapper
      headerLabel="Login to SGRAP"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      cardDescription="Provide your details below to sign in"
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
                    <Input {...field} type="password" placeholder="•••••••••" />
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
    </CardWrapper>
  );
}
