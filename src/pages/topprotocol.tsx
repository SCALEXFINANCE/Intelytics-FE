import React from "react";
import Image from "next/image";
import { TopProtocolTable } from "@/components/TopProtocolTable";
import SearchBar from "@/components/Searchbar";

const topprotocol = () => {
  return (
    <div className=" flex gap-4 flex-col">
      {/* <div>DEFI-topprotocol</div> */}

      <SearchBar />

      <div>
        <TopProtocolTable />
      </div>
    </div>
  );
};

export default topprotocol;
