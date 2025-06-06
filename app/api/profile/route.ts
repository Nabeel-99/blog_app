import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: isProduction,
  });
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { name, bio } = await req.json();
    const newUserData = await prisma.user.update({
      where: {
        id: token.id,
      },
      data: {
        name,
        bio,
      },
    });
    return NextResponse.json(newUserData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: isProduction,
  });
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    await prisma.like.deleteMany({
      where: {
        authorId: token.id,
      },
    });
    await prisma.reply.updateMany({
      where: {
        authorId: token.id,
      },
      data: {
        isUserDeleted: true,
      },
    });
    await prisma.comment.updateMany({
      where: {
        authorId: token.id,
      },
      data: {
        isUserDeleted: true,
      },
    });

    await prisma.user.delete({
      where: {
        id: token.id,
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
