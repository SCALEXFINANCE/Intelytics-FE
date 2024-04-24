import React from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "./assets/logo.png";
import Link from "next/link";
import { log } from "console";
const Layout = ({ children }: any) => {
  const [isVisibie, setIsVisible] = React.useState<boolean>(false);
  const router = useRouter();

  console.log(router.pathname);


  if(router.pathname === "/Signin" || router.pathname === "/Signup"){
    return (
      <>
      <div className="lg:w-full h-screen bg-slate-950">
        {children}

      </div>
      </>
    )
  }

  if (router.pathname === "/Tokens/[slug]") {
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
      <div className=" h-screen flex flex-col justify-start">
        <Sidebar visible={isVisibie} setVisible={setIsVisible} />
        <div className="  bg-[#091144] bg-gradient-to-r from-[#04041F] from-10% via-[#091144] via-30% to-[#04041F] to-90% flex-1 px-6 pt-24 pb-4 text-white border-1  border-dashed overflow-y-scroll">
          <div className="lg:hidden bg-slate-950 w-full pt-0 pb-5 flex items-center justify-between">
            <Link href={"/"}>
              <Image
                className="w-[10rem] h-[1.5rem]"
                src={Logo}
                alt="Intelitics logo"
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
      </div>
    </>
  );
};

export default Layout;
