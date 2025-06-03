import { SignUp as ClerkSignUpUI } from "@clerk/nextjs";
import React from "react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ClerkSignUpUI />
    </div>
  );
}
