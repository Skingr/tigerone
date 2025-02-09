import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Protect all routes except public ones
export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isPublicRoute = ["/api/auth", "/_next", "/favicon.ico", "/public"].some(
    (prefix) => req.nextUrl.pathname.startsWith(prefix)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  //redirect authenticated users away from auth pages
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  //redirect unauthenticated users to login
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
