import React from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import Logo from "./assets/logo.png";
import Link from "next/link";
const Layout = ({ children }: any) => {
  const [isVisibie, setIsVisible] = React.useState<boolean>(false);
  return (
    <>
      <div className=" h-screen flex flex-row justify-start">
        <Sidebar visible={isVisibie} setVisible={setIsVisible} />
        <div className="  bg-slate-950 flex-1 px-6 pt-8 pb-4 text-white border-1 border-dashed overflow-y-scroll">
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
