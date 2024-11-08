import { Link } from 'react-router-dom'; // Import Link for navigation
import { Home7, Ellipse } from "../../assets/images";

// Sample data
const cancellations = [
  { id: 1, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Cancelled", date: "8/8/2024", pitch: "PLUTO" },
  { id: 2, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Cancelled", date: "8/8/2024", pitch: "PLUTO" },
  { id: 3, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Cancelled", date: "8/8/2024", pitch: "PLUTO" },
  { id: 4, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Cancelled", date: "8/8/2024", pitch: "PLUTO" },
  { id: 5, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Cancelled", date: "8/8/2024", pitch: "PLUTO" },
];

const summary = {
  todayCancellations: 3,
  totalCancellations: 15,
  backlistedPlayparks: 30,
};

const CancellationManagement: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md relative ml-72 p-8 mt-20 overflow-auto">
      {/* Header and Filter */}
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Cancellation</h2>
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
        {/* Cards */}
        <div className="w-[320px] h-[180px] bg-[#D29AB8] rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{summary.todayCancellations}</p>
            <p>Today’s Cancellations</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
        <div className="w-[320px] h-[180px] bg-playden-primary rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{summary.todayCancellations}</p>
            <p>Today’s Cancellations</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
        <div className="w-[320px] h-[180px] bg-[#01031A] rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{summary.todayCancellations}</p>
            <p>Today’s Cancellations</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
        {/* Repeat for other cards... */}
      </div>

      {/* Cancellation Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">S/N</th>
            <th className="border-b p-4">Name</th>
            <th className="border-b p-4">Booking ID</th>
            <th className="border-b p-4">Phone Number</th>
            <th className="border-b p-4">Status</th>
            <th className="border-b p-4">Date</th>
            <th className="border-b p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {cancellations.map((cancellation, index) => (
            <tr key={cancellation.id}>
              <td className="border-b p-4 text-sm">{index + 1}</td>
              <td className="border-b p-4 text-sm">{cancellation.name}</td>
              <td className="border-b p-4 text-sm">{cancellation.bookingId}</td>
              <td className="border-b p-4 text-sm">{cancellation.phoneNumber}</td>
              <td className="border-b p-4 text-sm">
                <span className={`p-2 rounded-2xl ${cancellation.status === "Cancelled" ? "bg-red-500 text-white text-sm" : "bg-green-500 text-white"}`}>
                  {cancellation.status}
                </span>
              </td>
              <td className="border-b p-4 text-sm">{cancellation.date}</td>
              <td className="border-b p-4 text-sm">
                <Link to={`/cancellation-details/${cancellation.id}`} className="text-black font-semibold">
                  View details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CancellationManagement;
