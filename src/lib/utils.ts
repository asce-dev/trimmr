import { clsx, type ClassValue } from "clsx";
import { randomBytes } from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateShortCode(length: number): string {
  return randomBytes(4).toString("base64url").slice(0, length);
}
