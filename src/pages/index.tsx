import React from "react";
import { useFetchData } from "@/lib/hooks";
import HomePage from "./HomePage";
import DexTable from "@/components/tables/DexTable";
import TokenInfo from "@/components/TokenInfo";
import TradingViewWidget from "@/components/tokenChart";
import { AreaChart } from "lucide-react";

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { totalTVL, stable, volume, funding, injPrice } = useFetchData();

  return (
    <div className="flex flex-col space-y-4 p-4">
      <HomePage />
      <p
        // style={{ textShadow: "rgb(255, 255, 255) 2px 2px 20px" }}
        className="text-2xl"
      >
        MARKET CHART ANALYSIS
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
  <div className="lg:col-span-4">
    <TokenInfo
      totalTVL={totalTVL}
      stable={stable}
      volume={volume}
      funding={funding}
      injPrice={injPrice}
    />
  </div>
  <div className="lg:col-span-8">
  <div className="bg-gray-900 lg:p-3 md:p-5 p-3 h-full w-full rounded-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div className="flex items-center">
            <button 
              // onClick={handleGoBack}
              className="mr-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors flex items-center justify-center group"
              aria-label="Go back"
            >
              <AreaChart size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <h2 className="text-2xl font-bold text-white">Chart Info</h2>
          </div>
        </div>
  <div className="w-full h-full">
       <TradingViewWidget symbol={`INJUSD`} />
  </div>
     </div>
  </div>
</div>


      <div className="">
        <DexTable />
      </div>
    </div>
  );
};

export default index;
