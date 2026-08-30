export interface LoginCredentials {
  username: string
  password: string
}

export async function loginUser(
  credentials: LoginCredentials,
): Promise<void> {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error("Invalid credentials")
  }
}

export async function logoutUser() {
  const response = await fetch("/api/logout", {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error("Failed to logout")
  }

  return response.json()
}