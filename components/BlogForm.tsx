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
import { FaXmark } from "react-icons/fa6";
import { ImSpinner } from "react-icons/im";
import { Label } from "./ui/label";

type BlogFormProps = {
  post?: {
    id: number;
    title: string;
    description: string;
    categories: { id: number; name: string }[];
    coverImage: string;
    content: string;
    slug: string;
  };
};
const BlogForm = ({ post }: BlogFormProps) => {
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState("");
  const [categories, setCategories] = useState<string[]>(
    post?.categories.map((c) => c.name) || []
  );
  const addCategory = () => {
    if (!cat.trim()) return;
    const updated = [...categories, cat.trim()];
    setCategories(updated);
    form.setValue("category", updated);
    setCat("");
  };

  const removeCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
    form.setValue("category", newCategories);
  };
  const router = useRouter();
  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      category: post?.categories.map((c) => c.name) || [],
      coverImage: post?.coverImage || "",
      content: post?.content || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof blogPostSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.category) {
      formData.append("category", JSON.stringify(data.category || []));
    }
    if (data.coverImage instanceof File) {
      formData.append("coverImage", data.coverImage);
    }
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
        className=" mt-10 flex flex-col gap-6 w-full lg:max-w-2xl"
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

        <div className="flex items-center gap-10">
          <Input
            className=""
            type="text"
            placeholder="Category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCategory();
              }
            }}
          />
          <Button
            onClick={addCategory}
            type="button"
            className="border bg-btn py-5 rounded-xl"
          >
            Add Category
          </Button>
          <input
            type="hidden"
            {...form.register("category")}
            value={JSON.stringify(categories)}
          />
        </div>
        {categories.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {categories.map((c, index) => (
              <div
                key={index}
                className="flex  border py-1 border-[#dadada] px-2 rounded-lg items-center justify-between gap-6"
              >
                {c}
                <Button
                  type="button"
                  className="bg-gray-50 rounded-full"
                  onClick={() => removeCategory(index)}
                >
                  <FaXmark />
                </Button>
              </div>
            ))}
          </div>
        )}
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel className=" text-md">Cover Image</FormLabel>
              <FormControl>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="coverImage"
                    className="border cursor-pointer px-3 py-3 bg-[#C71585] rounded-lg  bg-btn"
                  >
                    Upload Image
                  </Label>
                  <Input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    ref={ref}
                    className="hidden"
                  />
                  {(form.watch("coverImage") || post?.coverImage) && (
                    <img
                      src={
                        form.watch("coverImage") instanceof File
                          ? URL.createObjectURL(
                              form.watch("coverImage") as File
                            )
                          : (form.watch("coverImage") as string) ||
                            post?.coverImage
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
            loading ? "cursor-not-allowed  text-white" : ""
          } bg-btn py-6`}
        >
          {loading ? (
            <ImSpinner className="animate-spin" />
          ) : post ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default BlogForm;
