import TradingViewWidget from "@/components/charts/tvcharts";
import { BarChart2 } from "lucide-react";

const TokenChart = () => {
  return (
    <div className="flex flex-col bg-bluebackground rounded-xl lg:w-[70%] border border-gray-500">
      <div className="lg:px-3 lg:text-2xl p-2 lg:flex hidden text-gray-500 font-plain text-nowrap">
        <BarChart2 /> Token Chart
        <div className="flex justify-end w-full items-center lg:text-lg text-xxs text-nowrap space-x-4">
          <div>
            <div>On Average Price</div>
            <div className="text-bordercolor text-center">0.056</div>
          </div>
          <div>
            <div>Highest Price</div>
            <div className="text-bordercolor text-center">0.056</div>
          </div>
          <div>
            <div>Lowest Price</div>
            <div className="text-bordercolor text-center">0.056</div>
          </div>
        </div>
      </div>

      <div className="h-96 w-full">
        <TradingViewWidget />
      </div>
    </div>
  );
};

export default TokenChart;
