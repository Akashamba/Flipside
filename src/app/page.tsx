// import { api, HydrateClient } from "@/trpc/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Navbar from "../components/navbar";
import HomePage from "@/components/HomePage";
import LandingPage from "@/components/LandingPage";

export default async function Home() {
  return (
    <>
      <Navbar />
      <SignedIn>
        <HomePage />
      </SignedIn>
      <SignedOut>
        <LandingPage />
      </SignedOut>
    </>
  );
}
