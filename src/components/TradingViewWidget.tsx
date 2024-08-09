import React, { useEffect, useRef, useState } from "react";
import CustomDatafeed from "@/lib/customDataField";

interface TradingViewWidgetProps {
  symbol: string;
  apiBaseUrl: string;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol,
  apiBaseUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widget, setWidget] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    const initializeWidget = () => {
      if (typeof window.TradingView === "undefined") return;

      const widgetOptions = {
        symbol: symbol,
        interval: "1" as const,
        container_id: containerRef.current?.id,
        datafeed: new CustomDatafeed(apiBaseUrl),
        library_path: "/charting_library/",
        locale: "en",
        enabled_features: [
          "move_logo_to_main_pane",
          "use_localstorage_for_settings",
          "study_templates",
          "keep_left_toolbar_visible_on_small_screens",
        ],
        disabled_features: [
          "header_symbol_search",
          "header_compare",
          "header_undo_redo",
        ],
        charts_storage_url: "https://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        fullscreen: false,
        autosize: true,
        studies_overrides: {},
        drawings_access: {
          type: "black" as const,
          tools: [{ name: "Trend Line" }, { name: "Fibonacci Retracement" }],
        },
      };

      const tvWidget = new window.TradingView.widget(widgetOptions);
      setWidget(tvWidget);
    };

    script.onload = initializeWidget;
    script.onerror = () => console.error("Failed to load TradingView script");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (widget) {
        widget.remove();
      }
    };
  }, [symbol, apiBaseUrl]);

  return (
    <div
      id="tradingview-chart"
      ref={containerRef}
      style={{ height: "600px" }}
    />
  );
};

export default TradingViewWidget;
