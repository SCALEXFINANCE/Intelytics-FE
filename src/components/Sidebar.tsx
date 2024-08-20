import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import Logo from "./assets/logo.png";
import Image from "next/image";
import SearchBar from "./Searchbar";
import { useAuth } from "@/hooks/useAuth";
import Emeralds from "../../public/emerald.png";

const Sidebar = ({ visible, setVisible }: any) => {
  // const [currPage, setCurrpage] = useState<string>("");
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  // console.log(isAuthenticated, "isAuth");

  //dropdown states and toggle functions
  const [isOpenDefi, setIsOpenDefi] = useState(false);
  const [isOpenVolume, setIsOpenVolume] = useState(false);
  const [isOpenTradingBot, setIsOpenTradingBot] = useState(false);

  const toggleDropdownDefi = () => {
    setIsOpenDefi(!isOpenDefi);
    setIsOpenVolume(false);
    setIsOpenTradingBot(false);
  };
  const toggleDropdownVolume = () => {
    setIsOpenVolume(!isOpenVolume);
    setIsOpenDefi(false);
    setIsOpenTradingBot(false);
  };
  const toggleDropdownTradingBot = () => {
    setIsOpenTradingBot(!isOpenTradingBot);
    setIsOpenDefi(false);
    setIsOpenVolume(false);
  };

  return (
    <>
      {/* <div className="">
        <Image src={"./burger.svg"} alt="" height={20} width={20} />
      </div> */}
      <div
        className={`hidden lg:flex h-[10%] lg:px-8 lg:w-full fixed ${"w-full z-10 px-10"} pt-8 pb-4 gap-4 flex-row bg-[#04041E]`}
      >
        <div className="flex items-center justify-between">
          <Link
            onClick={() => {
              setVisible(false);
            }}
            href={"/"}
          >
            <Image src={Logo} alt="" height={23} />
          </Link>
          <button
            onClick={() => {
              setVisible(false);
            }}
            className=" transform-translate-y-[10%] text-6xl font-light hover:text-gray-400 select-none rotate-45 block lg:hidden  text-white "
          >
            +
          </button>
        </div>

        <div className=" flex flex-row text-gray-400 items-center w-full font-mono justify-between p-4">
          <div className=" flex  flex-row  gap-4">
            {/* defi dropdown */}
            <div className=" flex flex-col items-center">
              <button
                className={`px-2 uppercase p-2 text-left text-lg font-bold w-full ${
                  isOpenDefi ? "bg-gray-800 rounded-md text-white  " : ""
                }`}
                onClick={toggleDropdownDefi}
              >
                Defi
              </button>

              {isOpenDefi && (
                <div
                  className={`flex flex-col text-lg text-gray-400 
              `}
                >
                  <ul className="search-results lg:-translate-x-7 bg-gray-800  text-lg border-2 border-gray-800 rounded z-20	absolute	">
                    <li>
                      <Link
                        onClick={() => {
                          setVisible(false);
                          setIsOpenDefi(false);
                        }}
                        href={"/"}
                        className={`p-2   rounded-md   ${
                          router.pathname === "/" ? "  text-white " : ""
                        }`}
                      >
                        Overview
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setVisible(false);
                          setIsOpenDefi(false);
                        }}
                        href={"/Chains"}
                        className={`p-2  rounded-md ${
                          router.pathname === "/Chains"
                            ? "bg-gray-800 text-white  "
                            : ""
                        }`}
                      >
                        Chains
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setVisible(false);
                          setIsOpenDefi(false);
                        }}
                        href={"/Tokens"}
                        className={`p-2  rounded-md ${
                          router.pathname === "/Tokens" ? "  text-white  " : ""
                        }`}
                      >
                        Tokens
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setVisible(false);
                          setIsOpenDefi(false);
                        }}
                        href={"/Airdrops"}
                        className={`p-2  rounded-md ${
                          router.pathname === "/Airdrops" ? " text-white  " : ""
                        }`}
                      >
                        Airdrops
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setVisible(false);
                          setIsOpenDefi(false);
                        }}
                        href={"/Topprotocol"}
                        className={`p-2  rounded-md ${
                          router.pathname === "/Topprotocol"
                            ? "  text-white  "
                            : ""
                        }`}
                      >
                        Top Protocol
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* nft */}
            <div className=" flex gap-2 items-center justify-start">
              <Link
                onClick={() => {
                  setVisible(false);
                  setIsOpenDefi(false);
                  setIsOpenVolume(false);
                  setIsOpenTradingBot(false);
                }}
                href={"/Nft"}
                className={`p-2 rounded-md text-lg uppercase font-bold ${
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
              <Link
                onClick={() => {
                  setVisible(false);
                  setIsOpenDefi(false);
                  setIsOpenVolume(false);
                  setIsOpenTradingBot(false);
                }}
                href={"/Lending"}
                className={`p-2 rounded-md text-lg uppercase font-bold ${
                  router.pathname === "/Lending"
                    ? "bg-gray-800 w-full text-white  "
                    : ""
                }`}
              >
                Lending
              </Link>
            </div>

            {/* volume */}
            <div className=" flex flex-col items-center">
              <button
                className="px-2 p-2 text-left text-lg uppercase font-bold "
                onClick={toggleDropdownVolume}
              >
                Volume
              </button>

              {isOpenVolume && (
                <div className="flex  flex-col  pl-7 gap-4  text-lg text-gray-400 animate-fade-down animate-duration-400">
                  <ul className="search-results lg:-translate-x-10 bg-gray-800  text-lg border-2 border-gray-800 rounded z-20	absolute	">
                    <li>
                      <Link
                        onClick={() => {
                          setVisible(false);
                          setIsOpenVolume(false);
                        }}
                        href={"/Topprotocolvolume"}
                        className={`p-2 rounded-md ${
                          router.pathname === "/Topprotocolvolume"
                            ? "bg-gray-800 text-white  "
                            : ""
                        }`}
                      >
                        Top Protocol
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* trading bot */}
            <div className=" flex flex-col gap-2">
              <button
                className={`px-2 p-2 uppercase text-left text-lg font-bold w-full ${
                  isOpenTradingBot ? "bg-gray-800 rounded-md text-white  " : ""
                }`}
                onClick={toggleDropdownTradingBot}
              >
                Trading Bot
              </button>
              {isOpenTradingBot && (
                <div className={`flex flex-col text-lg text-gray-400 `}>
                  <ul className="search-results lg:-translate-x-7 bg-gray-800  text-lg border-2 border-gray-800 rounded z-20	absolute	">
                    <li>
                      <Link
                        onClick={() => {
                          setVisible(false);
                          setIsOpenTradingBot(false);
                        }}
                        href={"/"}
                        className={`p-2 rounded-md ${
                          router.pathname === "/portfolio"
                            ? "bg-gray-800 text-white  "
                            : ""
                        }`}
                      >
                        Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setVisible(false);
                          setIsOpenTradingBot(false);
                        }}
                        href={"/"}
                        className={`p-2 rounded-md ${
                          router.pathname === "/activetrades"
                            ? "bg-gray-800 text-white  "
                            : ""
                        }`}
                      >
                        Active Trades
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setVisible(false);
                          setIsOpenTradingBot(false);
                        }}
                        href={"/"}
                        className={`p-2 rounded-md ${
                          router.pathname === "/sleepertrades"
                            ? "bg-gray-800 text-white  "
                            : ""
                        }`}
                      >
                        Sleeper Trades
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setVisible(false);
                          setIsOpenTradingBot(false);
                        }}
                        href={"/"}
                        className={`p-2 rounded-md ${
                          router.pathname === "/dca"
                            ? "bg-gray-800 text-white  "
                            : ""
                        }`}
                      >
                        DCA
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className=" flex flex-row gap-2 items-center">
            <SearchBar />
            <div
              className="cursor-pointer"
              onClick={() => router.push("/Rewards")}
            >
              <Image src={Emeralds} alt="Emerald" height={40} width={40} />
            </div>

            {isLoading ? (
              <Link href="/Signin">
                <div className=" bg-black text-mono p-2 pl-4 pr-4 border-2 border-gray-800 rounded-xl  text-white flex items-center gap-2">
                  Get Started
                </div>
              </Link>
            ) : isAuthenticated === true ? (
              <Link href="/User">
                <div className=" bg-black text-mono p-2 pl-4 pr-4 border-2 border-gray-800 rounded-xl  text-white flex items-center gap-2">
                  User
                </div>
              </Link>
            ) : (
              <Link href="/Signin">
                <div className=" bg-black text-mono p-2 pl-4 pr-4 border-2 border-gray-800 rounded-xl  text-white flex items-center gap-2">
                  Get Started
                </div>
              </Link>
            )}
            {/* <Link href="/Signin">
              <div className=" bg-black p-2 pl-4 pr-4 border-2 border-gray-800 rounded-xl  text-white flex items-center gap-2">
                Get Started
              </div>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

// const Sidebar = ({visible, setVisible}: any) =>{

// }

export default Sidebar;
