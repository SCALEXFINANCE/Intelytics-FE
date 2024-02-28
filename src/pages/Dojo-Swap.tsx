import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import DojoChart from "@/components/DojoChart";
// import DojoSwapChart from "@/components/DojoChart";

export default function DojoSwap() {
  const [tvl, settvl] = useState<string>();
  const [oned, setoned] = useState<number>();
  const [oneh, setoneh] = useState<number>();
  const [sevd, setsevd] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");

        // console.log(astroport24hVolume);

        // Protocol (TVL) API Testing.
        const protocols = response.data;
        const dojoswapId = "3965";

        const dojoswap = protocols.find(
          (protocol: { id: string }) => protocol.id === dojoswapId
        );

        const formatted2 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(dojoswap.tvl);

        settvl(formatted2);
        setoned(Math.round(dojoswap.change_1d * 100) / 100);
        setoneh(Math.round(dojoswap.change_1h * 100) / 100);
        setsevd(Math.round(dojoswap.change_7d * 100) / 100);
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
        <a href="https://dojo.trading/">
          <div className=" font-bold text-4xl p-3 "> Dojo Swap</div>
        </a>

        <a href="https://twitter.com/dojo_trading">
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
        <div className=" flex gap-8 mt-10  bg-gray-900 rounded-xl">
          <div className="px-3 p-7">
            <div className="flex gap-4 pt-5 ">
              <div className="text-2xl ">Total Value Locked:</div>
              <div className=" text-xl pt-1">{tvl}</div>
            </div>
            <div className="flex gap-4 pt-2">
              <div className="text-xl ">1 Hour Change:</div>
              <div
                className={`text-xl pt-1 ${
                  oneh! < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {oneh}%
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <div className="text-xl ">24 Hour Change:</div>
              <div
                className={`text-xl pt-1 ${
                  oned! < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {oned}%
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <div className="text-xl ">7 Day Change:</div>
              <div
                className={`text-xl pt-1 ${
                  sevd! < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {sevd}%
              </div>
            </div>
          </div>

          <div className=" flex flex-col ">
            <div className="px-5 pt-5 text-right ">
              Dojo Swap Total Value Locked (excludes Staking)
            </div>
            <DojoChart />
          </div>
        </div>

        <div className=" px-3">Description</div>

        <div className=" p-5 text-xl bg-gray-900 rounded-xl">
          Dojoswap is a{" "}
          <Link
            href="https://uniswap.org/"
            className=" underline decoration-blue-500 text-blue-500"
          >
            Uniswap
          </Link>
          -inspired automated market-maker (AMM) protocol implemented with smart
          contracts on the{" "}
          <a
            href="https://injective.com/developers/"
            className="underline decoration-blue-500 text-blue-500"
          >
            Injective
          </a>{" "}
          blockchain. The protocol enables a decentralized on-chain exchange for
          various assets involved in the Injective ecosystem. Dojoswap Exchange
          is the official web front-end interface for swapping Dojo native
          tokens and CW20 tokens.
        </div>
      </div>

      {/* <iframe width="640px" height="360px" src="https://defillama.com/chart/protocol/dojoswap?&theme=dark" title="DefiLlama"  ></iframe> */}

      {/* <DojoSwapChart /> */}
    </div>
  );
}
