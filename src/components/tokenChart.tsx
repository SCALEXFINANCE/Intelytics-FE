import TradingViewWidget from "@/components/charts/tvcharts";
import { BarChart, BarChart2 } from "lucide-react";

const TokenChart = () => {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 w-full lg:w-full  h-full overflow-hidden">
     {/* Header */}
     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between m-2 gap-3">
          <div className="flex items-center">
            <button 
              // onClick={handleGoBack}
              className="mr-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors flex items-center justify-center group"
              aria-label="Go back"
            >
              <BarChart size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <h2 className="text-2xl font-bold text-white">Chart Info</h2>
          </div>
        </div>

      {/* Chart Area */}
      <div className="lg:h-full h-96 pb-20 w-full">
        <TradingViewWidget />
        {/* Replace with <TradingViewWidget /> in your actual code */}
      </div>
    </div>
  );
};

export default TokenChart;
