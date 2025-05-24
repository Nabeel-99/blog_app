"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";

import { Prisma } from "@/lib/generated/prisma";
import Link from "next/link";
import { DialogClose } from "../ui/dialog";
import api from "@/lib/axios";

type BlogSearchProps = Prisma.PostGetPayload<{
  include: { categories: { select: { id: true; name: true } } };
}>;
const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const fetchResult = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const response = await api.get(`/search?query=${debouncedQuery}`);
        setResults(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [debouncedQuery]);
  return (
    <div className="flex flex-col  overflow-scroll hide-scrollbar  md:max-h-[300px]  gap-2">
      <div className="flex items-center border border-[#dadada] rounded-xl">
        <Input
          placeholder="Search by title or category..."
          name="query"
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" title="search">
          <CiSearch
            type="submit"
            className="cursor-pointer px-2 text-[#5d5d5d] max-sm:size-8 size-10 bg-[#f2f2f2] rounded-r-xl"
          />
        </button>
      </div>
      <p className="text-[#515151]">{loading ? "Searching..." : ""} </p>
      {results.length > 0 && (
        <ul className="mt-4   flex flex-col">
          {results.map((post: BlogSearchProps) => (
            <li
              key={post.id}
              className="hover:bg-[#f2f2f2] px-2 py-2 rounded-xl"
            >
              <DialogClose asChild>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="line-clamp-1"> {post.title}</span>
                  <span className="">
                    {post.categories.length > 0 && (
                      <div className="flex items-center text-sm">
                        <span className="text-white text-center px-2 py-1 rounded-xl bg-[#C71585]  ">
                          {query
                            ? post.categories.find((c) =>
                                c.name
                                  .toLowerCase()
                                  .includes(query.toLowerCase())
                              )?.name ?? post.categories[0].name
                            : post.categories[0].name}
                        </span>

                        {post.categories.length > 1 && (
                          <span className="px-2 py-1 rounded-full border bg-[#C71585]  text-white border-[#dadada] flex items-center justify-center">
                            +{post.categories.length - 1}
                          </span>
                        )}
                      </div>
                    )}
                  </span>
                </Link>
              </DialogClose>
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 && query && !loading && (
        <p className="text-[#515151]">No results found</p>
      )}
    </div>
  );
};

export default SearchForm;
