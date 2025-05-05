import { useRouter } from "next/router";
import { Key, useEffect, useState, useRef } from "react";
import Image from "next/image";
import TokenChart from "@/components/tokenChart";
import bannerdefault from "@/components/assets/banner-default.png";
import tokendefault from "@/components/assets/404-image.png";
import Swap from "@/components/swap/Swap";
import { Copy, Check, ArrowLeft, Loader } from "lucide-react";
// import Navbar from "@/components/Navbar/Navbar";

const API_URL = process.env.NEXT_PUBLIC_DEXSCREENER_API;

const TokenDetails = () => {
  const router = useRouter();
  const { token } = router.query;

  const [tokenData, setTokenData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<string | null>(null);

  const scriptLoaded = useRef(false); // Track script execution

  const items = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/Dashboard" },
    { label: "Tokens", href: "/Tokens" },
  ];

  useEffect(() => {
    if (!token || scriptLoaded.current) return;

    const fetchTokenDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/latest/dex/tokens/${token}`);
        const data = await response.json();
        setTokenData(data.pairs || []);
      } catch (error) {
        console.error("Error fetching token details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetails();
    scriptLoaded.current = true; // Mark script as loaded
  }, [token]);

  const handleGoBack = () => {
    router.back();
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const shortenAddress = (address: string): string => `${address.slice(0, 6)}...${address.slice(-4)}`;

  if (loading) {
    return (
      <>
        {/* <Navbar items={items} /> */}
        <div className="w-full transition-all md:p-6 p-2 duration-300">
          <div className="bg-gray-900 lg:p-3 md:p-5 p-3 rounded-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
              <div className="flex items-center">
                <button 
                  onClick={handleGoBack}
                  className="mr-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors flex items-center justify-center group"
                  aria-label="Go back"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <h2 className="text-2xl font-bold text-white">Token Details</h2>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="text-sm text-gray-400 flex items-center bg-gray-800 px-3 py-1.5 rounded-lg">
                  <Loader size={16} className="animate-spin mr-2" />
                  <span>Loading token data...</span>
                </div>
              </div>
            </div>
            
            <div className="animate-pulse space-y-4">
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-bordercolor to-gray-600" />
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-gray-700 h-12 w-12"></div>
                    <div className="ml-3">
                      <div className="h-5 bg-gray-700 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-700 rounded w-20"></div>
                      <div className="h-4 bg-gray-700 rounded w-24"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-700 rounded w-20"></div>
                      <div className="h-4 bg-gray-700 rounded w-28"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl border border-gray-700 h-64"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!tokenData?.length) {
    return (
      <>
        {/* <Navbar items={items} /> */}
        <div className="w-full transition-all md:p-6 p-2 duration-300">
          <div className="bg-gray-900 lg:p-3 md:p-5 p-3 rounded-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
              <div className="flex items-center">
                <button 
                  onClick={handleGoBack}
                  className="mr-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors flex items-center justify-center group"
                  aria-label="Go back"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <h2 className="text-2xl font-bold text-white">Token Details</h2>
              </div>
            </div>
            <div className="text-center py-12">
              <p className="text-white text-lg">Token not found.</p>
              <button 
                onClick={handleGoBack}
                className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Navbar items={items} /> */}
      <div className="w-full transition-all md:p-6 p-2 duration-300">
        <div className="bg-gray-900 lg:p-3 md:p-5 p-3 rounded-xl">
          {/* Header with back button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <div className="flex items-center">
              <button 
                onClick={handleGoBack}
                className="mr-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors flex items-center justify-center group"
                aria-label="Go back"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <h2 className="text-2xl font-bold text-white">Token Details</h2>
            </div>
            
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="text-sm text-gray-400 flex items-center bg-gray-800 px-3 py-1.5 rounded-lg">
                <span>{tokenData.length} pair{tokenData.length !== 1 ? 's' : ''} found</span>
              </div>
            </div>
          </div>

          {tokenData.map((pair: any, index: Key) => (
            <div key={index} className="space-y-4">
              {/* Token Overview Card */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-bordercolor">
                {/* Gradient top bar */}
                <div className="h-1 w-full bg-gradient-to-r from-bordercolor to-gray-600" />
                
                <div className="p-4">
                  {/* Token Header */}
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-bordercolor to-gray-600 rounded-full opacity-20 animate-pulse" />
                      <Image
                        src={pair.info?.imageUrl || tokendefault}
                        alt={pair.baseToken?.name || "N/A"}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-gray-700 z-10 relative"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-bold text-white">{pair.baseToken?.name || "N/A"}</h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full">
                        {pair.baseToken?.symbol || "N/A"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-900 bg-opacity-40 px-3 py-2 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Price (USD)</div>
                      <div className="text-lg font-bold text-white">${pair.priceUsd || "N/A"}</div>
                      <div className="text-xs text-gray-500">24h Change: ${pair.priceChange?.h24 || "N/A"}</div>
                    </div>
                    
                    <div className="bg-gray-900 bg-opacity-40 px-3 py-2 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Liquidity (USD)</div>
                      <div className="text-lg font-bold text-white">${pair.liquidity?.usd || "N/A"}</div>
                      <div className="text-xs text-gray-500">&nbsp;</div>
                    </div>
                    
                    <div className="bg-gray-900 bg-opacity-40 px-3 py-2 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">24h Volume</div>
                      <div className="text-lg font-bold text-white">${pair.volume?.h24 || "N/A"}</div>
                      <div className="text-xs text-gray-500">1h: ${pair.volume?.h1 || "N/A"}</div>
                    </div>
                  </div>
                  
                  {/* Token Info */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-md font-semibold text-white mb-2">Token Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Chain ID</span>
                            <span className="font-medium text-gray-300">{pair.chainId || "N/A"}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Dex ID</span>
                            <span className="font-medium text-gray-300">{pair.dexId || "N/A"}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Pair Address</span>
                            <div className="flex items-center space-x-1">
                              <span className="font-mono text-gray-300">{shortenAddress(pair.pairAddress || "")}</span>
                              <button
                                onClick={() => copyToClipboard(pair.pairAddress)}
                                className="p-1 rounded-md hover:bg-gray-700 transition-colors"
                                title="Copy address"
                              >
                                {copied === pair.pairAddress ? (
                                  <Check size={14} className="text-green-500" />
                                ) : (
                                  <Copy size={14} className="text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Links & Socials */}
                    <div>
                      <h4 className="text-md font-semibold text-white mb-2">Links & Socials</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Website</span>
                            <a
                              href={pair.info?.websites?.[0]?.url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-300 hover:text-blue-400 transition-colors"
                            >
                              {pair.info?.websites?.[0]?.label || "N/A"}
                            </a>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <span className="text-gray-400 mr-2">Socials</span>
                            <div className="flex flex-wrap gap-2">
                              {pair.info?.socials?.length ? (
                                pair.info.socials.map((social: any, i: number) => (
                                  <a
                                    key={i}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-2 py-1 text-xs font-medium bg-gray-700 text-blue-300 hover:text-blue-400 rounded-full transition-colors"
                                  >
                                    {social.type}
                                  </a>
                                ))
                              ) : (
                                <span className="text-gray-300">N/A</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Banner Image */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden p-4">
                <Image
                  width={1000}
                  height={300}
                  className="w-full h-auto rounded-md"
                  src={pair.info?.openGraph || bannerdefault}
                  alt={pair.baseToken?.name || "N/A"}
                />
              </div>
              
              {/* Charts and Swap */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-bordercolor to-gray-600" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-4">Price Chart</h3>
                    <TokenChart />
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-bordercolor to-gray-600" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-4">Swap</h3>
                    <Swap />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TokenDetails;