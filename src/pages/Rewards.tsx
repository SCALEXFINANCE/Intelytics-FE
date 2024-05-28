import React, { useEffect, useState } from "react";
import Image from "next/image";

const Rewards = () => {
  const [dashsel, setDashSelected] = useState<Boolean>(true);
  const [colsel, setColSelected] = useState<Boolean>(false);
  const [authkey, setAuthkey] = useState<String>("");
  const [diamonds, setDiamonds] = useState<any>(10);

  //   const handleClaim = async () => {
  //     const requestBody = {
  //       Authorization: authkey
  //     };

  //     try {
  //       const response = await fetch("https://intelytics-be.vercel.app/api/claim", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${authkey}`,
  //         },
  //         body: JSON.stringify(requestBody),
  //       });

  //       // if (!response.ok) {
  //       //   throw new Error("Network response was not ok");
  //       // }

  //       console.log(requestBody)

  //       const data = await response.json();
  //       console.log("Claim successful:", data);
  //     } catch (error) {
  //       console.error("Claim failed:", error);
  //     }
  //   };

  const handleClaim = async () => {
    try {
      const response = await fetch(
        "https://intelytics-be.vercel.app/api/claim",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authkey}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Successful");
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuthkey(token);
      console.log(token);
      const getEmeralds = async () => {
        try {
          const response = await fetch(
            "https://intelytics-be.vercel.app/api/diamonds",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authkey}`,
              },
              body: JSON.stringify({}),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setDiamonds(data.diamonds || []);
        } catch (error) {
          console.error("Request failed:", error);
        }
      };
      getEmeralds();
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
      <div className="flex flex-col w-[90%] items-center justify-center">
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
              <Image src={"/lock.png"} height={20} width={25} alt=""/>
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
                <div className=" w-full flex gap-4 pt-5 pb-5">
                  <div className=" w-[10%]">
                    <div className=" bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
                      <div>Day 1</div>
                      <Image
                        src={"/emerald.png"}
                        height={50}
                        width={50}
                        alt=""
                      />
                      <div>+10</div>
                    </div>
                    <div
                      onClick={handleClaim}
                      className=" border-2 border-blue-900 flex items-center justify-center rounded-md mt-3 shadow-md shadow-blue-900"
                    >
                      Claim
                    </div>
                  </div>
                  <div className=" w-[10%]">
                    <div className=" bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
                      <div>Day 2</div>
                      <Image
                        src={"/emerald.png"}
                        height={50}
                        width={50}
                        alt=""
                      />
                      <div>+10</div>
                    </div>
                  </div>
                  <div className=" w-[10%]">
                    <div className=" bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
                      <div>Day 3</div>
                      <Image
                        src={"/emerald.png"}
                        height={50}
                        width={50}
                        alt=""
                      />
                      <div>+10</div>
                    </div>
                  </div>
                  <div className=" w-[10%]">
                    <div className=" bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
                      <div>Day 4</div>
                      <Image
                        src={"/emerald.png"}
                        height={50}
                        width={50}
                        alt=""
                      />
                      <div>+10</div>
                    </div>
                  </div>
                  <div className=" w-[10%]">
                    <div className=" bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
                      <div>Day 5</div>
                      <Image
                        src={"/emerald.png"}
                        height={50}
                        width={50}
                        alt=""
                      />
                      <div>+10</div>
                    </div>
                  </div>
                  <div className=" w-[10%]">
                    <div className=" bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
                      <div>Day 6</div>
                      <Image
                        src={"/emerald.png"}
                        height={50}
                        width={50}
                        alt=""
                      />
                      <div>+10</div>
                    </div>
                  </div>
                  <div className=" w-[10%]">
                    <div className=" bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
                      <div>Day 7</div>
                      <Image
                        src={"/emerald.png"}
                        height={50}
                        width={50}
                        alt=""
                      />
                      <div>+10</div>
                    </div>
                  </div>
                  <div className=" w-[10%]">
                    <div className=" bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
                      <div>Day 8</div>
                      <Image
                        src={"/emerald.png"}
                        height={50}
                        width={50}
                        alt=""
                      />
                      <div>+10</div>
                    </div>
                  </div>
                  <div className=" w-[10%]">
                    <div className=" bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
                      <div>Day 9</div>
                      <Image
                        src={"/emerald.png"}
                        height={50}
                        width={50}
                        alt=""
                      />
                      <div>+10</div>
                    </div>
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
                              <div className=" text-sm text-gray-400">Supply: <span className=" text-white">1/50</span></div>
                            </div>
                          </div>
                          <div className="p-2 text-gray-400"><span className=" text-white">Upcoming Quest 1</span> THE TOP NODGE IN Quest IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO</div>
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
                              <div className=" text-sm text-gray-400">Supply: <span className=" text-white">1/50</span></div>
                            </div>
                          </div>
                          <div className="p-2 text-gray-400"><span className=" text-white">Upcoming Quest 2</span> THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO</div>
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
                              <div className=" text-sm text-gray-400">Supply: <span className=" text-white">1/50</span></div>
                            </div>
                          </div>
                          <div className="p-2 text-gray-400"><span className=" text-white">Upcoming Quest 3</span> THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO</div>
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
                    To collect more emeralds, we need to do the collections taks{" "}
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
                              <div className=" text-sm text-gray-400">Supply: <span className=" text-white">1/50</span></div>
                            </div>
                          </div>
                          <div className="p-2 text-gray-400"><span className=" text-white">ZORA TOKEN GIVEAWAY:</span> THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO</div>
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
                              <div className=" text-sm text-gray-400">Supply: <span className=" text-white">1/50</span></div>
                            </div>
                          </div>
                          <div className="p-2 text-gray-400"><span className=" text-white">ZORA TOKEN GIVEAWAY:</span> THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO</div>
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
                              <div className=" text-sm text-gray-400">Supply: <span className=" text-white">1/50</span></div>
                            </div>
                          </div>
                          <div className="p-2 text-gray-400"><span className=" text-white">ZORA TOKEN GIVEAWAY:</span> THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO</div>
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
    </>
  );
};

export default Rewards;
