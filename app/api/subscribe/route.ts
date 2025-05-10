import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: token.id,
      },
    });
    const existingSubscription = await prisma.subscription.findUnique({
      where: {
        email,
      },
    });
    if (existingSubscription) {
      return NextResponse.json(
        { error: "You are already subscribed" },
        { status: 400 }
      );
    }

    await prisma.subscription.create({
      data: {
        email,
      },
    });

    await prisma.user.update({
      where: {
        id: token.id,
      },
      data: {
        hasSubscribed: true,
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

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { hasSubscribed } = await req.json();
    await prisma.user.update({
      where: {
        id: token.id,
      },
      data: {
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
