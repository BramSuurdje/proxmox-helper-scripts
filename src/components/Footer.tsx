import Link from "next/link";

export default function Footer() {
  return (
    <div className="supports-backdrop-blur:bg-background/90 justify-betw mt-auto flex border-t border-border bg-background/40 py-6 backdrop-blur-lg">
      <div className="flex w-full justify-between">
        <div className="mx-6 w-full max-w-7xl text-sm">
          Website build by{" "}
          <Link
            href="https://github.com/BramSuurdje"
            className="font-semibold underline-offset-2 duration-300 hover:underline"
            target="_blank"
            rel="noreferrer"
            data-umami-event="View Bram on Github"
          >
            Bram Suurd
          </Link>
          . The source code is avaliable on{" "}
          <Link
            href="https://github.com/BramSuurdje/proxmox-helper-scripts"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline-offset-2 duration-300 hover:underline"
            data-umami-event="View Website Source Code on Github"
          >
            GitHub
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
