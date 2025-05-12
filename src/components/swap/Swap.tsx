import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Repeat, Wallet } from "lucide-react";

const Swap = () => {
  const [slippage, setSlippage] = useState(0.5);
  const [fromAmount, setFromAmount] = useState("0.0231");
  const [toAmount, setToAmount] = useState("412.2120");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDT");

  const handleSwapTokens = () => {
    // Swap tokens and amounts
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  return (
    <div className="">
      {/* Slippage Selector */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-3 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs font-medium">Slippage</span>
          <div className="flex items-center gap-1 text-xs">
            {[0.1, 0.5, 1.0, 2.0].map((value) => (
              <Button
                key={value}
                size="sm"
                variant="outline"
                onClick={() => setSlippage(value)}
                className={`px-2 py-1 h-6 rounded-md ${
                  slippage === value 
                    ? "bg-blue-900/40 border-blue-500 text-blue-400" 
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {value}%
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* From Token */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-3 mb-2">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400">{fromToken.charAt(0)}</span>
            </div>
            <span>{fromToken}</span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
          
          <input
            type="text"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 w-28 text-right text-white"
          />
        </div>
      </div>

      {/* Swap Icon */}
      <div className="flex justify-center -my-1">
        <button 
          onClick={handleSwapTokens}
          className="bg-gray-800 p-2 rounded-full border border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors"
        >
          <Repeat size={16} className="text-blue-400" />
        </button>
      </div>

      {/* To Token */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-3 mt-2 mb-4">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-green-400">{toToken.charAt(0)}</span>
            </div>
            <span>{toToken}</span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
          
          <input
            type="text"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 w-28 text-right text-white"
          />
        </div>
      </div>

      {/* Swap Details */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-3 mb-4">
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400">Rate</span>
            <span className="text-white">1 {fromToken} = 1,784.05 {toToken}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Price Impact</span>
            <span className="text-green-400">~0.02%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network Fee</span>
            <span className="text-white">~$1.24</span>
          </div>
        </div>
      </div>

      {/* Connect Wallet Button */}
      <Button 
        className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white flex items-center justify-center gap-2"
      >
        <Wallet size={16} />
        Connect Wallet
      </Button>
    </div>
  );
};

export default Swap;