import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  LineElement,
} from "chart.js";

import { Bar, Line, Scatter, Bubble } from "react-chartjs-2";
import { NextPage } from "next";
import { Button } from "@/components/ui/button";

ChartJs.register(
  CategoryScale,
  LinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

interface Props {
  height: string | number | undefined;
  width: string | number | undefined;
}

const contents: any =  {
  sushi: {
  name: "Sushi",
  category: "CW404",
  totalSupply: 15000,
  circulatingSupply: 15000,
  description:"The #1 CW404 NFT Project on Cosmos, on Injective.Powered by Dojoswap.",
  symbol: "SUSHI"
},
nonja: {
  name: "Nonja",
  category: "Meme",
  totalSupply: 1000000000,
  circulatingSupply: 1000000000,
  description:"is futir of kultur, Nonja is the first community brought meme token on injective.",
  symbol: "NONJA"
},
kage: {
  name: "KAGE",
  category: "Utility",
  totalSupply: 100000000,
  circulatingSupply: 26875564,
  description:"$KAGE, the native token of the Kage Finance ecosystem, is meticulously designed to align incentives, foster community participation, and drive sustainable growth. With a finite total supply, $KAGE serves as the backbone of the Injective blockchain, offering a range of utilities within our ecosystem.",
  symbol: "KAGE"
},
ping: {
  name: "PING",
  category: "Meme",
  totalSupply: 1000000000,
  circulatingSupply: 800000000,
  description:"My name is PING, I have a red nose which makes no sense...~ PING is memecoin on Injective which really makes no sense.",
  symbol: "PING"
},
ykz: {
  name: "YKZ",
  category: "CW404",
  totalSupply: 10000,
  circulatingSupply: 9000,
  description:"- CW404 by Kage Finance on Injective. Fractionalized NFT built with chance, utilities and rewards.",
  symbol: "YKZ"
},
hinj: {
  name: "hINJ",
  category: "CW20",
  totalSupply: 1820230.18,
  description:"hINJ is the liquid staking token (LST) created by Hydro Protocol that enables instant staking benefits and unlocks liquidity for different uses across other DeFi protocols.",
  symbol: "hINJ"
},
dib: {
  name: "DIB",
  category: "Meme",
  totalSupply: 69000000000,
  circulatingSupply: 69000000000,
  description:"DogInjBread is a memecoin on Injective with absolutely no roadmap, no CW404 only 100% vibe.",
  symbol: "DIB"
},
duel: {
  name: "Duel",
  category: "Utility",
  totalSupply: 10000000000,
  circulatingSupply: 1454408582,
  description:"DUEL is the native utility token that is used for Community voting on proposals and In-game utilities by GameGPT.",
  symbol: "DUEL"
},
monks: {
  name: "MONKS",
  category: "Meme",
  totalSupply: 1000000000, 
  description:"MONKS is a memecoin by CAALABS which also developing Apello. MONKS says “Suk Thumbs not Diks! “",
  symbol: "MONKS"
},
xnj:{
  name: "XNJ",
  category: "Gaming",
  description:"$XNJ is a native Governance token by XNinja.tech for gaining access to ninja characters and partaking in diverse in-game endeavors.",
  symbol: "XNJ"
},
dojo: {
  name: "Dojo",
  category: "Utility",
  apiUrl:
    "https://api.dexscreener.com/latest/dex/tokens/inj1zdj9kqnknztl2xclm5ssv25yre09f8908d4923",
  totalSupply: 200000000,
  circulatingSupply: 80000000,
  description:"Native token by DojoSwap, the biggedst AMM on Injective",
  symbol: "DOJO"
},

kira: {
  name: "Kira",
  category: "Meme",
  apiUrl:
    "https://api.dexscreener.com/latest/dex/tokens/factory-inj1xy3kvlr4q4wdd6lrelsrw2fk2ged0any44hhwq-KIRA",
  totalSupply: 69000000000,
  circulatingSupply: 69000000000,
  description:"More than just a meme on Injective. Inspired by Mirza's lovely cat 😺",
  symbol: "KIRA"
},

alien: {
  name: "Alien",
  category: "Utility",
  apiUrl:
    "https://api.dexscreener.com/latest/dex/tokens/factory-inj1mly2ykhf6f9tdj58pvndjf4q8dzdl4myjqm9t6-ALIEN",
  totalSupply: 30000000,
  circulatingSupply: 22000000,
  description:"An utility token by 👽 the first ever NFT  collection on Injective Aliens on Injective.",
  symbol: "$ALIEN"
},

ninja: {
  name: "Ninja",
  category: "Meme",
  apiUrl:
    "https://api.dexscreener.com/latest/dex/tokens/factory-inj1xtel2knkt8hmc9dnzpjz6kdmacgcfmlv5f308w-ninja",
  totalSupply: 1000000000,
  circulatingSupply: 1000000000,
  description:"First memecoin on Injective. It's a big dog, but he has nunchucks",
  symbol: "NINJA"
},

stinj: {
  name: "Stinj",
  category: "Utility",
  apiUrl:
    "https://api.dexscreener.com/latest/dex/tokens/ibc-AC87717EA002B0123B10A05063E69BCA274BA2C44D842AEEB41558D2856DCE93",

  circulatingSupply: 24552.75,
  description:"stINJ is Stride Injective, the biggest staker protocol with more than 20 chain support and validators. Stride let's you stake your tokens from any Cosmos chain. See your rewards accumulate in real time. No minimum. It's that simple.",
  symbol: "stINJ"
},

dinj: {
  name: "Dinj",
  category: "Utility ",
  apiUrl:
    "https://api.dexscreener.com/latest/dex/tokens/inj134wfjutywny9qnyux2xgdmm0hfj7mwpl39r3r9",
  totalSupply: 100000000,
  circulatingSupply: 51600000,
  description:"dINJ is the liquid staking solution for DojoSwap on Injective.",
  symbol: "dINJ"
},

zignaly: {
  name: "Zignaly",
  category: "Utility",
  apiUrl:
    "https://api.dexscreener.com/latest/dex/tokens/peggy0xb2617246d0c6c0087f18703d576831899ca94f01",
  totalSupply: 100000000,
  circulatingSupply: 51600000,
  description:"Zignaly use AI to hand-pick only the top traders that beat inflation and traditional markets. The Z-Score AI algorithm uses intricate weighting and multifaceted factors like profitability, risk, and consistency to identify top traders. Only the best traders can be listed on ZIGDAO.",
  symbol: "ZIG"
},

roll: {
  name: "Roll",
  category: "Gaming",
  apiUrl:
    "https://api.dexscreener.com/latest/dex/tokens/inj1qv98cmfdaj5f382a0klq7ps4mnjp6calzh20h3",
  totalSupply: 100000000,
  circulatingSupply: 51600000,
  description:"$ROLL is a gaming token and  has a maximum supply of 20,000,000. The maximum supply cap is coded in the CW20 contract and cannot be changed.",
  symbol: "ROLL"
},
babydojo: {
  name: "BabyDOJO",
  category: "CW-20",
  totalSupply: 4198646072.1,
  circulatingSupply: 4198646072.1,
  description:"BabyDOJO is A Not So Meme, it's a first ever reflection token on Injective built for the community.",
  symbol: "babyDOJO"
},
}

export default function tokenName() {
  const router = useRouter();
  const slug = String(router.query.slug).toLowerCase();
  const [price, setPrice] = useState();
  const [marketCap, setMarketCap] = useState<any>();
  const [v24, setv24] = useState<string>();
  const [min5, setMin5] = useState<any>();
  const [hour1, setHr1] = useState();
  const [hour24, sethour24] = useState();
  const [cs ,setCs] = useState<string>();
  const [ts ,setTs] = useState<string>()

  const Data = () => {
    if (price) {
      const value = price * contents[slug].circulatingSupply;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
      setMarketCap(formatted);
    }
  };

  const PriceChart = ({ height, width }: any) => {
    const [chartData, setChartData] = useState([]);
    const chartValues = async () => {
      try {
        const response = await axios.get(
          `http://50.117.104.207:3000/api/getTokenData?tokenName=${String(
            contents[slug].symbol
          )}`
        );
        const response2 = await axios.get(`http://50.117.104.207:3000/api/getDataByInterval/${String(
          contents[slug].symbol)}/5m`)
          const response3 = await axios.get(`http://50.117.104.207:3000/api/getDataByInterval/${String(
          contents[slug].symbol)}/1h`)
          const response4 = await axios.get(`http://50.117.104.207:3000/api/getDataByInterval/${String(
          contents[slug].symbol)}/24h`)
          console.log(response2.data.price[response2.data.price.length-1])
          setMin5(response2.data.price[response2.data.price.length-1])
          setHr1(response3.data.price[response3.data.price.length-1])
          sethour24(response4.data.price[response4.data.price.length-1])
        let Price = response.data.price;
        const last: any = [];
        last.push(...Price.slice(-29));
        setPrice(Price[Price.length - 1]);
        setChartData(last);
        if (price) {
          const value = price * contents[slug].circulatingSupply;
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(value);
          setMarketCap(formatted);
        }

        // setChartData();
        // console.log(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    const data = {
      labels: [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ],
      datasets: [
        {
          label: "Price",
          data: chartData,
          fill: true,
          // fill: 'origin',

          // fillColor: "rgb(75, 192, 192)",
          backgroundColor: "rgb(23,34,62)",
          borderColor: "rgb(41,96,250)",
          tension: 0.3,
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {},
    };
    useEffect(() => {
      chartValues();
    }, []);
    return (
      <div className=" shadow-xl lg:w-[35vw]  lg:h-[40vh] w-[80vw] lg:p-4 rounded-xl">
        <Line data={data} options={options} width={width} height={height} />
      </div>
    );
  };
  const VolumeChart = ({ height, width }: any) => {
    const [chartData, setChartData] = useState([]);
    const chartValues = async () => {
      try {
        const response = await axios.get(
          `http://50.117.104.207:3000/api/getTokenData?tokenName=${String(
            contents[slug].symbol
          )}`
        );
        console.log(response.data.volume);
        const Volume = response.data.volume;
        const last: any = [];
        console.log(Volume[Volume.length - 1]);
        for (var i = 0; i < 30; i++) {
          last.push(Volume[Volume.length - 1].h24);
        }
        console.log(last);

        setChartData(last);
        // setChartData();
        // console.log(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    const data = {
      labels: [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
      ],
      datasets: [
        {
          label: "Volume",
          data: chartData,
          fill: true,
          // fill: 'origin',

          // fillColor: "rgb(75, 192, 192)",
          backgroundColor: "rgb(23,34,62)",
          borderColor: "rgb(41,96,250)",
          tension: 0.3,
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {},
    };
    useEffect(() => {
      chartValues();
    }, []);
    return (
      <div className=" shadow-xl lg:w-[35vw]  lg:h-[40vh] w-[80vw] lg:p-4 rounded-xl">
        <Line data={data} options={options} width={width} height={height} />
      </div>
    );
  };

  const [volume, setVolume] = useState();
  const [pricesel, setPriceSelected] = useState<Boolean>(true);
  const [volsel, setVolSelected] = useState<Boolean>(false);

  const PriceClicked = () => {
    setPriceSelected(true);
    setVolSelected(false);
  };
  const VolumeClicked = () => {
    setVolSelected(true);
    setPriceSelected(false);
  };

  useEffect(() => {
    if (contents[slug]) {
      console.log("from effect", contents[slug].name);
      const formatted3 = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(contents[slug].circulatingSupply);
      setCs(formatted3)
      const formatted4 = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
         
        maximumFractionDigits: 0,
      }).format(contents[slug].totalSupply);
      setTs(formatted4)
      const fetchData = async () => {
        try {
          const apiUrl = await axios.get(`${contents[slug].apiUrl}`);
          const liquidityData = apiUrl.data;
          const volume = liquidityData.pairs[0].volume.h24;
          const price = liquidityData.pairs[0].priceUsd;
          const txns = liquidityData.pairs[0].txns;

          const formatted2 = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(volume);

          setv24(formatted2);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();

      const interval = setInterval(() => {
        fetchData();
      }, 30000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [slug]);

  // {
  //   price && (
  //     setMarketCap(price * contents[slug].circulatingSupply)
  //   )
  // }

  

  return (
    <>
      {contents[slug] && (
        <>
          <div className="h-screen lg:flex lg:flex-row flex-col  justify-start">
            <div className=" left h-screen lg:px-4 lg:w-1/6   lg:pt-8 pb-4 lg:flex hidden gap-6 flex-col bg-gradient-to-b from-black to-[#0e1734] ">
              <div className="flex items-center justify-between">
                <Link
                  onClick={() => {
                    // setVisible(false);
                  }}
                  href={"/"}
                >
                  <Image
                    className="w-[10rem] h-[1.5rem]"
                    src={"/logo.png"}
                    alt="Intelitics logo"
                    height={100}
                    width={100}
                  />
                </Link>
                <button
                  onClick={() => {
                    // setVisible(false);
                  }}
                  className=" -translate-y-[10%] text-6xl font-light hover:text-gray-400 select-none rotate-45 block lg:hidden  text-white "
                >
                  +
                </button>
              </div>

              <div className=" bg-gray-900 p-4 rounded-xl">
                <div className=" text-gray-400 text-sm">Token Info</div>
                <div className="flex gap-2 pt-3 items-center">
                  <Image
                    alt=""
                    src={`/${contents[slug].name}.jpg`}
                    height={40}
                    width={40}
                    className=" rounded-full"
                  />
                  <div className=" flex flex-col ">
                    <a href=" " className=" flex items-center gap-1">
                      <div className="text-lg font-bold ">
                        {" "}
                        {contents[slug].name}
                      </div>
                      <div>/</div>
                      <div className=" flex items-center gap-1">
                        <Image
                          alt=""
                          src="/inj.png"
                          height={20}
                          width={20}
                          className=" rounded-full"
                        />
                        <div className=" font-bold ">INJ</div>
                      </div>
                    </a>
                    <div className=" text-teal-400  text-sm">
                      {contents[slug].category}
                    </div>
                  </div>
                </div>
                <div className=" pt-4 flex justify-between w-full items-center">
                  <div className=" text-sm">Add to your watchlist</div>
                  <Image src="/star.png" alt="" height={20} width={20} />
                </div>
                <div className=" flex flex-col gap-2 mt-4">
                {/* <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>5 min Change</div>
                    <div>${min5}</div>
                  </div> */}
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>1 hr Change</div>
                    <div>{hour1}%</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>24 hr Change</div>
                    <div>{hour24}%</div>
                  </div>
                  
                </div>
                <div className=" flex flex-col gap-1 pt-4">
                  <div>Links:</div>
                  <div className=" flex text-xs gap-2">
                    <div className=" p-1 bg-gray-700 rounded">Website</div>
                    <div className=" p-1 bg-gray-700 rounded">Whitepaper</div>
                    <div className=" p-1 bg-gray-700 rounded">GitHub</div>
                  </div>
                </div>
              </div>

              <div className=" bg-gray-900 p-4 rounded-xl">
                <div className=" text-gray-400 text-sm pb-4">Market Info</div>
                <div className=" flex flex-col gap-4">
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Market Cap</div>
                    {marketCap}
                    {/* {price && 
                    (
                      <div>${price * contents[slug].circulatingSupply}</div>
                    )} */}
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Volume (24h)</div>
                    <div>{v24}</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Total Supply</div>
                    <div>{ts}</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300 items-center">
                    <div>Circulating Supply</div>
                    <div>{cs}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" right px-6 lg:pt-16 pt-5 pb-4 text-white lg:w-5/6 w-full overflow-y-scroll no-scrollbar">
              <div className="bg-gray-900 p-4 rounded-xl w-full lg:hidden mobile-card">
                <div className="flex gap-2 pt-3 items-center">
                  <Image
                    alt=""
                    src={`/${contents[slug].name}.jpg`}
                    height={40}
                    width={40}
                    className=" rounded-full"
                  />
                  <div className=" flex flex-col ">
                    <a href=" " className=" flex items-center gap-1">
                      <div className="text-lg font-bold ">
                        {" "}
                        {contents[slug].name}
                      </div>
                      <div>/</div>
                      <div className=" flex items-center gap-1">
                        <Image
                          alt=""
                          src="/inj.png"
                          height={20}
                          width={20}
                          className=" rounded-full"
                        />
                        <div className=" font-bold ">INJ</div>
                      </div>
                    </a>
                    <div className=" text-teal-400  text-sm">
                      {contents[slug].category}
                    </div>
                  </div>
                </div>
                <div className="pl-10">${price}</div>
                <div className="pt-8">
                  {pricesel && (
                    <div>
                      <PriceChart />
                    </div>
                  )}
                  {volsel && (
                    <div>
                      <VolumeChart />
                    </div>
                  )}
                  <div className=" flex gap-3 w-full items-center justify-center pt-3">
                    <div
                      className={` rounded p-1 pl-3 pr-3 ${
                        pricesel ? "bg-gray-500  " : " bg-gray-800"
                      }`}
                      onClick={PriceClicked}
                    >
                      Price
                    </div>
                    <div
                      className={`  rounded p-1 pl-3 pr-3  ${
                        volsel ? "bg-gray-500 " : "bg-gray-800"
                      }`}
                      onClick={VolumeClicked}
                    >
                      Volume
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col gap-4 mt-4">
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>1 hr Change</div>
                    <div>{hour1}%</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>24 hr Change</div>
                    <div>{hour24}%</div>
                  </div>
                  {/* <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>7 Day Change</div>
                    <div>${contents[slug].totalSupply}</div>
                  </div> */}
                </div>
              </div>
              <div className=" bg-gray-900 p-4 rounded-xl w-full lg:hidden mobile-card mt-5">
                <div className=" text-gray-400 text-sm">Token Info</div>
                <div className="flex gap-2 pt-3">
                  <Image
                    alt=""
                    src={`/${contents[slug].name}.jpg`}
                    height={30}
                    width={30}
                    className=" rounded-full"
                  />
                  <a href=" " className=" flex items-center gap-1">
                    <div className="text-lg font-bold ">
                      {" "}
                      {contents[slug].name}
                    </div>
                    <div>/</div>
                    <div className=" text-teal-400 ">
                      {contents[slug].category}
                    </div>
                  </a>
                </div>

                <div className=" flex flex-col gap-1 pt-4 w-full ">
                  <div className="text-sm">Links:</div>
                  <div className=" flex text-xs gap-2 w-full justify-between">
                    <div className=" p-1 bg-gray-700 rounded pl-4 pr-4">
                      Website
                    </div>
                    <div className=" p-1 bg-gray-700 rounded pl-4 pr-4">
                      Whitepaper
                    </div>
                    <div className=" p-1 bg-gray-700 rounded pl-4 pr-4">
                      GitHub
                    </div>
                  </div>
                </div>
                <div className=" text-gray-400  pb-4 pt-4">Market Info</div>
                <div className=" flex flex-col gap-4">
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Market Cap</div>
                    {marketCap}
                    {/* {price && (
                      <div>${price * contents[slug].circulatingSupply}</div>
                    )} */}
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Volume (24h)</div>
                    <div>{v24}</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300">
                    <div>Total Supply</div>
                    <div>{ts}</div>
                  </div>
                  <div className=" flex justify-between w-full text-sm text-gray-300 items-center">
                    <div>Circulating Supply</div>
                    <div>{cs}</div>
                  </div>
                </div>
              </div>
              <div className="w-full hidden lg:flex lg:flex-row flex-col gap-3  mt-5">
                <div className=" lg:w-1/2 w-full bg-gray-900 rounded-xl p-6">
                  <div className=" w-full flex justify-between">
                    <div className="font-bold lg:text-xl">Price Chart</div>

                    <div className="">Price : {price}</div>
                  </div>
                  <div className=" lg:translate-y-6 lg:pl-2 text-left text-gray-500">
                    {contents[slug].name} . Price . Intelytics
                  </div>
                  <PriceChart />
                </div>
                <div className=" lg:w-1/2 w-full bg-gray-900 rounded-xl p-6">
                  <div className="font-bold lg:text-xl">Volume Chart</div>
                  <div className=" w-full">
                    <div className=" lg:translate-y-6 lg:pl-2 text-left  text-gray-500">
                      {contents[slug].name} . Volume . Intelytics
                    </div>
                    <VolumeChart />
                  </div>
                </div>
              </div>
              <div className="pt-4 lg:pt-8 w-1/4">
              <div className="flex gap-2 pt-3 items-center bg-gray-900 rounded-xl p-3">
                  <Image
                    alt=""
                    src={`/${contents[slug].name}.jpg`}
                    height={40}
                    width={40}
                    className=" rounded-full"
                  />
                  <div className=" flex flex-col ">
                    <a href=" " className=" flex items-center gap-1">
                      <div className="text-lg font-bold ">
                        {" "}
                        {contents[slug].name}
                      </div>
                      <div>/</div>
                      <div className=" flex items-center gap-1">
                        <Image
                          alt=""
                          src="/inj.png"
                          height={20}
                          width={20}
                          className=" rounded-full"
                        />
                        <div className=" font-bold ">INJ</div>
                      </div>
                    </a>
                    <div className=" text-teal-400  text-sm">
                      {contents[slug].category}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 lg:pt-6">
                <div className=" text-3xl font-bold pb-4">Description</div>
                <div className="bg-gray-900 rounded-xl pt-6 pb-6 pl-4 pr-4 w-full">
                  <div className=" font-bold lg:text-xl pb-2">About</div>
                  <div className=" lg:text-sm text-xs text-gray-400">
                    {contents[slug].description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!contents[slug] && <>ERROR 404</>}
    </>
  );
}
