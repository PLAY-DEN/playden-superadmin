import { Home7,Ellipse } from "../../assets/images";

const UserManagement: React.FC = () => {
  return (
    <div className="relative ml-72 p-8 mt-20">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl text-[#01031A] font-bold mb-6">User Management </h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">last 30 days</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="w-[320px] h-[180px] bg-[#D29AB8] rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>500</p>
            <p>Total users</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
        <div className="w-[320px] h-[180px] bg-playden-primary rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>10</p>
            <p>active user</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
        <div className="w-[320px] h-[180px] bg-[#01031A] rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>20</p>
            <p>Ban/Suspended</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone Number</th>
            <th className="border border-gray-300 p-2">Number of Bookings</th>
            <th className="border border-gray-300 p-2">Number of Cancellations</th>
            <th className="border border-gray-300 p-2">Playpoints</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data; replace with actual data */}
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className="hover:bg-gray-100 text-[#01031A] text-sm">
              <td className="border border-gray-300 p-2 text-center text-[#01031A] text-xs">{index + 1}</td>
              <td className="border border-gray-300 p-2 text-[#01031A] text-xs">oyinkansola@gmail.com</td>
              <td className="border border-gray-300 p-2 text-center text-[#01031A] text-xs">07060648468</td>
              <td className="border border-gray-300 p-2 text-center text-[#01031A] text-xs">30</td>
              <td className="border border-gray-300 p-2 text-center text-[#01031A] text-xs"><span className="bg-[#4F772D] text-white px-6 py-1 rounded-lg">3</span></td>
              <td className="border border-gray-300 p-2 text-center text-[#01031A] text-xs">20</td>
              <td className="border border-gray-300 p-2 text-center text-[#01031A] text-xs">Suspended</td>
            </tr>
          ))}
        </tbody>
      </table> 
    </div>
  );
};

export default UserManagement;
