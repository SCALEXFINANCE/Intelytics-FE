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
    <div className="bg-bluebackground rounded-xl lg:px-2 flex gap-2 flex-col lg:w-[30%] w-full lg:my-0 border border-bordercolor border border-bordercolor-gray-500">
      <div className="flex flex-col p-2 h-full">
        <div className="lg:text-2xl lg:flex hidden text-border text-bordercolor font-plain text-nowrap">
          <CoinsIcon /> Token Info
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <Image alt="INJ Logo" src="/inj.png" height={30} width={30} className="h-6 w-6 rounded-full" />
          <div className="font-bold text-lg">INJECTIVE</div>
        </div>
        <div className="text-4xl hidden lg:inline">{injPrice}</div>
        <div className="grid space-y-4 h-full">
  <div className="col-span-3 border border-bordercolor p-4 backdrop-blur-md bg-transparent rounded-lg shadow-md">
    <div className="flex justify-between">
      <div>Top Protocols TVL</div>
      <div>{stable}</div>
    </div>
  </div>
  <div className="p-4 mr-2 border border-bordercolor backdrop-blur-md bg-transparent rounded-lg shadow-md">
    <div className="flex justify-between">
      <div>Volume</div>
      <div>{volume}</div>
    </div>
  </div>
  <div className="p-4 border ml-2 border-bordercolor backdrop-blur-md bg-transparent rounded-lg shadow-md">
    <div className="flex justify-between">
      <div>Liquidity Staking</div>
      <div>{funding}</div>
    </div>
  </div>
  <div className="p-4 border border-bordercolor w-full col-span-3 backdrop-blur-md bg-transparent rounded-lg shadow-md">
    <div className="flex justify-between">
      <div>Total</div>
      <div>{totalTVL}</div>
    </div>
  </div>
</div>


      </div>
    </div>
  );
};

export default TokenInfo;
