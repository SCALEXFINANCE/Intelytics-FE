import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import AstroChart from "@/components/AstroChart";

const dojoswap = () => {
  const [tvl, settvl] = useState<number>();
  const [oned, setoned] = useState<number>();
  const [oneh, setoneh] = useState<number>();
  const [sevd, setsevd] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");
        // const response2 = await axios.get(
        //   "https://api.llama.fi/summary/dexs/astroport?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
        // );
        // // Volume API Testing.
        // const astroportVolume = response2.data;

        // console.log(astroportVolume);
        // const astroport24hVolume = astroportVolume.total24h;

        // console.log(astroport24hVolume);

        // Protocol (TVL) API Testing.
        const protocols = response.data;
        const astroportId = "3117";

        const coin = protocols.find(
          (protocol: { id: string }) => protocol.id === astroportId
        );
        settvl(Math.round(coin.tvl * 100) / 100);
        setoned(Math.round(coin.change_1d * 100) / 100);
        setoneh(Math.round(coin.change_1h * 100) / 100);
        setsevd(Math.round(coin.change_7d * 100) / 100);
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
    <div>
      <div className="flex gap-4">
        <a>
          <div className=" font-bold text-4xl p-3 ">Astrport</div>
        </a>

        <a href="https://twitter.com/astroport_fi">
          <Image
            src={"/twitter.png"}
            alt=""
            height={30}
            width={30}
            className=" pt-5"
          />
        </a>
      </div>

      <div className=" p-3 pt-5 text-xl">
        Astroport is the central space station of the DeFi solar system, where
        travelers throughout the galaxy meet to exchange assets in a neutral
        marketplace. The philosophy behind Astroport is simple: Enabling
        decentralized, non-custodial liquidity and price discovery for any
        crypto asset. Astroport prioritizes flexibility, combining various
        specialized pool types and routing seamlessly across them.
      </div>

      <div className="px-3">
        <div className="flex gap-4 pt-5 ">
          <div className="text-2xl ">Total Value Locked:</div>
          <div className=" text-xl pt-1">${tvl}</div>
        </div>
        <div className="flex gap-4 pt-2">
          <div className="text-2xl ">1 Hour Change:</div>
          <div className=" text-xl pt-1">${oneh}</div>
        </div>
        <div className="flex gap-4 pt-2">
          <div className="text-2xl ">24 Hour Change:</div>
          <div className=" text-xl pt-1">${oned}</div>
        </div>
        <div className="flex gap-4 pt-2">
          <div className="text-2xl ">7 Day Change:</div>
          <div className=" text-xl pt-1">${sevd}</div>
        </div>
      </div>

      <AstroChart />
    </div>
  );
};

export default dojoswap;
