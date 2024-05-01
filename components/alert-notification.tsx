import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import React from "react";
import { cn } from "@/lib/utils";

interface AlertNoticationProps {
  title: string;
  description: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  className?: string;
  alertIcon?: React.ReactNode;
}
const AlertNotication = ({
  className,
  title,
  description,
  alertIcon,
  variant = "default",
}: AlertNoticationProps) => {
  return (
    <Alert className={cn("", className)} variant={variant}>
      {alertIcon && alertIcon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertNotication;
