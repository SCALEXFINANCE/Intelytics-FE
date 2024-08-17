import React from "react";
import TradingViewChart from "@/components/TradingViewWidget";

const TradingView = () => {
  return (
    <div>
      <h1>Test</h1>
      <TradingViewChart
        pairAddress="xion14d4524fa445904988233a34249kq3434"
        chain="xion"
      />
    </div>
  );
};

export default TradingView;
