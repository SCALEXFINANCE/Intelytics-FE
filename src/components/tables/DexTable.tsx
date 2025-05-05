import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import imageNotFound from "@/components/assets/404-image.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, ChevronUpIcon, CoinsIcon, TrendingUp, ExternalLink, Filter } from "lucide-react";
import Image from "next/image";
import { TOKEN_ADDRESSES } from "@/lib/constant";
import router from "next/router";

const API_URL = process.env.NEXT_PUBLIC_DEXSCREENER_API;

const columns = [
  { id: "image", label: "Logo" },
  { id: "name", label: "Token Name" },
  { id: "symbol", label: "Symbol" },
  { id: "chainId", label: "Chain" },
  { id: "dexId", label: "DEX" },
  { id: "priceUsd", label: "Price (USD)" },
  { id: "priceNative", label: "Price (Native)" },
  { id: "liquidityUsd", label: "Liquidity (USD)" },
  { id: "volumeH24", label: "24H Volume" },
  { id: "volumeH6", label: "6H Volume" },
  { id: "volumeH1", label: "1H Volume" },
];

const formatCurrency = (value: string) => {
  if (!value) return "-";
  
  // Convert to number if it's a string
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  // Format based on size
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`;
  } else if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`;
  } else {
    return `$${num.toFixed(4)}`;
  }
};

const DexTable: React.FC = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((c) => c.id)
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTokens = async () => {
      const dataPromises = TOKEN_ADDRESSES.map(async (token) => {
        try {
          const response = await fetch(`${API_URL}/latest/dex/tokens/${token}`);
          const data = await response.json();
          return data.pairs?.[0] || null;
        } catch (error) {
          console.error(`Error fetching token ${token}`, error);
          return null;
        }
      });

      const results = await Promise.all(dataPromises);
      setTokens(results.filter(Boolean));
      setLoading(false);
    };

    fetchTokens();
  }, []);

  const toggleColumn = (columnId: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((c) => c !== columnId)
        : [...prev, columnId]
    );
  };

  return (
    <div className="w-full pb-8 transition-all duration-300">
      {/* Header with Gradient */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-6">
        {/* Gradient top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500" />
        
        <div className="p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="relative mr-3">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20 animate-pulse" />
                <CoinsIcon size={22} className="text-blue-400 relative z-10" />
              </div>
              <h2 className="text-xl font-bold text-white">Token Explorer</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600 text-white flex items-center gap-2">
                    <Filter size={16} />
                    <span>Columns</span>
                    <ChevronDownIcon className="h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                  {columns.map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={visibleColumns.includes(column.id)}
                      onCheckedChange={() => toggleColumn(column.id)}
                      className="hover:bg-gray-700"
                    >
                      {column.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="rounded-xl border border-gray-700 overflow-hidden bg-gray-900 hidden lg:block">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="relative">
              <div className="w-12 h-12 rounded-full absolute border-4 border-gray-700"></div>
              <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-transparent border-t-blue-500"></div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800 border-b border-gray-700">
                  {columns.map(
                    (column) =>
                      visibleColumns.includes(column.id) && (
                        <TableHead 
                          key={column.id} 
                          className="text-gray-300 font-medium py-4"
                        >
                          {column.label}
                        </TableHead>
                      )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.length > 0 ? (
                  tokens.map((token, index) => (
                    <TableRow 
                      key={index} 
                      onClick={() => router.push(`/tokens/${token.baseToken.address}`)}
                      className="border-b border-gray-800 hover:bg-gray-800/70 cursor-pointer transition-colors"
                    >
                      {visibleColumns.includes("image") && (
                        <TableCell className="py-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20"></div>
                            <Image
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full relative z-10"
                              src={token.info?.imageUrl || imageNotFound}
                              alt={token.baseToken.name}
                            />
                          </div>
                        </TableCell>
                      )}
                      {visibleColumns.includes("name") && (
                        <TableCell className="font-medium text-white">
                          {token.baseToken.name}{" "}
                          <span className="text-gray-500">/</span>{" "}
                          {token.quoteToken.name}
                        </TableCell>
                      )}
                      {visibleColumns.includes("symbol") && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs font-medium text-white">
                              {token.baseToken.symbol}
                            </span>
                            <span className="text-gray-500">/</span>
                            <span className="px-2 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs font-medium text-white">
                              {token.quoteToken.symbol}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      {visibleColumns.includes("chainId") && (
                        <TableCell>
                          <span className="px-2 py-1 rounded-full bg-gray-800 text-xs font-medium text-blue-400 border border-blue-900/30">
                            {token.chainId || "-"}
                          </span>
                        </TableCell>
                      )}
                      {visibleColumns.includes("dexId") && (
                        <TableCell>
                          <span className="px-2 py-1 rounded-full bg-gray-800 text-xs font-medium text-purple-400 border border-purple-900/30">
                            {token.dexId || "-"}
                          </span>
                        </TableCell>
                      )}
                      {visibleColumns.includes("priceUsd") && (
                        <TableCell className="font-medium text-white">
                          {token.priceUsd ? formatCurrency(token.priceUsd) : "-"}
                        </TableCell>
                      )}
                      {visibleColumns.includes("priceNative") && (
                        <TableCell className="text-gray-300">
                          {token.priceNative ? formatCurrency(token.priceNative) : "-"}
                        </TableCell>
                      )}
                      {visibleColumns.includes("liquidityUsd") && (
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-medium text-green-400">
                              {token.liquidity?.usd ? formatCurrency(token.liquidity.usd) : "-"}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      {visibleColumns.includes("volumeH24") && (
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TrendingUp size={14} className="text-blue-400" />
                            <span className="font-medium text-blue-400">
                              {token.volume?.h24 ? formatCurrency(token.volume.h24) : "-"}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      {visibleColumns.includes("volumeH6") && (
                        <TableCell className="text-gray-300">
                          {token.volume?.h6 ? formatCurrency(token.volume.h6) : "-"}
                        </TableCell>
                      )}
                      {visibleColumns.includes("volumeH1") && (
                        <TableCell className="text-gray-300">
                          {token.volume?.h1 ? formatCurrency(token.volume.h1) : "-"}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length} className="text-center py-8 text-gray-400">
                      No tokens found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Mobile Cards */}
      <div className="lg:hidden block space-y-4">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="relative">
              <div className="w-10 h-10 rounded-full absolute border-4 border-gray-700"></div>
              <div className="w-10 h-10 rounded-full animate-spin absolute border-4 border-transparent border-t-blue-500"></div>
            </div>
          </div>
        ) : tokens.length > 0 ? (
          tokens.map((token, index) => (
            <div 
              className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden cursor-pointer hover:border-gray-600 transition-colors" 
              key={index} 
              onClick={() => router.push(`/tokens/${token.baseToken.address}`)}
            >
              {/* Card gradient top */}
              <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500" />
              
              <div className="p-4">
                {/* Token Header */}
                <div className="flex items-center gap-3 mb-4">
                  {visibleColumns.includes("image") && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20"></div>
                      <Image
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full relative z-10"
                        src={token.info?.imageUrl || imageNotFound}
                        alt={token.baseToken.name}
                      />
                    </div>
                  )}
                  
                  {visibleColumns.includes("name") && (
                    <div className="flex-1">
                      <div className="font-bold text-white">
                        {token.baseToken.name} <span className="text-gray-500">/</span> {token.quoteToken.name}
                      </div>
                      
                      {visibleColumns.includes("symbol") && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-xs font-medium text-white">
                            {token.baseToken.symbol}
                          </span>
                          <span className="text-gray-500">/</span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-xs font-medium text-white">
                            {token.quoteToken.symbol}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-400">
                    <ExternalLink size={16} />
                  </div>
                </div>
                
                {/* Token Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {visibleColumns.includes("priceUsd") && (
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1">Price</div>
                      <div className="text-lg font-bold text-white">
                        {token.priceUsd ? formatCurrency(token.priceUsd) : "-"}
                      </div>
                    </div>
                  )}
                  
                  {visibleColumns.includes("volumeH24") && (
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                        <TrendingUp size={14} />
                        <span>24h Volume</span>
                      </div>
                      <div className="text-lg font-bold text-blue-400">
                        {token.volume?.h24 ? formatCurrency(token.volume.h24) : "-"}
                      </div>
                    </div>
                  )}
                  
                  {visibleColumns.includes("liquidityUsd") && (
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1">Liquidity</div>
                      <div className="text-lg font-bold text-green-400">
                        {token.liquidity?.usd ? formatCurrency(token.liquidity.usd) : "-"}
                      </div>
                    </div>
                  )}
                  
                  {visibleColumns.includes("dexId") && visibleColumns.includes("chainId") && (
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1">Platform</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 rounded-full bg-gray-700 text-xs font-medium text-blue-400 border border-blue-900/30">
                          {token.chainId || "-"}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-gray-700 text-xs font-medium text-purple-400 border border-purple-900/30">
                          {token.dexId || "-"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 text-center text-gray-400">
            No tokens found
          </div>
        )}
      </div>
    </div>
  );
};

const TopTokens: React.FC = () => {
  const [topTokens, setTopTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopTokens = async () => {
      try {
        const response = await fetch(`${API_URL}/top/tokens`);
        const data = await response.json();
        setTopTokens(data.tokens || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top tokens", error);
        setLoading(false);
      }
    };

    fetchTopTokens();
  }, []);

  return (
    <div className="w-full mt-8">
      <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-6">
        {/* Gradient top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500" />
        
        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="relative mr-3">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20 animate-pulse" />
              <TrendingUp size={20} className="text-blue-400 relative z-10" />
            </div>
            <h2 className="text-xl font-bold text-white">Top Tokens</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="relative">
                <div className="w-10 h-10 rounded-full absolute border-4 border-gray-700"></div>
                <div className="w-10 h-10 rounded-full animate-spin absolute border-4 border-transparent border-t-blue-500"></div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-800 border-b border-gray-700">
                    <TableHead className="text-gray-300 font-medium w-16">#</TableHead>
                    <TableHead className="text-gray-300 font-medium">Token</TableHead>
                    <TableHead className="text-gray-300 font-medium">Symbol</TableHead>
                    <TableHead className="text-gray-300 font-medium">Price (USD)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topTokens.length > 0 ? (
                    topTokens.map((token, index) => (
                      <TableRow key={index} className="border-b border-gray-800 hover:bg-gray-800/70 cursor-pointer transition-colors">
                        <TableCell className="font-medium text-gray-400">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20"></div>
                              <Image
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full relative z-10"
                                src={token.imageUrl || "/default-token.png"}
                                alt={token.name}
                              />
                            </div>
                            <span className="font-medium text-white">{token.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs font-medium text-white">
                            {token.symbol}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium text-white">
                          {formatCurrency(token.priceUsd)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-400">
                        No tokens found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DexTable;