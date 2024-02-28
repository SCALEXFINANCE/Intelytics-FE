// import React from 'react'

// const topprotocolvolume = () => {
//   return (
//     <div>volume-topprotocol</div>
//   )
// }

// export default topprotocolvolume

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { ChainsTable } from "@/components/ChainsTable";
import SearchBar from "@/components/Searchbar";

const Topprotocolvolume = () => {
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

  const [onehr, setonehr] = useState();
  const [oneday, setoneday] = useState();
  const [sevday, setsevday] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");
        const response2 = await axios.get(
          "https://api.llama.fi/summary/dexs/astroport?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
        );
        const response3 = await axios.get(
          "https://api.llama.fi/summary/dexs/helix?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
        );
        // Volume API Testing.
        const astroportVolume = response2.data;
        const astroport24hVolume = astroportVolume.total24h;
        const helixVolume = response3.data;
        const helix24hVolume = helixVolume.total24h;

        // console.log(astroport24hVolume);

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
        const oneDayDojo = dojoswap.change_1d;
        const oneHourDojo = dojoswap.change_1h;
        const sevenDayDojo = dojoswap.change_7d;

        const hydro = protocols.find(
          (protocol: { id: string }) => protocol.id === hydroprotocolId
        );
        const totalTvlHydro = hydro.tvl;
        const oneDayHydro = hydro.change_1d;
        const oneHourHydro = hydro.change_1h;
        const sevenDayHydro = hydro.change_7d;

        const astro = protocols.find(
          (protocol: { id: string }) => protocol.id === astroportId
        );
        const totalTvlAstro = astro.tvl;
        const oneDayAstro = astro.change_1d;
        const oneHourAstro = astro.change_1h;
        const sevenDayAstro = astro.change_7d;

        const helix = protocols.find(
          (protocol: { id: string }) => protocol.id === helixId
        );
        const totalTvlHelix = helix.tvl;
        const oneDayHelix = helix.change_1d;
        const oneHourHelix = helix.change_1h;
        const sevenDayHelix = helix.change_7d;
        const onehr = oneHourAstro + oneHourDojo + oneHourHelix + oneHourHydro;
        const oneDay = oneDayAstro + oneDayDojo + oneDayHelix + oneDayHydro;
        const sevenday =
          sevenDayAstro + sevenDayDojo + sevenDayHelix + sevenDayHydro;
        setonehr(onehr);
        setoneday(oneDay);
        setsevday(sevenday);
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

      <SearchBar />

      <div className=" text-lg  p-3 border-2 border-yellow-600 rounded-2xl">
        Currently tracking protocols on Injective only, More Chains are coming
        soon!!
      </div>

      {/* button block */}
      {/* <div className=" bg-black p-3 px-5 rounded-xl flex gap-4">
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={allClicked}>
          All
        </button>
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={ethClicked}>
          ETH
        </button>
        <button className=" bg-gray-700 px-6 p-1 rounded" onClick={injClicked}>
          INJ
        </button>
      </div> */}

      {/* graph card */}
      <div className="bg-black p-5 px-5 rounded-xl flex gap-5 w-full text-xl">
        {/* left */}

        <div className=" bg-gray-700 p-5 rounded-xl w-1/3">
          <div className=" pb-3"> Total Volume (24hr)</div>
          <div className={`${oneday! < 0 ? "text-red-500" : "text-green-500"}`}>
            {oneday}%
          </div>
        </div>

        <div className=" bg-gray-700 p-5 gap-3 rounded-xl w-1/3">
          <div className=" pb-3"> Total Volume (1hr)</div>
          <div className={`${onehr! < 0 ? "text-red-500" : "text-green-500"}`}>
            {onehr}%
          </div>
        </div>
        <div className=" bg-gray-700 p-5 gap-3 rounded-xl w-1/3">
          <div className=" pb-3"> Total Volume (7DAY)</div>
          <div className={`${sevday! < 0 ? "text-red-500" : "text-green-500"}`}>
            {sevday}%{" "}
          </div>
        </div>
      </div>

      {/* table options */}

      <ChainsTable />
    </div>
  );
};

export default Topprotocolvolume;
