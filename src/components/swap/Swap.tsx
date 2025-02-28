import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Repeat } from "lucide-react";

const Swap = () => {
  const [slippage, setSlippage] = useState(0.5);

  return (
    <div  style={{textShadow:"red 2px 2px 20px;"}}className="h-full bg-bluebackground text-white p-2 border rounded-xl w-full mx-auto">
      <h2 className="text-xl">INTELYTICS SWAP</h2>
      
      <div className="bg-black text-gray-300 p-2 rounded-lg flex items-center justify-between">
        <span>SLIPPAGE</span>
        <div className="flex gap-2">
          {[0.1, 0.5, 1.0, 0.5].map((value, index) => (
            <Button
              key={index}
              className={`px-3 py-1 rounded-md ${slippage === value ? "bg-gray-700" : "bg-gray-900"}`}
              onClick={() => setSlippage(value)}
            >
              {value}%
            </Button>
          ))}
        </div>
      </div>

      <Card className="bg-[#0f142f] text-white mt-4">
        <CardContent className="p-4">
          <div className="text-xs text-gray-400">FROM</div>
          <div className="flex justify-between items-center">
            <Button className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-md">
              <span className="text-yellow-500">⚡</span> BTC <ChevronDown size={16} />
            </Button>
            <div className="text-lg">412.2120</div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center my-2">
        <Repeat className="text-gray-400" size={20} />
      </div>

      <Card className="bg-[#0f142f] text-white">
        <CardContent className="p-4">
          <div className="text-xs text-gray-400">TO</div>
          <div className="flex justify-between items-center">
            <Button className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-md">
              <span className="text-yellow-500">⚡</span> BTC <ChevronDown size={16} />
            </Button>
            <div className="text-lg">412.2120</div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full mt-4 bg-black py-2 rounded-md text-lg">CONNECT WALLET</Button>
    </div>
  );
};

export default Swap;
