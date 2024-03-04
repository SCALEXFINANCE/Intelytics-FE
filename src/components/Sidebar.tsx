import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import Logo from "./assets/logo.png";
import Defi from "./assets/defi.png";
import NFT from "./assets/nft2.png";
import Lending from "./assets/lending.png";
import Volume from "./assets/volume.png";
import TradingBot from "./assets/tradingbot.png";
import Image from "next/image";

const Sidebar = () => {
  const [currPage, setCurrpage] = useState<string>("");
  const router = useRouter();

  //dropdown states and toggle functions
  const [isOpenDefi, setIsOpenDefi] = useState(false);
  const [isOpenVolume, setIsOpenVolume] = useState(false);
  const [isOpenTradingBot, setIsOpenTradingBot] = useState(false);

  const toggleDropdownDefi = () => {
    setIsOpenDefi(!isOpenDefi);
  };
  const toggleDropdownVolume = () => {
    setIsOpenVolume(!isOpenVolume);
  };
  const toggleDropdownTradingBot = () => {
    setIsOpenTradingBot(!isOpenTradingBot);
  };

  return (
    <div className=" h-screen px-8 w-1/6 pt-8 pb-4  flex gap-4 flex-col bg-gradient-to-b from-black to-blue-950 overflow-y-scroll no-scrollbar">
      <Link href={"/"}>
        <Image src={Logo} alt="" />
      </Link>

      <div className=" text-gray-500"> Dashboard</div>
      <div className=" flex flex-col">
        <div className=" flex  flex-col  pl-1 gap-4">
          {/* defi dropdown */}
          <div className=" flex gap-2">
            <Image
              src="/defi.svg"
              alt=""
              height={30}
              width={30}
              className=" w-[1.8rem] h-[1.6rem]"
            />
            <button
              className="px-2 text-left text-xl text-white font-bold w-full "
              onClick={toggleDropdownDefi}
            >
              Defi
            </button>
          </div>

          {isOpenDefi && (
            <div
              className={`flex  flex-col  pl-7 gap-4 text-lg text-gray-400 animate-fade-down animate-duration-400
              `}
            >
              <Link
                href={"/"}
                className={`p-2  rounded-md   ${
                  router.pathname === "/" ? "bg-gray-800 text-white " : ""
                }`}
              >
                Overview
              </Link>
              <Link
                href={"/Chains"}
                className={`p-2  rounded-md ${
                  router.pathname === "/Chains"
                    ? "bg-gray-800 text-white  "
                    : ""
                }`}
              >
                Chains
              </Link>
              <Link
                href={"/Tokens"}
                className={`p-2  rounded-md   ${
                  router.pathname === "/Tokens" ? "bg-gray-800 text-white " : ""
                }`}
              >
                Tokens
              </Link>
              <Link
                href={"/Airdrops"}
                className={`p-2  rounded-md ${
                  router.pathname === "/Airdrops"
                    ? "bg-gray-800 text-white  "
                    : ""
                }`}
              >
                Airdrops
              </Link>
              <Link
                href={"/Topprotocol"}
                className={`p-2  rounded-md ${
                  router.pathname === "/Topprotocol"
                    ? "bg-gray-800 text-white  "
                    : ""
                }`}
              >
                Top Protocol
              </Link>
            </div>
          )}

          {/* nft */}
          <div className=" flex gap-2 items-center justify-start">
            <Image
              src="/nft3.svg"
              alt=""
              height={30}
              width={30}
              className=" w-[1.8rem] h-[1.8rem]"
            />
            <Link
              href={"/Nft"}
              className={`p-2 rounded-md text-xl text-white font-bold ${
                router.pathname === "/Nft"
                  ? "bg-gray-800 w-full text-white  "
                  : ""
              }`}
            >
              NFT
            </Link>
          </div>

          {/* lending */}
          <div className="flex gap-2 ">
            <Image
              src="/lending.svg"
              alt=""
              height={30}
              width={30}
              className=" w-[2rem] h-[2.8rem]"
            />
            <Link
              href={"/Lending"}
              className={`p-2 rounded-md text-xl text-white font-bold ${
                router.pathname === "/Lending"
                  ? "bg-gray-800 w-full text-white  "
                  : ""
              }`}
            >
              Lending
            </Link>
          </div>

          {/* volume */}
          <div className=" flex gap-2">
            <Image
              src="/volume.svg"
              alt=""
              height={30}
              width={30}
              className=" w-[2rem] h-[2.6rem]"
            />
            <button
              className="px-2 p-2 text-left text-xl text-white font-bold "
              onClick={toggleDropdownVolume}
            >
              Volume
            </button>
          </div>

          {isOpenVolume && (
            <div className="flex  flex-col  pl-7 gap-4  text-lg text-gray-400 animate-fade-down animate-duration-400">
              <Link
                href={"/Topprotocolvolume"}
                className={`p-2 rounded-md ${
                  router.pathname === "/Topprotocolvolume"
                    ? "bg-gray-800 text-white  "
                    : ""
                }`}
              >
                Top Protocol
              </Link>
            </div>
          )}

          {/* trading bot */}
          <div className=" flex gap-2">
            <Image
              src="/tradingbot.svg"
              alt=""
              height={30}
              width={30}
              className=" w-[2rem] h-[2.6rem]"
            />
            <button
              className="px-2 p-2 text-left text-white text-xl font-bold"
              onClick={toggleDropdownTradingBot}
            >
              Trading Bot
            </button>
          </div>

          {isOpenTradingBot && (
            <div className="flex  flex-col  pl-7 gap-4  text-lg text-gray-400 animate-fade-down animate-duration-400">
              <Link
                href={"/"}
                className={`p-2 rounded-md ${
                  router.pathname === "/portfolio"
                    ? "bg-gray-800 text-white  "
                    : ""
                }`}
              >
                Portfolio
              </Link>
              <Link
                href={"/"}
                className={`p-2 rounded-md ${
                  router.pathname === "/activetrades"
                    ? "bg-gray-800 text-white  "
                    : ""
                }`}
              >
                Active Trades
              </Link>
              <Link
                href={"/"}
                className={`p-2 rounded-md ${
                  router.pathname === "/sleepertrades"
                    ? "bg-gray-800 text-white  "
                    : ""
                }`}
              >
                Sleeper Trades
              </Link>
              <Link
                href={"/"}
                className={`p-2 rounded-md ${
                  router.pathname === "/dca" ? "bg-gray-800 text-white  " : ""
                }`}
              >
                DCA
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
