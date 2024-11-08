import { Home7, Ellipse } from "../../assets/images";

// Data for summary cards and table
const playpointSummary = {
  todayRedeemed: 8,
  totalRedeemed: 20,
  totalRefunded: 30,
};

const playpointUsageData = [
  { id: 1, name: "Oyinkansola Soleye", bookingId: "#445564", playpointsRedeemed: 5, date: "8/8/2024" },
  { id: 2, name: "Oyinkansola Soleye", bookingId: "#445564", playpointsRedeemed: 5, date: "8/8/2024" },
  { id: 3, name: "Oyinkansola Soleye", bookingId: "#445564", playpointsRedeemed: 5, date: "8/8/2024" },
  { id: 4, name: "Oyinkansola Soleye", bookingId: "#445564", playpointsRedeemed: 5, date: "8/8/2024" },
  { id: 5, name: "Oyinkansola Soleye", bookingId: "#445564", playpointsRedeemed: 5, date: "8/8/2024" },
  { id: 6, name: "Oyinkansola Soleye", bookingId: "#445564", playpointsRedeemed: 5, date: "8/8/2024" },
  { id: 7, name: "Oyinkansola Soleye", bookingId: "#445564", playpointsRedeemed: 5, date: "8/8/2024" },
];

const PlaypointUsage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md relative ml-72 p-8 mt-20 overflow-auto">
      {/* Header and Filter */}
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Playpoint Usage</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="w-[320px] h-[180px] bg-[#D29AB8] rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{playpointSummary.todayRedeemed}</p>
            <p>Today Redeemed</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
        <div className="w-[320px] h-[180px] bg-playden-primary rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{playpointSummary.totalRedeemed}</p>
            <p>Total Redeemed</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
        <div className="w-[320px] h-[180px] bg-[#01031A] rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{playpointSummary.totalRefunded}</p>
            <p>Total Refunded</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
      </div>

      {/* Playpoint Usage Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">S/N</th>
            <th className="border-b p-4">Name</th>
            <th className="border-b p-4">Booking ID</th>
            <th className="border-b p-4">Playpoint Redeemed</th>
            <th className="border-b p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {playpointUsageData.map((usage, index) => (
            <tr key={usage.id}>
              <td className="border-b p-4 text-sm">{index + 1}</td>
              <td className="border-b p-4 text-sm">{usage.name}</td>
              <td className="border-b p-4 text-sm">{usage.bookingId}</td>
              <td className="border-b p-4 text-sm">{usage.playpointsRedeemed}</td>
              <td className="border-b p-4 text-sm">{usage.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaypointUsage;
