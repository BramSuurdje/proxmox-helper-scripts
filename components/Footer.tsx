import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="glass w-full border-b bg-background/50 border-t py-6 text-center">
      tteck. All rights reserved. |{" "}
      <Link className="hover:underline" href="/terms-of-use">Terms of Use</Link>
    </div>
  );
}
