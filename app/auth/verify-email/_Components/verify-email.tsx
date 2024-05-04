"use client";

import { VerifyEmailInput, verifyEmailSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import CardWrapper from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { verifyEmail } from "../../_actions/actions";

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
        toast.dismiss("verifying-email");
        toast.error(data.message);
      }
      if (data.success) {
        toast.dismiss("verifying-email");
        toast.success(data.message);
        router.push("/auth/login");
      }

      form.reset();
    },
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
    <CardWrapper
      headerLabel="Confirming Email"
      cardDescription="Please wait!. You will be redirected to the login page"
    >
      {!error && !success && (
        <div className="flex justify-center">
          <BeatLoader className="flex justify-self-center" />
        </div>
      )}

      {!result?.data?.success && (
        <div className="flex justify-center">
          <Button variant="link">
            <Link href="/auth/login">Back to Login</Link>
          </Button>
        </div>
      )}
    </CardWrapper>
  );
}
