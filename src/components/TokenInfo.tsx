import { CoinsIcon } from "lucide-react";
import Image from "next/image";

interface TokenInfoProps {
  totalTVL?: string;
  stable?: string;
  volume?: string;
  funding?: string;
  injPrice?: string;
}

const TokenInfo: React.FC<TokenInfoProps> = ({
  totalTVL,
  stable,
  volume,
  funding,
  injPrice,
}) => {
  return (
    <div className="bg-bluebackground rounded-xl border border-bordercolor p-4 w-full lg:w-1/3 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-bordercolor text-lg lg:text-2xl font-semibold">
        <CoinsIcon className="w-6 h-6" />
        <span>Token Info</span>
      </div>
      
      {/* Token Name */}
      <div className="flex items-center space-x-2">
        <Image alt="INJ Logo" src="/inj.png" height={30} width={30} className="h-8 w-8 rounded-full" />
        <span className="font-bold text-xl">INJECTIVE</span>
      </div>
      
      {/* Token Price (Visible on Large Screens) */}
      <div className="text-3xl hidden lg:block">{injPrice}</div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <InfoCard label="Top Protocols TVL" value={stable} />
        <InfoCard label="Volume" value={volume} />
        <InfoCard label="Liquidity Staking" value={funding} />
        <InfoCard label="Total" value={totalTVL} fullWidth />
      </div>
    </div>
  );
};

const InfoCard: React.FC<{ label: string; value?: string; fullWidth?: boolean }> = ({ label, value, fullWidth }) => {
  return (
    <div className={`border border-bordercolor p-4 rounded-lg shadow-md backdrop-blur-md bg-transparent ${fullWidth ? 'col-span-full' : ''}`}>
      <div className="flex justify-between text-sm sm:text-base">
        <span>{label}</span>
        <span className="font-medium">{value || "-"}</span>
      </div>
    </div>
  );
};

export default TokenInfo;