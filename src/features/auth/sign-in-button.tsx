"use client";

import { Button } from "@/shared/ui/button";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

export function SignInButton() {
  const handleSignIn = () => signIn();
  return (
    <Button onClick={handleSignIn}>
      <LogIn className="mr-2 h-4 w-4" />
      Sign in
    </Button>
  );
}
