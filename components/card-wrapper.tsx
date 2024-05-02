import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Social from "@/components/social";
import BackButton from "./back-button";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  cardDescription?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocialButtons?: boolean;
  className?: string;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocialButtons,
  cardDescription,
  className,
}: CardWrapperProps) => {
  return (
    <div className="p-4 xl:px-32 size-full flex items-center justify-center">
      <Card className={cn("min-w-96 shadow-md", className)}>
        <CardHeader>
          <CardTitle className="text-3xl">{headerLabel}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocialButtons && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        {backButtonLabel && (
          <CardFooter>
            <BackButton label={backButtonLabel} backHref={backButtonHref} />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default CardWrapper;
