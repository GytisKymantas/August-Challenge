import { NextResponse } from "next/server";

import { serverFetch } from "@/lib/server/api-client";

export async function GET(
  request: Request,
) {
  const { searchParams } =
    new URL(request.url);

  const query =
    searchParams.toString();

  try {
    const response =
      await serverFetch(
        `/list?${query}`,
      );

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            "Failed to fetch contacts",
        },
        {
          status: response.status,
        },
      );
    }

    const data =
      await response.json();

    return NextResponse.json(data);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "Authentication required"
    ) {
      return NextResponse.json(
        {
          message:
            "Authentication required",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json(
      {
        message:
          "Failed to fetch contacts",
      },
      {
        status: 500,
      },
    );
  }
}