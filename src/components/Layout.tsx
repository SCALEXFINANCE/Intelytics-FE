import React from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "./assets/logo.png";
import Link from "next/link";
import Emeralds from "../../public/emerald.png";
import MobileNav from "./MobileNav";
import { Cross as Hamburger } from "hamburger-react";

const Layout = ({ children }: any) => {
  const [isVisibie, setIsVisible] = React.useState<boolean>(false);
  const router = useRouter();

  if (
    router.pathname === "/auth/signin" ||
    router.pathname === "/auth/signup"
  ) {
    return (
      <>
        <div className="lg:w-full h-screen lg:bg-slate-950 bg-black">
          {children}
        </div>
      </>
    );
  }

  if (router.pathname === "/Tokens/[slug]") {
    console.log(isVisibie, "isvisible");
    return (
      <>
        <div className=" lg:w-full h-screen bg-slate-950 text-white overflow-y-scroll">
          <div className="lg:hidden bg-slate-950 w-full pt-2 p-2 pb-3 flex items-center justify-between">
            <Link href={"/"}>
              <Image
                className="w-[10rem] h-[1.5rem]"
                src={Logo}
                alt="Intelytics logo"
              />
            </Link>
            <button
              className="rotate-90 text-3xl select-none hover:text-gray-400"
              onClick={() => setIsVisible(true)}
            >
              |||
            </button>
          </div>
          {children}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="relative h-screen flex flex-col justify-start">
        <Sidebar visible={isVisibie} setVisible={setIsVisible} />
        <div
          className={
            "  bg-[#091144] bg-gradient-to-r from-[#04041F] from-10% via-[#091144] via-30% to-[#04041F] to-90% flex-1 p-6 pb-4 text-white border-1  border-dashed overflow-y-scroll"
          }
        >
          <div className="relative z-20 lg:hidden w-full pt-0 pb-5 flex items-center justify-between">
            <Link href={"/"}>
              <Image
                className="w-[8rem] lg:w-[10rem] lg:h-[1.5rem]"
                src={Logo}
                alt="Intelitics logo"
              />
            </Link>
            <div className="flex items-center lg:gap-2">
              <div
                className="w-full cursor-pointer"
                onClick={() => router.push("/Rewards")}
              >
                <Image
                  src={Emeralds}
                  alt="Emerald"
                  className="lg:w-[60px] lg:h-[60px] w-[30px] h-[30px] "
                  height={60}
                  width={60}
                />
              </div>
              <Hamburger size={24} toggled={isVisibie} toggle={setIsVisible} />
            </div>
          </div>
          {isVisibie && (
            <MobileNav visible={isVisibie} setVisible={setIsVisible} />
          )}

          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;

// /* Rectangle 5261 */

// position: absolute;
// width: 360px;
// height: 800px;
// left: 0px;
// top: 0px;

// background: #0E0E10;
// opacity: 0.4;
