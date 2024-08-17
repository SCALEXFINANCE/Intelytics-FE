import { useState, useEffect, useCallback } from "react";
import { customFetch } from "@/lib/utils";

interface StreakData {
  error: string | null;
  isLoading: boolean;
  lastClaimed: string | null;
  streak: number;
  isClaimable: boolean;
}

const useStreak = () => {
  const [streakData, setStreakData] = useState<StreakData>({
    error: null,
    isLoading: true,
    lastClaimed: null,
    streak: 0,
    isClaimable: false,
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

  const fetchStreak = useCallback(
    async (signal: AbortSignal) => {
      setStreakData((prev) => ({ ...prev, isLoading: true }));
      try {
        const response = await customFetch("claim/streak", {
          method: "GET",
          signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch streak data");
        }

        const data = await response.json();
        const isClaimable = checkIsClaimable(data.lastClaimedAt);

        setStreakData({
          error: null,
          isLoading: false,
          lastClaimed: data.lastClaimedAt,
          streak: data.currentStreak,
          isClaimable,
        });
      } catch (err: any) {
        if (err.name === "AbortError") {
          return;
        }
        setStreakData((prev) => ({
          ...prev,
          error: err.message,
          isLoading: false,
        }));
      }
    },
    [checkIsClaimable]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchStreak(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchStreak]);

  const refetchStreak = useCallback(async () => {
    const abortController = new AbortController();
    await fetchStreak(abortController.signal);
    return () => abortController.abort();
  }, [fetchStreak]);

  return { ...streakData, refetchStreak };
};

export default useStreak;
