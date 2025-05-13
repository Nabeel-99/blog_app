"use server";

import { signIn, signOut } from "@/auth";
import prisma from "./prisma";

export async function signOutAction() {
  await signOut();
}
export async function signInWithGoogle() {
  await signIn("google");
}
export async function signInWithLinkedIn() {
  await signIn("linkedin");
}

export async function incrementPostViews(slug: string) {
  try {
    const post = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        views: true,
      },
    });

    return { views: post.views };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to increment post views");
  }
}

export async function getPostViews(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
      select: {
        views: true,
      },
    });
    if (!post) {
      throw new Error("Post not found");
    }

    return { views: post.views };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get post views");
  }
}
