import Image from "next/image";

// Define TypeScript interfaces for props
interface DayCardProps {
  day: string;
  emeralds: string;
  onClaim?: () => void;
}

interface QuestCardProps {
  title: string;
  description: string;
  image: string;
  emeralds: string;
  supply: string;
}

const quests = [
  {
    title: "Upcoming Quest 1",
    description:
      "THE TOP NODGE IN Quest IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO",
    image: "/Intelytics-quest-1.jpg",
    emeralds: "2000",
    supply: "1/50",
  },
  {
    title: "Upcoming Quest 2",
    description:
      "THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO",
    image: "/Intelytics-quest-2.jpg",
    emeralds: "2000",
    supply: "1/50",
  },
  {
    title: "Upcoming Quest 3",
    description:
      "THE TOP NODGE IN ZORA IS ABOUT TO COME IN THE INDUSTRY OF CRYPTO",
    image: "/Intelytics-quest-3.jpg",
    emeralds: "2000",
    supply: "1/50",
  },
];
// Updated days data with unique images
const days = [
  { day: "Day 1", emeralds: "+10", image: "/day1.png" },
  { day: "Day 2", emeralds: "+10", image: "/day2.png" },
  { day: "Day 3", emeralds: "+10", image: "/day3.png" },
  { day: "Day 4", emeralds: "+10", image: "/day4.png" },
  { day: "Day 5", emeralds: "+10", image: "/day5.png" },
  { day: "Day 6", emeralds: "+10", image: "/day6.png" },
  { day: "Day 7", emeralds: "+10", image: "/day7.png" },
  { day: "Day 8", emeralds: "+10", image: "/day8.png" },
  { day: "Day 9", emeralds: "+10", image: "/day9.png" },
];

// Updated DayCard component to include images
const DayCard: React.FC<DayCardProps> = ({ day, emeralds, onClaim }) => (
  <div className="w-[80px] shrink-0">
    <div className="bg-gray-800 p-2 rounded-lg flex flex-col items-center justify-center">
      <div>{day}</div>
      <Image src="/emerald.png" height={50} width={50} alt="" />
      <div>{emeralds}</div>
    </div>
    {onClaim && (
      <div
        onClick={onClaim}
        className="border-2 border-blue-900 flex items-center justify-center rounded-md mt-3 shadow-md shadow-blue-900 cursor-pointer"
      >
        Claim
      </div>
    )}
  </div>
);

const QuestCard: React.FC<QuestCardProps> = ({
  title,
  description,
  image,
  emeralds,
  supply,
}) => (
  <div className="w-full py-4 lg:p-4">
    <div className="border-2 border-gray-600 rounded-md">
      <Image src={image} height={400} width={500} alt="" />
      <div className="flex flex-col p-2">
        <div className="flex justify-between">
          <div className="bg-gray-800 rounded-md mt-3 flex gap-2 pl-2 pr-2 items-center justify-center">
            <Image src="/emerald.png" height={30} width={30} alt="" />
            <div className="text-sm">{emeralds}</div>
          </div>
          <div className="bg-gray-800 rounded-md mt-3 flex gap-2 pl-2 pr-2 items-center justify-center">
            <Image src="/set2.png" height={20} width={20} alt="" />
            <div className="text-sm text-gray-400">
              Supply: <span className="text-white">{supply}</span>
            </div>
          </div>
        </div>
        <div className="p-2 text-gray-400">
          <span className="text-white">{title}</span> {description}
        </div>
      </div>
    </div>
  </div>
);


// Updated RewardDashboard component
const RewardDashboard: React.FC = () => {
  const handleClaim = (): void => {
    console.log("Reward claimed!");
  };

  return (
    <div>
     <div className="flex lg:flex-col justify-between space-y-2 py-2">
     <div className="hidden lg:block">
     <button className="bg-bordercolor rounded-md flex gap-2 p-1 items-center ">
     <Image src="/emerald.png" height={30} width={30} alt="" />
     <div className="text-xs lg:text-lg">Emeralds</div>
     </button>
      </div>
     <div className="flex flex-col justify-center">
     <div className="text-xs lg:text-lg ">COLLECT YOUR DAILY REWARDS</div>
     <div className="text-xs lg:text-lg ">
        Login for 7 days, to get your emeralds grow
      </div>
     </div>
     </div>
      <div className="w-full justify-between flex gap-4 pt-5 pb-5 overflow-x-scroll">
        {days.map((day, index) => (
          <DayCard
            key={index}
            day={day.day}
            emeralds={day.emeralds}
            onClaim={index === 0 ? handleClaim : undefined}
          />
        ))}
      </div>
      <div className="pt-8 w-full">
        <div className="text-2xl">Want more Emeralds</div>
        <div className="text-gray-500">
          To collect more emeralds, we need to do the collections tasks
        </div>
        <div className="flex flex-col lg:flex-row w-full overflow-x-scroll">
          {quests.map((quest, index) => (
            <QuestCard key={index} {...quest} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardDashboard;
