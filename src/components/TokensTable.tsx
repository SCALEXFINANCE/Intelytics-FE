"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export type Token = {
  name: string;
  price: number;
  liquidity: number;
  marketCap: number;
};

export function TokensTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = useState<Token[]>([]);

  const tokenAddresses = [
    "inj1xtel2knkt8hmc9dnzpjz6kdmacgcfmlv5f308w", // NINJA
    "inj1mly2ykhf6f9tdj58pvndjf4q8dzdl4myjqm9t6", // ALIEN
    "inj1xyz...", // KIRA (Replace with actual address)
    "inj1abc...", // DOJO (Replace with actual address)
    // Add more token addresses as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = tokenAddresses.map((address) =>
          axios.get(`https://api.dexscreener.com/latest/dex/tokens/${address}`)
        );

        const responses = await Promise.all(promises);
        const tokensData = responses.map((response, index) => {
          const pair = response.data.pairs[0]; // Taking first pair data
          return {
            name: tokenAddresses[index], // Replace with actual token name if available
            price: parseFloat(pair.priceUsd),
            liquidity: parseFloat(pair.liquidity?.usd || "0"),
            marketCap: parseFloat(pair.fdv || "0"),
          };
        });

        setData(tokensData);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, []);

  const columns: ColumnDef<Token>[] = [
    {
      accessorKey: "name",
      header: "Token",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Image
            alt={row.getValue("name")}
            src={`/${row.getValue("name")}.jpg`}
            width={30}
            height={30}
            className="rounded-2xl"
          />
          <Link href={`/Tokens/${row.getValue("name")}`}>
            <div className="capitalize text-white">{row.getValue("name")}</div>
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="text-center font-medium">
          ${row.getValue("price").toFixed(7)}
        </div>
      ),
    },
    {
      accessorKey: "liquidity",
      header: "Liquidity",
      cell: ({ row }) => (
        <div className="text-center font-medium">
          ${row.getValue("liquidity").toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "marketCap",
      header: "Market Cap",
      cell: ({ row }) => (
        <div className="text-center font-medium">
          ${row.getValue("marketCap").toLocaleString()}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="w-full pb-8">
      <div className="flex items-center py-4">
        <div className="border border-bordercolor bg-bluebackground lg:px-2 px-4 rounded-xl flex gap-4 w-full justify-between">
          <div className="flex p-2">
            <div className="flex space-x-2 items-center font-bold text-white">
              <div className="font-bold">TOKENS</div>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessorKey} className="text-left p-2">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((token, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{token.name}</td>
              <td className="p-2">${token.price.toFixed(7)}</td>
              <td className="p-2">${token.liquidity.toLocaleString()}</td>
              <td className="p-2">${token.marketCap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
