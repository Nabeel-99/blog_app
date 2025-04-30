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
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import slugify from "slugify";
import prisma from "@/lib/prisma";
import axios from "axios";
const BlogForm = () => {
  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      coverImage: undefined,
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof blogPostSchema>) => {
    console.log(data);
    const slug = slugify(data.title, { lower: true, strict: true });
    try {
      const response = await axios.post(
        "/api/posts",
        {
          ...data,
          slug,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
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
                  {form.watch("coverImage") && (
                    <img
                      src={URL.createObjectURL(
                        form.watch("coverImage") as File
                      )}
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
        <Button type="submit" className="bg-btn py-6">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default BlogForm;
