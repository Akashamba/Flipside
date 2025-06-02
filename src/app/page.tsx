import Link from "next/link";

// import { api, HydrateClient } from "@/trpc/server";
import { SignIn, SignInButton } from "@clerk/nextjs";
import Navbar from "./components/navbar";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <>
      <Navbar />
      <div>Hello</div>
    </>
  );
}
