import React, { Suspense } from "react";
import markdownit from "markdown-it";
import NewsLetter from "@/components/NewsLetter";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa6";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import RecentPosts from "@/components/RecentPosts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CommentCard from "@/components/CommentCard";
import LikeButton from "@/components/LikeButton";
import { auth } from "@/auth";
import ScrollTrigger from "@/components/ScrollTrigger";
import { Skeleton } from "@/components/ui/skeleton";
import Views from "@/components/Views";

const md = markdownit();
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const session = await auth();
  let user = null;
  if (session?.user.id) {
    user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
  }
  const subscription = await prisma.subscription.findUnique({
    where: {
      email: user?.email || "",
    },
    select: {
      hasSubscribed: true,
    },
  });
  const isSubscribed = subscription?.hasSubscribed;
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      author: true,
      categories: true,
      likes: true,
      comments: {
        include: {
          author: true,
          likes: true,
          replies: {
            include: {
              author: true,
              likes: true,
            },
          },
        },
      },
    },
  });
  if (!post) return notFound();
  const parsedContent = md.render(post?.content || "");

  return (
    <>
      <div className="bg-[#f6f6f6]">
        <section>
          <div className="px-4 pt-10 lg:px-20 lg:pt-20">
            <div className="flex flex-col items-center justify-center  gap-3 mb-8">
              {post.categories.length > 0 && (
                <div className="flex flex-wrap justify-center  items-center gap-3">
                  {post.categories.map((category) => (
                    <span
                      key={category.id}
                      className="text-white text-center px-2 py-1 rounded-xl bg-background"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
              <span className="text-[#655f5f]">
                {formatDate(post.createdAt)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-10">
              <h1 className="text-3xl max-w-5xl lg:text-5xl text-center  font-bold">
                {post.title}
              </h1>
              <img
                src={post.coverImage}
                alt="AI"
                className="w-full lg:w-4xl max-h-[600px] rounded-2xl object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 max-w-5xl mt-20 text-xl pb-10 mx-auto w-full">
              {parsedContent ? (
                <article
                  className="markdown prose  prose-lg hide-scrollbar prose-headings:font-bold prose-headings:text-black overflow-scroll  prose-p:text-gray-800 prose-ul:list-disc prose-strong:text-black prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 break-words"
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                />
              ) : (
                <p>No details provided.</p>
              )}
              <Suspense>
                <ScrollTrigger user={user} isSubscribed={isSubscribed} />
              </Suspense>
            </div>
            <div className="flex sticky bottom-10 bg-white shadow-sm  z-50 gap-4  items-center justify-around w-[120px] max-w-[300px] mx-auto   border border-[#dadada]  rounded-full p-3">
              <div className="flex items-center gap-4">
                <LikeButton
                  session={session}
                  likes={post.likes}
                  apiRoute={`/api/blogs/posts/${post.id}/like`}
                />

                <Sheet>
                  <SheetTrigger asChild className="cursor-pointer">
                    <div className="flex items-center gap-1">
                      <FaRegCommentDots className="size-6 text-[#585858]" />
                      {post.comments.length > 0 && (
                        <span>{post.comments.length}</span>
                      )}
                    </div>
                  </SheetTrigger>
                  <SheetContent
                    aria-describedby=""
                    className="bg-white w-full sm:max-w-md"
                  >
                    <SheetHeader>
                      <SheetTitle className="text-2xl font-bold">
                        Comments
                      </SheetTitle>
                    </SheetHeader>
                    <CommentCard post={post} />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <div className="flex  justify-end lg:sticky  lg:bottom-10 lg:right-10  gap-4 w-full    rounded-full p-3">
              <Views slug={slug} />
            </div>
          </div>
        </section>
        <section>
          <div className="lg:px-20 flex flex-col gap-10 px-4 mt-10 2xl:container 2xl:w-full 2xl:mx-auto lg:mt-50">
            <div className="flex items-center justify-between">
              <p className="text-lg lg:text-2xl font-bold">Recent Posts</p>
              <Link href={"/blogs"}>
                <Button className="bg-btn py-6 px-6 text-white">
                  View All
                </Button>
              </Link>
            </div>
            <Suspense fallback={<BlogCardSkeleton />}>
              <RecentPosts />
            </Suspense>
          </div>
        </section>
        <section>
          <div className="mt-20 lg:mt-40">
            <NewsLetter isSubscribed={isSubscribed} />
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
