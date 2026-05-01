const TOKEN_STORAGE_KEY = "career_navigator_token";

const buildHeaders = (headers = {}) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers
  };
};

export const authToken = {
  get() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },
  set(token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },
  clear() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

export async function apiFetch(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: buildHeaders(options.headers)
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof data === "object" && data?.message
      ? data.message
      : "Request failed";
    throw new Error(message);
  }

  return data;
}
