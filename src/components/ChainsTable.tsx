"use client";

import * as React from "react";
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

const data: Coin[] = [
  {
    name: "Dojo Swap",
    protocol: 124,
    address: 0,
    tvl: 23.4,
    "1 Hour Change": 23.4,
    "24 Hours Change": 66.4,
    "7 Days Change": 29.1,
    stakes: 0,
    volume: 25.2,
  },
  {
    name: "Astroport",
    protocol: 76,
    address: 0,
    tvl: 21.4,
    "1 Hour Change": 23.4,
    "24 Hours Change": 77.4,
    "7 Days Change": 30.1,
    stakes: 0,
    volume: 22.1,
  },
  {
    name: "Helix",
    protocol: 981,
    address: 0,
    tvl: 21.4,
    "1 Hour Change": 23.4,
    "24 Hours Change": 77.4,
    "7 Days Change": 30.1,
    stakes: 0,
    volume: 22.1,
  },
  {
    name: "Hydro",
    protocol: 23,
    address: 0,
    tvl: 21.4,
    "1 Hour Change": 23.4,
    "24 Hours Change": 77.4,
    "7 Days Change": 30.1,
    stakes: 0,
    volume: 22.1,
  },
  // ...
];

export type Coin = {
  name: string;
  protocol: number;
  address: number;
  tvl: number;
  "1 Hour Change": number;
  "24 Hours Change": number;
  "7 Days Change": number;
  stakes: number;
  volume: number;
};

export const columns: ColumnDef<Coin>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
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
          className=" rounded"
        />

        <div className="capitalize text-teal-500">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "protocol",
    header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Protocol
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      return (
        <div className=" text-center text-teal-500 font-medium">
          {row.getValue("protocol")}
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      return (
        <div className=" text-center font-medium">
          {row.getValue("address")}
        </div>
      );
    },
  },
  {
    accessorKey: "tvl",
    header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TVL
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("tvl"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className=" text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "1 Hour Change",
    header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          1 Hour Change
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("1 Hour Change"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className=" text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "24 Hours Change",
    header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          24 Hours Change
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("24 Hours Change"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className=" text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "7 Days Change",
    header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          7 Days Change
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("7 Days Change"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className=" text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stakes",
    header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stakes
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      return (
        <div className=" text-center font-medium">{row.getValue("stakes")}</div>
      );
    },
  },
  {
    accessorKey: "volume",
    header: ({ column }) => {
      return (
        <Button
          className="bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Volume
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("volume"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

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

export function ChainsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
            <Image src="./protocolranking.svg" alt="" height={30} width={30} />
            <div className=" font-semibold ">Protocol Ranking</div>
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
            <DropdownMenu>
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
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
    </div>
  );
}
