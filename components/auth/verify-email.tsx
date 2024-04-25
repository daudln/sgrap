"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VerifyEmailInput, verifyEmailSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { verifyEmail } from "@/server/auth/actions";
import { useAction } from "next-safe-action/hooks";
import { useCallback, useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import FormResponseMessage from "../form-response-message";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function VerifyEmail({ token }: { token: string }) {
  const form = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      token: token,
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const { execute, status, result } = useAction(verifyEmail, {
    onSuccess: (data) => {
      if (!data.success) {
        setError(data.message);
        setSuccess("");
      }
      if (data.success) {
        setSuccess(data.message);
        setError("");
        router.push("/auth/login");
      }
      form.reset();
    },
    onError: (error) => {},
  });

  const onSubmit = useCallback(
    (data: VerifyEmailInput) => {
      if (success || error) return;
      execute(data);
    },
    [execute, success, error]
  );
  useEffect(() => {
    onSubmit({
      token: token,
    });
  }, [token, onSubmit]);
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Confirming Email</CardTitle>
        <CardDescription>
          Please wait while we confirm your email.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-col">
        {!error && !success && <BeatLoader />}
        <div className="p-4">
          {error && <FormResponseMessage message={error} type="error" />}
          {success && <FormResponseMessage message={success} />}
        </div>
        {!result?.data?.success && (
          <div className="flex justify-center">
            <Button variant="link">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
