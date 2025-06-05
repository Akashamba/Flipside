"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";
import ArticlesPage from "./articles-page";

export default function page() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">
        <p>Error loading articles: {error?.message}</p>
        <Button onClick={() => refetch()} variant="outline" className="mt-2">
          Retry
        </Button>
      </div>
    );
  }

  if (!session) {
    return (
      <div>
        Something went wrong
        {/* Should be buttons to sign in or go home */}
      </div>
    );
  }

  return <ArticlesPage />;
}
