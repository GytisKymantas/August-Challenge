import { BASE_URL } from "@/constants/general";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const data = await response.json();

  const accessToken = data.accessToken || data.token;
  const refreshToken = data.refreshToken;

  if (!accessToken) {
    return NextResponse.json(
      { message: "No access token returned" },
      { status: 500 },
    );
  }

  const nextResponse = NextResponse.json({
    success: true,
  });

  nextResponse.cookies.set("auth_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  if (refreshToken) {
    nextResponse.cookies.set(
      "refresh_token",
      refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      },
    );
  }

  return nextResponse;
} 