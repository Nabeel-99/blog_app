import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  console.log("token", token);
  const adminPaths = ["/blogs/create", "/blogs/edit/:id"];
  const isAdminRoute = adminPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  if (isAdminRoute && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/blogs/create", "/blogs/edit/", "/profile", "/settings"],
};
