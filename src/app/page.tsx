import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { SignIn, SignInButton } from "@clerk/nextjs";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <div>
      Hello
      <SignInButton />
    </div>
  );
}
