import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const newDomain = "proxmoxve-scripts.com";

  // if the request domain doest not match the new domain, redirect to the new domain
  if (req.nextUrl.hostname !== newDomain) {
    return NextResponse.redirect(
      new URL(`https://${newDomain}/${req.nextUrl.pathname}?${req.nextUrl.search}`)
    );
  }

  // Allow requests to continue if not from old domain
  return NextResponse.next();
}
