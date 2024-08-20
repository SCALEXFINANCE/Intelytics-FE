import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { customFetch } from "@/lib/utils";
import { useAuth } from "./useAuth";

interface User {
  id: string;
  email: string;
  emeralds: string;
  currentStreak: string;
  lastClaimedAt: string;
  isLoading: boolean;
}

interface UserContextType extends User {
  refetchUser: () => Promise<() => void>;
  checkIsClaimable: (lastClaimedAt: string | null) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    emeralds: "",
    currentStreak: "",
    lastClaimedAt: "",
    isLoading: false,
  });

  const checkIsClaimable = useCallback(
    (lastClaimedAt: string | null): boolean => {
      if (!lastClaimedAt) return true;

      const now = new Date();
      const lastClaimed = new Date(lastClaimedAt);

      // Check if the last claim was on a different UTC day
      return (
        now.getUTCDate() !== lastClaimed.getUTCDate() ||
        now.getUTCMonth() !== lastClaimed.getUTCMonth() ||
        now.getUTCFullYear() !== lastClaimed.getUTCFullYear()
      );
    },
    []
  );

  const fetchUser = useCallback(async (signal: AbortSignal) => {
    setUser((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await customFetch("users", {
        method: "GET",
        signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch streak data");
      }

      const data = await response.json();

      setUser({
        isLoading: false,
        id: data.id,
        currentStreak: data.currentStreak,
        emeralds: data.emeralds,
        email: data.email,
        lastClaimedAt: data.lastClaimedAt,
      });
    } catch (err: any) {
      if (err.name === "AbortError") {
        return;
      }
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    fetchUser(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchUser]);

  const refetchUser = async () => {
    const abortController = new AbortController();
    await fetchUser(abortController.signal);
    return () => abortController.abort();
  };

  return (
    <UserContext.Provider value={{ ...user, refetchUser, checkIsClaimable }}>
      {children}
    </UserContext.Provider>
  );
};
