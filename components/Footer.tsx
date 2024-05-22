import Link from "next/link";
import React from "react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <div className="glass inline-flex w-full justify-center border-y bg-background/50 py-6 text-center">
      <p className="text-sm sm:text-base">
        Copyright {year} Bram. All rights reserved. |{" "}
        <Link
          className="text-sm text-foreground hover:underline sm:text-base "
          href="/terms-of-use"
          data-umami-event="Terms of Use"
        >
          Terms of Use
        </Link>
      </p>
    </div>
  );
}
