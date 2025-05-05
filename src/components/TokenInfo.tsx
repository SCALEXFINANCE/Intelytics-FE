import { useState } from "react";
import Image from "next/image";
import { Coins, ExternalLink, ArrowLeft, Copy, Check } from "lucide-react";
import { useRouter } from "next/router";

interface TokenInfoProps {
  totalTVL?: string;
  stable?: string;
  volume?: string;
  funding?: string;
  injPrice?: string;
}

const TokenInfo: React.FC<TokenInfoProps> = ({
  totalTVL = "$345.2M",
  stable = "$128.6M",
  volume = "$45.3M",
  funding = "$89.7M",
  injPrice = "$14.38",
}) => {
  const router = useRouter();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  
  const handleGoBack = () => {
    router.back();
  };
  
  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setTimeout(() => setCopiedAddress(null), 2000);
  };
  
  const shortenAddress = (address: string): string => 
    `${address.slice(0, 6)}...${address.slice(-4)}`;
    
  const injAddress = "0x4E15361FD6b4BB609Fa63C81A2be19d873717870";

  return (
    <div className="w-full transition-all duration-300">
      <div className="bg-gray-900 lg:p-3 md:p-5 p-3 rounded-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div className="flex items-center">
            <button 
              // onClick={handleGoBack}
              className="mr-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors flex items-center justify-center group"
              aria-label="Go back"
            >
              <Coins size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <h2 className="text-2xl font-bold text-white">Token Info</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* TVL Stats */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden lg:col-span-2">
            {/* Gradient top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500" />
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Coins size={20} className="mr-2 text-purple-400" />
                Ecosystem Overview
              </h3>
              <div>
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20 animate-pulse" />
                  <Image
                    src="/api/placeholder/48/48"
                    alt="INJ Token"
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-gray-700 z-10 relative"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-white">INJECTIVE</h3>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full">
                    INJ
                  </span>
                </div>
              </div>
              
              {/* Price */}
              <div className="mb-4 bg-gray-900 bg-opacity-50 p-3 rounded-lg">
                <span className="text-sm text-gray-400">Current Price</span>
                <div className="text-2xl font-bold text-white mt-1">{injPrice}</div>
              </div>
              
              {/* Token details section */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Address</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-mono text-gray-300">{shortenAddress(injAddress)}</span>
                    <button
                      onClick={() => copyToClipboard(injAddress)}
                      className="p-1 rounded-md hover:bg-gray-700 transition-colors"
                      title="Copy address"
                    >
                      {copiedAddress === injAddress ? (
                        <Check size={14} className="text-green-500" />
                      ) : (
                        <Copy size={14} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
              
              </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Top Protocols TVL</div>
                  <div className="text-xl font-bold text-white">{stable}</div>
                </div>
                
                <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Volume (24h)</div>
                  <div className="text-xl font-bold text-white">{volume}</div>
                </div>
                
                <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Liquidity Staking</div>
                  <div className="text-xl font-bold text-white">{funding}</div>
                </div>
                
                <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Market Cap</div>
                  <div className="text-xl font-bold text-white">$1.15B</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Total Value Locked</span>
                  <span className="text-lg font-bold text-white">{totalTVL}</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full w-3/4"></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Last week: $298.1M</span>
                  <span>+15.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;