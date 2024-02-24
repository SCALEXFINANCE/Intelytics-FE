// import React from 'react'

// const topprotocolvolume = () => {
//   return (
//     <div>volume-topprotocol</div>
//   )
// }

// export default topprotocolvolume

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { ChainsTable } from "@/components/ChainsTable";

const topprotocolvolume = () => {
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

      <div className=" text-lg  p-3 border-2 border-yellow-600 rounded-2xl">
        Currently tracking protocols on Injective only, More Chains are coming
        soon!!
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
      <div className="bg-black p-5 px-5 rounded-xl flex gap-5 w-full">
        {/* left */}
        <div className="py-6 px-2 flex gap-4  flex-col w-1/4">
          <div className=" bg-gray-700 p-2 gap-3 rounded-xl">
            <div> Total Volume (24hr)</div>
            <div>$234,232,232</div>
          </div>
          <div className=" bg-gray-700 p-2 gap-3 rounded-xl">
            <div> Total Volume (7hr)</div>
            <div>$234,232,232</div>
          </div>
          <div className=" bg-gray-700 p-2 gap-3 rounded-xl">
            <div> Total Volume (1hr)</div>
            <div>$234,232,232</div>
          </div>
          <div className=" bg-gray-700 p-2 gap-3 rounded-xl">
            <div> Total Volume (7DAY)</div>
            <div>$234,232,232</div>
          </div>
        </div>

        {/* right */}
        <div className=" flex justify-center w-3/4">Graph</div>
      </div>

      {/* table options */}

      <ChainsTable />
    </div>
  );
};

export default topprotocolvolume;
