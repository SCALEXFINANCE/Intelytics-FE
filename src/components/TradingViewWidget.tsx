import React, { useEffect, useRef } from "react";
import { CustomDatafeed } from "@/lib/trading-view/datafeed";

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewChartProps {
  pairAddress: string;
  chain: string;
}

// Function to generate static test data
async function getStaticTestData(
  symbolInfo: any,
  resolution: string,
  from: number,
  to: number,
  first: boolean
) {
  const bars = [];
  let time = from;
  while (time <= to) {
    bars.push({
      time: time * 1000, // Convert to milliseconds
      open: Math.random() * 100 + 100,
      high: Math.random() * 100 + 150,
      low: Math.random() * 100 + 50,
      close: Math.random() * 100 + 100,
    });

    // Increment time based on resolution
    switch (resolution) {
      case "1":
        time += 60; // 1 minute
        break;
      case "5":
        time += 300; // 5 minutes
        break;
      case "15":
        time += 900; // 15 minutes
        break;
      case "30":
        time += 1800; // 30 minutes
        break;
      case "60":
        time += 3600; // 1 hour
        break;
      case "240":
        time += 14400; // 4 hours
        break;
      case "D":
        time += 86400; // 1 day
        break;
      default:
        time += 3600; // Default to 1 hour
    }
  }
  return bars;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  pairAddress,
  chain,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const symbol = `${chain}:XION/SCLX`;

    const customDatafeed = new CustomDatafeed(
      "ethereum",
      "0x1234567890123456789012345678901234567890",
      "ETH/USDT"
    );

    const script = document.createElement("script");
    script.type = "text/jsx";
    script.src =
      "https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js";
    // script.async = true;
    // script.onload = initChart;
    // document.head.appendChild(script);
    document.head.appendChild(script);

    function initChart() {
      const widget = (window as any).TradingView.widget({
        symbol: symbol,
        interval: "60",
        container_id: containerRef.current?.id,
        library_path: "/charting_library/",
        locale: "en",
        datafeed: {
          ...customDatafeed,
          getBars: (
            symbolInfo: any,
            resolution: string,
            periodParams: {
              from: number;
              to: number;
              firstDataRequest: boolean;
            },
            onHistoryCallback: (bars: any[], option: any) => void,
            onErrorCallback: (error: any) => void
          ) => {
            customDatafeed.getBars(
              symbolInfo,
              resolution,
              periodParams,
              onHistoryCallback,
              onErrorCallback,
              getStaticTestData
            );
          },
          fullscreen: false,
          autosize: true,
          theme: "Dark",
        },
      });

      return () => {
        if (widget && widget.remove) {
          widget.remove();
        }
        document.head.removeChild(script);
      };
    }
  }, [pairAddress, chain]);

  return (
    <div
      id="tradingview_chart"
      ref={containerRef}
      style={{ height: "600px", width: "100%" }}
    />
  );
};

export default TradingViewChart;
