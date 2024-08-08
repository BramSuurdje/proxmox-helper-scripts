import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Check if the request URL is /scripts
  if (req.nextUrl.pathname === "/scripts") {
    return NextResponse.next();
  }

  const visitedCookie = req.cookies.get("visited");

  if (visitedCookie) {
    return NextResponse.redirect(new URL("/scripts", req.url));
  }

  const res = NextResponse.next();
  if (!visitedCookie) {
    res.cookies.set("visited", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return res;
}

export const config = {
  matcher: "/",
};
