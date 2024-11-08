import { Home7, Ellipse, plus } from "../../assets/images"
import { useNavigate } from 'react-router-dom';

// Sample Data for Admin Summary Cards
const adminSummary = [
  { title: "Total Admins", amount: "300", color: "#D29AB8", imageSrc: Home7 },
  { title: "Total Spots", amount: "40", color: "#5A2C76", imageSrc: Home7 },
];

// Sample Data for Admin Table
const adminRecords = [
  { id: 1, name: "Sophie Super Admin", email: "sophieadmin@example.com", phoneNumber: "07066048448", pitchName: "Plutus clubhouse field", bankName: "Access Bank", bankDetails: "123456789" },
  { id: 2, name: "Sophie Super Admin", email: "sophieadmin@example.com", phoneNumber: "07066048448", pitchName: "Plutus clubhouse field", bankName: "Access Bank", bankDetails: "123456789" },
  { id: 3, name: "Sophie Super Admin", email: "sophieadmin@example.com", phoneNumber: "07066048448", pitchName: "Plutus clubhouse field", bankName: "Access Bank", bankDetails: "123456789" },
  { id: 4, name: "Sophie Super Admin", email: "sophieadmin@example.com", phoneNumber: "07066048448", pitchName: "Plutus clubhouse field", bankName: "Access Bank", bankDetails: "123456789" },
  { id: 5, name: "Sophie Super Admin", email: "sophieadmin@example.com", phoneNumber: "07066048448", pitchName: "Plutus clubhouse field", bankName: "Access Bank", bankDetails: "123456789" },
  { id: 6, name: "Sophie Super Admin", email: "sophieadmin@example.com", phoneNumber: "07066048448", pitchName: "Plutus clubhouse field", bankName: "Access Bank", bankDetails: "123456789" },
  { id: 7, name: "Sophie Super Admin", email: "sophieadmin@example.com", phoneNumber: "07066048448", pitchName: "Plutus clubhouse field", bankName: "Access Bank", bankDetails: "123456789" },
  { id: 8, name: "Sophie Super Admin", email: "sophieadmin@example.com", phoneNumber: "07066048448", pitchName: "Plutus clubhouse field", bankName: "Access Bank", bankDetails: "123456789" },
  { id: 9, name: "Sophie Super Admin", email: "sophieadmin@example.com", phoneNumber: "07066048448", pitchName: "Plutus clubhouse field", bankName: "Access Bank", bankDetails: "123456789" },
  { id: 10, name: "Sophie Super Admin", email: "sophieadmin@example.com", phoneNumber: "07066048448", pitchName: "Plutus clubhouse field", bankName: "Access Bank", bankDetails: "123456789" },
]

const PitchAdminManagement: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md relative ml-64 p-8 mt-20 overflow-auto">
      
      {/* Header Section */}
      <div className='flex flex-row justify-between'>
          <h2 className="text-2xl text-[#01031A] font-bold mb-4">Pitch Admin Management</h2>
            <div className='flex flex-row gap-2'>
               <p className='text-[#141B34] text-[17px] font-bold mt-2 ml-72'>showing</p>
                  <select
                      name="days"
                      id="options"
                      className="text-[17px] font-bold text-[#141B34] w-24 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
                      defaultValue={12}
                    >
                      <option value="days">12</option>
                  </select>
                </div>
                <button onClick={() => navigate('/add-new-admin')} className='flex flex-row gap-2 bg-playden-primary text-white font-semibold p-3 rounded-lg'>
                    <img src={plus} alt="" className='text-white font-bold mt-1' />
                    <p>Add New Pitch</p>
                </button>
            </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {adminSummary.map((item, index) => (
          <div
            key={index}
            className="w-[320px] h-[180px] rounded-md flex justify-between items-center"
            style={{ backgroundColor: item.color }}
          >
            <div className="flex flex-col ml-5 text-xs text-white">
              <img src={item.imageSrc} alt="" className="w-[52px] h-[52px]" />
              <p>{item.amount}</p>
              <p>{item.title}</p>
            </div>
            <img src={Ellipse} alt="" className="object-cover mt-[-66px] w-[110px] h-[110px]" />
          </div>
        ))}
      </div>

      {/* Admin Records Table */}
      <table className="w-full text-left text-[#01031A] text-sm font-semibold border-collapse mb-8">
        <thead>
          <tr>
            <th className="border-b p-4">S/N</th>
            <th className="border-b p-4">Name</th>
            <th className="border-b p-4">Email</th>
            <th className="border-b p-4">Phone Number</th>
            <th className="border-b p-4">Name of Pitch</th>
            <th className="border-b p-4">Bank Name</th>
            <th className="border-b p-4">Bank Details</th>
            <th className="border-b p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {adminRecords.map((record, index) => (
            <tr key={record.id}>
              <td className="border-b p-4 text-xs text-[#01031A]">{index + 1}</td>
              <td className="border-b p-4 text-xs text-[#01031A]">{record.name}</td>
              <td className="border-b p-4 text-xs text-[#01031A]">{record.email}</td>
              <td className="border-b p-4 text-xs text-[#01031A]">{record.phoneNumber}</td>
              <td className="border-b p-4 text-xs text-[#01031A]">{record.pitchName}</td>
              <td className="border-b p-4 text-xs text-[#01031A]">{record.bankName}</td>
              <td className="border-b p-4 text-xs text-[#01031A]">{record.bankDetails}</td>
              <td className="border-b p-4 text-sm text-playden-primary cursor-pointer">View Details</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button className="text-playden-primary">Previous</button>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
            <button key={page} className={`px-2 py-1 rounded ${page === 1 ? 'bg-playden-primary text-white' : 'bg-gray-100 text-black'}`}>
              {page}
            </button>
          ))}
        </div>
        <button className="text-playden-primary">Next</button>
      </div>
    </div>
  );
};

export default PitchAdminManagement;
