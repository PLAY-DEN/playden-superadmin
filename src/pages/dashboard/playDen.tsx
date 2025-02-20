import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { person, equalizer, compiling } from "../../assets/images";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { fetchFinancialStatistics } from "../../redux/financialActions";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white text-end rounded-lg p-4 min-w min-h-24 shadow-sm relative w-full">
      {icon && (
        <img
          src={icon}
          alt={`${title} icon`}
          className="absolute top-2 left-2 w-6 h-6"
        />
      )}
      <p className="text-[#41244B] text-xs font-bold">{value}</p>
      <p className="text-[12px]">{title}</p>
    </div>
  );
};

const PlayDenStats: React.FC = () => {
  const dispatch: any = useDispatch();
  const financialData = useSelector((state: RootState) => state.financial.data);

  useEffect(() => {
    dispatch(fetchFinancialStatistics());
  }, [dispatch]);

  // Safely access properties with optional chaining and provide fallback values
  const totalBookings = financialData?.total_bookings || 0;
  const totalRevenue = financialData?.total_revenue || 0;
  const totalAdminCommission = financialData?.total_admin_commission || 0;
  const totalOwnerDue = financialData?.total_owner_due || 0;
  const monthlyRevenue = financialData?.monthly_revenue || [];

  // Transform monthly data for the chart
  const chartData = monthlyRevenue.map((monthData: any) => ({
    name: `${monthData.year}-${monthData.month}`,
    revenue: parseFloat(monthData.total_revenue),
    adminCommission: parseFloat(monthData.total_admin_commission),
    ownerDue: parseFloat(monthData.total_owner_due),
  }));

  return (
    <div
      className="bg-playden-primary rounded-lg p-5 flex flex-col items-center w-full"
      style={{ height: "auto" }}
    >
      <div className="flex justify-between w-full">
        <h2 className="text-sm text-white font-semibold">
          Financial Statistics
        </h2>
        {/* <select
          name="admin"
          id="options"
          className="text-xs text-white w-24 h-8 border border-none bg-transparent rounded-md"
        >
          <option value="days">Exports</option>
        </select> */}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-8 justify-center">
        <StatCard
          title="Total Bookings"
          value={totalBookings}
          icon={equalizer}
        />
        <StatCard
          title="Total Revenue"
          value={`₦${totalRevenue.toFixed(2)}`}
          icon={person}
        />
        <StatCard
          title="Total Admin Commission"
          value={`₦${totalAdminCommission.toFixed(2)}`}
          icon={compiling}
        />
        <StatCard
          title="Total Owner Due"
          value={`₦${totalOwnerDue.toFixed(2)}`}
          icon={person}
        />
      </div>

      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        className="mt-8"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        <Line type="monotone" dataKey="adminCommission" stroke="#82ca9d" />
        <Line type="monotone" dataKey="ownerDue" stroke="#ffc658" />
      </LineChart>
    </div>
  );
};

export default PlayDenStats;
// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { vector6, person, equalizer, compiling } from "../../assets/images";

// interface StatCardProps {
//   title: string;
//   value: number | string; // Accept number or string for flexibility
//   icon?: string;
// }

// const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
//   return (
//     <div className="bg-white text-end rounded-lg p-4 min-w-32 min-h-24 shadow-sm relative">
//       {icon && <img src={icon} alt={`${title} icon`} className="absolute top-2 left-2 w-6 h-6" />}
//       <p className="text-[#41244B] text-xs font-bold">{value}</p>
//       <p className="text-[12px]">{title}</p>
//     </div>
//   );
// };

// const PlayDenStats: React.FC = () => {
//   // Fetch statistics from Redux state
//   const { total_users, users_joined_last_24_hours } = useSelector(
//     (state: RootState) => state.users.data.statistics
//   );

//   return (
//     <div
//       className="bg-playden-primary rounded-lg p-5 flex flex-col items-center"
//       style={{ height: "242px" }}
//     >
//       {/* Header Section */}
//       <div className="flex justify-between w-full">
//         <h2 className="text-sm text-white font-semibold">PlayDen Stat</h2>
//         <select
//           name="admin"
//           id="options"
//           className="text-xs text-white w-24 h-8 border border-none bg-transparent rounded-md"
//         >
//           <option value="days">Exports</option>
//         </select>
//       </div>

//       {/* Image Section */}
//       <img src={vector6} alt="chart" className="mt-14 mx-auto" />

//       {/* Stat Cards Section */}
//       <div className="grid grid-cols-2 gap-3 mt-8 justify-center">
//         <StatCard title="Total Booking" value={0} icon={equalizer} />
//         <StatCard title="Total Users" value={total_users} icon={person} />
//         <StatCard title="Total Pitch" value={0} icon={compiling} />
//         <StatCard title="New Users" value={users_joined_last_24_hours} icon={person} />
//       </div>
//     </div>
//   );
// };

// export default PlayDenStats;
