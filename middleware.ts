// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const restrictedPaths = {
    admin: ['path1', 'path2'],
    board: ['path3', 'path4'],
    user: ['path5', 'path6'],
  };

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl.clone();

  if (!role) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Define role-based access control
  const restrictedPaths = {
    admin: ["/admin", "/workflows", "/financials","/board","/forms","/profile","/reports",""],
    board: ["/board", "/dashboard","/board/board-selection", "/board/performance-monitoring"],
    user: ["/dashboard","/workflows/service-monitoring","workflows/tender-details", "/profile","/workflows/evaluation"],
  };

  const currentPath = req.nextUrl.pathname;

  const isRestricted = Object.keys(restrictedPaths).every((key) =>
    restrictedPaths[role as keyof typeof restrictedPaths].includes(currentPath)
  );

  if (isRestricted && role !== req.nextUrl.pathname.split("/")[1]) {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
