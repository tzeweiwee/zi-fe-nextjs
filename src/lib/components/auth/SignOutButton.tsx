"use client";

import { signOut } from "next-auth/react";
import { Button } from "@lib/components/ui/button";

export const SignOutButton = () => {
  return (
    <Button
      onClick={async () => {
        await signOut();
        window.location.href = "/";
      }}
    >
      Sign out
    </Button>
  );
};
