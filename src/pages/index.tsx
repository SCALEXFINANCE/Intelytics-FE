import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { OverviewTable, OverviewTableMobile } from "@/components/OverviewTable";
import Charted from "@/components/ChartComponent";
import App from "@/components/TestChart";
import SearchBar from "@/components/Searchbar";
import InjectiveChart from "@/components/InjectiveChart";
import { TokensTable } from "@/components/TokensTable";
import Token from "../../public/TOKEN.png";
import Inj from "../../public/inj.png";

const Overview = () => {
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
  const [stable, setStable] = useState<string>();
  const [volume, setVolume] = useState<string>();
  const [funding, setFunding] = useState<string>();
  const [injprice, setInjPrice] = useState<string>();
  const [injcap, setInjCap] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");

        const response4 = await axios.get("https://api.llama.fi/v2/chains");
        const chains = response4.data;
        // const response5 = await axios.get(
        //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
        // );
        // const coingeckoAPI = response5.data;
        // const injectiveCoin = coingeckoAPI.find(
        //   (coin) => coin.id === "injective-protocol"
        // );
        // const injectivePrice = injectiveCoin.current_price;
        // const injectiveMarketCap = injectiveCoin.market_cap;
        // console.log(injectivePrice);
        // console.log(injectiveMarketCap);

        const response6 = await axios.get(
          "https://coins.llama.fi/prices/current/ethereum:0xe28b3b32b6c345a34ff64674606124dd5aceca30,secret:secret14706vxakdzkz9a36872cs62vpl5qd84kpwvpew,binance-smart-chain:0xa2b726b1145a4773f68593cf171187d8ebe4d495,cosmos:ibc%2F64BA6E31FE887D66C6F8F31C7B1A80C7CA179239677B4088BB55F5EA07DBE273?searchWidth=4h"
        );

        const price =
          response6.data.coins[
            "ethereum:0xe28b3b32b6c345a34ff64674606124dd5aceca30"
          ].price;
        console.log(price);

        const response7 = await axios.get(
          "https://api.llama.fi/v2/historicalChainTvl/Injective"
        );

        const protocols2 = response7.data;
        console.log(protocols2);

        const values: any = [];
        const tvl2 = [];
        tvl2.push(...protocols2.slice(-1));
        tvl2.forEach((data: any) => {
          values.push(data.tvl);
        });
        console.log(values);
        const formatted10 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(values);
        setTotalTVL(formatted10);

        const injective = chains.find(
          (chain: any) => chain.gecko_id === "injective-protocol"
        );
        const injectiveTvl = injective.tvl;

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
        const dex = totalTvlAstro + totalTvlDojo;
        const der = totalTvlHelix;
        const liq = totalTvlHydro;

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(injectiveTvl);

        const formatted2 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(dex);
        setStable(formatted2);

        const formatted3 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(der);
        setVolume(formatted3);

        const formatted4 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(liq);
        setFunding(formatted4);

        const formatted5 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(price);
        setInjPrice(formatted5);

        // const formatted6 = new Intl.NumberFormat("en-US", {
        //   style: "currency",
        //   currency: "USD",
        //   minimumFractionDigits: 2,
        //   maximumFractionDigits: 2,
        // }).format(injectiveMarketCap);
        // setInjCap(formatted6);
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
    <div className="p-6 lg:px-14 lg:py-24 w-full flex gap-12 flex-col">
      {/* <div>DEFI-overview</div> */}

      {/* button block
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
      </div> */}

      <div className="w-full center flex gap-4 flex-wrap items-center justify-center font-mono">
        <div className="max-w-[384px] h-[180px] p-6 w-full rounded-lg border border-[#646D80] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_3001_598)">
                <path
                  d="M13.4853 7.06504C13.7761 6.84568 14.0646 6.6772 14.3227 6.55852C14.4007 8.47293 15.3368 9.91246 16.2377 11.184C16.3201 11.3003 16.4018 11.4149 16.4827 11.5282C17.4578 12.8949 18.2928 14.0653 18.384 15.6146C18.4889 17.3983 18.0441 18.9063 17.1816 19.9558C16.3296 20.9927 15.0155 21.65 13.2258 21.65C11.3706 21.65 9.97643 21.1741 9.00342 20.3759C8.03497 19.5814 7.41603 18.4123 7.2093 16.891C7.0059 15.3942 7.36812 14.3305 7.75941 13.6483C7.83636 13.5141 7.91493 13.3939 7.99133 13.2876L8.27482 13.826C8.77077 14.7679 9.92133 15.151 10.8829 14.6944C12.058 14.1365 12.3087 12.7035 11.9356 11.6974C11.6746 10.9936 11.5356 10.1341 11.8377 9.27357C12.1764 8.30866 12.8194 7.56728 13.4853 7.06504ZM7.74151 11.5908L7.73933 11.5924L7.73578 11.5951L7.72644 11.6023C7.71925 11.6078 7.71014 11.615 7.69926 11.6238C7.6775 11.6413 7.64861 11.6652 7.61376 11.6957C7.54411 11.7566 7.45033 11.8438 7.3419 11.9579C7.12532 12.1859 6.84809 12.5238 6.58837 12.9766C6.0644 13.8901 5.6241 15.2515 5.87159 17.0728C6.11576 18.8696 6.87028 20.3721 8.14718 21.4196C9.41953 22.4634 11.1426 23 13.2258 23C15.3746 23 17.089 22.1948 18.2246 20.8129C19.3498 19.4437 19.8517 17.5767 19.7316 15.5354C19.6165 13.5772 18.5498 12.0915 17.6077 10.7791C17.5167 10.6524 17.4269 10.5273 17.3392 10.4035C16.3115 8.953 15.4999 7.61591 15.6971 5.74577C15.7172 5.55549 15.6555 5.36563 15.5275 5.22342C15.3995 5.0812 15.2171 5 15.0258 5C14.682 5 14.2886 5.10639 13.9078 5.26639C13.5151 5.43131 13.0893 5.67276 12.6724 5.98725C11.8401 6.61495 11.0081 7.56106 10.5639 8.82643C10.1208 10.0887 10.3453 11.2918 10.6699 12.1669C10.883 12.7415 10.6518 13.3097 10.3039 13.4749C9.99621 13.621 9.62805 13.4984 9.46935 13.197L8.74277 11.8171C8.65084 11.6425 8.48711 11.5168 8.29467 11.4732C8.10223 11.4296 7.89972 11.4729 7.74151 11.5908Z"
                  fill="#EF7954"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_3001_598"
                  x="-4"
                  y="-3"
                  width="32"
                  height="32"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="-1" dy="-1" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.937255 0 0 0 0 0.657647 0 0 0 0 0.329412 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_3001_598"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_3001_598"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <p className="drop-shadow-[0_0px_12px_#ef7854f9] uppercase font-mono">
              Trending
            </p>
          </div>
          <div
            aria-details="Top Trending across blockchains"
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-2 text-sm">
              <div className="w-full flex items-center gap-2">
                <span className="text-[#979DAA]">#1</span>
                <div className="w-full flex items-center gap-2 justify-between">
                  <div className="w-full">
                    <img />
                    <div className="flex">
                      <p>DOJO/</p>
                      <span className="text-[#979DAA]">INJ</span>
                    </div>
                  </div>
                  <div className="flex lg:gap-6 gap-2">
                    <p className="text-[#979DAA]">$8221.09</p>
                    <p className="text-[#16C784]">+3.04</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="text-[#979DAA]">#2</span>
                <div className="w-full flex items-center gap-2 justify-between">
                  <div className="w-full">
                    <img />
                    <div className="flex">
                      <p>DOJO/</p>
                      <span className="text-[#979DAA]">INJ</span>
                    </div>
                  </div>
                  <div className="flex lg:gap-6 gap-2">
                    <p className="text-[#979DAA]">$8221.09</p>
                    <p className="text-[#16C784]">+3.04</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="text-[#979DAA]">#3</span>
                <div className="w-full flex items-center gap-2 justify-between">
                  <div className="w-full">
                    <img />
                    <div className="flex">
                      <p>DOJO/</p>
                      <span className="text-[#979DAA]">INJ</span>
                    </div>
                  </div>
                  <div className="flex lg:gap-6 gap-2">
                    <p className="text-[#979DAA]">$8221.09</p>
                    <p className="text-[#16C784]">+3.04</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[384px] h-[180px] p-6 w-full rounded-lg border border-[#646D80] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <svg
              width="27"
              height="28"
              viewBox="0 0 27 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_809_529)">
                <path
                  d="M10.0537 5.73909L10.4716 7.02405C10.6016 7.4147 10.8209 7.76968 11.1122 8.06078C11.4036 8.35188 11.7588 8.57106 12.1498 8.70092L13.4357 9.11854L13.4614 9.12496C13.5605 9.1599 13.6464 9.2247 13.7071 9.31043C13.7678 9.39615 13.8004 9.49859 13.8004 9.60361C13.8004 9.70863 13.7678 9.81106 13.7071 9.89679C13.6464 9.98252 13.5605 10.0473 13.4614 10.0823L12.1755 10.4999C11.7845 10.6297 11.4293 10.8489 11.138 11.14C10.8467 11.4311 10.6273 11.7861 10.4973 12.1767L10.0794 13.4617C10.0444 13.5607 9.97959 13.6465 9.8938 13.7072C9.808 13.7678 9.70549 13.8004 9.60039 13.8004C9.49529 13.8004 9.39278 13.7678 9.30698 13.7072C9.29852 13.7012 9.29027 13.6949 9.28223 13.6885C9.2087 13.6295 9.15289 13.551 9.12138 13.4617L8.70345 12.1767C8.68098 12.1086 8.65579 12.0415 8.62798 11.9756C8.49594 11.6629 8.30467 11.3778 8.064 11.1364C8.01824 11.0905 7.97089 11.0463 7.92206 11.0041C7.66001 10.7772 7.35542 10.6034 7.02529 10.4934L5.73935 10.0758C5.64024 10.0409 5.55441 9.97609 5.4937 9.89036C5.43299 9.80464 5.40039 9.7022 5.40039 9.59718C5.40039 9.49216 5.43299 9.38973 5.4937 9.304C5.55441 9.21827 5.64024 9.15347 5.73935 9.11854L7.02529 8.70092C7.41149 8.56768 7.7616 8.34698 8.04826 8.05607C8.33492 7.76517 8.55036 7.41196 8.67773 7.02405L9.09566 5.73909C9.13062 5.64005 9.19547 5.55429 9.28127 5.49363C9.36706 5.43297 9.46957 5.40039 9.57467 5.40039C9.67977 5.40039 9.78228 5.43297 9.86808 5.49363C9.95387 5.55429 10.0187 5.64005 10.0537 5.73909ZM23.4004 10.8004C23.4004 10.469 23.1318 10.2004 22.8004 10.2004H18.0004C17.669 10.2004 17.4004 10.469 17.4004 10.8004C17.4004 11.1318 17.669 11.4004 18.0004 11.4004L21.3518 11.4004L16.2003 16.5519L14.2247 14.5761C14.1121 14.4636 13.9595 14.4004 13.8004 14.4004C13.6413 14.4004 13.4887 14.4636 13.3761 14.5761L6.77613 21.1761C6.54181 21.4104 6.54181 21.7903 6.77613 22.0247C7.01044 22.259 7.39034 22.259 7.62465 22.0247L13.8004 15.8489L15.776 17.8246C15.8885 17.9372 16.0411 18.0004 16.2002 18.0004C16.3594 18.0004 16.512 17.9372 16.6245 17.8247L22.2004 12.2489V15.6004C22.2004 15.9318 22.469 16.2004 22.8004 16.2004C23.1318 16.2004 23.4004 15.9318 23.4004 15.6004V10.8004ZM22.2214 20.9579L23.1399 21.2562L23.1583 21.2608C23.2291 21.2858 23.2904 21.332 23.3337 21.3933C23.3771 21.4545 23.4004 21.5277 23.4004 21.6027C23.4004 21.6777 23.3771 21.7509 23.3337 21.8121C23.2904 21.8733 23.2291 21.9196 23.1583 21.9446L22.2397 22.2429C21.9605 22.3356 21.7067 22.4922 21.4987 22.7001C21.2906 22.908 21.1339 23.1616 21.0411 23.4406L20.7425 24.3585C20.7176 24.4292 20.6712 24.4905 20.61 24.5338C20.5487 24.5771 20.4755 24.6004 20.4004 24.6004C20.3253 24.6004 20.2521 24.5771 20.1908 24.5338C20.1295 24.4905 20.0832 24.4292 20.0582 24.3585L19.7597 23.4406C19.6675 23.1608 19.5111 22.9063 19.303 22.6975C19.0949 22.4888 18.8408 22.3315 18.561 22.2383L17.6425 21.94C17.5717 21.915 17.5104 21.8687 17.467 21.8075C17.4237 21.7463 17.4004 21.6731 17.4004 21.5981C17.4004 21.5231 17.4237 21.4499 17.467 21.3887C17.5104 21.3274 17.5717 21.2812 17.6425 21.2562L18.561 20.9579C18.8369 20.8627 19.087 20.7051 19.2917 20.4973C19.4965 20.2895 19.6504 20.0372 19.7413 19.7601L20.0399 18.8423C20.0648 18.7716 20.1112 18.7103 20.1724 18.667C20.2337 18.6237 20.3069 18.6004 20.382 18.6004C20.4571 18.6004 20.5303 18.6237 20.5916 18.667C20.6529 18.7103 20.6992 18.7716 20.7242 18.8423L21.0227 19.7601C21.1155 20.0392 21.2722 20.2927 21.4803 20.5007C21.6884 20.7086 21.9421 20.8652 22.2214 20.9579Z"
                  fill="#16C784"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_809_529"
                  x="0.400391"
                  y="0.400391"
                  width="26"
                  height="27.1992"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="-1" dy="-1" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.0862745 0 0 0 0 0.780392 0 0 0 0 0.517647 0 0 0 0.6 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_809_529"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_809_529"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>

            <p className="drop-shadow-[0_0px_12px_#16c784] text-[#16c784] uppercase font-mono">
              Top Gainers
            </p>
          </div>
          <div
            aria-details="Top Trending across blockchains"
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-2 text-sm">
              <div className="w-full flex items-center gap-2">
                <span className="text-[#979DAA]">#1</span>
                <div className="w-full flex items-center gap-2 justify-between">
                  <div className="w-full">
                    <img />
                    <div className="flex">
                      <p>DOJO/</p>
                      <span className="text-[#979DAA]">INJ</span>
                    </div>
                  </div>
                  <div className="flex lg:gap-6 gap-2">
                    <p className="text-[#979DAA]">$8221.09</p>
                    <p className="text-[#16C784]">+3.04</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="text-[#979DAA]">#2</span>
                <div className="w-full flex items-center gap-2 justify-between">
                  <div className="w-full">
                    <img />
                    <div className="flex">
                      <p>DOJO/</p>
                      <span className="text-[#979DAA]">INJ</span>
                    </div>
                  </div>
                  <div className="flex lg:gap-6 gap-2">
                    <p className="text-[#979DAA]">$8221.09</p>
                    <p className="text-[#16C784]">+3.04</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="text-[#979DAA]">#3</span>
                <div className="w-full flex items-center gap-2 justify-between">
                  <div className="w-full">
                    <img />
                    <div className="flex">
                      <p>DOJO/</p>
                      <span className="text-[#979DAA]">INJ</span>
                    </div>
                  </div>
                  <div className="flex lg:gap-6 gap-2">
                    <p className="text-[#979DAA]">$8221.09</p>
                    <p className="text-[#16C784]">+3.04</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[384px] h-[180px] p-6 w-full rounded-lg border border-[#646D80] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <svg
                width="27"
                height="28"
                viewBox="0 0 27 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_809_539)">
                  <path
                    d="M10.0537 24.2609L10.4716 22.9759C10.6016 22.5853 10.8209 22.2303 11.1122 21.9392C11.4036 21.6481 11.7588 21.4289 12.1498 21.2991L13.4357 20.8815L13.4614 20.875C13.5605 20.8401 13.6464 20.7753 13.7071 20.6896C13.7678 20.6038 13.8004 20.5014 13.8004 20.3964C13.8004 20.2914 13.7678 20.1889 13.7071 20.1032C13.6464 20.0175 13.5605 19.9527 13.4614 19.9177L12.1755 19.5001C11.7845 19.3703 11.4293 19.1511 11.138 18.86C10.8467 18.5689 10.6273 18.2139 10.4973 17.8233L10.0794 16.5383C10.0444 16.4393 9.97959 16.3535 9.8938 16.2928C9.808 16.2322 9.70549 16.1996 9.60039 16.1996C9.49529 16.1996 9.39278 16.2322 9.30698 16.2928C9.29852 16.2988 9.29027 16.3051 9.28223 16.3115C9.2087 16.3705 9.15289 16.449 9.12138 16.5383L8.70345 17.8233C8.68098 17.8914 8.65579 17.9585 8.62798 18.0244C8.49594 18.3371 8.30467 18.6222 8.064 18.8636C8.01824 18.9095 7.97089 18.9537 7.92206 18.9959C7.66001 19.2228 7.35542 19.3966 7.02529 19.5066L5.73935 19.9242C5.64024 19.9591 5.55441 20.0239 5.4937 20.1096C5.43299 20.1954 5.40039 20.2978 5.40039 20.4028C5.40039 20.5078 5.43299 20.6103 5.4937 20.696C5.55441 20.7817 5.64024 20.8465 5.73935 20.8815L7.02529 21.2991C7.41149 21.4323 7.7616 21.653 8.04826 21.9439C8.33492 22.2348 8.55036 22.588 8.67773 22.9759L9.09566 24.2609C9.13062 24.3599 9.19547 24.4457 9.28127 24.5064C9.36706 24.567 9.46957 24.5996 9.57467 24.5996C9.67977 24.5996 9.78228 24.567 9.86808 24.5064C9.95387 24.4457 10.0187 24.3599 10.0537 24.2609ZM23.4004 19.1996C23.4004 19.531 23.1318 19.7996 22.8004 19.7996H18.0004C17.669 19.7996 17.4004 19.531 17.4004 19.1996C17.4004 18.8682 17.669 18.5996 18.0004 18.5996L21.3518 18.5996L16.2003 13.4481L14.2247 15.4239C14.1121 15.5364 13.9595 15.5996 13.8004 15.5996C13.6413 15.5996 13.4887 15.5364 13.3761 15.4239L6.77613 8.82387C6.54181 8.58956 6.54181 8.20966 6.77613 7.97534C7.01044 7.74103 7.39034 7.74103 7.62465 7.97534L13.8004 14.1511L15.776 12.1754C15.8885 12.0628 16.0411 11.9996 16.2002 11.9996C16.3594 11.9996 16.512 12.0628 16.6245 12.1753L22.2004 17.7511V14.3996C22.2004 14.0682 22.469 13.7996 22.8004 13.7996C23.1318 13.7996 23.4004 14.0682 23.4004 14.3996V19.1996ZM22.2214 9.04208L23.1399 8.74379L23.1583 8.7392C23.2291 8.71425 23.2904 8.66796 23.3337 8.60673C23.3771 8.54549 23.4004 8.47232 23.4004 8.39731C23.4004 8.3223 23.3771 8.24913 23.3337 8.18789C23.2904 8.12666 23.2291 8.08038 23.1583 8.05542L22.2397 7.75713C21.9605 7.66437 21.7067 7.50781 21.4987 7.29988C21.2906 7.09196 21.1339 6.8384 21.0411 6.55936L20.7425 5.64153C20.7176 5.57079 20.6712 5.50953 20.61 5.4662C20.5487 5.42287 20.4755 5.3996 20.4004 5.3996C20.3253 5.3996 20.2521 5.42287 20.1908 5.4662C20.1295 5.50953 20.0832 5.57079 20.0582 5.64153L19.7597 6.55936C19.6675 6.83924 19.5111 7.09372 19.303 7.30248C19.0949 7.51124 18.8408 7.6685 18.561 7.76172L17.6425 8.06001C17.5717 8.08496 17.5104 8.13125 17.467 8.19248C17.4237 8.25372 17.4004 8.32689 17.4004 8.4019C17.4004 8.47692 17.4237 8.55008 17.467 8.61132C17.5104 8.67255 17.5717 8.71884 17.6425 8.74379L18.561 9.04208C18.8369 9.13726 19.087 9.29491 19.2917 9.50269C19.4965 9.71048 19.6504 9.96277 19.7413 10.2399L20.0399 11.1577C20.0648 11.2284 20.1112 11.2897 20.1724 11.333C20.2337 11.3763 20.3069 11.3996 20.382 11.3996C20.4571 11.3996 20.5303 11.3763 20.5916 11.333C20.6529 11.2897 20.6992 11.2284 20.7242 11.1577L21.0227 10.2399C21.1155 9.96081 21.2722 9.70726 21.4803 9.49933C21.6884 9.2914 21.9421 9.13484 22.2214 9.04208Z"
                    fill="#FF6767"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_809_539"
                    x="0.400391"
                    y="0.400391"
                    width="26"
                    height="27.1992"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="-1" dy="-1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 0.403922 0 0 0 0 0.403922 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_809_539"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_809_539"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>

              <p className="drop-shadow-[0_0px_12px_#FF6767] uppercase font-mono text-[#FF6767]">
                Top Losers
              </p>
            </div>
          </div>
          <div
            aria-details="Top Trending across blockchains"
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-2 text-sm">
              <div className="w-full flex items-center gap-2">
                <span className="text-[#979DAA]">#1</span>
                <div className="w-full flex items-center gap-2 justify-between">
                  <div className="w-full">
                    <img />
                    <div className="flex">
                      <p>DOJO/</p>
                      <span className="text-[#979DAA]">INJ</span>
                    </div>
                  </div>
                  <div className="flex lg:gap-6 gap-2">
                    <p className="text-[#979DAA]">$8221.09</p>
                    <p className="text-[#FF6767]">-2.12</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="text-[#979DAA]">#2</span>
                <div className="w-full flex items-center gap-2 justify-between">
                  <div className="w-full">
                    <img />
                    <div className="flex">
                      <p>DOJO/</p>
                      <span className="text-[#979DAA]">INJ</span>
                    </div>
                  </div>
                  <div className="flex lg:gap-6 gap-2">
                    <p className="text-[#979DAA]">$8221.09</p>
                    <p className="text-[#FF6767]">-2.12</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="text-[#979DAA]">#3</span>
                <div className="w-full flex items-center gap-2 justify-between">
                  <div className="w-full">
                    <img />
                    <div className="flex">
                      <p>DOJO/</p>
                      <span className="text-[#979DAA]">INJ</span>
                    </div>
                  </div>
                  <div className="flex lg:gap-6 gap-2">
                    <p className="text-[#979DAA]">$8221.09</p>
                    <p className="text-[#FF6767]">-2.12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* graph card */}
      <div className="w-full flex flex-col gap-4 font-mono">
        <p className="uppercase drop-shadow-[0_0px_12px_#3861FB] text-lg">
          Market Chart Analysis
        </p>
        {/* left */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 justify-between ">
          <div className="bg-black rounded-xl lg:px-2 flex gap-2 flex-col min-w-[280px] lg:w-1/2 w-full border border-gray-500">
            <div className=" flex flex-col gap-2 p-6">
              <div className=" flex gap-3">
                <Image
                  alt=""
                  src={Token}
                  height={30}
                  width={30}
                  className=" rounded-full"
                />
                <div className=" font-bold text-gray-500">#1 Trending</div>
              </div>
              <div className=" flex gap-3">
                <Image
                  alt=""
                  src={Inj}
                  height={30}
                  width={30}
                  className=" rounded-full"
                />
                <div className=" font-bold text-2xl ">INJECTIVE</div>
              </div>
              <div className="w-full flex flex-col">
                <p className=" lg:text-gray-400 hidden lg:inline">
                  Injective Total Value Locked
                </p>
                <p className=" text-4xl hidden lg:inline">{totalTVL}</p>
              </div>
              <div className="flex flex-col lg:flex-row justify-between pt-4">
                <div>Top Protocols TVL</div>
                <div>{stable}</div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between  ">
                <div>Volume</div>
                <div>{volume}</div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between  ">
                <div>Liquid Staking</div>
                <div>{funding}</div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <div>INJ Price</div>
                <div>{injprice}</div>
              </div>
              <div className="flex justify-between ">
                {/* <div>INJ Market Cap</div> */}
                {/* <div>{injcap}</div> */}
              </div>
            </div>
          </div>

          {/* right */}
          <div className=" flex flex-col bg-black rounded-xl lg:w-full border border-gray-500 font-mono">
            <div className="p-6">
              {/* <Charted height={200} width={600} /> */}
              <div className="lg:text-xl lg:inline hidden">
                <div className="flex items-center gap-2">
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 3.23047C6 1.98783 7.00736 0.980469 8.25 0.980469H9.75C10.9926 0.980469 12 1.98783 12 3.23047V19.0005C10.0251 19.0005 8.0084 19.0005 6 19.0005V3.23047ZM4.5 8.00047H2.25C1.00736 8.00047 0 9.00782 0 10.2505V18.2505C0 18.6647 0.335786 19.0005 0.75 19.0005H4.5V8.00047ZM13.5 19.0005H17.25C17.6642 19.0005 18 18.6647 18 18.2505V7.25047C18 6.00782 16.9926 5.00047 15.75 5.00047H13.5V19.0005Z"
                      fill="#979DAA"
                    />
                  </svg>
                  <p className="uppercase text-[#979DAA] text-lg">
                    Token Chart
                  </p>
                </div>
              </div>
              <div></div>
              <div className=" flex w-full items-center justify-center lg:translate-x-12 lg:translate-y-5">
                <InjectiveChart />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden flex flex-col items-center">
          <div className=" text-gray-400 text-sm inline lg:hidden ">
            Injective Total Value Locked
          </div>
          <div className=" text-2xl inline ">{totalTVL}</div>
        </div>
      </div>

      {/* table options */}
      <div className="hidden lg:inline">
        <TokensTable />
      </div>
      <div className="inline lg:hidden">
        <OverviewTableMobile />
      </div>
    </div>
  );
};

export default Overview;
