import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Adjust this to your API base URL
const ACCESS_TOKEN_NAME = "ACCESS_TOKEN";
const REFRESH_TOKEN_NAME = "REFRESH_TOKEN";

// let accessToken: any = null;
// let refreshToken: any = null;

async function customFetch(url: string, options: any = {}) {
  const cookies = parseCookies();
  let accessToken = cookies[ACCESS_TOKEN_NAME];
  let refreshToken = cookies[REFRESH_TOKEN_NAME];

  // Set up headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Make the request
  let response = await fetch(BASE_URL + url, { ...options, headers });

  // If the response is 401 (Unauthorized), try to refresh the token
  if (response.status === 401 && refreshToken) {
    const newTokens = await refreshAccessToken();

    if (newTokens) {
      // Update the Authorization header with the new token
      headers["Authorization"] = `Bearer ${newTokens.access_token}`;

      // Retry the original request with the new token
      response = await fetch(BASE_URL + url, { ...options, headers });
    }
  }

  return response;
}

async function refreshAccessToken() {
  const cookies = parseCookies();
  const refreshToken = cookies[REFRESH_TOKEN_NAME];

  try {
    const response = await fetch(BASE_URL + "auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
      credentials: "include", // This is important for including cookies in the request
    });

    if (response.ok) {
      const { access_token, refresh_token } = await response.json();
      setCookie(null, ACCESS_TOKEN_NAME, access_token, {
        maxAge: 30 * 60,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      setCookie(null, REFRESH_TOKEN_NAME, refresh_token, {
        maxAge: 30 * 30 * 60,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return { access_token, refresh_token };
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }

  // If refresh failed, clear tokens and redirect to login
  logout();
  return null;
}

function logout() {
  // destroyCookie(null, "refresh_token_id", { path: "/" });
  // window.location.href = "/login";
}

export { customFetch, logout };
