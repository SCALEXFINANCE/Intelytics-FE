import { ArrowDown, TrendingDownIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const data = [
  {
    id: 1,
    pair: "DOJO/INJ",
    price: 8221.09,
    change: 3.04,
    image: "https://github.com/code-bajju/Project-Image/blob/main/btc.png?raw=true",
  },
  {
    id: 2,
    pair: "HELIX/DOJO",
    price: 1021.09,
    change: -2.12,
    image: "https://github.com/code-bajju/Project-Image/blob/main/eth.png?raw=true",
  },
  {
    id: 3,
    pair: "ASTROPORT/HYDRO",
    price: 821.09,
    change: 1.03,
    image: "https://github.com/code-bajju/Project-Image/blob/main/helix.png?raw=true", }
];


const Looser = () => {
  return (
    <div className="border w-full text-sm border-bordercolor p-2 text-white rounded-md">
      <h2 className="flex space-x-2 items-center text-sm font-bold text-red-400 mb-4"><TrendingDownIcon className="h-6 w-6"/><div className="font-bold">TOP LOOSERS</div></h2>
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center py-1 border-gray-700"
          >
            <span className="flex items-center gap-2">
             
              <span className="font-bold">#{item.id}</span>
              <Image
                src={item.image}
                alt={item.pair}
                width={0}
                height={0}
                className="w-6 h-6 rounded-full border border-gray-500"
              />
              <span>{item.pair}</span>
            </span>
            <span className="flex text-right space-x-2">
              <div className="text-textgray">${item.price.toFixed(2)}</div>
              <div
                className={
                  item.change > 0 ? "text-green-400" : "text-red-400"
                }
              >
                {item.change > 0 ? "+" : ""}
                {item.change.toFixed(2)}
              </div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Looser;
