import { Flame, TrendingUp, ChevronRight, ArrowBigLeftIcon, ArrowDownLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

const data = [
  {
    id: 1,
    pair: "DOJO/INJ",
    price: 8221.09,
    change: 3.04,
    image: "https://github.com/code-bajju/Project-Image/blob/main/btc.png?raw=true",
  },
  {
    id: 2,
    pair: "HELIX/DOJO",
    price: 1021.09,
    change: -2.12,
    image: "https://github.com/code-bajju/Project-Image/blob/main/eth.png?raw=true",
  },
  {
    id: 3,
    pair: "ASTROPORT/HYDRO",
    price: 821.09,
    change: 1.03,
    image: "https://github.com/code-bajju/Project-Image/blob/main/helix.png?raw=true",
  }
];

const Trending = () => {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden w-full transition-all duration-300">
      {/* Gradient top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-500 to-red-700" />
      
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center text-base font-bold text-white">
            <div className="relative mr-2">
              <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-pulse" />
              <ArrowDownLeft className="h-5 w-5 p-1 text-red-500 relative z-10" />
            </div>
            <span className="bg-gradient-to-r  from-red-500 to-red-700 bg-clip-text text-transparent">
              TOP LOSERS
            </span>
          </h2>
          <button className="text-xs flex items-center text-gray-400 hover:text-white transition-colors">
            View All <ChevronRight size={14} />
          </button>
        </div>
        
        {/* List */}
        <div className="space-y-2">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 bg-opacity-50 rounded-lg p-1 px-2 flex justify-between items-center hover:bg-gray-700 transition-colors cursor-pointer group"
            >
              {/* Left side */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-700 text-xs font-medium text-gray-300">
                  {item.id}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20" />
                  <Image
                    src={item.image}
                    alt={item.pair}
                    width={24}
                    height={24}
                    className="rounded-full border border-gray-700 relative z-10"
                  />
                </div>
                
                <span className="font-medium text-white">{item.pair}</span>
              </div>
              
              {/* Right side */}
              <div className="flex flex-col items-end">
                <div className="text-white font-medium">${item.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                
                <div 
                  className={`flex items-center text-xs ${
                    item.change > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.change > 0 ? (
                    <TrendingUp size={12} className="mr-1" />
                  ) : (
                    <TrendingUp size={12} className="mr-1 transform rotate-180" />
                  )}
                  <span>{item.change > 0 ? "+" : ""}{item.change.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Optional Bottom Section */}
        <div className="mt-4 text-center">
          <button className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white py-2 px-4 rounded-lg transition-colors w-full border border-gray-700">
            Explore More Pairs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trending;