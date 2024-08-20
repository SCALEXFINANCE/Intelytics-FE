import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ACCESS_TOKEN_NAME = "ACCESS_TOKEN";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

interface DecodedToken {
  email: string;
  sub: string;
  // Add other properties as needed
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN_NAME)?.value;
  const { pathname } = request.nextUrl;

  // Allow access to signin and signup pages without a token
  if (!token) {
    if (pathname === "/auth/signin" || pathname === "/auth/signup") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const { payload } = (await jwtVerify(token, JWT_SECRET)) as {
      payload: DecodedToken;
    };

    // If authenticated and trying to access signin/signup, redirect to home page
    if (pathname === "/auth/signin" || pathname === "/auth/signup") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow the request to proceed if token is valid
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);

    // Token is invalid, redirect to signin and clear the token
    const response = NextResponse.redirect(
      new URL("/auth/signin", request.url)
    );
    response.cookies.delete(ACCESS_TOKEN_NAME);
    response.cookies.delete("REFRESH_TOKEN");
    response.cookies.delete("refresh_token_id");
    return response;
  }
}

export const config = {
  // matcher: [
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  // "/((?!api|_next/static|_next/image|favicon.ico).*)",

  // ],
  matcher: ["/Rewards", "/auth/signup", "/auth/signin"], // Protect only the /Rewards page
};
