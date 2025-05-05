import React from "react";
import { useFetchData } from "@/lib/hooks";
import HomePage from "./HomePage";
import DexTable from "@/components/tables/DexTable";
import TokenInfo from "@/components/TokenInfo";
import TokenChart from "@/components/tokenChart";

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
    <TokenChart />
  </div>
</div>


      <div className="">
        <DexTable />
      </div>
    </div>
  );
};

export default index;
