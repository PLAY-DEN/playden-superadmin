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
    <div className="bg-white rounded-lg shadow-md relative ml-72 p-8 mt-24">
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

      <div className="mt-12 ml-20">
        <h2 className="text-xl font-semibold">{adminDetails.name}</h2>
        <p className="text-gray-500">{adminDetails.id}</p>
      </div>

      <div className="mt-[-20px] flex flex-row ml-24">
        <div>
          <h2 className="ml-60 mt-14 font-bold">Admin Details</h2>
          <img
            src={bookingImg}
            alt={`${adminDetails.name}'s profile`}
            className="mt-[-18px]"
          />
        </div>

        <div className="text-[#333543] text-xs mt-24 gap-4 ml-[-90px] flex flex-col">
          <div className="flex gap-32">
            <span className="font-semibold">Date Joined:</span>
            <span>{adminDetails.dateJoined}</span>
          </div>
          <div className="flex gap-32">
            <span className="font-semibold">Mobile Number:</span>
            <span>{adminDetails.mobileNumber}</span>
          </div>
          <div className="flex gap-28">
            <span className="font-semibold">Email Address:</span>
            <span>{adminDetails.email}</span>
          </div>
          <div className="flex gap-32">
            <span className="font-semibold">Pitch Owned:</span>
            <span>{adminDetails.pitchOwned}</span>
          </div>
          <div className="flex gap-36">
            <span className="font-semibold">Bank Name:</span>
            <span>{adminDetails.bankName}</span>
          </div>
          <div className="flex gap-36">
            <span className="font-semibold">Bank Details:</span>
            <span>{adminDetails.bankDetails}</span>
          </div>
        </div>
      </div>

      <div className='mt-5 ml-80 flex flex-row gap-3'>
        <button className="h-[38px] w-[140px] text-xs px-4 py-2 bg-playden-primary text-white rounded-lg cursor-pointer">
          Edit Admin
        </button>
        <button className="h-[38px] w-[140px] text-xs px-4 py-2 bg-[#8F55A2] text-white rounded-lg cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminDetails;
