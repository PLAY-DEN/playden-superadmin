import { useParams } from 'react-router-dom';
import { bookingImg } from '../assets/images';

const adminDetails = {
  id: "#446664",
  name: "Oyinkansola Soleye",
  dateJoined: "20 Dec, 2024",
  mobileNumber: "+234 7060496488",
  email: "oyinkansola@gmail.com",
  pitchOwned: "Plutos clubhouse field",
  bankName: "Access Bank",
  bankDetails: "123456489",
};

const AdminDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="bg-white relative ml-72 p-8 mt-24">
      <div className="flex flex-row justify-between w-full">
        <h2 className="text-2xl text-[#01031A] font-bold mb-6">Admin Details</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Showing 12</option>
        </select>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">{adminDetails.name}</h2>
        <p className="text-gray-500">{adminDetails.id}</p>
      </div>

      <div className="flex flex-row">
        <div>
          <h2 className="ml-60 mt-5 font-bold">Admin Details</h2>
          <img
            src={bookingImg}
            alt={`${adminDetails.name}'s profile`}
            className="mt-[-5px]"
          />
        </div>

        <div className="text-[#333543] text-xs mt-12 ml-[-95px]">
             <table className="w-full">
                <tbody>
                    <tr className="border-none">
                        <td className="font-semibold">Date Joined:</td>
                        <td className='pl-5 py-2'>{adminDetails.dateJoined}</td>
                    </tr>
                    <tr className="border-none">
                        <td className="font-semibold">Mobile Number:</td>
                        <td className='pl-5 py-2'>{adminDetails.mobileNumber}</td>
                    </tr>
                    <tr className="border-none">
                        <td className="font-semibold">Email Address:</td>
                        <td className='pl-5 py-2'>{adminDetails.email}</td>
                    </tr>
                    <tr className="border-none">
                        <td className="font-semibold">Pitch Owned:</td>
                        <td className='pl-5 py-2'>{adminDetails.pitchOwned}</td>
                    </tr>
                    <tr className="border-none">
                        <td className="font-semibold">Bank Name:</td>
                        <td className='pl-5 py-2'>{adminDetails.bankName}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Bank Details:</td>
                        <td className='pl-5 py-2'>{adminDetails.bankDetails}</td>
                    </tr>
                </tbody>
            </table>
          </div>
      <div className='mt-[280px] flex flex-row gap-3 ml-[-280px]'>
        <button className="h-[38px] w-[140px] text-xs px-4 py-2 bg-playden-primary text-white rounded-lg cursor-pointer">
          Edit Admin
        </button>
        <button className="h-[38px] w-[140px] text-xs px-4 py-2 bg-[#8F55A2] text-white rounded-lg cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  </div>
  );
};

export default AdminDetails;
