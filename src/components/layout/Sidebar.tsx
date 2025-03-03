import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/components/assets/logo.svg";
import { SearchCheckIcon, SearchIcon } from "lucide-react";

const Sidebar = ({ visible, setVisible }: any) => {
  const [authkey, setAuthkey] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuthkey(token);
    }
  }, []);

  const sidebarConfig = {
    menu: [
      { title: "Defi", path: "/" },
      { title: "NFT", path: "/Nft" },
      { title: "Lending", path: "/Lending" },
      { title: "Rewards", path: "/Rewards" },
      { title: "Trading Bot", path: "/TradingBot" },
    ],
    extras: {
      rewards: {
        icon: "/emerald.png",
        path: "/Rewards",
      },
      auth: {
        loggedIn: {
          label: "User",
          path: "/User",
        },
        loggedOut: {
          label: "Get Started",
          path: "/Signin",
        },
      },
    },
  };

  return (
    <div style={{zIndex:"999"}} className="bg-[#04041E]/10 backdrop-blur-lg fixed w-full text-white lg:flex lg:flex-row lg:items-center lg:justify-between lg:px-4 lg:py-4">
      {/* Logo */}
      <div className="flex items-center justify-between p-4 lg:py-0">
        <Link href="/">
          <Image src={Logo} alt="Logo" height={30} width={100} className="lg:h-6 h-4 w-auto " />
        </Link>
        <button
          className="relative flex flex-col justify-center items-center w-8 h-8 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-[2px] bg-white transform transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] bg-white my-1 transform transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] bg-white transform transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          ></span>
        </button>
          {/* Desktop Menu */}
      <div className="hidden px-2 lg:flex lg:flex-row lg:gap-6">
        {sidebarConfig.menu.map((menuItem, index) => (
          <Link
            key={index}
            href={menuItem.path}
            className={`text-sm font-bold hover:text-gray-300 ${
              router.pathname === menuItem.path ? "text-gray-300" : ""
            }`}
          >
            {menuItem.title}
          </Link>
        ))}
      </div>
      </div>

    

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`lg:hidden flex flex-col gap-4 p-4 bg-[#04041E] transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          {sidebarConfig.menu.map((menuItem, index) => (
            <Link
              key={index}
              href={menuItem.path}
              className={`text-sm font-bold hover:text-gray-300 ${
                router.pathname === menuItem.path ? "text-gray-300" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {menuItem.title}
            </Link>
          ))}
        </div>
      )}

      {/* Extras */}
      <div className="hidden lg:flex lg:items-center lg:gap-4">
        <div className="border border-bordercolor rounded-lg p-2 text-bordercolor flex justify-center">
        <SearchIcon className="mx-2"/>  <input type="search" name="" placeholder="Search" id="" className="bg-transparent text-bordercolor" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => router.push(sidebarConfig.extras.rewards.path)}
        >
          <Image
            src={sidebarConfig.extras.rewards.icon}
            alt="Emerald"
            height={30}
            width={30}
          />
        </div>
        {authkey ? (
          <Link href={sidebarConfig.extras.auth.loggedIn.path}>
            <div className="bg-black px-4 py-2 border-2 border-gray-800 rounded-xl text-white">
              {sidebarConfig.extras.auth.loggedIn.label}
            </div>
          </Link>
        ) : (
          <Link href={sidebarConfig.extras.auth.loggedOut.path}>
            <div className="bg-black px-4 py-2 border-2 border-gray-800 rounded-xl text-white">
              {sidebarConfig.extras.auth.loggedOut.label}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
