"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function page() {
  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/articles",
    });
    console.log(data);
    // If ID token is provided no redirection will happen, and the user will be signed in directly.
    // const data = await authClient.signIn.social({
    //     provider: "google",
    //     idToken: {
    //         token: // Google ID Token,
    //         accessToken: // Google Access Token
    //     }
    // })
  };

  const signOut = async () => {
    await authClient.signOut();
  };

  const session = authClient.useSession();

  return (
    <div>
      <p>Hello</p>
      <div>
        <Button onClick={() => signIn()}>Test</Button>
      </div>
      <div>{JSON.stringify(session)}</div>
      <div>
        <Button onClick={() => signOut()}>signOut</Button>
      </div>
    </div>
  );
}
