import Link from "next/link";
import React from "react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <div className="glass w-full border-b border-t bg-background/50 py-6 text-center">
      Copyright {year} tteck. All rights reserved. |{" "}
      <Link className="hover:underline" href="/terms-of-use">
        Terms of Use
      </Link>
    </div>
  );
}
