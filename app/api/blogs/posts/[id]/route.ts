import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getToken } from "next-auth/jwt";
import slugify from "slugify";
import prisma from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token || token.role !== "ADMIN") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        coverImageId: true,
      },
    });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (post.coverImageId) {
      await cloudinary.uploader.destroy(post.coverImageId);
    }
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token || token.role !== "ADMIN") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const rawCategory = formData.get("category") as string;
    const category: string[] = rawCategory
      ? JSON.parse(rawCategory.toString())
      : [];
    const coverImage = (formData.get("coverImage") as File) || null;
    const content = formData.get("content") as string;
    const slug = slugify(title, { lower: true, strict: true });

    if (!title || !description || !content) {
      return NextResponse.json(
        { error: "Title, description and content are required" },
        { status: 400 }
      );
    }
    const existingPost = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        coverImageId: true,
        coverImage: true,
      },
    });
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    let coverImageUrl = existingPost.coverImage;
    let coverImageId = existingPost.coverImageId;

    if (coverImage) {
      if (existingPost.coverImageId) {
        await cloudinary.uploader.destroy(existingPost.coverImageId);
      }
      const buffer = Buffer.from(await coverImage.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME,
              public_id: `${slug}-${Date.now()}`,
            },
            (err, result) => {
              err ? reject(err) : resolve(result);
            }
          )
          .end(buffer);
      });
      coverImageUrl = (uploadResult as any).secure_url;
      coverImageId = (uploadResult as any).public_id;
    }
    const categoryRecords = await Promise.all(
      category.map(async (catName) => {
        return await prisma.category.upsert({
          where: { name: catName },
          update: {},
          create: { name: catName },
        });
      })
    );

    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        description,
        categories: {
          set: [],
          connect: categoryRecords.map((cat) => ({ id: cat.id })),
        },
        coverImage: coverImageUrl,
        coverImageId,
        content,
        slug,
        authorId: token.id,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error updating post" }, { status: 500 });
  }
}
