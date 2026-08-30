import { BASE_URL } from "@/constants/general";
import { cookies } from "next/headers";


type ApiResponse = Response;

async function getAccessToken() {
  const cookieStore = await cookies();

  return cookieStore.get("auth_token")?.value;
}

async function getRefreshToken() {
  const cookieStore = await cookies();

  return cookieStore.get("refresh_token")?.value;
}

async function refreshAccessToken() {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  const response = await fetch(`${BASE_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });


  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  const accessToken =
    data.accessToken || data.token;

  if (!accessToken) {
    return null;
  }

  const cookieStore = await cookies();

  cookieStore.set("auth_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return accessToken;
}

export async function serverFetch(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse> {
  let accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const makeRequest = async (token: string) => {
    
    return fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  let response = await makeRequest(accessToken);

  /*
   * Access token expired.
   */
  if (response.status === 401) {
    const newAccessToken =
      await refreshAccessToken();

    /*
     * Refresh token is also invalid/expired.
     */
    if (!newAccessToken) {
      throw new Error("Authentication required");
    }

    /*
     * Retry the original request
     * with the new access token.
     */
    response = await makeRequest(
      newAccessToken,
    );
  }

  return response;
}