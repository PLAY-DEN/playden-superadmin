// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
import DashboardHeader from "./DashboardHeader";
import PlayDenStats from "./playDen";

const Dashboard: React.FC = () => {
  // const { bookings,  } = useSelector(
  //   (state: RootState) => state.bookings
  // );

  // console.log(bookings);
  
  return (
    <div className="">
      <DashboardHeader />

      <div className="flex gap  mt-8 w-full">
        <PlayDenStats />
      </div>
    </div>
  );
};

export default Dashboard;