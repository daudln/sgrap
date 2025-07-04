"use client";

import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };
  // This button is used inside the dropdown menu
  return (
    <Button
      variant="ghost"
      className="w-full h-[60%] gap-2"
      size="icon"
      onClick={handleLogout}
    >
      <LogOut className="size-4" /> Logout
    </Button>
  );
}
