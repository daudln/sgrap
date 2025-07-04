"use client";

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
import authClient from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ResetPasswordForm({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async ({ newPassword }: ResetPasswordInput) => {
    await authClient.resetPassword({
      newPassword: newPassword,
      token,
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onError: () => {
          toast.error("Invalid token");
          setIsLoading(false);
          router.push("/login");
        },

        onSuccess: () => {
          toast.success("Password reset successfully");
          setIsLoading(false);
          router.push("/login");
        },
      },
    });
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
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="•••••••••"
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
                        placeholder="•••••••••"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-center text-sm space-y-2">
              <ActionButton
                label="Reset Password"
                status={isLoading ? "pending" : "idle"}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
