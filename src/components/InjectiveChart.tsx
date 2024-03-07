// import React, { useEffect, useRef, memo, useState } from "react";

// function InjectiveChart() {
//   const [scriptLoaded, setScriptLoaded] = useState(false);

//   const container: any = useRef();

//   const createTVWindow = () => {};
//   createTVWindow();

//   useEffect(() => {
//     if (container.current && !scriptLoaded) {
//       const script = document.createElement("script");
//       script.src =
//         "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//       script.type = "text/javascript";
//       script.async = true;
//       script.innerHTML = `
//               {
//                 "width": "100%",
//                 "height": "100%",
//                 "symbol": "BINANCE:INJUSDT",
//                 "interval": "D",
//                 "timezone": "Etc/UTC",
//                 "theme": "dark",
//                 "style": "3",
//                 "locale": "in",
//                 "enable_publishing": false,
//                 "allow_symbol_change": false,
//                 "save_image": false,
//                 "calendar": false,

//                 "hide_legend": true,
//                 "studies": [
//                   "Volume@tv-basicstudies"
//                 ],
//                 "support_host": "https://www.tradingview.com"
//               }`;
//       script.onload = () => {
//         setScriptLoaded(true);
//       };
//       if (!container.current.querySelector("script")) {
//         container.current.appendChild(script);
//       }
//     }
//   }, [container, scriptLoaded]);

//   return (
//     <div className="w-[50vw] h-[50vh] p-3 rounded-xl">
//       <div className="tradingview-widget-container" ref={container as any}>
//         <div className="tradingview-widget-container__widget "></div>
//       </div>
//     </div>
//   );
// }

// export default memo(InjectiveChart);

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
      const response = await axios.get(
        "https://api.llama.fi/v2/historicalChainTvl/Injective"
      );

      const protocols = response.data;
      console.log(protocols);

      const values: any = [];
      const tvl2 = [];
      tvl2.push(...protocols.slice(-29));
      tvl2.forEach((data: any) => {
        values.push(data.tvl);
      });
      console.log(values);

      //   const formatted = new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //     minimumFractionDigits: 2,
      //     maximumFractionDigits: 2,
      //   }).format(value);

      // const values = [onehr, oneday, sevenday];
      setChartData(values as []);
      // console.log(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    datasets: [
      {
        label: "Total Value Locked",
        data: chartData,
        fill: true,
        // fill: 'origin',

        // fillColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(23,34,62)",
        borderColor: "rgb(41,96,250)",
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
    <div className=" shadow-xl w-[50vw] h-[50vh] p-4 rounded-xl">
      <Line data={data} options={options} width={width} height={height} />
    </div>
  );
};

export default Charted;
