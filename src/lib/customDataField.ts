// customDatafeed.ts

interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface LibrarySymbolInfo {
  name: string;
  ticker?: string;
  description?: string;
  type?: string;
  session?: string;
  exchange?: string;
  listed_exchange?: string;
  timezone?: string;
  format?: string;
  pricescale?: number;
  minmov?: number;
  supported_resolutions?: string[];
  volume_precision?: number;
  data_status?: string;
}

interface PeriodParams {
  from: number;
  to: number;
  countBack: number;
  firstDataRequest: boolean;
}

interface DatafeedConfiguration {
  supported_resolutions: string[];
  exchanges?: string[];
  symbols_types?: string[];
}

export default class CustomDatafeed {
  private apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  onReady(callback: (configuration: DatafeedConfiguration) => void): void {
    setTimeout(() =>
      callback({
        supported_resolutions: ["1", "5", "15", "30", "60", "D", "W", "M"],
      })
    );
  }

  async getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: string,
    periodParams: PeriodParams,
    onHistoryCallback: (bars: Bar[], meta: { noData?: boolean }) => void,
    onErrorCallback: (error: string) => void
  ): Promise<void> {
    const { from, to } = periodParams;
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/bars?symbol=${symbolInfo.ticker}&resolution=${resolution}&from=${from}&to=${to}`
      );
      const data: Bar[] = await response.json();

      if (data.length === 0) {
        onHistoryCallback([], { noData: true });
      } else {
        const bars = data.map((bar) => ({
          time: bar.time * 1000, // Convert to milliseconds
          open: bar.open,
          high: bar.high,
          low: bar.low,
          close: bar.close,
          volume: bar.volume,
        }));
        onHistoryCallback(bars, { noData: false });
      }
    } catch (error) {
      onErrorCallback(error instanceof Error ? error.message : String(error));
    }
  }

  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: string,
    onRealtimeCallback: (bar: Bar) => void,
    subscriberUID: string,
    onResetCacheNeededCallback: () => void
  ): void {
    // Implement real-time updates here if your backend supports it
  }

  unsubscribeBars(subscriberUID: string): void {
    // Implement unsubscribe logic here if needed
  }

  // You may need to implement other methods required by TradingView's JS API
  // such as searchSymbols, resolveSymbol, etc. Here are their signatures:

  searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (result: LibrarySymbolInfo[]) => void
  ): void {
    // Implement symbol search functionality
  }

  resolveSymbol(
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: LibrarySymbolInfo) => void,
    onResolveErrorCallback: (reason: string) => void
  ): void {
    // Implement symbol resolution
  }
}
