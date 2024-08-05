"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa";
import NumberTicker from "../magicui/number-ticker";
import Link from "next/link";
import { buttonVariants } from "./button";
import { FaStar } from "react-icons/fa";

export default function StarOnGithubButton() {
  const [stars, setStars] = useState(300);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch("https://api.github.com/repos/tteck/Proxmox", {
          next: { revalidate: 60 * 60 * 24 },
        });

        if (res.ok) {
          const data = await res.json();
          setStars(data.stargazers_count || stars);
        }
      } catch (error) {
        console.error("Error fetching stars:", error);
      }
    };
    fetchStars();
  }, [stars]);

  return (
    <Link
      className={cn(
        buttonVariants(),
        "hidden h-10 max-w-64 gap-2 overflow-hidden whitespace-pre lg:flex",
        "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
      )}
      target="_blank"
      href="https://github.com/tteck/Proxmox"
    >
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
      <div className="flex items-center">
        <FaGithub className="size-4" />
        <span className="ml-1">Star on GitHub</span>{" "}
      </div>
      <div className="ml-2 flex items-center gap-1 text-sm md:flex">
        <FaStar className="size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300" />
        <NumberTicker
          value={stars}
          className="font-display font-medium text-white dark:text-black"
        />
      </div>
    </Link>
  );
}
