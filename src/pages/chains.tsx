import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { ChainsTable } from "@/components/ChainsTable";
import ChartChains from "@/components/ChartChains";

const chains = () => {
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

  const [totalTVL, setTotalTVL] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");

        // Protocol (TVL) API Testing.
        const protocols = response.data;
        const dojoswapId = "3965";
        const hydroprotocolId = "4084";
        const astroportId = "3117";
        const helixId = "2259";
        const dojoswap = protocols.find(
          (protocol: { id: string }) => protocol.id === dojoswapId
        );
        const totalTvlDojo = dojoswap.tvl;

        const hydro = protocols.find(
          (protocol: { id: string }) => protocol.id === hydroprotocolId
        );
        const totalTvlHydro = hydro.tvl;

        const astro = protocols.find(
          (protocol: { id: string }) => protocol.id === astroportId
        );
        const totalTvlAstro = astro.tvl;

        const helix = protocols.find(
          (protocol: { id: string }) => protocol.id === helixId
        );
        const totalTvlHelix = helix.tvl;

        const value =
          totalTvlAstro + totalTvlDojo + totalTvlHelix + totalTvlHydro;

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);

        setTotalTVL(formatted);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
      // setRefetch(!refetch);
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
      <div className="bg-black p-5 px-5 rounded-xl flex  justify-between w-full">
        {/* left */}
        <div className="py-6 px-2 flex gap-2 flex-col w-1/4">
          <div className=" text-gray-400">Total Value Locked</div>
          <div className=" text-4xl">{totalTVL}</div>
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
        {/* <div className=" flex justify-center w-3/4">Graph</div> */}
        <div className=" px-10">
          <ChartChains />
        </div>
      </div>

      {/* table options */}

      <ChainsTable />
    </div>
  );
};

export default chains;
