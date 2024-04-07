import { useRouter } from "next/router";
import { contents } from "./content";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
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

export default function tokenName() {
  const router = useRouter();
  const slug = String(router.query.slug).toLowerCase();
  const [price, setPrice] = useState();

  const PriceChart = ({ height, width }: any) => {
    const [chartData, setChartData] = useState([]);
    const chartValues = async () => {
      try {
        const response = await axios.get(
          `http://50.117.104.207:3000/api/getTokenData?tokenName=${String(
            contents[slug].name
          ).toUpperCase()}`
        );
        let Price = response.data.price;
        const last: any = [];
        last.push(...Price.slice(-29));
        setPrice(Price[Price.length - 1]);
        setChartData(last);
        // setChartData();
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
          label: "Price",
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
      scales: {},
    };
    useEffect(() => {
      chartValues();
    }, []);
    return (
      <div className=" shadow-xl lg:w-[35vw]  lg:h-[40vh] w-[80vw] lg:p-4 rounded-xl">
        <Line data={data} options={options} width={width} height={height} />
      </div>
    );
  };
  const VolumeChart = ({ height, width }: any) => {
    const [chartData, setChartData] = useState([]);
    const chartValues = async () => {
      try {
        const response = await axios.get(
          `http://50.117.104.207:3000/api/getTokenData?tokenName=${String(
            contents[slug].name
          ).toUpperCase()}`
        );
        const Volume = response.data.liquidity;
        const last: any = [];
        last.push(...Volume.slice(-29));
        setChartData(last);
        // setChartData();
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
          label: "Volume",
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
      scales: {},
    };
    useEffect(() => {
      chartValues();
    }, []);
    return (
      <div className=" shadow-xl lg:w-[35vw]  lg:h-[40vh] w-[80vw] lg:p-4 rounded-xl">
        <Line data={data} options={options} width={width} height={height} />
      </div>
    );
  };

  const [volume, setVolume] = useState();

  useEffect(() => {
    if (contents[slug]) {
      console.log("from effect", contents[slug].name);
      const fetchData = async () => {
        try {
          const apiUrl = await axios.get(`${contents[slug].apiUrl}`);
          const liquidityData = apiUrl.data;
          const volume = liquidityData.pairs[0].volume;

          const price = liquidityData.pairs[0].priceUsd;
          const txns = liquidityData.pairs[0].txns;
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();

      const interval = setInterval(() => {
        fetchData();
      }, 30000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [slug]);

  return (
    <>
      {contents[slug] && (
        <>
          <div className="pt-4 lg:pt-0">
            <div className="lg:flex lg:gap-2 lg:w-1/3   flex items-center  bg-gray-900 rounded-xl p-2">
              <Image
                alt=""
                src={`/${contents[slug].name}.jpg`}
                height={50}
                width={50}
                className=" rounded-full"
              />
              <a href=" " className="lg:p-2">
                <div className=" font-bold lg:text-2xl text-base px-2 ">
                  {" "}
                  {contents[slug].name}
                </div>
                <div className=" text-teal-400  px-2">
                  {contents[slug].category}
                </div>
              </a>
            </div>
          </div>
          <div className="w-full flex lg:flex-row flex-col gap-3  mt-5">
            <div className=" lg:w-1/2 w-full bg-gray-900 rounded-xl p-6">
              <div className=" w-full flex justify-between">
                <div className="font-bold lg:text-2xl">Price Chart</div>

                <div className="">Price : {price}</div>
              </div>
              <div className=" translate-y-6 pl-2 text-left text-gray-500">
                {contents[slug].name} . Price . Intelytics
              </div>
              <PriceChart />
            </div>
            <div className=" lg:w-1/2 w-full bg-gray-900 rounded-xl p-6">
              <div className="font-bold lg:text-2xl">Volume Chart</div>
              <div className=" w-full">
                <div className=" translate-y-6 pl-2 text-left  text-gray-500">
                  {contents[slug].name} . Volume . Intelytics
                </div>
                <VolumeChart />
              </div>
            </div>
          </div>
        </>
      )}

      {!contents[slug] && <>ERROR 404</>}
    </>
  );
}
