import { useParams } from 'react-router-dom';
import { bookingImg } from '../assets/images';

// Sample data (Replace with actual data fetching if needed)
const bookingDetails = {
  id: "#445064",
  name: "Oyinkansola Saleye",
  dateOfBooking: "12 Dec, 2024",
  mobileNumber: "+234 7060496488",
  email: "zabkulut23@gmail.com",
  sportChoice: "Football",
  pitch: "Plutos Football Pitch",
  amountPaid: "₦10,000.00",
};

const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="bg-white rounded-lg shadow-md relative ml-72 p-8 mt-24">
        <div className='flex flex-row justify-between w-full'>
            <h2 className="text-2xl text-[#01031A] font-bold mb-6">Booking Confirmation </h2>
            <select
               name="days"
               id="options"
               className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
              >
              <option value="days">last 30 days</option>
           </select>
        </div>
        <div className='mt-20 ml-20'>
          <h2 className="text-xl font-semibold">{bookingDetails.name}</h2>
          <p className="text-gray-500">{bookingDetails.id}</p>
        </div>
      <div className="mt-[-20px] flex flex-row ml-24">
        <div>
           <h2 className='ml-60 mt-14 font-bold'>Booking Details</h2>
          <img
             src={bookingImg}
             alt={`${bookingDetails.name}'s profile`}
             className="mt-[-18px]"
           />
        </div>
        <div className='text-[#333543] text-xs mt-24 gap-4 ml-[-120px] flex flex-col'>
        <div className="flex gap-32">
          <span className="font-semibold">Date of Booking:</span>
          <span>{bookingDetails.dateOfBooking}</span>
        </div>
        <div className="flex gap-32">
          <span className="font-semibold">Mobile Number:</span>
          <span>{bookingDetails.mobileNumber}</span>
        </div>
        <div className="flex gap-36">
          <span className="font-semibold">Email Address:</span>
          <span>{bookingDetails.email}</span>
        </div>
        <div className="flex gap-40">
          <span className="font-semibold">Sport Choice:</span>
          <span>{bookingDetails.sportChoice}</span>
        </div>
        <div className="flex gap-52">
          <span className="font-semibold">Pitch:</span>
          <span>{bookingDetails.pitch}</span>
        </div>
        <div className="flex gap-40">
          <span className="font-semibold">Amount Paid:</span>
          <span className='font-bold'>{bookingDetails.amountPaid}</span>
        </div>
        </div>
     </div>

      <button className="mt-6 ml-72 h-[38px] w-[140px] text-xs px-4 py-2 bg-playden-primary text-white rounded-lg hover:bg-purple-900">
        Confirm Booking
      </button>
    </div>
  );
};
export default BookingDetails;
