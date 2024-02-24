import React, { useEffect, useState } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  LineElement,
} from "chart.js";
import axios from "axios";
import { Bar, Line, Scatter, Bubble } from "react-chartjs-2";
import { NextPage } from "next";

ChartJs.register(
  CategoryScale,
  LinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

interface Props {
  height: string | number | undefined;
  width: string | number | undefined;
}

const Charted = ({ height, width }: any) => {
  const [chartData, setChartData] = useState([]);
  const chartValues = async () => {
    try {
      const response = await axios.get("https://api.llama.fi/protocols");

      const protocols = response.data;
      const dojoswapId = "3965";
      const hydroprotocolId = "4084";
      const astroportId = "3117";
      const helixId = "2259";
      const dojoswap = protocols.find(
        (protocol: { id: string }) => protocol.id === dojoswapId
      );
      const totalTvlDojo = dojoswap.tvl;
      const oneDayDojo = dojoswap.change_1d;
      const oneHourDojo = dojoswap.change_1h;
      const sevenDayDojo = dojoswap.change_7d;

      const hydro = protocols.find(
        (protocol: { id: string }) => protocol.id === hydroprotocolId
      );
      const totalTvlHydro = hydro.tvl;
      const oneDayHydro = hydro.change_1d;
      const oneHourHydro = hydro.change_1h;
      const sevenDayHydro = hydro.change_7d;

      const astro = protocols.find(
        (protocol: { id: string }) => protocol.id === astroportId
      );
      const totalTvlAstro = astro.tvl;
      const oneDayAstro = astro.change_1d;
      const oneHourAstro = astro.change_1h;
      const sevenDayAstro = astro.change_7d;

      const helix = protocols.find(
        (protocol: { id: string }) => protocol.id === helixId
      );
      const totalTvlHelix = helix.tvl;
      const oneDayHelix = helix.change_1d;
      const oneHourHelix = helix.change_1h;
      const sevenDayHelix = helix.change_7d;

      const value =
        totalTvlAstro + totalTvlDojo + totalTvlHelix + totalTvlHydro;
      const onehr = oneHourAstro + oneHourDojo + oneHourHelix + oneHourHydro;
      const oneday = oneDayAstro + oneDayDojo + oneDayHelix + oneDayHydro;
      const sevenday =
        sevenDayAstro + sevenDayDojo + sevenDayHelix + sevenDayHydro;

      //   const formatted = new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //     minimumFractionDigits: 2,
      //     maximumFractionDigits: 2,
      //   }).format(value);

      const values = [onehr, oneday, sevenday];
      setChartData(values as []);
      console.log(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: ["1Hr", "24Hrs", "7Days"],
    datasets: [
      {
        label: "Total Value Locked",
        data: chartData,
        fill: true,
        // fill: 'origin',
         
        // fillColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75,192,192 , 0.5)", 
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  useEffect(() => {
    chartValues();
  }, []);
  return (
    <div className=" shadow-xl  p-8 rounded-xl">
      <Line data={data} options={options} width={width} height={height} />
    </div>
  );
};

export default Charted;
