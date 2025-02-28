import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { POLYGON_TOKEN_PAIRS } from "@/lib/constant";
import {
  invalidateBalanceCache,
  useFetchBalance,
  useFetchBalances,
} from "@/hooks/useFetchBalance";
import { useTokenBalances } from "../Providers/BalanceProvider";

interface TokenSelectorProps {
  selectedToken: { symbol: string; name: string; logoURI: string } | null;
  onTokenSelect: (token: {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    tokenNameOrCA: string;
    tokenType: "factory" | "cw20";
    logoURI: string;
  }) => void;
  excludedToken?: string;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
  excludedToken,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { balances, errors, loading } = useTokenBalances();

  const filteredTokens = useMemo(
    () =>
      POLYGON_TOKENS.filter(
        (token) =>
          (token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
          token.symbol !== excludedToken
      ),
    [searchTerm, excludedToken]
  );

  // const tokenParams = useMemo(
  //   () =>
  //     filteredTokens.map((token) => ({
  //       tokenType: token.type,
  //       tokenNameOrCA: token.address,
  //       decimals: token.decimals,
  //     })),
  //   [filteredTokens]
  // );

  const handleTokenClick = (token: {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    tokenNameOrCA: string;
    tokenType: "factory" | "cw20";
    logoURI: string;
  }) => {
    onTokenSelect(token);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="xlg"
          onClick={() => setIsOpen(true)}
          className="flex items-center bg-transparent outline-none text-white p-2 rounded-lg"
        >
          {selectedToken ? (
            <>
              <img
                src={selectedToken.logoURI}
                alt={selectedToken.symbol}
                className="w-7 h-7 mr-2 rounded-full"
              />
              <span className="token-selector flex text-lg">
                {selectedToken.symbol}{" "}
                <svg
                  className="w-6 h-6 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </>
          ) : (
            <span className="text-lg flex">
              Select Token{" "}
              <svg
                className="w-6 h-6 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="dialog-content dialog bg-transparent bg-opacity-60 text-white p-6 scroll rounded-lg shadow-lg border border-customColor4 border-opacity-30 overflow-auto"
        style={{ maxHeight: "80vh" }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg text-customColor5 font-semibold text-left">
            Select your token
          </DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Input
            id="search"
            placeholder="Search"
            className="w-full bg-transparent outline-none shadow-lg backdrop-filter backdrop-blur-md text-white font-plain placeholder-gray-400 rounded-full border border-customColor5 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M15 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {filteredTokens.map((token, i) => (
            <button
              // key={token.address}
              key={i}
              className={`flex items-center w-auto p-1 justify-evenly bg-transparent rounded-full border border-customColor5 hover:bg-gray-600 ${
                selectedToken?.symbol === token.symbol
                  ? "bg-transparent border border-customColor4 border-opacity-30 "
                  : "bg-transparent border border-customColor4 border-opacity-30"
              }`}
              onClick={() =>
                handleTokenClick({
                  symbol: token.symbol,
                  name: token.name,
                  decimals: token.decimals,
                  tokenNameOrCA: token.address,
                  tokenType: token.type,
                  address: token.address,
                  logoURI: token.logoURI,
                })
              }
            >
              <img
                src={token.logoURI}
                alt={token.symbol}
                className="w-8 h-8 mb-1 rounded-full"
              />
              <span className="text-sm">{token.symbol}</span>
            </button>
          ))}
        </div>
        <Label className="text-gray-400 font-semibold mb-2">
          Token Balance
        </Label>
        <ul>
          {filteredTokens.map((token, i) => {
            let balance = balances[token.address];
            const error = errors[token.address];
            return (
              <li
                // key={token.address}
                key={i}
                className={`flex justify-between items-center p-2 rounded-lg mb-2 ${
                  selectedToken?.symbol === token.symbol
                    ? "bg-transparent border border-customColor4 border-opacity-30"
                    : "bg-transparent border border-customColor4 border-opacity-30"
                }`}
                onClick={() =>
                  handleTokenClick({
                    symbol: token.symbol,
                    name: token.name,
                    decimals: token.decimals,
                    tokenNameOrCA: token.address,
                    tokenType: token.type,
                    address: token.address,
                    logoURI: token.logoURI,
                  })
                }
              >
                <div className="flex items-center">
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    className="w-6 h-6 mr-3 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{token.name}</p>
                    <p className="text-xs font-plain text-customColor5">
                      {token.symbol}{" "}
                      {token.address.length < 6
                        ? token.address
                        : `${token.address.slice(0, 6)}...${token.address.slice(
                            -4
                          )}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {error ? (
                    <p className="text-sm font-semibold text-red-500">Error</p>
                  ) : (
                    <p className="text-sm font-semibold">
                      {balance ? `${balance} ${token.symbol}` : "Loading..."}
                    </p>
                  )}
                  <p className="text-xs font-plain  text-gray-400">~0 USD</p>
                </div>
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSelector;