import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BASE_URL } from "@/constants/general";

export async function POST() {
  const cookieStore = await cookies();

  const refreshToken =
    cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      {
        message: "No refresh token",
      },
      {
        status: 401,
      },
    );
  }

  const response = await fetch(
    `${BASE_URL}/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    },
  );

  if (!response.ok) {
    const nextResponse =
      NextResponse.json(
        {
          message:
            "Refresh token expired",
        },
        {
          status: 401,
        },
      );

    nextResponse.cookies.delete(
      "auth_token",
    );

    nextResponse.cookies.delete(
      "refresh_token",
    );

    return nextResponse;
  }

  const data = await response.json();

  const accessToken =
    data.accessToken || data.token;

  if (!accessToken) {
    return NextResponse.json(
      {
        message:
          "No access token returned",
      },
      {
        status: 500,
      },
    );
  }

  const nextResponse =
    NextResponse.json({
      success: true,
    });

  nextResponse.cookies.set(
    "auth_token",
    accessToken,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    },
  );

  return nextResponse;
}