"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LandingPage } from "@/components/landing-page";
import { LoadingSpinner } from "@/components/loading-spinner";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.replace("/articles");
    }
  }, [router, session]);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (session) {
    return <LoadingSpinner />;
  }

  return <LandingPage />;
}
