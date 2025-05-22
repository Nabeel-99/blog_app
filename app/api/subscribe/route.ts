import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }
    const existingEmail = await prisma.subscription.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    await prisma.subscription.create({
      data: {
        email,
        hasSubscribed: true,
      },
    });

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { hasSubscribed } = await req.json();
    await prisma.subscription.upsert({
      where: {
        email: token.email,
      },
      update: {
        hasSubscribed,
      },
      create: {
        email: token.email,
        hasSubscribed: hasSubscribed,
      },
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
