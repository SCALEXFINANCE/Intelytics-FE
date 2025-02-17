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
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { TOKEN_ADDRESSES } from "@/lib/constant";
import router from "next/router";

const API_URL = process.env.NEXT_PUBLIC_DEXSCREENER_API;


const columns = [
  { id: "image", label: "Logo" },
  { id: "name", label: "Token Name" },
  { id: "symbol", label: "Symbol" },
  { id: "chainId", label: "Chain Id" },
  { id: "dexId", label: "Dex Id" },
  { id: "priceUsd", label: "Price (USD)" },
  { id: "priceNative", label: "Price (Native)" },
  { id: "liquidityUsd", label: "Liquidity (USD)" },
  { id: "volumeH24", label: "24H Volume" },
  { id: "volumeH6", label: "6H Volume" },
  { id: "volumeH1", label: "1H Volume" },
];
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
      setLoading(false); // Set loading to false after fetching data
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
    <div className="w-full pb-8">
      <div className="flex items-center py-4">
        <div className="border border-bordercolor bg-bluebackground lg:px-2 px-4 rounded-xl flex gap-4 w-full justify-between">
          <div className="flex p-2 font-bold text-white justify-center items-center">
            TOKENS
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="m-2">
                Columns <ChevronDownIcon className="m-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={visibleColumns.includes(column.id)}
                  onCheckedChange={() => toggleColumn(column.id)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border border-gray-700 hidden lg:block">
        {loading ? (
          <div className="flex justify-center items-center p-4 space-x-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow >
                {columns.map(
                  (column) =>
                    visibleColumns.includes(column.id) && (
                      <TableHead key={column.id}>{column.label}</TableHead>
                    )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.length > 0 ? (
                tokens.map((token, index) => (
                  <TableRow key={index}onClick={() => router.push(`/tokens/${token.baseToken.address}`)}>
                    {visibleColumns.includes("image") && (
                      <TableCell>
                        <Image
                          width={100}
                          height={100}
                          className="w-8 h-8 rounded-full bg-white p-1"
                          src={token.info?.imageUrl || imageNotFound}
                          alt={token.baseToken.name}
                        ></Image>
                      </TableCell>
                    )}
                    {visibleColumns.includes("name") && (
                      <TableCell>
                        {token.baseToken.name}{" "}
                        <span className="text-bordercolor text-lg">/</span>{" "}
                        {token.quoteToken.name}
                      </TableCell>
                    )}
                    {visibleColumns.includes("symbol") && (
                      <TableCell>
                        {token.baseToken.symbol}{" "}
                        <span className="text-bordercolor text-lg">/</span>{" "}
                        {token.quoteToken.symbol}
                      </TableCell>
                    )}
                    {visibleColumns.includes("chainId") && (
                      <TableCell>{token.chainId}</TableCell>
                    )}
                    {visibleColumns.includes("dexId") && (
                      <TableCell>{token.dexId}</TableCell>
                    )}
                    {visibleColumns.includes("priceUsd") && (
                      <TableCell>${token.priceUsd}</TableCell>
                    )}
                    {visibleColumns.includes("priceNative") && (
                      <TableCell>${token.priceNative}</TableCell>
                    )}
                    {visibleColumns.includes("liquidityUsd") && (
                      <TableCell>${token.liquidity.usd}</TableCell>
                    )}
                    {visibleColumns.includes("volumeH24") && (
                      <TableCell>${token.volume.h24}</TableCell>
                    )}
                    {visibleColumns.includes("volumeH6") && (
                      <TableCell>${token.volume.h6}</TableCell>
                    )}
                    {visibleColumns.includes("volumeH1") && (
                      <TableCell>${token.volume.h1}</TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length}
                    className="text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="lg:hidden block">
        {tokens.length > 0 ? (
          tokens.map((token, index) => (
            <div className="border border-bordercolor my-2 p-4 rounded-lg" key={index}>
              <div className="flex items-center mb-2 mr-2 space-x-2">
                {" "}
                {visibleColumns.includes("image") && (
                  <div>
                    <Image
                      width={100}
                      height={100}
                      className="w-12 h-12 rounded-full bg-white p-1"
                      src={token.info?.imageUrl || imageNotFound}
                      alt={token.baseToken.name}
                    ></Image>
                  </div>
                )}
                {visibleColumns.includes("name") && (
                  <div>
                  <div className="space-x-2">
                  <span> {token.baseToken.name}</span>
                    <span className="text-bordercolor text-lg">/</span>
                 <span> {token.quoteToken.name}</span>
                  </div>
                    {visibleColumns.includes("symbol") && (
                      <div className="space-x-2">
                           <span className="rounded-full bg-bordercolor px-2"> {token.baseToken.symbol}</span>
                       
                        <span className="text-bordercolor text-lg">/</span>
                       <span className="rounded-full bg-bordercolor px-2"> {token.quoteToken.symbol}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {visibleColumns.includes("volumeH24") && (
                <div className="flex justify-between">
                  <div>Vol 24h</div>
                  <div className=" text-bordercolor">${token.volume.h24}</div>
                </div>
              )}

              {visibleColumns.includes("priceUsd") && (
                <div className="flex justify-between">
                  <div>Price</div>
                  <div className="text-bordercolor">${token.priceUsd}</div>
                </div>
              )}
              {visibleColumns.includes("liquidityUsd") && (
                <div className="flex justify-between">
                  <div>Liquidity</div>
                  <div className="text-bordercolor">${token.liquidity.usd}</div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>no result</div>
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
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching top tokens", error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchTopTokens();
  }, []);

  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-bold mb-4">Top Tokens</h2>
      <div className="rounded-md border border-gray-700">
        {loading ? (
          <div className="flex justify-center items-center p-4 space-x-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Price (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topTokens.length > 0 ? (
                topTokens.map((token, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Image
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                        src={token.imageUrl || "/default-token.png"}
                        alt={token.name}
                      />
                    </TableCell>
                    <TableCell>{token.name}</TableCell>
                    <TableCell>{token.symbol}</TableCell>
                    <TableCell>${token.priceUsd}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};


export default DexTable;
