"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import exp from "constants";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface Coin {
  name: string;
  category: string;
  tvl: number;
  onedaychange: number;
  sevendaychange: number;
  onemonthchange: number;
  volume: number;
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function OverviewTable() {
  const columns: ColumnDef<Coin>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "tvl",
      header: "TVL",
    },
    {
      accessorKey: "onedaychange",
      header: "1d Change",
    },
    {
      accessorKey: "sevendaychange",
      header: "7d Change",
    },
    {
      accessorKey: "onemonthchange",
      header: "1m Change",
    },
    {
      accessorKey: "volume",
      header: "Volume",
    },
  ];
  const data: Coin[] = [
    {
      name: "Dojo Swaps",
      category: "Dexes",
      tvl: 23.4,
      onedaychange: 23.4,
      sevendaychange: 23.4,
      onemonthchange: 23.1,
      volume: 23.1,
    },
    {
      name: "Astroports",
      category: "Dexes",
      tvl: 23.4,
      onedaychange: 23.4,
      sevendaychange: 23.4,
      onemonthchange: 23.1,
      volume: 23.1,
    },
    // ...
  ];

  const [tData, setTdata] = useState<Coin[]>([]);

  //   const getData = async () => {
  //     try{

  //     }catch{

  //     }
  //   };

  console.log(data);

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
