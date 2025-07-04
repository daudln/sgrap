import React from "react";
import { Button } from "@/components/ui/button";
import { LuLoader } from "react-icons/lu";
import { HookActionStatus } from "next-safe-action/hooks";
import { MutationStatus } from "@tanstack/react-query";

interface ActionButtonProps {
  status?: HookActionStatus | MutationStatus;
  backHref?: string;
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}
const ActionButton = ({ status, label, variant, disabled }: ActionButtonProps) => {
  return (
    <Button
      disabled={status === "executing" || status === "pending" || disabled}
      type="submit"
      className="w-full"
      variant={variant || "default"}
    >
      {status === "executing" || status === "pending" ? (
        <LuLoader className="inline-block mr-2 h-5 w-5 animate-spin cursor-not-allowed" />
      ) : null}
      {status === "executing" || status === "pending" ? "Please wait" : label}
    </Button>
  );
};

export default ActionButton;
