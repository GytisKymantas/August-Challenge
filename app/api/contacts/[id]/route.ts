import { NextResponse } from "next/server";

import { serverFetch } from "@/lib/server/api-client";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams,
) {
  const { id } = await params;

  try {
    const response =
      await serverFetch(
        `/list-item?id=${id}`,
      );

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            "Failed to fetch contact",
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
          "Failed to fetch contact",
      },
      {
        status: 500,
      },
    );
  }
}