import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchData = () => {
  const [totalTVL, setTotalTVL] = useState<string>();
  const [stable, setStable] = useState<string>();
  const [volume, setVolume] = useState<string>();
  const [funding, setFunding] = useState<string>();
  const [injPrice, setInjPrice] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");
        const response4 = await axios.get("https://api.llama.fi/v2/chains");
        const response6 = await axios.get(
          "https://coins.llama.fi/prices/current/ethereum:0xe28b3b32b6c345a34ff64674606124dd5aceca30"
        );

        const price = response6.data.coins[
          "ethereum:0xe28b3b32b6c345a34ff64674606124dd5aceca30"
        ].price;

        const injective = response4.data.find(
          (chain: any) => chain.gecko_id === "injective-protocol"
        );

        const formattedPrice = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(price);

        setInjPrice(formattedPrice);

        const formattedTVL = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(injective?.tvl || 0);

        setTotalTVL(formattedTVL);

        // Extracting protocol data
        const protocolIds = {
          dojoswap: "3965",
          hydro: "4084",
          astroport: "3117",
          helix: "2259",
        };

        const protocols = response.data;
        const getTvl = (id: string) =>
          protocols.find((p: { id: string }) => p.id === id)?.tvl || 0;

        const dex = getTvl(protocolIds.astroport) + getTvl(protocolIds.dojoswap);
        const derivatives = getTvl(protocolIds.helix);
        const liquidStaking = getTvl(protocolIds.hydro);

        setStable(formatCurrency(dex));
        setVolume(formatCurrency(derivatives));
        setFunding(formatCurrency(liquidStaking));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  return { totalTVL, stable, volume, funding, injPrice };
};

