import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: isProduction,
  });
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const adminPaths = ["/api/blogs/create", "/api/blogs/edit/"];
  const isAdminRoute = adminPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  if (isAdminRoute && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/api/blogs/create", "/api/blogs/edit/", "/profile", "/settings"],
};
