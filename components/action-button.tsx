import React from "react";
import { Button } from "@/components/ui/button";
import { LuLoader2 } from "react-icons/lu";
import { HookActionStatus } from "next-safe-action/hooks";

interface ActionButtonProps {
  status?: HookActionStatus;
  backHref?: string;
  label: string;
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
const ActionButton = ({ status, label, variant }: ActionButtonProps) => {
  return (
    <Button
      disabled={status === "executing"}
      type="submit"
      className="w-full"
      variant={variant || "default"}
    >
      {status === "executing" ? (
        <LuLoader2 className="inline-block mr-2 h-5 w-5 animate-spin cursor-not-allowed" />
      ) : null}
      {status === "executing" ? "Please wait" : label}
    </Button>
  );
};

export default ActionButton;
