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

  // const data: Coin[] = [
  //   {
  //     name: "Dojo Swap",
  //     category: "Dex",
  //     tvl: 23.4,
  //     "1 Hour Change": 23.4,
  //     "24 Hours Change": 66.4,
  //     "7 Days Change": 29.1,
  //     volume: 25.2,
  //   },
  //   {
  //     name: "Astroport",
  //     category: "Dex",
  //     tvl: 21.4,
  //     "1 Hour Change": 23.4,
  //     "24 Hours Change": 77.4,
  //     "7 Days Change": 30.1,
  //     volume: 22.1,
  //   },
  //   {
  //     name: "Helix",
  //     category: "Deriviative",
  //     tvl: 21.4,
  //     "1 Hour Change": 23.4,
  //     "24 Hours Change": 77.4,
  //     "7 Days Change": 30.1,
  //     volume: 22.1,
  //   },
  //   {
  //     name: "Hydro",
  //     category: "Liquid Stacking",
  //     tvl: 21.4,
  //     "1 Hour Change": 23.4,
  //     "24 Hours Change": 77.4,
  //     "7 Days Change": 30.1,
  //     volume: 22.1,
  //   },
  //   // ...
  // ];

  const columns: ColumnDef<Token>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className=" flex gap-2 items-center">
          {/* <Image
            alt=""
            src={`/${row.getValue("name")}.jpg`}
            width={30}
            height={30}
            className=" rounded"
          /> */}
          {/* <Link href={`/${row.getValue("name")}`}> */}{" "}
          <div className="capitalize text-white">{row.getValue("name")}</div>
          {/* </Link> */}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize text-teal-300">
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
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);

        return <div className=" text-center font-medium">{amount}</div>;
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
          style: "currency",
          currency: "USD",
        }).format(amount);

        if (row.getValue("Total Supply") == "-")
          return <div className=" text-center font-medium">-</div>;

        return <div className=" text-center font-medium">{amount}</div>;
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
    //   {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //       const payment = row.original;

    //       return (
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button variant="ghost" className="h-8 w-8 p-0">
    //               <span className="sr-only">Open menu</span>
    //               <DotsHorizontalIcon className="h-4 w-4" />
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end">
    //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //             <DropdownMenuItem
    //               onClick={() => navigator.clipboard.writeText(payment.id)}
    //             >
    //               Copy payment ID
    //             </DropdownMenuItem>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem>View customer</DropdownMenuItem>
    //             <DropdownMenuItem>View payment details</DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       );
    //     },
    //   },
  ];

  const [data, setdata] = useState<Token[]>([]);

  // const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "https://coins.llama.fi/prices/current/injective:factory%2Finj1xtel2knkt8hmc9dnzpjz6kdmacgcfmlv5f308w%2Fninja,coingecko:dog-wif-nuchucks?searchWidth=4h"
        );
        const ninjaPrice =
          response1.data.coins["coingecko:dog-wif-nuchucks"].price;

        const response2 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:alien?searchWidth=4h"
        );
        const alienPrice = response2.data.coins["coingecko:alien"].price;

        const response3 = await axios.get(
          "https://coins.llama.fi/prices/current/injective:factory%2Finj1xy3kvlr4q4wdd6lrelsrw2fk2ged0any44hhwq%2FKIRA,coingecko:kira-the-injective-cat?searchWidth=4h"
        );
        const kiraPrice =
          response3.data.coins["coingecko:kira-the-injective-cat"].price;

        const response4 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:dojo-token?searchWidth=4h"
        );
        const dojoPrice = response4.data.coins["coingecko:dojo-token"].price;

        const response5 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:dogwifkatana?searchWidth=4h"
        );
        const rollPrice = response5.data.coins["coingecko:dogwifkatana"].price;

        const response6 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:stride-staked-injective?searchWidth=4h"
        );
        const sushiPrice =
          response6.data.coins["coingecko:stride-staked-injective"].price;

        const response7 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:zignaly?searchWidth=4h"
        );
        const kagePrice = response7.data.coins["coingecko:zignaly"].price;

        const response8 = await axios.get(
          "https://coins.llama.fi/prices/current/coingecko:white-whale?searchWidth=4h"
        );
        const mibPrice = response8.data.coins["coingecko:white-whale"].price;

        const ninjaLiq = 1;
        // const sushiPrice = 2;
        const sushiLiq = 1;
        const alienLiq = 1;

        const kiraLiq = 5;

        const dojoLiq = 1;
        // const mibPrice = 2;
        const mibLiq = 7;
        // const kagePrice = 4;
        const kageLiq = 1;
        // const rollPrice = 2;
        const rollLiq = 2;

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
            category: "CW404",
            Price: sushiPrice,
            Liquidity: sushiLiq,
            "Market Cap": 15000 * sushiPrice,
            "Circulating Supply": 15000,
            "Total Supply": 15000,
            FDV: 15000 * sushiPrice,
          },
          {
            name: "Dojo",
            category: "Utility ",
            Price: dojoPrice,
            Liquidity: dojoLiq,
            "Market Cap": 800000000 * dojoPrice,
            "Circulating Supply": 800000000,
            "Total Supply": 20000000,
            FDV: 20000000 * dojoPrice,
          },
          {
            name: "White-Whale",
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
            category: "Bot ",
            Price: kagePrice,
            Liquidity: kageLiq,
            "Market Cap": 51600000 * kagePrice,
            "Circulating Supply": 51600000,
            "Total Supply": 100000000,
            FDV: 100000000 * kagePrice,
          },
          {
            name: "Katana",
            category: "Gaming ",
            Price: rollPrice,
            Liquidity: rollLiq,
            "Market Cap": 51600000 * rollPrice,
            "Circulating Supply": 51600000,
            "Total Supply": 100000000,
            FDV: 100000000 * rollPrice,
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
    getPaginationRowModel: getPaginationRowModel(),
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
        <div className="bg-black p-3 px-5 rounded-xl flex gap-4 w-full justify-between">
          <div className="flex items-center gap-4">
            {/* <Image src="./protocolranking.svg" alt="" height={30} width={30} /> */}
            <div className=" font-semibold ">Tokens </div>
          </div>

          <div className=" flex gap-4">
            {/* column dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="ml-auto ">
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
                        onCheckedChange={(value) =>
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
