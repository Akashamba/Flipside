"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = authClient.useSession().data?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/articles",
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={user ? "/articles" : "/"}
            className="flex items-center space-x-2"
          >
            <BookOpen className="text-primary h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">Flipside</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {user && (
              <>
                <Link
                  href="/articles"
                  className="hover:text-primary text-gray-700 transition-colors"
                >
                  Articles
                </Link>
                <Link
                  href="/import"
                  className="hover:text-primary text-gray-700 transition-colors"
                >
                  Import CSV
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden items-center space-x-4 md:flex">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.image || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex flex-col items-start">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {user.email}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleSignIn}>Sign In</Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="animate-fade-in md:hidden">
            <div className="space-y-1 border-t px-2 pt-2 pb-3 sm:px-3">
              {user ? (
                <>
                  <Link
                    href="/articles"
                    className="hover:text-primary block px-3 py-2 text-gray-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Articles
                  </Link>
                  <Link
                    href="/import"
                    className="hover:text-primary block px-3 py-2 text-gray-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Import CSV
                  </Link>
                  <div className="border-t pt-2">
                    <div className="px-3 py-2">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-muted-foreground text-sm">
                        {user.email}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Button>
                  </div>
                </>
              ) : (
                <Button onClick={handleSignIn} className="w-full">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
