import { Home7, Ellipse } from "../../assets/images"; // Importing icons or placeholder images for card visuals

// Sample Data
const financialSummary = [
  { title: "Today Revenue", amount: "10,000,000", color: "#D29AB8" },
  { title: "Total Revenue", amount: "30,000,000", color: "#5A2C76" },
  { title: "Commissioned Playpoints", amount: "30", color: "#01031A" },
  { title: "Refunded Playpoints", amount: "10,000", color: "#D29AB8" },
//   { title: "Amount to Pitch Owners", amount: "50,000", color: "#5A2C76" },
//   { title: "Net Revenue", amount: "30,000,000", color: "#01031A" },
];

const financialRecords = [
  { id: 1, name: "Oyinkansola Salaye", accountNo: "#445564", amount: "₦50,000", status: "Pending", date: "8/8/2024" },
  { id: 2, name: "Oyinkansola Salaye", accountNo: "#445564", amount: "₦50,000", status: "Completed", date: "8/8/2024" },
  { id: 3, name: "Oyinkansola Salaye", accountNo: "#445564", amount: "₦50,000", status: "Completed", date: "8/8/2024" },
  { id: 4, name: "Oyinkansola Salaye", accountNo: "#445564", amount: "₦50,000", status: "Completed", date: "8/8/2024" },
  { id: 5, name: "Oyinkansola Salaye", accountNo: "#445564", amount: "₦50,000", status: "Completed", date: "8/8/2024" },
  { id: 6, name: "Oyinkansola Salaye", accountNo: "#445564", amount: "₦50,000", status: "Completed", date: "8/8/2024" },
  { id: 7, name: "Oyinkansola Salaye", accountNo: "#445564", amount: "₦50,000", status: "Completed", date: "8/8/2024" },
  { id: 8, name: "Oyinkansola Salaye", accountNo: "#445564", amount: "₦50,000", status: "Completed", date: "8/8/2024" },
];

const Financials: React.FC = () => {
  return (
    <div className="relative ml-64 p-8 mt-20 overflow-">
      
      {/* Header Section */}
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Financials</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-transparent bg-[#8F55A224] rounded-md" 
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {financialSummary.map((item, index) => (
          <div
            key={index}
            className="w-[251px] h-[134px] rounded-md flex justify-between items-center"
            style={{ backgroundColor: item.color }}
          >
            <div className="flex flex-col ml-5 text-xs text-white">
              <img src={Home7} alt="" className="w-[52px] h-[52px]" />
              <p>{item.amount}</p>
              <p>{item.title}</p>
            </div>
            <img src={Ellipse} alt="" className="object-cover mt-[-50px] w-[80px] h-[80px]" />
          </div>
        ))}
      </div>

      {/* Financial Records Table */}
      <table className="w-[800px] text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">S/N</th>
            <th className="border-b p-4">Name</th>
            <th className="border-b p-4">Account No</th>
            <th className="border-b p-4">Amount</th>
            <th className="border-b p-4">Status</th>
            <th className="border-b p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {financialRecords.map((record, index) => (
            <tr key={record.id}>
              <td className="border-b p-4 text-sm">{index + 1}</td>
              <td className="border-b p-4 text-sm">{record.name}</td>
              <td className="border-b p-4 text-sm">{record.accountNo}</td>
              <td className="border-b p-4 text-sm">{record.amount}</td>
              <td className="border-b p-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    record.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {record.status}
                </span>
              </td>
              <td className="border-b p-4 text-sm">{record.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-5 mt-[-490px] ml-[790px] text-white text-[12px]">
               <div className="w-[251px] h-[134px] bg-[#D29AB8] rounded-md flex justify-between items-center">
                    <div className="flex flex-col ml-5">
                        <img src={Home7} alt="" className='w-[52px] h-[52px]'/>
                        <p>10</p>
                        <p>Today Booking</p>
                   </div>
                  <img src={Ellipse} alt="" className='object-cover mt-[-52px] w-[80px] h-[80px]' />
              </div>
               <div className="w-[251px] h-[134px] bg-[#41244B] rounded-md flex justify-between items-center">
                    <div className="flex flex-col ml-5">
                        <img src={Home7} alt="" className='w-[52px] h-[52px]'/>
                        <p>10</p>
                        <p>Today Booking</p>
                   </div>
                  <img src={Ellipse} alt="" className='object-cover mt-[-50px] w-[80px] h-[80px]' />
              </div>
            </div>
    </div>
  );
};

export default Financials;
