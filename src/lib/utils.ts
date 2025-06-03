import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getMetadata(url: string) {
  const res = await fetch(url);
  const html = await res.text();

  const metadata = {
    title: html.split("<title>")[1]?.split("</title>")[0],
  };

  return metadata;
}
