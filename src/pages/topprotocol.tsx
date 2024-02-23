import React from "react";
import Image from "next/image";
import { TopProtocolTable } from "@/components/TopProtocolTable";

const topprotocol = () => {
  return (
    <div className=" flex gap-4 flex-col">
      {/* <div>DEFI-topprotocol</div> */}

      {/* Search bar demo */}
      <div className=" bg-black p-5 border-2 border-gray-800 rounded-xl flex gap-4">
        <Image src="/search.svg" alt="" height={30} width={30} />
        <div className=" text-gray-400 "> Search your Token here...</div>
      </div>

      <div>
        <TopProtocolTable />
      </div>
    </div>
  );
};

export default topprotocol;
