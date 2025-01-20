import React, { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination , Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import RewardCollection from "@/components/RewardCollection";
import RewardDashboard from "@/components/RewardDashboard";

const Rewards = () => {
  const [dashsel, setDashSelected] = useState<Boolean>(true);
  const [colsel, setColSelected] = useState<Boolean>(false);
  const [diamonds, setDiamonds] = useState<any>("");
  const images = [
    { id: 1, src: "/rewardimage.jpeg", alt: "Reward Banner 1" },
    { id: 2, src: "/rewardimage.jpeg", alt: "Reward Banner 2" },
    { id: 3, src: "/rewardimage.jpeg", alt: "Reward Banner 3" },
    { id: 4, src: "/rewardimage.jpeg", alt: "Reward Banner 4" },
  ];

  const handleClaim = async () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      const raw = "";

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://intelytics-be.vercel.app/api/claim")
        .then((response) => response.text())
        .then((result) => {
          if (result === "You can only claim diamonds once every 24 hours") {
            toast.error(result);
          } else {
            toast.success("Claimed Successfully");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const url = "https://intelytics-be.vercel.app/api/diamonds";
      axios
        .get(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setDiamonds(response.data.diamonds);
        })
        .catch((error) => {
          console.error("Error making the request:", error);
        });
    }
  }, []);

  const DashboardClicked = () => {
    setDashSelected(true);
    setColSelected(false);
  };
  const CollectionsClicked = () => {
    setColSelected(true);
    setDashSelected(false);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center w-full space-y-6 ">
          <div className="flex w-full h-40 space-y-4 lg:space-y-0 lg:space-x-2 flex-wrap lg:flex-nowrap">
            <div className="lg:w-1/3 w-full flex rounded-md shadow-md shadow-lightblue border border-lightblue">
              <div className="flex lg:flex-col flex-row justify-around items-center w-full py-2">
                <div className="text-nowrap text-center text-xs lg:text-lg">
                  MY EMERALDS
                  <div className="flex justify-center lg:hidden items-center text-xs lg:text-lg">
                    <Image
                      className="h-6 w-6"
                      alt="emerald-icon"
                      width={24}
                      height={24}
                      src="/emerald.png"
                    />
                    <span className="text-2xl">1769</span>
                  </div>
                </div>

                <Image
                  className="lg:h-full lg:hidden lg:w-full h-20 w-20"
                  alt="emerald-animation"
                  width={0}
                  height={0}
                  src="/emeraldanim.gif"
                />
                <div className="lg:flex hidden items-center justify-center space-x-1 text-xs lg:text-lg">
                  <Image
                    className="h-6 w-6"
                    alt="emerald-icon"
                    width={24}
                    height={24}
                    src="/emerald.png"
                  />
                  <span className="text-xs lg:text-lg">1769</span>
                </div>
                <div className="shadow-md text-nowrap rounded-md text-center p-2 bg-bordercolor text-xs lg:text-lg">
                  Redeem Emerald
                </div>
              </div>
              <Image
                className="lg:h-full hidden lg:block lg:w-full h-20 w-20"
                alt="emerald-animation"
                width={0}
                height={0}
                src="/emeraldanim.gif"
              />
            </div>

            {/* desktop Slider */}
            <div className="w-full hidden overflow-hidden lg:block rounded-md">

<Swiper
  modules={[Autoplay, Pagination, Navigation]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  pagination={{
    clickable: true,
  }}
  navigation
  loop={true}
  className="rounded-md w-full"
>
  {images.map((image) => (
    <SwiperSlide key={image.id} className="flex justify-center">
      <Image
        src={image.src}
        alt={image.alt}
        width={2000}
        height={1000}
        className="rounded-md object-cover"
      />
    </SwiperSlide>
  ))}
</Swiper>

            </div>

            {/* mobile slider */}
            <div className=" h-40 lg:hidden overflow-hidden rounded-md">

<Swiper
  modules={[Autoplay, Pagination, Navigation]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  pagination={{
    clickable: true,
  }}
  navigation
  loop={true}
  className="rounded-md w-full"
>
  {images.map((image) => (
    <SwiperSlide key={image.id} className="flex justify-center">
      <Image
        src={image.src}
        alt={image.alt}
        width={2000}
        height={1000}
        className="rounded-md object-cover"
      />
    </SwiperSlide>
  ))}
</Swiper>

            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex gap-3 pt-28 lg:pt-0">
              <div
                className={`text-xl rounded cursor-pointer p-1 pr-3 ${
                  dashsel
                    ? "text-white underline underline-offset-2"
                    : "text-gray-500"
                }`}
                onClick={DashboardClicked}
              >
                My Dashboard
              </div>
              <div
                className={`flex gap-1 text-xl cursor-pointer rounded p-1 pl-3 pr-3 ${
                  colsel
                    ? "text-white underline underline-offset-2"
                    : "text-gray-500"
                }`}
                onClick={CollectionsClicked}
              >
                Collection Rewards
                <Image
                  src={"/lock.png"}
                  height={20}
                  width={25}
                  alt="lock-icon"
                />
              </div>
            </div>
            <div className="border-b-4 border-bordercolor border-dashed w-full"></div>

            <div className="w-full">
              {dashsel && <RewardDashboard />}
              {colsel && <RewardCollection />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rewards;
