import React, { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, Search, ExternalLink, Info, ChevronDown, ChevronRight, AlertCircle } from "lucide-react";

const SecurityScanner = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [chainId, setChainId] = useState("1");
  const [loading, setLoading] = useState(false);
  interface SecurityResult {
    code: number;
    message: string;
    result: {
      [key: string]: {
        anti_whale_modifiable: string;
        buy_tax: string;
        can_take_back_ownership: string;
        cannot_buy: string;
        cannot_sell_all: string;
        creator_address: string;
        creator_balance: string;
        creator_percent: string;
        dex: {
          liquidity_type: string;
          name: string;
          liquidity: string;
          pair: string;
        }[];
        external_call: string;
        hidden_owner: string;
        holder_count: string;
        is_anti_whale: string;
        is_blacklisted: string;
        is_honeypot: string;
        is_in_dex: string;
        is_mintable: string;
        is_open_source: string;
        is_proxy: string;
        is_whitelisted: string;
        owner_address: string;
        owner_balance: string;
        owner_change_balance: string;
        owner_percent: string;
        personal_slippage_modifiable: string;
        selfdestruct: string;
        sell_tax: string;
        slippage_modifiable: string;
        token_name: string;
        token_symbol: string;
        total_supply: string;
        trading_cooldown: string;
        transfer_pausable: string;
        transfer_tax: string;
      };
    };
  }
  
  const [result, setResult] = useState<SecurityResult | null>(null);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const blockchains = [
    { id: "1", name: "Ethereum" },
    { id: "56", name: "BSC" },
    { id: "42161", name: "Arbitrum" },
    { id: "137", name: "Polygon" },
    { id: "324", name: "zkSync Era" },
    { id: "59144", name: "Linea Mainnet" },
    { id: "8453", name: "Base" },
    { id: "534352", name: "Scroll" },
    { id: "10", name: "Optimism" },
    { id: "43114", name: "Avalanche" },
    { id: "250", name: "Fantom" },
    { id: "25", name: "Cronos" },
    { id: "66", name: "OKC" },
    { id: "128", name: "HECO" },
    { id: "100", name: "Gnosis" },
    { id: "10001", name: "ETHW" },
    { id: "tron", name: "Tron" },
    { id: "321", name: "KCC" },
    { id: "201022", name: "FON" },
    { id: "5000", name: "Mantle" },
    { id: "204", name: "opBNB" },
    { id: "42766", name: "ZKFair" },
    { id: "81457", name: "Blast" },
    { id: "169", name: "Manta Pacific" },
    { id: "80094", name: "Berachain" },
    { id: "2741", name: "Abstract" },
    { id: "177", name: "Hashkey Chain" },
    { id: "146", name: "Sonic" },
    { id: "1514", name: "Story" },
  ];

  const handleCheckSecurity = async () => {
    if (!contractAddress.trim()) {
      setError("Please enter a contract address");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const url = `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${contractAddress}`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError((err as Error).message || "Failed to check security");
    } finally {
      setLoading(false);
    }
  };


  // Calculate security score based on API response
  const calculateSecurityScore = () => {
    if (!result || !result.result) return { score: 0, category: "Unknown" };

    const token = result.result[Object.keys(result.result)[0]];
    let score = 100;
    let risks = [];

    // Check for common security issues
    if (token.is_honeypot === "1") {
      score -= 50;
      risks.push({ name: "Honeypot", severity: "critical" });
    }
    if (token.can_take_back_ownership === "1") {
      score -= 40;
      risks.push({ name: "Ownership can be taken back", severity: "critical" });
    }
    if (token.hidden_owner === "1") {
      score -= 30;
      risks.push({ name: "Hidden owner", severity: "high" });
    }
    if (token.selfdestruct === "1") {
      score -= 30;
      risks.push({ name: "Self-destruct function", severity: "high" });
    }
    if (token.is_proxy === "1" && token.is_open_source === "0") {
      score -= 25;
      risks.push({ name: "Proxy contract without open source", severity: "high" });
    }
    if (token.is_blacklisted === "1") {
      score -= 20;
      risks.push({ name: "Blacklist function", severity: "medium" });
    }
    if (token.buy_tax !== "0") {
      const taxValue = parseInt(token.buy_tax);
      if (taxValue > 10) {
        score -= 20;
        risks.push({ name: `High buy tax (${taxValue}%)`, severity: "medium" });
      } else if (taxValue > 0) {
        score -= 10;
        risks.push({ name: `Buy tax (${taxValue}%)`, severity: "low" });
      }
    }
    if (token.sell_tax !== "0") {
      const taxValue = parseInt(token.sell_tax);
      if (taxValue > 10) {
        score -= 20;
        risks.push({ name: `High sell tax (${taxValue}%)`, severity: "medium" });
      } else if (taxValue > 0) {
        score -= 10;
        risks.push({ name: `Sell tax (${taxValue}%)`, severity: "low" });
      }
    }
    if (token.cannot_sell_all === "1") {
      score -= 20;
      risks.push({ name: "Cannot sell all tokens", severity: "medium" });
    }
    if (token.cannot_buy === "1") {
      score -= 20;
      risks.push({ name: "Cannot buy tokens", severity: "medium" });
    }
    if (token.external_call === "1") {
      score -= 15;
      risks.push({ name: "External calls", severity: "medium" });
    }
    if (token.slippage_modifiable === "1") {
      score -= 10;
      risks.push({ name: "Modifiable slippage", severity: "low" });
    }
    if (token.transfer_pausable === "1") {
      score -= 10;
      risks.push({ name: "Transfers can be paused", severity: "low" });
    }

    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score));
    
    // Determine category based on score
    let category = "Critical";
    if (score > 80) {
      category = "Safe";
    } else if (score > 60) {
      category = "Medium Risk";
    } else if (score > 40) {
      category = "High Risk";
    }

    return { score, category, risks };
  };

  const securityInfo = result ? calculateSecurityScore() : null;

  // Function to get color classes based on score
  const getScoreColorClass = (score: number): string => {
    if (score > 80) return "text-green-400";
    if (score > 60) return "text-yellow-400";
    if (score > 40) return "text-orange-400";
    return "text-red-500";
  };

  interface ScoreBgClass {
    (score: number): string;
  }

  const getScoreBgClass: ScoreBgClass = (score) => {
    if (score > 80) return "bg-green-400";
    if (score > 60) return "bg-yellow-400";
    if (score > 40) return "bg-orange-400";
    return "bg-red-500";
  };

  interface SeverityColorMap {
    [key: string]: string;
  }

  const getSeverityColor = (severity: string): string => {
    const severityColorMap: SeverityColorMap = {
      critical: "text-red-500",
      high: "text-orange-400",
      medium: "text-yellow-400",
      low: "text-blue-400",
    };

    return severityColorMap[severity] || "text-gray-400";
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertCircle size={16} className="text-red-500" />;
      case "high": return <AlertTriangle size={16} className="text-orange-400" />;
      case "medium": return <AlertTriangle size={16} className="text-yellow-400" />;
      case "low": return <Info size={16} className="text-blue-400" />;
      default: return <Info size={16} className="text-gray-400" />;
    }
  };

  interface SecurityMetricProps {
    label: string;
    value: string;
    isPositive: boolean;
  }

  const SecurityMetric: React.FC<SecurityMetricProps> = ({ label, value, isPositive }) => (
    <div className="bg-gray-800 bg-opacity-60 rounded-lg p-3 flex flex-col items-center justify-center">
      <span className="text-gray-400 text-xs mb-1">{label}</span>
      <span className={`font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden w-full transition-all duration-300">
          {/* Gradient top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-700" />
          
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="flex items-center text-xl font-bold text-white">
                <div className="relative mr-3">
                  <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse" />
                  <Shield className="h-6 w-6 text-blue-500 relative z-10" />
                </div>
                <span className="bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                  Smart Contract Security Scanner
                </span>
              </h1>
            </div>

            {/* Input Section */}
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-5 mb-6">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Blockchain
                  </label>
                  <div className="relative">
                    <select
                      value={chainId}
                      onChange={(e) => setChainId(e.target.value)}
                      className="w-full p-3 pl-4 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      {blockchains.map((chain) => (
                        <option key={chain.id} value={chain.id}>
                          {chain.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contract Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={contractAddress}
                      onChange={(e) => setContractAddress(e.target.value)}
                      placeholder="0x..."
                      className="w-full p-3 pl-4 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <Search size={18} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={handleCheckSecurity}
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transition-all duration-300 text-white"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                      Scanning Contract...
                    </div>
                  ) : (
                    "Scan Contract Security"
                  )}
                </button>
              </div>
            </div>

            {/* Error display */}
            {error && (
              <div className="p-4 mb-6 bg-red-900 bg-opacity-30 border border-red-800 text-red-400 rounded-lg flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Results Section */}
            {result && (
              <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800 bg-opacity-30">
                {/* Token Basic Info */}
                <div className="p-5 border-b border-gray-700">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                          <span className="font-bold text-white">
                            {result.result[Object.keys(result.result)[0]].token_symbol.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-white">
                            {result.result[Object.keys(result.result)[0]].token_name}
                          </h2>
                          <div className="text-sm text-gray-400 flex items-center">
                            {result.result[Object.keys(result.result)[0]].token_symbol}
                            <span className="mx-2">•</span>
                            <a 
                              href={`https://etherscan.io/address/${Object.keys(result.result)[0]}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-400 hover:text-blue-300"
                            >
                              View on Explorer
                              <ExternalLink size={12} className="ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 bg-gray-900 rounded-lg p-3 flex items-center">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${securityInfo ? getScoreBgClass(securityInfo.score) : ''} bg-opacity-20`}
                      >
                        <span className={`font-bold text-lg ${securityInfo ? getScoreColorClass(securityInfo.score) : ''}`}>
                          {securityInfo ? securityInfo.score : "N/A"}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Security Score</div>
                        <div className={`font-bold text-lg ${securityInfo ? getScoreColorClass(securityInfo.score) : ''}`}>
                          {securityInfo ? securityInfo.category : "Unknown"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Security Metrics Grid */}
                <div className="p-5 border-b border-gray-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <SecurityMetric 
                      label="Open Source" 
                      value={result.result[Object.keys(result.result)[0]].is_open_source === "1" ? "Yes" : "No"} 
                      isPositive={result.result[Object.keys(result.result)[0]].is_open_source === "1"}
                    />
                    <SecurityMetric 
                      label="Honeypot" 
                      value={result.result[Object.keys(result.result)[0]].is_honeypot === "1" ? "Yes" : "No"} 
                      isPositive={result.result[Object.keys(result.result)[0]].is_honeypot === "0"}
                    />
                    <SecurityMetric 
                      label="Buy Tax" 
                      value={result.result[Object.keys(result.result)[0]].buy_tax + "%"} 
                      isPositive={result.result[Object.keys(result.result)[0]].buy_tax === "0"}
                    />
                    <SecurityMetric 
                      label="Sell Tax" 
                      value={result.result[Object.keys(result.result)[0]].sell_tax + "%"} 
                      isPositive={result.result[Object.keys(result.result)[0]].sell_tax === "0"}
                    />
                  </div>
                </div>
                
                {/* Security Issues */}
                {securityInfo && securityInfo.risks && securityInfo.risks.length > 0 && (
                  <div className="p-5 border-b border-gray-700">
                    <h3 className="text-md font-bold mb-3 text-white flex items-center">
                      <AlertTriangle size={16} className="mr-2 text-yellow-400" />
                      Security Concerns
                    </h3>
                    <div className="space-y-2">
                      {securityInfo.risks.map((risk, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-800 rounded-lg p-3 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            {getSeverityIcon(risk.severity)}
                            <span className="ml-2">{risk.name}</span>
                          </div>
                          <span className={`text-sm font-medium ${getSeverityColor(risk.severity)} capitalize`}>
                            {risk.severity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Toggle Raw Data */}
                <div className="px-5 py-3">
                  <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center text-gray-400 hover:text-white text-sm"
                  >
                    {showDetails ? <ChevronDown size={16} className="mr-1" /> : <ChevronRight size={16} className="mr-1" />}
                    {showDetails ? "Hide Raw Data" : "Show Raw Data"}
                  </button>
                  
                  {showDetails && (
                    <pre className="mt-3 p-4 bg-gray-900 rounded-lg text-xs overflow-auto max-h-96 text-gray-300">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && !result && !error && (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                  <Shield className="h-10 w-10 text-gray-500" />
                </div>
                <p className="text-lg font-medium mb-2">No Contract Scanned</p>
                <p className="text-sm text-center max-w-md">
                  Enter a smart contract address and select a blockchain to analyze security risks and potential vulnerabilities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityScanner;