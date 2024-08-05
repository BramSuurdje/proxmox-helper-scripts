import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="supports-backdrop-blur:bg-background/90 mt-auto flex justify-center border-t border-border bg-background/40 py-6 backdrop-blur-lg">
      <div className="mx-6 w-full max-w-7xl text-sm">
        Build by{" "}
        <Link
          href="https://github.com/BramSuurdje"
          className="font-semibold underline-offset-2 duration-300 hover:underline"
          target="_blank"
          rel="noreferrer"
          data-umami-event="View Bram Suurd on Github"
        >
          Bram Suurd
        </Link>
        . The source code is avaliable on{" "}
        <Link
          href="https://github.com/BramSuurdje/proxmox-helper-scripts"
          target="_blank"
          rel="noreferrer"
          className="font-semibold underline-offset-2 duration-300 hover:underline "
          data-umami-event="View Website Source Code on Github"
        >
          GitHub
        </Link>
        .
      </div>
    </div>
  );
}
