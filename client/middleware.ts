import { NextResponse, NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  console.log("token");

  // Retrieve the token from cookies
  const token = request.cookies.get("token");

  console.log("token");

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "There is no token" }), {
      status: 404,
    });
  }

  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    // Verify the token
    if (secretKey) {
      Jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err)
          return new NextResponse(
            JSON.stringify({ message: "invalid  token" }),
            {
              status: 403,
            }
          );
      });
    }

    return NextResponse.redirect(new URL("/login", request.url));
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
      status: 403,
    });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/auth/login ",
};
