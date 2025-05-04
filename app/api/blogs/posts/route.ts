import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";
import { getToken } from "next-auth/jwt";
// cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token || token.role !== "ADMIN") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const rawCategory = formData.get("category") as string;
    const category: string[] = rawCategory
      ? JSON.parse(rawCategory.toString())
      : [];
    const coverImage = formData.get("coverImage") as File;
    const content = formData.get("content") as string;
    const slug = slugify(title, { lower: true, strict: true });

    if (!title || !description || !coverImage || !content) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    let coverImageUrl: string = "";
    let coverImageId: string = "";
    if (coverImage) {
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
      category.map(async (cat) => {
        return await prisma.category.upsert({
          where: {
            name: cat,
          },
          update: {},
          create: {
            name: cat,
          },
        });
      })
    );
    const post = await prisma.post.create({
      data: {
        title,
        description,
        categories: {
          connect: categoryRecords.map((cat) => ({ id: cat.id })),
        },
        coverImage: coverImageUrl,
        coverImageId: coverImageId,
        content,
        slug,
        authorId: token.id,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
