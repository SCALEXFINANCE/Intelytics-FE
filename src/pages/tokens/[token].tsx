import { useRouter } from "next/router";
import { Key, useEffect, useState, useRef } from "react";
import Image from "next/image";
import TokenChart from "@/components/tokenChart";
import bannerdefault from "@/components/assets/banner-default.png";
import tokendefault from "@/components/assets/404-image.png";
import Swap from "@/components/swap/Swap";

const API_URL = process.env.NEXT_PUBLIC_DEXSCREENER_API;

const TokenDetails = () => {
  const router = useRouter();
  const { token } = router.query;

  const [tokenData, setTokenData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);

  const scriptLoaded = useRef(false); // Track script execution

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

  if (loading) return <p className="text-center">Loading...</p>;
  if (!tokenData?.length) return <p className="text-center">Token not found.</p>;

  return (
    <div className="p-4 min-h-screen">
      {tokenData.map(
        (
          pair: {
            baseToken: { name: any; symbol: any };
            info: {
              openGraph: string;
              imageUrl: any;
              websites: { url: string; label: any }[];
              socials: any[];
            };
            chainId: any;
            dexId: any;
            pairAddress: any;
            priceUsd: any;
            liquidity: { usd: any };
            volume: { h24: any; h6: any; h1: any };
            priceChange: { h24: any };
          },
          index: Key | null | undefined
        ) => (
          <div key={index}>
            <div className="lg:flex text-white text-center rounded-lg shadow-md border border-bordercolor p-2 lg:p-4">
              <div className="w-full flex justify-center items-center">
                <Image
                  width={1000}
                  height={1000}
                  className="h-full w-auto rounded-md border-bordercolor border"
                  src={pair.info?.openGraph || bannerdefault}
                  alt={pair.baseToken?.name || "N/A"}
                />
              </div>
              <div className="space-y-2 w-full">
                <div className="flex lg:p-2 justify-between w-full items-center">
                  <div className="flex ">
                    <Image
                      width={80}
                      height={80}
                      className="h-8 w-8 lg:w-20 lg:h-20 rounded-full p-1 bg-bordercolor"
                      src={pair.info?.imageUrl || tokendefault}
                      alt={pair.baseToken?.name || "N/A"}
                    />
                    <h2 className="text-xs lg:text-3xl font-semibold">
                      {pair.baseToken?.name || "N/A"}{" "}
                      <p className="text-white text-xxs lg:text-xl bg-bordercolor rounded-full">
                        {pair.baseToken?.symbol || "N/A"}
                      </p>
                    </h2>
                  </div>
                  <div className="flex flex-col text-xs lg:text-3xl">
                    <strong className="text-bordercolor text-xs lg:text-2xl">
                      {pair.baseToken?.symbol || "N/A"} Price (USD)
                    </strong>
                    ${pair.priceUsd || "N/A"}
                  </div>
                  <div className="flex flex-col text-xs lg:text-3xl">
                    <strong className="text-bordercolor text-xs lg:text-2xl">
                      Liquidity (USD)
                    </strong>
                    ${pair.liquidity?.usd || "N/A"}
                  </div>
                  <div className="flex flex-col text-xs lg:text-3xl">
                    <strong className="text-bordercolor text-xs lg:text-2xl">
                      24h Change (USD)
                    </strong>{" "}
                    ${pair.priceChange?.h24 || "N/A"}
                  </div>
                </div>

                <div className="lg:px-2">
                  <div
                    className="text-left text-lg font-bold"
                    style={{ textShadow: "white 2px 2px 20px" }}
                  >
                    GENERAL INFO
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="lg:p-4 p-1 rounded-lg border border-bordercolor text-left">
                      <p>
                        <strong>Chain ID:</strong> {pair.chainId || "N/A"}
                      </p>
                      <p>
                        <strong>Dex ID:</strong> {pair.dexId || "N/A"}
                      </p>
                      <p className="overflow-hidden">
                        <strong>Pair Address:</strong> {pair.pairAddress || "N/A"}
                        <div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(pair.pairAddress).then(() => {
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              });
                            }}
                            className={`rounded ${copied ? "text-red-600" : "text-green-600"}`}
                          >
                            {copied ? "Copied!" : "Copy Address"}
                          </button>
                        </div>
                      </p>
                    </div>

                    <div className="lg:p-4 p-1 rounded-lg border border-bordercolor text-left">
                      <p>
                        <strong>24H Volume:</strong> ${pair.volume?.h24 || "N/A"}
                      </p>
                      <p>
                        <strong>6H Volume:</strong> ${pair.volume?.h6 || "N/A"}
                      </p>
                      <p>
                        <strong>1H Volume:</strong> ${pair.volume?.h1 || "N/A"}
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="lg:p-4 p-1 rounded-lg border border-bordercolor text-left col-span-2">
                      <p>
                        <strong>Website:</strong>{" "}
                        <a
                          href={pair.info?.websites?.[0]?.url || "#"}
                          target="_blank"
                          className="text-blue-300"
                        >
                          {pair.info?.websites?.[0]?.label || "N/A"}
                        </a>
                      </p>
                      <p>
                        <strong>Socials:</strong>
                      </p>
                      <ul className="list-disc pl-4">
                        {pair.info?.socials?.length ? (
                          pair.info.socials.map((social, i) => (
                            <li key={i}>
                              <a href={social.url} target="_blank" className="text-blue-300">
                                {social.type}
                              </a>
                            </li>
                          ))
                        ) : (
                          <li>N/A</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md my-4 h-full lg:flex w-full">
              <div className="w-full space-y-4 lg:space-y-0 lg:space-x-4 lg:flex">
                <TokenChart />
                <Swap/>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TokenDetails;
