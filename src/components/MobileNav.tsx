import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Emeralds from "../../public/emerald.png";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

const MobileNav = () => {
  const { emeralds, refetchUser, email, id } = useUserContext();
  const { logout } = useAuth();
  const router = useRouter();
  const [isOpenDefi, setIsOpenDefi] = useState(false);
  const [isOpenVolume, setIsOpenVolume] = useState(false);
  const [isOpenTradingBot, setIsOpenTradingBot] = useState(false);

  useEffect(() => {
    refetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="absolute p-6 w-[100vw] w-full h-full min-h-[100vh] bg-[#0E0E10] inset-0 z-10 font-mono">
      <div className="w-full h-full flex flex-col justify-center items-center pt-24 gap-12">
        <div className="w-full flex flex-col gap-12 items-center">
          <div className="flex flex-col gap-2 items-center">
            <div
              aria-description="User image"
              className="w-[75px] h-[75px] bg-[#dde4ff] rounded-full flex items-center justify-center"
            >
              <svg
                width="54"
                height="49"
                viewBox="0 0 54 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M38.2507 12C38.2507 18.2132 33.2139 23.25 27.0007 23.25C20.7875 23.25 15.7507 18.2132 15.7507 12C15.7507 5.7868 20.7875 0.75 27.0007 0.75C33.2139 0.75 38.2507 5.7868 38.2507 12ZM34.5007 12C34.5007 16.1421 31.1428 19.5 27.0007 19.5C22.8586 19.5 19.5007 16.1421 19.5007 12C19.5007 7.85786 22.8586 4.5 27.0007 4.5C31.1428 4.5 34.5007 7.85786 34.5007 12Z"
                  fill="#000722"
                />
                <path
                  d="M27.0007 28.875C14.8612 28.875 4.51809 36.0533 0.578125 46.1101C1.53793 47.0632 2.54901 47.9647 3.60687 48.8101C6.54076 39.5769 15.7445 32.625 27.0007 32.625C38.2569 32.625 47.4607 39.5769 50.3946 48.8101C51.4524 47.9647 52.4635 47.0632 53.4233 46.1101C49.4833 36.0533 39.1402 28.875 27.0007 28.875Z"
                  fill="#000722"
                />
              </svg>
            </div>
            <span className="text-base text-[#757575] pt-2">
              {email
                ? `${
                    email.split("@")[0].length > 11
                      ? email.split("@")[0].slice(0, 11)
                      : email.slice(0, 1)
                  }...@${email.split("@")[1]}`
                : "*******************"}
            </span>
            <div className="flex items-center justify-center mt-[-8px]">
              <Image
                src={Emeralds}
                alt="emeralds image"
                width={"32"}
                height={"32"}
              />
              <p className="uppercase text-base pt-1">{emeralds || 0} Points</p>
            </div>
          </div>
          {!!id ? (
            <Link
              href="/user"
              className="uppercase border py-2 px-14 rounded-lg shadow-[0_0px_10px_0px_#3861FB]"
            >
              User Profile
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="uppercase border py-2 px-14 rounded-lg shadow-[0_0px_10px_0px_#3861FB]"
            >
              Sign In
            </Link>
          )}

          <div className="w-full max-w-[260px] flex py-2 rounded-xl flex-col items-start  gap-4 border">
            {/* defi dropdown */}
            <div className="w-full flex flex-col items-center border-b">
              <div
                className={`px-4 py-2 uppercase text-left text-lg font-bold w-full flex justify-between items-center ${
                  isOpenDefi ? "bg-gray-800 rounded-md text-white  " : ""
                }`}
                onClick={toggleDropdownDefi}
              >
                <p className="text-sm">Defi</p>
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 8 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.56641 0.285156H0.566406V1.28516H0.815083L0.815083 7.95068H0.566406V8.95068H1.56641V8.28467H2.56445V7.33843L2.56641 7.3373V7.61816H3.56641V6.95068H4.56445V6.28467H5.56445V5.60638L5.56641 5.60525V5.61768H6.56641V5.0279L6.6993 4.95117H7.56641V3.95117H6.69881L6.56641 3.87473V3.28467H5.56641V3.29738L5.56445 3.29625V2.61816H4.56445V1.95117H3.56641V1.28516H2.56641V1.56533L2.56445 1.5642V0.618164H1.56641V0.285156ZM1.56445 7.95068V7.91578L1.504 7.95068H1.56445Z"
                    fill="#979DAA"
                  />
                </svg>
              </div>

              {isOpenDefi && (
                <div
                  className={`flex flex-col text-lg text-gray-400 
              `}
                >
                  <ul className="search-results lg:-translate-x-7 bg-gray-800  text-lg border-2 border-gray-800 rounded z-20	absolute	">
                    <li>
                      <Link
                        onClick={() => {
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
            <div className="w-full flex gap-2 items-center justify-start border-b">
              <Link
                onClick={() => {
                  setIsOpenDefi(false);
                  setIsOpenVolume(false);
                  setIsOpenTradingBot(false);
                }}
                href={"/Nft"}
                className={`w-full flex justify-between px-4 py-2 text-sm rounded-md text-lg uppercase font-bold ${
                  router.pathname === "/Nft"
                    ? "bg-gray-800 w-full text-white  "
                    : ""
                }`}
              >
                <p>NFT</p>
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 8 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.56641 0.285156H0.566406V1.28516H0.815083L0.815083 7.95068H0.566406V8.95068H1.56641V8.28467H2.56445V7.33843L2.56641 7.3373V7.61816H3.56641V6.95068H4.56445V6.28467H5.56445V5.60638L5.56641 5.60525V5.61768H6.56641V5.0279L6.6993 4.95117H7.56641V3.95117H6.69881L6.56641 3.87473V3.28467H5.56641V3.29738L5.56445 3.29625V2.61816H4.56445V1.95117H3.56641V1.28516H2.56641V1.56533L2.56445 1.5642V0.618164H1.56641V0.285156ZM1.56445 7.95068V7.91578L1.504 7.95068H1.56445Z"
                    fill="#979DAA"
                  />
                </svg>
              </Link>
            </div>

            {/* lending */}
            <div className="w-full flex gap-2 border-b">
              <Link
                onClick={() => {
                  setIsOpenDefi(false);
                  setIsOpenVolume(false);
                  setIsOpenTradingBot(false);
                }}
                href={"/Lending"}
                className={`w-full flex justify-between px-4 py-2 rounded-md text-lg uppercase font-bold ${
                  router.pathname === "/Lending"
                    ? "bg-gray-800 w-full text-white  "
                    : ""
                }`}
              >
                <p className="text-sm">Lending</p>
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 8 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.56641 0.285156H0.566406V1.28516H0.815083L0.815083 7.95068H0.566406V8.95068H1.56641V8.28467H2.56445V7.33843L2.56641 7.3373V7.61816H3.56641V6.95068H4.56445V6.28467H5.56445V5.60638L5.56641 5.60525V5.61768H6.56641V5.0279L6.6993 4.95117H7.56641V3.95117H6.69881L6.56641 3.87473V3.28467H5.56641V3.29738L5.56445 3.29625V2.61816H4.56445V1.95117H3.56641V1.28516H2.56641V1.56533L2.56445 1.5642V0.618164H1.56641V0.285156ZM1.56445 7.95068V7.91578L1.504 7.95068H1.56445Z"
                    fill="#979DAA"
                  />
                </svg>
              </Link>
            </div>

            {/* volume */}
            <div className="w-full flex flex-col border-b">
              <div
                className="px-4 py-2 flex justify-between text-left text-lg uppercase font-bold "
                onClick={toggleDropdownVolume}
              >
                <p className="text-sm">Volume</p>

                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 8 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.56641 0.285156H0.566406V1.28516H0.815083L0.815083 7.95068H0.566406V8.95068H1.56641V8.28467H2.56445V7.33843L2.56641 7.3373V7.61816H3.56641V6.95068H4.56445V6.28467H5.56445V5.60638L5.56641 5.60525V5.61768H6.56641V5.0279L6.6993 4.95117H7.56641V3.95117H6.69881L6.56641 3.87473V3.28467H5.56641V3.29738L5.56445 3.29625V2.61816H4.56445V1.95117H3.56641V1.28516H2.56641V1.56533L2.56445 1.5642V0.618164H1.56641V0.285156ZM1.56445 7.95068V7.91578L1.504 7.95068H1.56445Z"
                    fill="#979DAA"
                  />
                </svg>
              </div>

              {isOpenVolume && (
                <div className="flex  flex-col  pl-7 gap-4  text-lg text-gray-400 animate-fade-down animate-duration-400">
                  <ul className="search-results lg:-translate-x-10 bg-gray-800  text-lg border-2 border-gray-800 rounded z-20	absolute	">
                    <li>
                      <Link
                        onClick={() => {
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
            <div className="w-full flex flex-col gap-2">
              <div
                className={`w-full px-4 py-2 flex justify-between uppercase text-left text-lg font-bold w-full ${
                  isOpenTradingBot ? "bg-gray-800 rounded-md text-white  " : ""
                }`}
                onClick={toggleDropdownTradingBot}
              >
                <p className="text-sm">Trading Bot</p>
                <svg
                  width="10"
                  height="12"
                  viewBox="0 0 8 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.56641 0.285156H0.566406V1.28516H0.815083L0.815083 7.95068H0.566406V8.95068H1.56641V8.28467H2.56445V7.33843L2.56641 7.3373V7.61816H3.56641V6.95068H4.56445V6.28467H5.56445V5.60638L5.56641 5.60525V5.61768H6.56641V5.0279L6.6993 4.95117H7.56641V3.95117H6.69881L6.56641 3.87473V3.28467H5.56641V3.29738L5.56445 3.29625V2.61816H4.56445V1.95117H3.56641V1.28516H2.56641V1.56533L2.56445 1.5642V0.618164H1.56641V0.285156ZM1.56445 7.95068V7.91578L1.504 7.95068H1.56445Z"
                    fill="#979DAA"
                  />
                </svg>
              </div>
              {isOpenTradingBot && (
                <div className={`flex flex-col text-lg text-gray-400 `}>
                  <ul className="search-results lg:-translate-x-7 bg-gray-800  text-lg border-2 border-gray-800 rounded z-20	absolute	">
                    <li>
                      <Link
                        onClick={() => {
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
        </div>
        <div className=" flex flex-col gap-8">
          <div
            className="flex gap-8 items-center justify-center"
            aria-description="social container"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.747 9.41505 20.7188 6.93683 18.891 5.109C17.0632 3.28116 14.585 2.25298 12 2.25ZM20.25 12C20.2507 12.7608 20.1456 13.5181 19.9378 14.25H16.3275C16.5575 12.7588 16.5575 11.2412 16.3275 9.75H19.9378C20.1456 10.4819 20.2507 11.2392 20.25 12ZM9.5625 15.75H14.4375C13.9572 17.3237 13.1235 18.7667 12 19.9688C10.877 18.7664 10.0433 17.3235 9.5625 15.75ZM9.19688 14.25C8.93939 12.7611 8.93939 11.2389 9.19688 9.75H14.8106C15.0681 11.2389 15.0681 12.7611 14.8106 14.25H9.19688ZM3.75 12C3.74935 11.2392 3.85442 10.4819 4.06219 9.75H7.6725C7.4425 11.2412 7.4425 12.7588 7.6725 14.25H4.06219C3.85442 13.5181 3.74935 12.7608 3.75 12ZM14.4375 8.25H9.5625C10.0428 6.67632 10.8765 5.2333 12 4.03125C13.1231 5.23361 13.9567 6.67653 14.4375 8.25ZM19.3434 8.25H16.0041C15.5832 6.70585 14.8738 5.25532 13.9134 3.975C15.0738 4.25375 16.1602 4.7801 17.098 5.51799C18.0359 6.25588 18.8032 7.18784 19.3472 8.25H19.3434ZM10.0866 3.975C9.12619 5.25532 8.41683 6.70585 7.99594 8.25H4.65282C5.19682 7.18784 5.96407 6.25588 6.90196 5.51799C7.83985 4.7801 8.92621 4.25375 10.0866 3.975ZM4.65282 15.75H7.99594C8.41683 17.2941 9.12619 18.7447 10.0866 20.025C8.92621 19.7463 7.83985 19.2199 6.90196 18.482C5.96407 17.7441 5.19682 16.8122 4.65282 15.75ZM13.9134 20.025C14.8738 18.7447 15.5832 17.2941 16.0041 15.75H19.3472C18.8032 16.8122 18.0359 17.7441 17.098 18.482C16.1602 19.2199 15.0738 19.7463 13.9134 20.025Z"
                fill="#979DAA"
              />
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_1206_1640"
                // style="mask-type:luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <path d="M0 0H24V24H0V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_1206_1640)">
                <path
                  d="M18.9 1.12451H22.5806L14.5406 10.3371L24 22.8754H16.5943L10.7897 15.2725L4.15543 22.8754H0.471429L9.07029 13.0182L0 1.12623H7.59429L12.8331 8.07423L18.9 1.12451ZM17.6057 20.6674H19.6457L6.48 3.21765H4.29257L17.6057 20.6674Z"
                  fill="#979DAA"
                />
              </g>
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66673 22.7676H17.3339C19.4133 22.7676 20.4479 21.7129 20.4479 19.6236V10.5032C20.4479 9.20722 20.3073 8.64493 19.5037 7.82122L13.9589 2.18636C13.196 1.40251 12.5729 1.23193 11.438 1.23193H6.66673C4.59759 1.23193 3.55273 2.2965 3.55273 4.38622V19.6236C3.55273 21.7228 4.59759 22.7676 6.66673 22.7676ZM6.74688 21.1506C5.71231 21.1506 5.16973 20.5978 5.16973 19.5936V4.41622C5.16973 3.42193 5.71231 2.84893 6.75716 2.84893H11.2169V8.68522C11.2169 9.95079 11.8597 10.5735 13.1052 10.5735H18.8309V19.5936C18.8309 20.5978 18.2982 21.1506 17.2537 21.1506H6.74688ZM13.286 9.05636C12.8943 9.05636 12.7332 8.89608 12.7332 8.49408V3.16051L18.5189 9.05679L13.286 9.05636ZM15.6967 13.3356H8.07245C7.71116 13.3356 7.45016 13.6069 7.45016 13.9485C7.45016 14.2999 7.71159 14.5712 8.07288 14.5712H15.6967C15.7789 14.5726 15.8605 14.5574 15.9366 14.5265C16.0128 14.4957 16.0819 14.4499 16.14 14.3918C16.1981 14.3337 16.2439 14.2645 16.2748 14.1884C16.3056 14.1122 16.3208 14.0306 16.3194 13.9485C16.3194 13.6069 16.0482 13.3356 15.6967 13.3356ZM15.6967 16.8414H8.07245C7.71116 16.8414 7.45016 17.1225 7.45016 17.4739C7.45016 17.8155 7.71159 18.0769 8.07288 18.0769H15.6967C16.0482 18.0769 16.3194 17.8155 16.3194 17.4739C16.3194 17.1225 16.0482 16.8414 15.6967 16.8414Z"
                fill="#979DAA"
              />
            </svg>
          </div>
          <button
            onClick={logout}
            className="px-16 py-3 border rounded-bl-xl rounded-br-xl uppercase text-[#ff6767]"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
