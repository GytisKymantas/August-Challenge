export async function apiFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const response = await fetch(input, init);

  if (response.status === 401) {
    window.location.replace("/login");

    throw new Error("Authentication required");
  }

  return response;
}