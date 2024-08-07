import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { request } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { useAuth } from "@/hooks/useAuth";
import useStreak from "@/hooks/useStreak";
import { customFetch } from "@/lib/utils";
import Countdown from "@/components/Countdown";

const rewardArr = [
  {
    day: 1,
    amount: 10,
  },
  {
    day: 2,
    amount: 20,
  },
  {
    day: 3,
    amount: 30,
  },
  {
    day: 4,
    amount: 40,
  },
  {
    day: 5,
    amount: 50,
  },
  {
    day: 6,
    amount: 60,
  },
  {
    day: 7,
    amount: 100,
  },
];

const Rewards = () => {
  const [dashsel, setDashSelected] = useState<Boolean>(true);
  const [colsel, setColSelected] = useState<Boolean>(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const {
    error,
    isLoading: streakIsLoading,
    lastClaimed,
    isClaimable,
    refetchStreak,
    streak,
  } = useStreak();

  const [diamonds, setDiamonds] = useState<any>("");

  const handleClaim = useCallback(async () => {
    if (!isAuthenticated) {
      toast("Login before claiming");
      return;
    }

    const dayToClaim = streak + 1;

    if (dayToClaim > rewardArr.length) {
      toast.error("You've already claimed all available rewards");
      return;
    }

    setIsClaiming(true);
    try {
      const response = await customFetch(`claim/${dayToClaim}`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        refetchStreak();
        toast.success(`Claimed reward for day ${dayToClaim}!`);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to claim reward");
      }
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error("An error occurred while claiming the reward");
    } finally {
      setIsClaiming(false);
    }
  }, [isAuthenticated, streak, refetchStreak]);

  console.log(lastClaimed, "last claimed");

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
      <div className=" w-full flex items-center justify-center">
        <div className="flex flex-col w-[90%] items-center justify-center  ">
          <div className=" flex items-center justify-center gap-10">
            <div className=" w-[29%] bg-[#000722] p-2 rounded-lg shadow-sky-800 shadow-md flex pt-5 pb-5">
              <div className=" flex flex-col">
                <h1 className=" text-xl pt-4 pl-2">My Emeralds</h1>
                <div className=" flex items-center justify-center pt-3 pb-2">
                  <Image src={"/emerald.png"} height={40} width={40} alt="" />
                  <div className=" text-3xl">{diamonds}</div>
                </div>
                <div className="bg-gray-600 p-1 rounded">Redeem Emeralds</div>
              </div>
              <Image src={"/rewards.png"} height={200} width={150} alt="" />
            </div>
            <Image src={"/bg.png"} height={500} width={800} alt="" />
          </div>
          <div className=" flex flex-col w-[85%]">
            <div className=" flex gap-3  pt-10">
              <div
                className={`text-xl rounded p-1 pr-3 ${
                  dashsel
                    ? " text-white underline underline-offset-2 "
                    : " text-gray-500"
                }`}
                onClick={DashboardClicked}
              >
                My Dashboard
              </div>
              <div
                className={`flex gap-1 text-xl  rounded p-1 pl-3 pr-3  ${
                  colsel
                    ? "text-white underline underline-offset-2  "
                    : "text-gray-500"
                }`}
                // onClick={CollectionsClicked}
              >
                Collection Rewards
                <Image src={"/lock.png"} height={20} width={25} alt="" />
              </div>
            </div>
            <div className=" flex pt-2 pb-2">
              <Image src={"/Line.png"} height={100} width={700} alt="" />
              <Image src={"/Line.png"} height={100} width={400} alt="" />
            </div>
            {dashsel && (
              <>
                <div className="">
                  <div className=" bg-gray-800 rounded-md mt-3 flex gap-2 w-[12%] p-1 items-center justify-center">
                    <Image src={"/emerald.png"} height={30} width={30} alt="" />
                    <div className=" text-sm">Emeralds</div>
                  </div>
                  <div className="pt-5 text-xl">COLLECT YOUR DAILY REWARDS</div>
                  <div className=" text-gray-500">
                    Login for 7 days, to get your emeralds grow
                  </div>
                  <div className="flex flex-col gap-4 items-center justify-center">
                    <div className=" w-full flex gap-4 pt-5 npb-5">
                      {rewardArr.map((reward, i) => (
                        <div key={i} className="w-[100%]">
                          <div className="relative bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
                            <div>Day {reward.day}</div>
                            <Image
                              src={"/emerald.png"}
                              height={50}
                              width={50}
                              alt=""
                            />
                            <div>+{reward.amount}</div>
                            {streak >= reward.day && (
                              <div className="absolute w-full h-full flex items-center justify-center">
                                <TiTick fontSize={64} color={"green"} />
                              </div>
                            )}
                          </div>
                          {streak + 1 === reward.day && isClaimable && (
                            <div
                              onClick={handleClaim}
                              className="cursor-pointer border-2 border-blue-900 flex items-center justify-center text-sm p-2 rounded-md mt-3 shadow-md shadow-blue-900"
                            >
                              {isClaiming ? "Claiming..." : "Claim"}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <Countdown
                      lastClaimed={lastClaimed}
                      isClaimable={isClaimable}
                    />{" "}
                  </div>
                </div>
                <div className=" pt-8">
                  <div className=" text-2xl">Want more Emeralds</div>
                  <div className=" text-gray-500">
                    To collect more emeralds, we need to do the collections taks{" "}
                  </div>
                  <div className=" flex gap-4 pt-5">
                    <div className="w-1/3">
                      <div className="border-2 border-gray-600 rounded-md">
                        <Image
                          src={"/Intelytics-quest-1.jpg"}
                          height={400}
                          width={500}
                          alt=""
                        />
                        <div className=" flex flex-col  p-2">
                          <div className=" flex justify-between">
                            <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                              <Image
                                src={"/emerald.png"}
                                height={30}
                                width={30}
                                alt=""
                              />
                              <div className=" text-sm">2000</div>
                            </div>
                            <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                              <Image
                                src={"/set2.png"}
                                height={20}
                                width={20}
                                alt=""
                              />
                              <div className=" text-sm text-gray-400">
                                Supply:{" "}
                                <span className=" text-white">1/50</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 text-gray-400">
                            <span className=" text-white">
                              Upcoming Quest 1
                            </span>{" "}
                            THE TOP NODGE IN Quest IS ABOUT TO COME IN THE
                            INDUSTRY OF CRYPTO
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="border-2 border-gray-600 rounded-md">
                        <Image
                          src={"/Intelytics-quest-2.jpg"}
                          height={400}
                          width={500}
                          alt=""
                        />
                        <div className=" flex flex-col  p-2">
                          <div className=" flex justify-between">
                            <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                              <Image
                                src={"/emerald.png"}
                                height={30}
                                width={30}
                                alt=""
                              />
                              <div className=" text-sm">2000</div>
                            </div>
                            <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                              <Image
                                src={"/set2.png"}
                                height={20}
                                width={20}
                                alt=""
                              />
                              <div className=" text-sm text-gray-400">
                                Supply:{" "}
                                <span className=" text-white">1/50</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 text-gray-400">
                            <span className=" text-white">
                              Upcoming Quest 2
                            </span>{" "}
                            THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE
                            INDUSTRY OF CRYPTO
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="border-2 border-gray-600 rounded-md">
                        <Image
                          src={"/Intelytics-quest-3.jpg"}
                          height={400}
                          width={500}
                          alt=""
                        />
                        <div className=" flex flex-col  p-2">
                          <div className=" flex justify-between">
                            <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                              <Image
                                src={"/emerald.png"}
                                height={30}
                                width={30}
                                alt=""
                              />
                              <div className=" text-sm">2000</div>
                            </div>
                            <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                              <Image
                                src={"/set2.png"}
                                height={20}
                                width={20}
                                alt=""
                              />
                              <div className=" text-sm text-gray-400">
                                Supply:{" "}
                                <span className=" text-white">1/50</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 text-gray-400">
                            <span className=" text-white">
                              Upcoming Quest 3
                            </span>{" "}
                            THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE
                            INDUSTRY OF CRYPTO
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {colsel && (
              <>
                <div>
                  <div className=" pt-8">
                    <div className=" text-2xl">Want more Emeralds</div>
                    <div className=" text-gray-500">
                      To collect more emeralds, we need to do the collections
                      taks{" "}
                    </div>
                    <div className=" flex gap-4 pt-5">
                      <div className="w-1/3">
                        <div className="border-2 border-gray-600 rounded-md">
                          <Image
                            src={"/card.png"}
                            height={400}
                            width={500}
                            alt=""
                          />
                          <div className=" flex flex-col  p-2">
                            <div className=" flex justify-between">
                              <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                                <Image
                                  src={"/emerald.png"}
                                  height={30}
                                  width={30}
                                  alt=""
                                />
                                <div className=" text-sm">2000</div>
                              </div>
                              <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                                <Image
                                  src={"/set2.png"}
                                  height={20}
                                  width={20}
                                  alt=""
                                />
                                <div className=" text-sm text-gray-400">
                                  Supply:{" "}
                                  <span className=" text-white">1/50</span>
                                </div>
                              </div>
                            </div>
                            <div className="p-2 text-gray-400">
                              <span className=" text-white">
                                ZORA TOKEN GIVEAWAY:
                              </span>{" "}
                              THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE
                              INDUSTRY OF CRYPTO
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="border-2 border-gray-600 rounded-md">
                          <Image
                            src={"/card.png"}
                            height={400}
                            width={500}
                            alt=""
                          />
                          <div className=" flex flex-col  p-2">
                            <div className=" flex justify-between">
                              <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                                <Image
                                  src={"/emerald.png"}
                                  height={30}
                                  width={30}
                                  alt=""
                                />
                                <div className=" text-sm">2000</div>
                              </div>
                              <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                                <Image
                                  src={"/set2.png"}
                                  height={20}
                                  width={20}
                                  alt=""
                                />
                                <div className=" text-sm text-gray-400">
                                  Supply:{" "}
                                  <span className=" text-white">1/50</span>
                                </div>
                              </div>
                            </div>
                            <div className="p-2 text-gray-400">
                              <span className=" text-white">
                                ZORA TOKEN GIVEAWAY:
                              </span>{" "}
                              THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE
                              INDUSTRY OF CRYPTO
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="border-2 border-gray-600 rounded-md">
                          <Image
                            src={"/card.png"}
                            height={400}
                            width={500}
                            alt=""
                          />
                          <div className=" flex flex-col  p-2">
                            <div className=" flex justify-between">
                              <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                                <Image
                                  src={"/emerald.png"}
                                  height={30}
                                  width={30}
                                  alt=""
                                />
                                <div className=" text-sm">2000</div>
                              </div>
                              <div className=" bg-gray-800 rounded-md mt-3 flex gap-2   pl-2 pr-2 items-center justify-center">
                                <Image
                                  src={"/set2.png"}
                                  height={20}
                                  width={20}
                                  alt=""
                                />
                                <div className=" text-sm text-gray-400">
                                  Supply:{" "}
                                  <span className=" text-white">1/50</span>
                                </div>
                              </div>
                            </div>
                            <div className="p-2 text-gray-400">
                              <span className=" text-white">
                                ZORA TOKEN GIVEAWAY:
                              </span>{" "}
                              THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE
                              INDUSTRY OF CRYPTO
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Rewards);
