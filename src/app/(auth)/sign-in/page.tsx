import { SignIn as ClerkSignInUI } from "@clerk/nextjs";
import React from "react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ClerkSignInUI />
    </div>
  );
}
