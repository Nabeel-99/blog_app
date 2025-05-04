"use server";

import { signIn, signOut } from "@/auth";

export async function signOutAction() {
  await signOut();
}
export async function signInWithGoogle() {
  await signIn("google");
}
export async function signInWithLinkedIn() {
  await signIn("linkedin");
}
