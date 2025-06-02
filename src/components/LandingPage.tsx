import { SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <p>Sign in to start using Flipside</p>
      <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
