import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import HelixChart from "@/components/HelixChart";

const helix = () => {
  const [tvl, settvl] = useState<string>();
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
        const helixId = "2259";

        const coin = protocols.find(
          (protocol: { id: string }) => protocol.id === helixId
        );
        const formatted2 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(coin.tvl);

        settvl(formatted2);
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
        <a href="https://www.helix.com/">
          <div className=" font-bold text-4xl p-3 ">Helix</div>
        </a>

        <a href="https://twitter.com/HelixApp_">
          <Image
            src={"/twitter.png"}
            alt=""
            height={25}
            width={25}
            className=" pt-5"
          />
        </a>
      </div>

      <div className=" flex flex-col gap-5">
        <div className="flex gap-8 mt-10  bg-gray-900 rounded-xl">
          <div className="px-3 p-7">
            <div className="flex gap-4 pt-5 ">
              <div className="text-2xl ">Total Value Locked:</div>
              <div className=" text-xl pt-1">{tvl}</div>
            </div>
            <div className="flex gap-4 pt-2">
              <div className="text-2xl ">1 Hour Change:</div>
              <div
                className={`text-xl pt-1 ${
                  oneh < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {oneh}%
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <div className="text-2xl ">24 Hour Change:</div>
              <div
                className={`text-xl pt-1 ${
                  oned < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {oned}%
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <div className="text-2xl ">7 Day Change:</div>
              <div
                className={`text-xl pt-1 ${
                  sevd < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {sevd}%
              </div>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className="px-5 pt-5 text-right ">
              Helix Total Value Locked
            </div>
            <HelixChart />
          </div>
        </div>

        <div className=" px-3">Description</div>

        <div className=" p-5 text-xl bg-gray-900 rounded-xl">
          Explore limitless financial possibilities. Helix provides unmatched
          access to global financial primitives, endless on-chain gateways, and
          true institutional liquidity
        </div>
      </div>
    </div>
  );
};

export default helix;
