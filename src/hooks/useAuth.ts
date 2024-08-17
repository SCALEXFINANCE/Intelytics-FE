import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { toast } from "react-hot-toast";
import { customFetch } from "@/lib/utils";

const ACCESS_TOKEN_NAME = "ACCESS_TOKEN";
const REFRESH_TOKEN_NAME = "REFRESH_TOKEN";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const cookies = parseCookies();
      const hasToken = !!cookies[ACCESS_TOKEN_NAME];
      setIsAuthenticated(hasToken);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      const requestBody = { email, password };

      try {
        const response = await customFetch("auth/login", {
          method: "POST",
          body: JSON.stringify(requestBody),
          credentials: "include",
        });

        if (response.ok) {
          const { data, message, statusCode } = await response.json();
          if (statusCode === 204) {
            setCookie(null, ACCESS_TOKEN_NAME, data.access_token, {
              maxAge: 30 * 60,
              path: "/",
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
            });

            setCookie(null, REFRESH_TOKEN_NAME, data.refresh_token, {
              maxAge: 30 * 30 * 60,
              path: "/",
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
            });
            setIsAuthenticated(true);
            toast.success("Logged in Successfully");
            setCookie(null, ACCESS_TOKEN_NAME, data.access_token, {
              maxAge: 30 * 60,
              path: "/",
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
            });
            router.push("/");
          } else {
            toast.error(`Unexpected status code: ${statusCode}`);
          }
        } else {
          const errorData = await response.json();
          toast.error(errorData.message.message || "Login failed");
        }
      } catch (error: any) {
        console.error("Login failed:", error);
        toast.error(error.message || "An error occurred during login");
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await customFetch("auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    destroyCookie(null, ACCESS_TOKEN_NAME, { path: "/" });
    destroyCookie(null, REFRESH_TOKEN_NAME, { path: "/" });
    setIsAuthenticated(false);
    router.push("/login");
  }, [router]);

  return {
    isAuthenticated,
    isLoading,
    login,
    // logout,
  };
}
