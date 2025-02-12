import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Protect all routes except public ones
export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isPublicRoute = ["/api/auth", "/_next", "/favicon.ico", "/public"].some(
    (prefix) => req.nextUrl.pathname.startsWith(prefix)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isAdminPage) {
    const userEmail = req.auth?.user?.email;
    //console.log("userEmail", userEmail);
    const allowedEmails = process.env.PROF_WHITELIST?.split(",") || [];
    //console.log("allowedEmails", allowedEmails);

    if (!userEmail || !allowedEmails.includes(userEmail)) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
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
