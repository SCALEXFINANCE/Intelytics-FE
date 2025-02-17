import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import Image from "next/image";
import TokenChart from "@/components/tokenChart";

const API_URL = process.env.NEXT_PUBLIC_DEXSCREENER_API;

const TokenDetails = () => {
  const router = useRouter();
  const { token } = router.query;

  const [tokenData, setTokenData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) return;

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
  }, [token]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!tokenData.length) return <p className="text-center">Token not found.</p>;

  return (
    <div className="p-4 h-screen">
      {/* Header Banner */}
     

      {tokenData.map(
        (
          pair: {
            baseToken: { name: any; symbol: any };
            info: {
                openGraph: string;  imageUrl: any; websites: { url: string; label: any }[]; socials: any[] 
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
          <div key={index} className="">
             <div className="flex text-white text-center rounded-lg shadow-md border border-bordercolor p-4">
             <div className="w-full flex justify-center items-center ">
            
            <Image
               width={1000}
               height={1000}
               className="w-auto h-40 lg:h-96 rounded-md"
               src={pair.info?.openGraph || "/default-token.png"}
               alt={pair.baseToken?.name || "N/A"}
             /></div>
             <div className="space-y-2 w-full">
                
             <div className="flex space-x-2 justify-between w-full">
           <div className="flex">
           <Image
                width={80}
                height={80}
                className="w-20 h-20 rounded-full p-1"
                src={pair.info?.imageUrl || "/default-token.png"}
                alt={pair.baseToken?.name || "N/A"}
              />
                <h2 className="text-3xl font-semibold">{pair.baseToken?.name || "N/A"} <p className="text-white text-xl bg-bordercolor rounded-full">{pair.baseToken?.symbol || "N/A"}</p></h2>
               
           </div>
           <div className="flex flex-col text-3xl"><strong className="text-bordercolor text-2xl">{pair.baseToken?.symbol || "N/A"} Price (USD)</strong> ${pair.priceUsd || "N/A"}</div>
           <div className="flex flex-col text-3xl"><strong className="text-bordercolor text-2xl">Liquidity (USD)</strong>${pair.liquidity?.usd || "N/A"}</div>
           <div className="flex flex-col text-3xl"><strong className="text-bordercolor text-2xl">24h Change (USD)</strong> ${pair.priceChange?.h24 || "N/A"}</div>

             </div>
            <div className="text-left text-lg font-bold" style={{textShadow:"white 2px 2px 20px;"}} > GENERAL INFO</div>
             <div className="grid grid-cols-2 gap-4">
        
              <div className="p-4 rounded-lg border border-bordercolor text-left">
                <p><strong>Chain ID:</strong> {pair.chainId || "N/A"}</p>
                <p><strong>Dex ID:</strong> {pair.dexId || "N/A"}</p>
                <p><strong>Pair Address:</strong> {pair.pairAddress || "N/A"}</p>
              </div>

            

              <div className="p-4 rounded-lg border border-bordercolor text-left">
                <p><strong>24H Volume:</strong> ${pair.volume?.h24 || "N/A"}</p>
                <p><strong>6H Volume:</strong> ${pair.volume?.h6 || "N/A"}</p>
                <p><strong>1H Volume:</strong> ${pair.volume?.h1 || "N/A"}</p>
              </div>

              {/* Social Links */}
              <div className="p-4 rounded-lg border border-bordercolor text-left col-span-2">
                <p><strong>Website:</strong> <a href={pair.info?.websites?.[0]?.url || "#"} target="_blank" className="text-blue-300">{pair.info?.websites?.[0]?.label || "N/A"}</a></p>
                <p><strong>Socials:</strong></p>
                <ul className="list-disc pl-4">
                  {pair.info?.socials?.length ? (
                    pair.info.socials.map((social, i) => (
                      <li key={i}>
                        <a href={social.url} target="_blank" className="text-blue-300">{social.type}</a>
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
   <div className=" rounded-md my-4">
   <TokenChart/>
   </div>
          
          </div>
        )
      )}
    </div>
  );
};

export default TokenDetails;
