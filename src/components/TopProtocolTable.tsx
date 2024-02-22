// "use client";

// import * as React from "react";
// import Image from "next/image";
// import {
//   CaretSortIcon,
//   ChevronDownIcon,
//   DotsHorizontalIcon,
// } from "@radix-ui/react-icons";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const data: CoinTP[] = [
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

// export type CoinTP = {
//   name: string;
//   "Liquid Staking": string;
//   Lending: string;
//   "1 Hour Change": number;
//   "24 Hours Change": number;
//   "7 Days Change": number;
//   volume: number;
// };

// export const columns: ColumnDef<CoinTP>[] = [
//   //   {
//   //     id: "select",
//   //     header: ({ table }) => (
//   //       <Checkbox
//   //         checked={
//   //           table.getIsAllPageRowsSelected() ||
//   //           (table.getIsSomePageRowsSelected() && "indeterminate")
//   //         }
//   //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//   //         aria-label="Select all"
//   //       />
//   //     ),
//   //     cell: ({ row }) => (
//   //       <Checkbox
//   //         checked={row.getIsSelected()}
//   //         onCheckedChange={(value) => row.toggleSelected(!!value)}
//   //         aria-label="Select row"
//   //       />
//   //     ),
//   //     enableSorting: false,
//   //     enableHiding: false,
//   //   },
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: ({ row }) => (
//       <div className=" flex gap-2 items-center">
//         <Image
//           alt=""
//           src={`/${row.getValue("name")}.jpg`}
//           width={30}
//           height={30}
//           className=" rounded"
//         />

//         <div className="capitalize text-teal-500">{row.getValue("name")}</div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "category",
//     header: "Category",
//     cell: ({ row }) => (
//       <div className="capitalize text-teal-500">{row.getValue("category")}</div>
//     ),
//   },
//   {
//     accessorKey: "tvl",
//     header: ({ column }) => {
//       return (
//         <Button
//           className="bg-transparent"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           TVL
//           <CaretSortIcon className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },

//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("tvl"));

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);

//       return <div className=" text-center font-medium">{formatted}</div>;
//     },
//   },
//   {
//     accessorKey: "1 Hour Change",
//     header: ({ column }) => {
//       return (
//         <Button
//           className="bg-transparent"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           1 Hour Change
//           <CaretSortIcon className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("1 Hour Change"));

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);

//       return <div className=" text-center font-medium">{formatted}</div>;
//     },
//   },
//   {
//     accessorKey: "24 Hours Change",
//     header: ({ column }) => {
//       return (
//         <Button
//           className="bg-transparent"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           24 Hours Change
//           <CaretSortIcon className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("24 Hours Change"));

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);

//       return <div className=" text-center font-medium">{formatted}</div>;
//     },
//   },
//   {
//     accessorKey: "7 Days Change",
//     header: ({ column }) => {
//       return (
//         <Button
//           className="bg-transparent"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           7 Days Change
//           <CaretSortIcon className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("7 Days Change"));

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);

//       return <div className=" text-center font-medium">{formatted}</div>;
//     },
//   },
//   {
//     accessorKey: "volume",
//     header: ({ column }) => {
//       return (
//         <Button
//           className="bg-transparent"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Volume
//           <CaretSortIcon className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("volume"));

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);

//       return <div className=" text-center font-medium">{formatted}</div>;
//     },
//   },
//   //   {
//   //     id: "actions",
//   //     enableHiding: false,
//   //     cell: ({ row }) => {
//   //       const payment = row.original;

//   //       return (
//   //         <DropdownMenu>
//   //           <DropdownMenuTrigger asChild>
//   //             <Button variant="ghost" className="h-8 w-8 p-0">
//   //               <span className="sr-only">Open menu</span>
//   //               <DotsHorizontalIcon className="h-4 w-4" />
//   //             </Button>
//   //           </DropdownMenuTrigger>
//   //           <DropdownMenuContent align="end">
//   //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//   //             <DropdownMenuItem
//   //               onClick={() => navigator.clipboard.writeText(payment.id)}
//   //             >
//   //               Copy payment ID
//   //             </DropdownMenuItem>
//   //             <DropdownMenuSeparator />
//   //             <DropdownMenuItem>View customer</DropdownMenuItem>
//   //             <DropdownMenuItem>View payment details</DropdownMenuItem>
//   //           </DropdownMenuContent>
//   //         </DropdownMenu>
//   //       );
//   //     },
//   //   },
// ];

// export function TopProtocolTable() {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <div className="w-full pb-8">
//       <div className="flex items-center py-4"></div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {/* <div className="flex items-center justify-end space-x-2 py-4">
//         <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div> */}
//     </div>
//   );
// }
