"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema } from "@/lib/validation";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Post } from "@/lib/generated/prisma";

type BlogFormProps = {
  post?: {
    id: number;
    title: string;
    description: string;
    category: string | null;
    coverImage: string;
    content: string;
    slug: string;
  };
};
const BlogForm = ({ post }: BlogFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      category: post?.category || "",
      coverImage: undefined,
      content: post?.content || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof blogPostSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.category) formData.append("category", data.category);
    formData.append("coverImage", data.coverImage);
    formData.append("content", data.content);
    setLoading(true);
    try {
      const response = post
        ? await axios.put(`/api/blogs/posts/${post.id}`, formData)
        : await axios.post("/api/blogs/posts", formData);
      if (response.status === 201 || response.status === 200) {
        form.reset();
        toast.success(
          post ? "Blog updated successfully" : "Blog created successfully"
        );
        router.push(`/blogs/${response.data.slug}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        post ? "Error updating blog post." : "Error creating blog post."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" mt-10 flex flex-col gap-6 w-full max-w-2xl"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-md">Title</FormLabel>
              <FormControl>
                <Input {...field} className="" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-md">Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-md">Category (optional)</FormLabel>
              <FormControl>
                <Input {...field} className="" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel className=" text-md">Cover Image</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    ref={ref}
                    className=""
                  />
                  {(form.watch("coverImage") || post?.coverImage) && (
                    <img
                      src={
                        form.watch("coverImage")
                          ? URL.createObjectURL(
                              form.watch("coverImage") as File
                            )
                          : post?.coverImage
                      }
                      alt="Preview"
                      className="w-32 h-32 object-contain ml-2"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-md">Content</FormLabel>
              <FormControl>
                <MDEditor
                  {...field}
                  value={field.value}
                  onChange={(value) => field.onChange(value as string)}
                  id="content"
                  style={{
                    borderRadius: 10,
                    border: "1px solid #dadada",
                    overflow: "hidden",
                    padding: 10,
                  }}
                  data-color-mode="light"
                  height={300}
                  textareaProps={{
                    placeholder: "Type your blog content here...",
                  }}
                  previewOptions={{
                    disallowedElements: ["style"],
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "cursor-not-allowed bg-[#7c4ee4] text-white" : "bg-btn"
          }  py-6`}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default BlogForm;
