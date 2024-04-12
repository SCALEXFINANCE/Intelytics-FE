"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Token = {
  name: string;
  category: string;
  Price: number;
  Liquidity: number | string;
  "Market Cap": number | string;
  "Circulating Supply": number | string;
  "Total Supply": number | string;
  FDV: number | string;
};

export function TokensTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Token>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className=" flex gap-2 items-center">
          <Image
            alt=""
            src={`/${row.getValue("name")}.jpg`}
            width={30}
            height={30}
            className=" rounded-2xl"
          />
          <Link href={`/Tokens/${row.getValue("name")}`}>
            {" "}
            <div className="capitalize text-white">{row.getValue("name")}</div>
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize text-teal-300 text-right lg:text-justify">
          {row.getValue("category")}
        </div>
      ),
    },
    {
      accessorKey: "Price",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("Price"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        }).format(amount);

        return <div className=" text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "Liquidity",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Liquidity
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("Liquidity"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);

        return <div className=" text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "Market Cap",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Market Cap
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("Market Cap"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);

        if (row.getValue("Market Cap") == "-")
          return <div className=" text-center font-medium">-</div>;

        return <div className=" text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "Circulating Supply",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Circulating Supply
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("Circulating Supply"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          currency: "USD",
        }).format(amount);

        if (row.getValue("Circulating Supply") == "-")
          return <div className=" text-center font-medium">-</div>;

        return <div className=" text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "Total Supply",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Supply
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("Total Supply"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          currency: "USD",
        }).format(amount);

        if (row.getValue("Total Supply") == "-")
          return <div className=" text-center font-medium">-</div>;

        return <div className=" text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "FDV",
      header: ({ column }) => {
        return (
          <Button
            className="bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            FDV
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("FDV"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        if (row.getValue("FDV") == "-")
          return <div className=" text-center font-medium">-</div>;

        return <div className=" text-center font-medium">{formatted}</div>;
      },
    },
  ];

  const [data, setdata] = useState<Token[]>([]);

  // const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ninja
        const response1 = await axios.get(
          "https://coins.llama.fi/prices/current/injective:factory%2Finj1xtel2knkt8hmc9dnzpjz6kdmacgcfmlv5f308w%2Fninja,coingecko:dog-wif-nuchucks?searchWidth=4h"
        );
        const apiUrl2 = await axios.get(
          "https://api.dexscreener.com/latest/dex/tokens/factory-inj1xtel2knkt8hmc9dnzpjz6kdmacgcfmlv5f308w-ninja"
        );
        const liquidityData2 = apiUrl2.data;
        const ninjaLiq = liquidityData2.pairs[0].liquidity.usd;
        const ninjaPrice = liquidityData2.pairs[0].priceUsd;

        // alien
        const response2 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:alien?searchWidth=4h"
        );
        const apiUrl3 = await axios.get(
          "https://api.dexscreener.com/latest/dex/tokens/factory-inj1mly2ykhf6f9tdj58pvndjf4q8dzdl4myjqm9t6-ALIEN"
        );
        const liquidityData3 = apiUrl3.data;
        const alienLiq = liquidityData3.pairs[0].liquidity.usd;
        const alienPrice = liquidityData3.pairs[0].priceUsd;

        // kira
        const response3 = await axios.get(
          "https://coins.llama.fi/prices/current/injective:factory%2Finj1xy3kvlr4q4wdd6lrelsrw2fk2ged0any44hhwq%2FKIRA,coingecko:kira-the-injective-cat?searchWidth=4h"
        );
        const apiUrl4 = await axios.get(
          "https://api.dexscreener.com/latest/dex/tokens/factory-inj1xy3kvlr4q4wdd6lrelsrw2fk2ged0any44hhwq-KIRA"
        );
        const liquidityData4 = apiUrl4.data;
        const kiraLiq = liquidityData4.pairs[0].liquidity.usd;
        const kiraPrice = liquidityData4.pairs[0].priceUsd;

        // dojo
        const response4 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:dojo-token?searchWidth=4h"
        );
        const apiUrl = await axios.get(
          "https://api.dexscreener.com/latest/dex/tokens/inj1zdj9kqnknztl2xclm5ssv25yre09f8908d4923"
        );
        const liquidityData = apiUrl.data;
        const dojoLiq = liquidityData.pairs[0].liquidity.usd;
        const dojoPrice = liquidityData.pairs[0].priceUsd;

        // roll
        const response5 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:dogwifkatana?searchWidth=4h"
        );
        const apiUrl8 = await axios.get(
          "https://api.dexscreener.com/latest/dex/tokens/inj1qv98cmfdaj5f382a0klq7ps4mnjp6calzh20h3"
        );
        const liquidityData8 = apiUrl8.data;
        const rollLiq = liquidityData8.pairs[0].liquidity.usd;
        const rollPrice = liquidityData8.pairs[0].priceUsd;

        // stinj
        const response6 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:stride-staked-injective?searchWidth=4h"
        );
        const apiUrl5 = await axios.get(
          "https://api.dexscreener.com/latest/dex/tokens/ibc-AC87717EA002B0123B10A05063E69BCA274BA2C44D842AEEB41558D2856DCE93"
        );
        const liquidityData5 = apiUrl5.data;
        const sushiLiq = liquidityData5.pairs[0].liquidity.usd;
        const sushiPrice = liquidityData5.pairs[0].priceUsd;

        // zignaly
        const response7 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:zignaly?searchWidth=4h"
        );
        const apiUrl6 = await axios.get(
          "https://api.dexscreener.com/latest/dex/tokens/peggy0xb2617246d0c6c0087f18703d576831899ca94f01"
        );
        const liquidityData6 = apiUrl6.data;
        const kageLiq = liquidityData6.pairs[0].liquidity.usd;
        const kagePrice = liquidityData6.pairs[0].priceUsd;

        // babyDojo

        const apiUrl9 = await axios.get(
          "https://api.dexscreener.com/latest/dex/tokens/inj19dtllzcquads0hu3ykda9m58llupksqwekkfnw"
        );
        const liquidityData9 = apiUrl9.data;
        const babyLiq = liquidityData9.pairs[0].liquidity.usd;
        const babyPrice = liquidityData9.pairs[0].priceUsd;

        // white-whale dinj mib
        const response8 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:white-whale?searchWidth=4h"
        );
        const apiUrl7 = await axios.get(
          "https://api.dexscreener.com/latest/dex/tokens/inj134wfjutywny9qnyux2xgdmm0hfj7mwpl39r3r9"
        );
        const liquidityData7 = apiUrl7.data;
        const mibLiq = liquidityData7.pairs[0].liquidity.usd;
        // console.log(liquidityData7.pairs[0].priceUsd)
        const mibPrice = liquidityData7.pairs[0].priceUsd;


        const response10 = await axios.get("http://50.117.104.207:3000/api/getCurrentPrice?tokenName=XNJ")
        const response11 = await axios.get("http://50.117.104.207:3000/api/getTokenData?tokenName=XNJ")
        const response20 = await axios.get("http://50.117.104.207:3000/api/getCurrentPrice?tokenName=NONJA")
        const response201 = await axios.get("http://50.117.104.207:3000/api/getTokenData?tokenName=NONJA")
        const response21 = await axios.get("http://50.117.104.207:3000/api/getCurrentPrice?tokenName=PING")
        const response211 = await axios.get("http://50.117.104.207:3000/api/getTokenData?tokenName=PING")
        const response22 = await axios.get("http://50.117.104.207:3000/api/getCurrentPrice?tokenName=YKZ")
        const response221 = await axios.get("http://50.117.104.207:3000/api/getTokenData?tokenName=YKZ")
        const response23 = await axios.get("http://50.117.104.207:3000/api/getCurrentPrice?tokenName=hINJ")
        const response231 = await axios.get("http://50.117.104.207:3000/api/getTokenData?tokenName=hINJ")
        const response24 = await axios.get("http://50.117.104.207:3000/api/getCurrentPrice?tokenName=DIB")
        const response241 = await axios.get("http://50.117.104.207:3000/api/getTokenData?tokenName=DIB")
        const response25 = await axios.get("http://50.117.104.207:3000/api/getCurrentPrice?tokenName=DUEL")
        const response251 = await axios.get("http://50.117.104.207:3000/api/getTokenData?tokenName=DUEL")
        const response26 = await axios.get("http://50.117.104.207:3000/api/getCurrentPrice?tokenName=MONKS")
        const response261 = await axios.get("http://50.117.104.207:3000/api/getTokenData?tokenName=MONKS")

        const nonjaPrice = response20.data.price;
        const nonjaLiq = response201.data.liquidity[response211.data.liquidity.length-1]
        const pingPrice = response21.data.price;
        const pingLiq = response211.data.liquidity[response211.data.liquidity.length-1];
        const ykzPrice = response22.data.price;
        const ykzLiq = response221.data.liquidity[response211.data.liquidity.length-1];
        const hingPrice = response23.data.price;
        const hingLiq = response231.data.liquidity[response211.data.liquidity.length-1];
        const dibPrice = response24.data.price;
        const dibLiq = response241.data.liquidity[response211.data.liquidity.length-1];
        const duelPrice = response25.data.price;
        const duelLiq = response251.data.liquidity[response211.data.liquidity.length-1];
        const monksPrice = response26.data.price;
        const monksLiq = response261.data.liquidity[response211.data.liquidity.length-1];
        const xnjPrice = response10.data.price
        const xnjLiq = response11.data.liquidity[response211.data.liquidity.length-1];

        const data: Token[] = [
          {
            name: "Ninja",
            category: "Meme",
            Price: ninjaPrice,
            Liquidity: ninjaLiq,
            "Market Cap": 1000000000 * ninjaPrice,
            "Circulating Supply": 1000000000,
            "Total Supply": 1000000000,
            FDV: 1000000000 * ninjaPrice,
          },
          {
            name: "Kira",
            category: "Meme",
            Price: kiraPrice,
            Liquidity: kiraLiq,
            "Market Cap": 69000000000 * kiraPrice,
            "Circulating Supply": 69000000000,
            "Total Supply": 69000000000,
            FDV: 69000000000 * kiraPrice,
          },
          {
            name: "Alien",
            category: "Utility",
            Price: alienPrice,
            Liquidity: alienLiq,
            "Market Cap": 22000000 * alienPrice,
            "Circulating Supply": 22000000,
            "Total Supply": 30000000,
            FDV: 30000000 * alienPrice,
          },
          {
            name: "Stinj",
            category: "Utility",
            Price: sushiPrice,
            Liquidity: sushiLiq,
            "Market Cap": 24552.75 * sushiPrice,
            "Circulating Supply": 24552.75,
            "Total Supply": "-",
            FDV: "-",
          },
          {
            name: "Dojo",
            category: "Utility ",
            Price: dojoPrice,
            Liquidity: dojoLiq,
            "Market Cap": 200000000 * dojoPrice,
            "Circulating Supply": 200000000,
            "Total Supply": 80000000,
            FDV: 80000000 * dojoPrice,
          },
          {
            name: "Dinj",
            category: "Utility ",
            Price: mibPrice,
            Liquidity: mibLiq,
            "Market Cap": 51600000 * mibPrice,
            "Circulating Supply": 51600000,
            "Total Supply": 100000000,
            FDV: 100000000 * mibPrice,
          },
          {
            name: "Zignaly",
            category: "Utility",
            Price: kagePrice,
            Liquidity: kageLiq,
            "Market Cap": 51600000 * kagePrice,
            "Circulating Supply": 51600000,
            "Total Supply": 100000000,
            FDV: 100000000 * kagePrice,
          },
          {
            name: "Roll",
            category: "Gaming ",
            Price: rollPrice,
            Liquidity: rollLiq,
            "Market Cap": 51600000 * rollPrice,
            "Circulating Supply": 51600000,
            "Total Supply": 100000000,
            FDV: 100000000 * rollPrice,
          },
          {
            name: "BabyDOJO",
            category: "CW-20 ",
            Price: babyPrice,
            Liquidity: babyLiq,
            "Market Cap": 4198646072.1 * babyPrice,
            "Circulating Supply": 4198646072.1,
            "Total Supply": 4198646072.1,
            FDV: 4198646072.1 * babyPrice,
          },
          {
            name: "XNJ",
            category: "Gaming",
            "Total Supply": "-",
            "Circulating Supply": "-",
            Price: xnjPrice,
            "Market Cap": "-",
            Liquidity: xnjLiq,
            FDV: "-",
          },
          {
            name: "Sushi",
            category: "CW404",
            "Total Supply": 15000,
            "Circulating Supply": 15000,
            Price: sushiPrice,
            "Market Cap": 15000 * sushiPrice,
            Liquidity: sushiLiq,
            FDV: 15000 * sushiPrice,
          },
          {
            name: "Nonja",
            category: "Meme",
            "Total Supply": 1000000000,
            "Circulating Supply": 1000000000,
            Price: nonjaPrice,
            "Market Cap": 1000000000 * nonjaPrice,
            Liquidity: nonjaLiq,
            FDV: 1000000000 * nonjaPrice,
          },
          {
            name: "Kage",
            category: "Utility",
            "Total Supply": 100000000,
            "Circulating Supply": 26875564,
            Price: kagePrice,
            "Market Cap": 26875564 * kagePrice,
            Liquidity: kageLiq,
            FDV: 100000000 * kagePrice,
          },
          {
            name: "Ping",
            category: "Meme",
            "Total Supply": 1000000000,
            "Circulating Supply": 800000000,
            Price: pingPrice,
            "Market Cap": pingPrice,
            Liquidity: pingLiq * 800000000,
            FDV: pingPrice * 1000000000,
          },
          {
            name: "Ykz",
            category: "CW404",
            "Total Supply": 10000,
            "Circulating Supply": 9000,
            Price: ykzPrice,
            "Market Cap": ykzPrice * 9000,
            Liquidity: ykzLiq,
            FDV: ykzPrice * 10000,
          },
          {
            name: "hINJ",
            category: "CW20",
            "Total Supply": 1820230.18,
            "Circulating Supply": "-",
            Price: hingPrice,
            "Market Cap": "-",
            Liquidity: hingLiq,
            FDV: hingPrice * 1820230.18,
          },
          {
            name: "Dib",
            category: "Meme",
            "Total Supply": 69000000000,
            "Circulating Supply": 69000000000,
            Price: dibPrice,
            "Market Cap": dibPrice * 69000000000,
            Liquidity: dibLiq,
            FDV: dibPrice * 69000000000,
          },
          {
            name: "Duel",
            category: "Utility",
            "Total Supply": 10000000000,
            "Circulating Supply": 1454408582,
            Price: duelPrice,
            "Market Cap": duelPrice * 1454408582,
            Liquidity: duelLiq,
            FDV: duelPrice * 10000000000,
          },
          {
            name: "Monks",
            category: "Meme",
            "Total Supply": 1000000000,
            "Circulating Supply": "-",
            Price: monksPrice,
            "Market Cap": "-",
            Liquidity: monksLiq,
            FDV: monksPrice * 1000000000,
          },
        ];
        setdata(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
      // setRefetch(!refetch);
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full pb-8">
      <div className="flex items-center py-4">
        <div className="bg-black lg:p-3  px-5 rounded-xl flex gap-4 w-full justify-between">
          <div className="flex items-center gap-4">
            {/* <Image src="./protocolranking.svg" alt="" height={30} width={30} /> */}
            <div className=" font-semibold ">Tokens </div>
          </div>

          <div className=" flex gap-4 p-2">
            {/* column dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="ml-auto">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    // console.log(column.)
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value: any) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tvl dropdown */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="ml-auto ">
                  TVL Range <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  key={1}
                  className="capitalize"
                  // checked={setState}
                  // onCheckedChange={(value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  1 Hr
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  key={2}
                  className="capitalize"
                  // checked={setState}
                  // onCheckedChange={(value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  24 Hrs
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  key={3}
                  className="capitalize"
                  // checked={setState}
                  // onCheckedChange={(value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  7 D
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-black"
        /> */}
      </div>
      <div className="rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className=" text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
