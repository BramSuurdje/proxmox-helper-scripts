import Image from "next/image";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { Icons } from "./icons";
import { ModeToggle } from "./ModeToggle";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import NumberTicker from "./magicui/number-ticker";

export default async function Navbar() {
  let stars = 300; // Default value

  try {
    const response = await fetch("https://api.github.com/repos/tteck/Proxmox", {
      next: {
        revalidate: 3600,
      },
    });

    if (response.ok) {
      const data = await response.json();
      stars = data.stargazers_count || stars; // Update stars if API response is valid
    }
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
  }

  return (
    <div className="my-3 flex w-full justify-center">
      <div className="flex w-full max-w-7xl items-center justify-between gap-4 mx-6">
        <Link href={"/"} className="flex items-center gap-2 font-semibold">
          <Image
            src="https://raw.githubusercontent.com/tteck/Proxmox/main/misc/images/logo.png"
            alt="Proxmox Logo"
            width={20}
            height={20}
          />
          Proxmox VE Helper-Scripts
        </Link>
        <div className="flex items-center gap-2">
          <Link
            className={cn(
              buttonVariants(),
              "hidden max-w-64 gap-2 overflow-hidden whitespace-pre md:flex",
              "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
            )}
            target="_blank"
            href="https://github.com/tteck/Proxmox"
          >
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
            <div className="flex items-center">
              <Icons.gitHub className="size-4" />
              <span className="ml-1">Star on GitHub</span>{" "}
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <StarIcon className="size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300" />
              <NumberTicker
                value={stars}
                className="font-display font-medium text-white dark:text-black"
              />
            </div>
          </Link>
          <Link href={""}>
            <Button variant="ghost" size="icon">
              <Icons.gitHub className="h-4 w-4" />
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
