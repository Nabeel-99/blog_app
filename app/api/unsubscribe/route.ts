import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?error=Email is required`
      );
    }
    await prisma.subscription.update({
      where: { email },
      data: { hasSubscribed: false },
    });
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?success=Unsubscribed successfully`
    );
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?error=Something went wrong`
    );
  }
}
