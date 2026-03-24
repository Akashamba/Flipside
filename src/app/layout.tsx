import type React from "react";
import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Stash - Your Calm Reading Space",
  description: "Save articles, read later. A premium read-it-later experience.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider>
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${sourceSerif.variable} font-sans antialiased`}
        >
          <div className="min-h-screen">{children}</div>
        </body>
      </html>
    </TRPCReactProvider>
  );
}
