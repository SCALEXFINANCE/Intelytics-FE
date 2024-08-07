import { useState, useEffect, useCallback } from "react";

interface UseCountdownProps {
  lastClaimed: string | null;
  isClaimable: boolean;
}

const useCountdown = ({ lastClaimed, isClaimable }: UseCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  const calculateTimeLeft = useCallback(() => {
    if (isClaimable) {
      return "Claim available!";
    }

    const now = new Date();
    const utcNow = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      )
    );

    if (!lastClaimed) {
      return "Calculating...";
    }

    const lastClaimedDate = new Date(lastClaimed);
    const utcLastClaimed = new Date(
      Date.UTC(
        lastClaimedDate.getUTCFullYear(),
        lastClaimedDate.getUTCMonth(),
        lastClaimedDate.getUTCDate()
      )
    );
    const nextClaimDate = new Date(
      Date.UTC(
        utcLastClaimed.getUTCFullYear(),
        utcLastClaimed.getUTCMonth(),
        utcLastClaimed.getUTCDate() + 1
      )
    );

    let difference = nextClaimDate.getTime() - utcNow.getTime();

    if (difference <= 0) {
      return "Claim available!";
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [lastClaimed, isClaimable]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return { timeLeft, isClaimable };
};

export default useCountdown;
