import { Search } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { OverviewTable } from "@/components/OverviewTable";
const overview = () => {
  const [selected, setSelected] = useState<string>("all");

  const allClicked = () => {
    setSelected("all");
  };

  const ethClicked = () => {
    setSelected("eth");
  };

  const injClicked = () => {
    setSelected("inj");
  };

  return (
    <div className=" flex gap-4 flex-col">
      {/* <div>DEFI-overview</div> */}

      {/* Search bar demo */}
      <div className=" bg-black p-5 border-2 border-gray-800 rounded-xl flex gap-4">
        <Image src="/search.svg" alt="" height={30} width={30} />
        <div className=" text-gray-400 "> Search your Token here...</div>
      </div>

      {/* button block */}
      <div className=" bg-black p-3 px-5 rounded-xl flex gap-4">
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={allClicked}>
          All
        </button>
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={ethClicked}>
          ETH
        </button>
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={injClicked}>
          INJ
        </button>
      </div>

      {/* graph card */}
      <div className="bg-black p-5 px-5 rounded-xl flex gap-5">
        {/* left */}
        <div className="py-6 px-2 flex gap-2 flex-col w-1/4">
          <div className=" text-gray-400">Total Value Locked</div>
          <div className=" text-4xl">$125,314.01</div>
          <div className="flex justify-between pt-4">
            <div>Stable Coins</div>
            <div>$125.4</div>
          </div>
          <div className="flex justify-between  ">
            <div>Volume</div>
            <div>$125.4</div>
          </div>
          <div className="flex justify-between  ">
            <div>Total Funding Amount</div>
            <div>$125.4</div>
          </div>
        </div>

        {/* right */}
        <div>Graph</div>
      </div>

      {/* table options */}
      <OverviewTable />
    </div>
  );
};

export default overview;
