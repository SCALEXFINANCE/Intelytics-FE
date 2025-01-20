import Image from "next/image";

const RewardCollection = () => {
  const rewards = [
    {
      id: 1,
      emeraldCount: 2000,
      supply: "1/50",
      description:
        "ZORA TOKEN GIVEAWAY: THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO",
      cardImage: "/card.png",
      emeraldImage: "/emerald.png",
      supplyImage: "/set2.png",
    },
    {
      id: 2,
      emeraldCount: 2000,
      supply: "1/50",
      description:
        "ZORA TOKEN GIVEAWAY: THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO",
      cardImage: "/card.png",
      emeraldImage: "/emerald.png",
      supplyImage: "/set2.png",
    },
    {
      id: 3,
      emeraldCount: 2000,
      supply: "1/50",
      description:
        "ZORA TOKEN GIVEAWAY: THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO",
      cardImage: "/card.png",
      emeraldImage: "/emerald.png",
      supplyImage: "/set2.png",
    },
  ];

  return (
    <div>
      <div className="w-full ">
        <div className="text-2xl">Want more Emeralds</div>
        <div className="text-gray-500">
          To collect more emeralds, we need to do the collections tasks.
        </div>
        <div className="lg:flex gap-4 pt-5">
          {rewards.map((reward) => (
            <div key={reward.id} className="w-full lg:p-4 py-4">
              <div className="border-2 border-gray-600 rounded-md">
                <Image
                  src={reward.cardImage}
                  height={400}
                  width={500}
                  alt="Card Image"
                />
                <div className="flex flex-col p-2">
                  <div className="flex justify-between">
                    <div className="bg-gray-800 rounded-md mt-3 flex gap-2 pl-2 pr-2 items-center justify-center">
                      <Image
                        src={reward.emeraldImage}
                        height={30}
                        width={30}
                        alt="Emerald"
                      />
                      <div className="text-sm">{reward.emeraldCount}</div>
                    </div>
                    <div className="bg-gray-800 rounded-md mt-3 flex gap-2 pl-2 pr-2 items-center justify-center">
                      <Image
                        src={reward.supplyImage}
                        height={20}
                        width={20}
                        alt="Supply"
                      />
                      <div className="text-sm text-gray-400">
                        Supply:{" "}
                        <span className="text-white">{reward.supply}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 text-gray-400">
                    <span className="text-white">
                      {reward.description.split(":")[0]}:
                    </span>{" "}
                    {reward.description.split(":")[1]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardCollection;
