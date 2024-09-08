import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = "proxmoxve-scripts.com"

  if (req.nextUrl.hostname !== url) {
    return NextResponse.redirect(
      new URL(`https://${url}/${req.nextUrl.pathname}?${req.nextUrl.search}`)
    );
  }

  return NextResponse.next();
}