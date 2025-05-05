import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/components/assets/logo.svg";
import { SearchIcon, Coins, User, Menu, X } from "lucide-react";

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
    <div 
      style={{zIndex: "999"}} 
      className=" w-full text-white bg-gray-900 bg-opacity-95 backdrop-blur-lg transition-all duration-300"
    >
      {/* Gradient top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500" />
      
      <div className=" w-full">
        <div className="flex items-center justify-between px-4 py-3 lg:py-4">
          {/* Logo with gradient effect */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
              <Image src={Logo} alt="Logo" height={40} width={120} className="lg:h-8 h-6 w-auto relative z-10" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:flex-row lg:items-center lg:gap-8">
            {sidebarConfig.menu.map((menuItem, index) => (
              <Link
                key={index}
                href={menuItem.path}
                className={`text-sm font-bold relative ${
                  router.pathname === menuItem.path ? "text-white" : "text-gray-400 hover:text-white"
                } transition-colors duration-200`}
              >
                {menuItem.title}
                {router.pathname === menuItem.path && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Extras */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus-within:border-purple-500 transition-colors">
                <SearchIcon size={18} className="text-gray-400 mr-2" />
                <input 
                  type="search" 
                  placeholder="Search" 
                  className="bg-transparent text-gray-300 text-sm focus:outline-none w-40" 
                />
              </div>
            </div>
            
            {/* Rewards Button */}
            <div
              className="cursor-pointer bg-gray-800 p-2 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors"
              onClick={() => router.push(sidebarConfig.extras.rewards.path)}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20 animate-pulse" />
                <Image
                  src={sidebarConfig.extras.rewards.icon}
                  alt="Emerald"
                  height={24}
                  width={24}
                  className="relative z-10"
                />
              </div>
            </div>
            
            {/* Auth Button */}
            {authkey ? (
              <Link href={sidebarConfig.extras.auth.loggedIn.path}>
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 border border-gray-700 hover:border-purple-500 rounded-lg text-white transition-all duration-200">
                  <User size={18} />
                  <span>{sidebarConfig.extras.auth.loggedIn.label}</span>
                </div>
              </Link>
            ) : (
              <Link href={sidebarConfig.extras.auth.loggedOut.path}>
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
                  {sidebarConfig.extras.auth.loggedOut.label}
                </div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-4">
            {/* Mobile Menu Items */}
            <div className="space-y-3">
              {sidebarConfig.menu.map((menuItem, index) => (
                <Link
                  key={index}
                  href={menuItem.path}
                  className={`block text-sm font-bold p-2 rounded-lg ${
                    router.pathname === menuItem.path 
                      ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  } transition-colors`}
                  onClick={() => setMenuOpen(false)}
                >
                  {menuItem.title}
                </Link>
              ))}
            </div>
            
            {/* Mobile Search */}
            <div className="relative">
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
                <SearchIcon size={18} className="text-gray-400 mr-2" />
                <input 
                  type="search" 
                  placeholder="Search" 
                  className="bg-transparent text-gray-300 text-sm focus:outline-none w-full" 
                />
              </div>
            </div>
            
            {/* Mobile Extras */}
            <div className="flex items-center justify-between">
              <div
                className="cursor-pointer flex items-center bg-gray-800 p-2 rounded-lg border border-gray-700"
                onClick={() => {
                  router.push(sidebarConfig.extras.rewards.path);
                  setMenuOpen(false);
                }}
              >
                <Image
                  src={sidebarConfig.extras.rewards.icon}
                  alt="Emerald"
                  height={24}
                  width={24}
                />
                <span className="ml-2 text-sm font-medium">Rewards</span>
              </div>
              
              {authkey ? (
                <Link href={sidebarConfig.extras.auth.loggedIn.path}>
                  <div 
                    className="flex items-center space-x-2 bg-gray-800 px-4 py-2 border border-gray-700 rounded-lg text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>{sidebarConfig.extras.auth.loggedIn.label}</span>
                  </div>
                </Link>
              ) : (
                <Link href={sidebarConfig.extras.auth.loggedOut.path}>
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-lg text-white font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {sidebarConfig.extras.auth.loggedOut.label}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;