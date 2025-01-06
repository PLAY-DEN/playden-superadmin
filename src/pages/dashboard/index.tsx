import { useSelector } from "react-redux";
import { Ellipse, vector12, Chart } from "../../assets/images";
import { RootState } from "../../redux/store";
import DashboardHeader from "./DashboardHeader";
import StatisticsSummary from "./StatisticsSummary";
import PitchProgress from "./pitchProgress";
import PlayDenStats from "./playDen";
import TaskDetails from "./taskDetails";

const Dashboard: React.FC = () => {
  const { bookings,  } = useSelector(
    (state: RootState) => state.bookings
  );

  console.log(bookings);
  
  return (
    <div className="">
      <DashboardHeader />

      <div className="flex gap  mt-8">
        <div className="w-full mr-8 ">
          {/* Stats Cards */}
          <div className="flex w-full gap-4">
            <StatisticsSummary
              title="Total Revenue"
              value="₦10,000,000.00"
              colorClass="text-white"
              customStyle={{
                backgroundColor: "#6C6C6C",
                border: "2px solid #6C6C6C",
                borderRadius: "8px",
              }}
              imageSrc={Ellipse}
              imageStyle={{
                filter:
                  "invert(15%) sepia(5%) saturate(300%) hue-rotate(0deg) brightness(60%)",
              }}
              secondaryImageSrc={vector12}
              secondaryImageStyle={{ fontWeight: "bold" }}
            />
            <StatisticsSummary
              title="Total Commission"
              value="3,000"
              colorClass="text-white"
              customStyle={{
                backgroundColor: "#01031A",
                border: "2px solid #01031A",
                borderRadius: "8px",
              }}
              imageSrc={Ellipse}
              imageStyle={{
                filter:
                  "sepia(1) saturate(600%) hue-rotate(180deg) brightness(25%)",
              }}
              tertiaryImageSrc={Chart}
              tertiaryImageStyle={{ fontWeight: "bold" }}
            />
            {/*  */}
          </div>
          {/* Pitch Progress Displayed Directly Under the Summary Cards */}
          <div className="mt-8">
            <PitchProgress />
          </div>
        </div>

        <div>
          <PlayDenStats />
          <div className="mt-12 md:mt-52">
            <TaskDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
