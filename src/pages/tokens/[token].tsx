
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


interface ChartCardProps {
  pair: TokenPair;
}

// Enhanced chart component with real data fetching
const ChartCard: FC<ChartCardProps> = ({ pair }) => {
  const [chartData, setChartData] = useState<{ time: string; price: number; fullTime?: Date }[]>([]);
  const [timeframe, setTimeframe] = useState("24h");
  const [loading, setLoading] = useState(true);
  
  // Get the token symbol and price for the chart title
  const symbol = pair?.baseToken?.symbol || "Token";
  const price = pair?.priceUsd || "N/A";
  const priceChange = pair?.priceChange?.h24 || "0";
  
  // Parse price change properly - handles strings, numbers, null values
  const priceChangeValue = parseFloat(priceChange);
  const isPositive = !isNaN(priceChangeValue) && priceChangeValue >= 0;
  
  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        // Fetch historical price data from API using the pair address
        if (pair?.pairAddress) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_DEXSCREENER_API}/latest/dex/pairs/${pair.chainId}/${pair.pairAddress}/candles`);
          const data = await response.json();
          
          // Process the candle data for the chart
          if (data && data.candles) {
            // Format data for the chart
            const formattedData = data.candles.map((candle: { time: string; close: string }) => ({
              time: new Date(candle.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              price: parseFloat(candle.close),
              fullTime: new Date(candle.time)
            }));
            
            // Filter data based on the selected timeframe
            const now = new Date();
            const filtered = formattedData.filter((item: { time: string; price: number; fullTime: Date }) => {
              const diffHours = (now.getTime() - item.fullTime.getTime()) / (1000 * 60 * 60);
              if (timeframe === "24h") return diffHours <= 24;
              if (timeframe === "1h") return diffHours <= 1;
              if (timeframe === "7d") return diffHours <= 168; // 7 * 24
              return true;
            });
            
            setChartData(filtered);
          }
        }
      } catch (error) {
        console.error("Error fetching chart data", error);
        // Provide fallback data if API fails
        setChartData(generateFallbackData());
      } finally {
        setLoading(false);
      }
    };
    
    fetchChartData();
  }, [pair, timeframe]);
  
  // Generate fallback data if the API call fails
  const generateFallbackData = () => {
    const basePrice = parseFloat(price) || 10;
    const volatility = 0.02; // 2% price movement
    const points = 24;
    const result = [];
    
    for (let i = points; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - i);
      
      const randomFactor = 1 + (Math.random() * volatility * 2 - volatility);
      const adjustedPrice = basePrice * randomFactor;
      
      result.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: adjustedPrice,
      });
    }
    
    return result;
  };
  
  // Custom tooltip component for the chart
  interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: { time: string; price: number } }[];
  }

  const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 p-2 rounded border border-gray-700 text-sm">
          <p className="text-white">{`${payload[0].payload.time}`}</p>
          <p className="text-bordercolor font-medium">
            ${payload[0].payload.price.toFixed(6)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-bordercolor to-gray-600" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Price Chart</h3>
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">${price}</span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              isPositive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
            }`}>
              {isPositive ? '+' : ''}{priceChange}%
            </span>
          </div>
        </div>
        
        {/* Timeframe selector */}
        <div className="flex gap-2 mb-4">
          {["1h", "24h", "7d"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                timeframe === tf
                  ? 'bg-bordercolor text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        
        <div className="h-64 lg:h-72 relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-gray-600 border-t-bordercolor rounded-full animate-spin" />
            </div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  axisLine={{ stroke: '#4B5563' }}
                  tickLine={{ stroke: '#4B5563' }}
                  minTickGap={30}
                />
                <YAxis 
                  domain={['dataMin', 'dataMax']}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  axisLine={{ stroke: '#4B5563' }}
                  tickLine={{ stroke: '#4B5563' }}
                  width={60}
                  tickFormatter={(value) => `$${value.toFixed(2)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#6d28d9" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#8b5cf6", stroke: "#4c1d95" }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No chart data available
            </div>
          )}
          
          {/* Token info overlay */}
          <div className="absolute top-2 right-2 bg-gray-900/70 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs flex items-center">
            <div className="w-3 h-3 rounded-full bg-bordercolor mr-1.5"></div>
            <span className="text-white font-medium">{symbol}/USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ChartCard };


import { useRouter } from "next/router";
import { useEffect, useState, useRef, ReactNode, FC } from "react";
import Image from "next/image";
import TokenChart from "@/components/tokenChart";
import bannerDefault from "@/components/assets/banner-default.png";
import tokenDefault from "@/components/assets/404-image.png";
import Swap from "@/components/swap/Swap";
import { Copy, Check, ArrowLeft, Loader } from "lucide-react";
import { StaticImageData } from "next/image";
import TradingViewWidget from "@/components/tokenChart";

const API_URL = process.env.NEXT_PUBLIC_DEXSCREENER_API;

// Define TypeScript interfaces
interface BaseToken {
  name?: string;
  symbol?: string;
  address?: string;
}

interface PriceChange {
  h24?: string;
  h6?: string;
  h1?: string;
  m5?: string;
}

interface Volume {
  h24?: string;
  h6?: string;
  h1?: string;
}

interface Liquidity {
  usd?: string;
  base?: string;
  quote?: string;
}

interface Website {
  label?: string;
  url?: string;
}

interface Social {
  type: string;
  url: string;
}

interface TokenInfo {
  imageUrl?: string;
  openGraph?: string;
  websites?: Website[];
  socials?: Social[];
}

interface TokenPair {
  baseToken?: BaseToken;
  chainId?: string;
  dexId?: string;
  pairAddress?: string;
  priceUsd?: string;
  priceChange?: PriceChange;
  volume?: Volume;
  liquidity?: Liquidity;
  info?: TokenInfo;
}

const TokenDetails: FC = () => {
  const router = useRouter();
  const { token } = router.query;
  
  const [tokenData, setTokenData] = useState<TokenPair | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<string | null>(null);
  
  const scriptLoaded = useRef<boolean>(false);
  
  useEffect(() => {
    if (!token || scriptLoaded.current) return;
    
    const fetchTokenDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/latest/dex/tokens/${token}`);
        const data = await response.json();
        // Take only the first pair
        setTokenData(data.pairs?.[0] || null);
      } catch (error) {
        console.error("Error fetching token details", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTokenDetails();
    scriptLoaded.current = true;
  }, [token]);
  
  const handleGoBack = (): void => router.back();
  
  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  // PageHeader component remains the same
  const PageHeader: FC = () => (
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
      
      {!loading && tokenData && (
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="text-sm text-gray-400 flex items-center bg-gray-800 px-3 py-1.5 rounded-lg">
            <span>1 pair found</span>
          </div>
        </div>
      )}
    </div>
  );

  // Loading state component
  if (loading) {
    return (
      <div className="w-full transition-all md:p-6 p-2 duration-300">
        <div className="bg-gray-900 lg:p-3 md:p-5 p-3 rounded-xl">
          <PageHeader />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  // Empty state component
  if (!tokenData) {
    return (
      <div className="w-full transition-all md:p-6 p-2 duration-300">
        <div className="bg-gray-900 lg:p-3 md:p-5 p-3 rounded-xl">
          <PageHeader />
          <EmptyState onBack={handleGoBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full transition-all md:p-6 p-2 duration-300">
      <div className="bg-gray-900 lg:p-3 md:p-5 p-3 rounded-xl">
        <PageHeader />
        
        <TokenPairCard 
          pair={tokenData} 
          copied={copied}
          onCopy={copyToClipboard}
        />
      </div>
    </div>
  );
};

export default TokenDetails;

// Loading skeleton component
const LoadingSkeleton: FC = () => (
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
);

interface EmptyStateProps {
  onBack: () => void;
}

// Empty state component
const EmptyState: FC<EmptyStateProps> = ({ onBack }) => (
  <div className="text-center py-12">
    <p className="text-white text-lg">Token not found.</p>
    <button 
      onClick={onBack}
      className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
    >
      Go Back
    </button>
  </div>
);

interface TokenPairCardProps {
  pair: TokenPair;
  copied: string | null;
  onCopy: (text: string) => void;
}

// Token pair card component
const TokenPairCard: FC<TokenPairCardProps> = ({ pair, copied, onCopy }) => {
  // Helper to safely get nested values with defaults
  const getValue = <T extends unknown>(
    obj: any, 
    path: string, 
    defaultValue: T = "N/A" as unknown as T
  ): T => {
    return path.split('.').reduce((o, i) => (o && o[i] !== undefined ? o[i] : defaultValue), obj);
  };
  
  return (
    <div className="space-y-4">
      {/* Token Overview Card */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-bordercolor">
        {/* Gradient top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-bordercolor to-gray-600" />
        
        <div className="flex p-4 justify-between">
         <div className="w-full p-4">
           {/* Token Header */}
           <div className="flex items-center mb-4">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 bg-gradient-to-br from-bordercolor to-gray-600 rounded-full opacity-20 animate-pulse" />
              <Image
                src={getValue(pair, 'info.imageUrl', tokenDefault)}
                alt={getValue(pair, 'baseToken.name')}
                className="rounded-full border-2 border-gray-700 z-10 relative object-cover"
                fill
                sizes="48px"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-bold text-white">{getValue(pair, 'baseToken.name')}</h3>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full">
                {getValue(pair, 'baseToken.symbol')}
              </span>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <MetricCard 
              title="Price (USD)" 
              value={`$${getValue(pair, 'priceUsd')}`} 
              subtext={`24h Change: $${getValue(pair, 'priceChange.h24')}`}
            />
            
            <MetricCard 
              title="Liquidity (USD)" 
              value={`$${getValue(pair, 'liquidity.usd')}`}
            />
            
            <MetricCard 
              title="24h Volume" 
              value={`$${getValue(pair, 'volume.h24')}`}
              subtext={`1h: $${getValue(pair, 'volume.h1')}`}
            />
          </div>
          
          {/* Token Info */}
          <div className="space-y-4">
            {/* Token Details */}
            <div>
              <h4 className="text-md font-semibold text-white mb-2">Token Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InfoItem label="Chain ID" value={getValue(pair, 'chainId')} />
                  <InfoItem label="Dex ID" value={getValue(pair, 'dexId')} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Pair Address</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-mono text-gray-300">{pair.pairAddress ? `${pair.pairAddress.slice(0, 6)}...${pair.pairAddress.slice(-4)}` : "N/A"}</span>
                      <button
                        onClick={() => pair.pairAddress && onCopy(pair.pairAddress)}
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
            <LinksAndSocials pair={pair} />
            
          </div>
         </div>
           {/* Banner Image */}
           <div className="bg-gray-800 rounded-xl border w-[40%] border-gray-700 overflow-visible p-4">
  <div className="relative w-full h-full">
    <Image
      src={getValue(pair, 'info.openGraph', bannerDefault)}
      alt={getValue(pair, 'baseToken.name')}
      className="object-cover rounded-lg border"
      fill
      sizes="100%"
      priority
    />
  </div>
</div>



        </div>
      </div>
      
     
      
      {/* Charts and Swap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard pair={pair} />
        
        <CardWithHeader title="Swap">
          <Swap />
        </CardWithHeader>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  subtext?: string;
}

// Reusable metric card component
const MetricCard: FC<MetricCardProps> = ({ title, value, subtext }) => (
  <div className="bg-gray-900 bg-opacity-40 px-3 py-2 rounded-lg">
    <div className="text-sm text-gray-400 mb-1">{title}</div>
    <div className="text-lg font-bold text-white">{value}</div>
    {subtext && <div className="text-xs text-gray-500">{subtext}</div>}
    {!subtext && <div className="text-xs text-gray-500">&nbsp;</div>}
  </div>
);

interface InfoItemProps {
  label: string;
  value: string;
}

// Reusable info item component
const InfoItem: FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium text-gray-300">{value}</span>
  </div>
);

interface CardWithHeaderProps {
  title: string;
  children: ReactNode;
}

// Card with gradient header component
const CardWithHeader: FC<CardWithHeaderProps> = ({ title, children }) => (
  <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
    <div className="h-1 w-full bg-gradient-to-r from-bordercolor to-gray-600" />
    <div className="p-4">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      {children}
    </div>
  </div>
);

interface LinksAndSocialsProps {
  pair: TokenPair;
}

// Links and socials component
const LinksAndSocials: FC<LinksAndSocialsProps> = ({ pair }) => {
  const website = pair?.info?.websites?.[0];
  const socials = pair?.info?.socials || [];
  
  return (
    <div>
      <h4 className="text-md font-semibold text-white mb-2">Links & Socials</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Website</span>
            {website ? (
              <a
                href={website.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-400 transition-colors"
              >
                {website.label || "N/A"}
              </a>
            ) : (
              <span className="text-gray-300">N/A</span>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span className="text-gray-400 mr-2">Socials</span>
            <div className="flex flex-wrap gap-2">
              {socials.length ? (
                socials.map((social, i) => (
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
  );
};
