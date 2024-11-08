import { useParams } from 'react-router-dom';
import { bookingImg } from '../assets/images';

const UserDetails = {
  id: "#446664",
  name: "Oyinkansola Soleye",
  dateJoined: "20 Dec, 2024",
  numberOfBooking: "10",
  numberOfCancellation: "5",
  lastBooking: "10",
  lastCancellation: "5",
  email: "zakregular12@gmail.com",
  mobileNumber: "+234 7066048648",
  playpoints: "Earned",
};

const userDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="bg-white rounded-lg shadow-md relative ml-72 p-8 mt-24">
      <div className="flex flex-row justify-between w-full">
        <h2 className="text-2xl text-[#01031A] font-bold mb-6">User Details</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>
      
      <div className="mt-12 ml-20">
        <h2 className="text-xl font-semibold">{UserDetails.name}</h2>
        <p className="text-gray-500">{UserDetails.id}</p>
      </div>
      
      <div className="mt-[-20px] flex flex-row ml-24">
        <div>
          <h2 className="ml-60 mt-14 font-bold">User Details</h2>
          <img
            src={bookingImg}
            alt={`${UserDetails.name}'s profile`}
            className="mt-[-18px]"
          />
        </div>
        
        <div className="text-[#333543] text-xs mt-24 gap-4 ml-[-90px] flex flex-col">
          <div className="flex gap-32">
            <span className="font-semibold">Date joined:</span>
            <span>{UserDetails.dateJoined}</span>
          </div>
          <div className="flex gap-24">
            <span className="font-semibold">Number of booking:</span>
            <span>{UserDetails.numberOfBooking}</span>
          </div>
          <div className="flex gap-20">
            <span className="font-semibold">Number of cancellation:</span>
            <span>{UserDetails.numberOfCancellation}</span>
          </div>
          <div className="flex gap-32">
            <span className="font-semibold">Last Booking:</span>
            <span>{UserDetails.lastBooking}</span>
          </div>
          <div className="flex gap-28">
            <span className="font-semibold">Last cancellation:</span>
            <span>{UserDetails.lastCancellation}</span>
          </div>
          <div className="flex gap-28">
            <span className="font-semibold">Email address:</span>
            <span>{UserDetails.email}</span>
          </div>
          <div className="flex gap-24">
            <span className="font-semibold">Mobile number:</span>
            <span>{UserDetails.mobileNumber}</span>
          </div>
          <div className="flex gap-32">
            <span className="font-semibold">Play points:</span>
            <span>{UserDetails.playpoints}</span>
          </div>
        </div>
      </div>
      
      <div className='mt-5 ml-80 flex flex-row gap-3'>
           <button className="h-[38px] w-[140px] text-xs px-4 py-2 bg-playden-primary text-white rounded-lg cursor-pointer">
                Suspend
           </button>
           <button className="h-[38px] w-[140px] text-xs px-4 py-2 bg-[#8F55A2] text-white rounded-lg cursor-pointer">
                 Ban/Delete
           </button>
      </div>
    </div>
  );
};

export default userDetails;
