import React from "react";
import {useFetchData} from "@/lib/hooks";
import HomePage from "./HomePage";
import TokenTable from "@/components/tables/DexTable";
import TokenInfo from "@/components/TokenInfo";
import TokenChart from "@/components/tokenChart";

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { totalTVL, stable, volume, funding, injPrice } = useFetchData();

  return (
    <div className="flex flex-col space-y-4 p-4">
      <HomePage />
      <p style={{ textShadow: "rgb(255, 255, 255) 2px 2px 20px;" }} className="text-2xl">
        MARKET CHART ANALYSIS
      </p>

      <div className="flex flex-col space-y-4 md:space-y-0 lg:flex-row lg:space-x-4 justify-between">
        <TokenInfo totalTVL={totalTVL} stable={stable} volume={volume} funding={funding} injPrice={injPrice} />
        <TokenChart />
      </div>

      <div className="hidden lg:inline">
        <TokenTable />
      </div>
      <div className="inline lg:hidden">
        <TokenTable />
      </div>
    </div>
  );
};

export default index;
