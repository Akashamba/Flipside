"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, LayersIcon, SearchIcon, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function LandingPage() {

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/articles",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex w-full items-center justify-between border-b border-border/50 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BookmarkIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Stash</span>
        </div>
        <Button
          asChild
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <Button onClick={handleSignIn}>Sign in</Button>
        </Button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance font-serif text-5xl leading-[1.1] font-medium tracking-tight text-foreground md:text-7xl">
            Your calm space for
            <br />
            <span className="text-primary">reading later</span>
          </h1>

          <p className="text-pretty mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Save articles with one click. Read them when you&apos;re ready.
            AI-powered summaries help you decide what&apos;s worth your time.
          </p>

          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="h-12 gap-3 bg-foreground px-8 text-base text-background hover:bg-foreground/90"
            >
              <Button onClick={handleSignIn}>Continue with Google</Button>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-24 grid max-w-4xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
              <SparklesIcon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 font-medium text-foreground">AI Summaries</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Get instant summaries of every article so you know what&apos;s worth
              reading.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <SearchIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-medium text-foreground">Semantic Search</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Find articles by meaning, not just keywords. Your knowledge,
              searchable.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <LayersIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-2 font-medium text-foreground">Clean Reading</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Distraction-free reading with beautiful typography. Focus on what
              matters.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 px-6 py-6 text-center text-sm text-muted-foreground">
        <p>Built for readers who value their attention.</p>
      </footer>
    </div>
  );
}
