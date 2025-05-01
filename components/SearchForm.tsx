"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { Post } from "@/lib/generated/prisma";
import Link from "next/link";
import { DialogClose } from "./ui/dialog";

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

  console.log("query", query);
  console.log("debouncedQuery", debouncedQuery);
  useEffect(() => {
    const fetchResult = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(`/api/search?query=${debouncedQuery}`);
        console.log(response.data);
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
    <div className="flex flex-col max-sm:max-h-[200px] overflow-scroll hide-scrollbar  md:max-h-[300px]  gap-2">
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
          {results.map((post: Post) => (
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
                  <span className="uppercase text-sm border bg-btn px-4 rounded-xl font-bold">
                    {post.category}
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
