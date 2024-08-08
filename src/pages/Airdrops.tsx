import React from "react";
import Image from "next/image";
import NoData from "../../public/nodata.png";

const Airdrops = () => {
  return (
    <div className=" flex flex-col items-center justify-center pt-20">
      <div className=" font-extrabold lg:text-4xl text-2xl ">
        Cooking Right Now
      </div>
      <Image src={NoData} alt="" height={300} width={300} />
    </div>
  );
};

export default Airdrops;
