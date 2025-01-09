import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import SearchBar from "./Searchbar";
import Logo from "../components/assets/logo.png"

const Sidebar = ({ visible, setVisible }: any) => {
  const [authkey, setAuthkey] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuthkey(token);
    }
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const sidebarConfig = {
    menu: [
      {
        title: "Defi",
        type: "dropdown",
        items: [
          { name: "Overview", path: "/" },
          { name: "Chains", path: "/Chains" },
          { name: "Tokens", path: "/Tokens" },
          { name: "Airdrops", path: "/Airdrops" },
          { name: "Top Protocol", path: "/Topprotocol" },
        ],
      },
      {
        title: "NFT",
        type: "link",
        path: "/Nft",
      },
      {
        title: "Lending",
        type: "link",
        path: "/Lending",
      },
      {
        title: "Rewards",
        type: "link",
        path: "/Rewards",
      },
      {
        title: "Volume",
        type: "dropdown",
        items: [
          { name: "Top Protocol", path: "/Topprotocolvolume" },
        ],
      },
      {
        title: "Trading Bot",
        type: "dropdown",
        items: [
          { name: "Portfolio", path: "/portfolio" },
          { name: "Active Trades", path: "/activetrades" },
          { name: "Sleeper Trades", path: "/sleepertrades" },
          { name: "DCA", path: "/dca" },
        ],
      },
    ],
    extras: {
      searchBar: true,
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
      className={`lg:px-8 lg:w-full text-sm ${
        visible ? "w-full z-10 px-10" : "w-0"
      } flex flex-row bg-[#04041E]`}
    >
      <div className="flex items-center justify-between">
        <Link
        className="h-full flex justify-center items-center"
          onClick={() => setVisible(false)}
          href="/"
        >
          <Image src={Logo} alt="Logo" height={0} className="h-6 w-auto"  />
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="text-6xl font-light hover:text-gray-400 select-none rotate-45 block lg:hidden text-white"
        >
          +
        </button>
      </div>

      <div className="flex flex-row text-gray-400 items-center w-full justify-between p-4">
        <div className="flex flex-row gap-4">
          {sidebarConfig.menu.map((menuItem, index) => (
            <div key={index} className="flex flex-col items-center">
              {menuItem.type === "link" && (
               <Link
               onClick={() => setVisible(false)}
               href={menuItem.path || "/"} // Default to "/" if path is undefined
               className={`p-2 rounded-md text-sm font-bold ${
                 router.pathname === menuItem.path ? "bg-gray-800 text-white" : ""
               }`}
             >
               {menuItem.title}
             </Link>
             
              )}

              {menuItem.type === "dropdown" && (
                <>
                  <button
                    className={`px-2 p-2 text-left text-sm font-bold ${
                      openDropdown === menuItem.title
                        ? "bg-gray-800 rounded-md text-white"
                        : ""
                    }`}
                    onClick={() => toggleDropdown(menuItem.title)}
                  >
                    {menuItem.title}
                  </button>
                  {openDropdown === menuItem.title && (
                    <div className="flex flex-col text-sm text-gray-400">
                      <ul className="bg-gray-800 text-sm border-2 border-gray-800 rounded z-20 absolute">
                      {menuItem.type === "dropdown" && (
  <>
    {openDropdown === menuItem.title && menuItem.items && (
      <div className="flex flex-col text-sm  text-gray-400">
        <ul className="bg-gray-800 text-sm border-2 border-gray-800 rounded z-20 w-40 absolute">
          {menuItem.items.map((item, i) => (
            <li key={i}>
              <Link
                onClick={() => {
                  setVisible(false);
                  setOpenDropdown(null);
                }}
                href={item.path || "/"} 
                className={`p-2 rounded-md ${
                  router.pathname === item.path ? "bg-gray-800 text-white" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
)}

                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-2 items-center">
          {/* {sidebarConfig.extras.searchBar && <SearchBar/>} */}
          <div
            className="cursor-pointer"
            onClick={() => router.push(sidebarConfig.extras.rewards.path)}
          >
            <Image
              src={sidebarConfig.extras.rewards.icon}
              alt="Emerald"
              height={40}
              width={40}
            />
          </div>
          {authkey ? (
            <Link href={sidebarConfig.extras.auth.loggedIn.path}>
              <div className="bg-black p-2 pl-4 pr-4 border-2 border-gray-800 rounded-xl text-white flex items-center gap-2">
                {sidebarConfig.extras.auth.loggedIn.label}
              </div>
            </Link>
          ) : (
            <Link href={sidebarConfig.extras.auth.loggedOut.path}>
              <div className="bg-black p-2 pl-4 pr-4 border-2 border-gray-800 rounded-xl text-white flex items-center gap-2">
                {sidebarConfig.extras.auth.loggedOut.label}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
