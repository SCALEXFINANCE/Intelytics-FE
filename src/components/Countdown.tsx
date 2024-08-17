import React from "react";
import useCountdown from "@/hooks/useCountdown";

interface CountdownProps {
  lastClaimed: string | null;
  isClaimable: boolean;
}

const Countdown: React.FC<CountdownProps> = React.memo(
  ({ lastClaimed, isClaimable }) => {
    console.log(lastClaimed, isClaimable);
    const { timeLeft } = useCountdown({
      lastClaimed,
      isClaimable,
    });

    return (
      <div
        className={`text-xl font-bold ${isClaimable ? "text-green-500" : ""}`}
      >
        {!lastClaimed
          ? ""
          : !isClaimable && (
              <p className="text-base">
                Next claim in: {timeLeft || "00:00:00"}
              </p>
            )}
      </div>
    );
  }
);

Countdown.displayName = "Countdown";

export default Countdown;
