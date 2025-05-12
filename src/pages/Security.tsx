import React, { useState } from "react";
import Image from "next/image";

const SecurityScanner = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [chainId, setChainId] = useState("1");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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

  return (
    <div className="flex flex-col items-center justify-center pt-20 min-h-screen">
      <div className="font-extrabold lg:text-4xl text-2xl mb-8">
        Smart Contract Security Scanner
      </div>

      <div className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Blockchain
          </label>
          <select
            value={chainId}
            onChange={(e) => setChainId(e.target.value)}
            className="w-full p-2 border rounded-md text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {blockchains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contract Address
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <button
          onClick={handleCheckSecurity}
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 text-black"
        >
          {loading ? "Checking..." : "Check Security"}
        </button>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}

        {result ? (
          <div className="p-4 bg-gray-50 rounded-md shadow mt-4">
            <h3 className="font-bold text-lg mb-2 text-black">
              Security Results
            </h3>
            <pre className="text-sm overflow-auto max-h-60 text-black">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="flex flex-col items-center justify-center mt-8">
              <Image
                src={"/nodata.png"}
                alt="No data available"
                height={300}
                width={300}
              />
              <p className="text-gray-500 mt-2">
                Enter a contract address and click Check Security
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SecurityScanner;
