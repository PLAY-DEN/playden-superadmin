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
    <div className="bg-white relative ml-72 p-8 mt-24">
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
        <div className='mt-10'>
          <h2 className="text-xl font-semibold">{bookingDetails.name}</h2>
          <p className="text-gray-500">{bookingDetails.id}</p>
        </div>
      <div className="mt-[-20px] flex flex-row">
        <div>
           <h2 className='ml-60 mt-14 font-bold'>Booking Details</h2>
          <img
             src={bookingImg}
             alt={`${bookingDetails.name}'s profile`}
             className="mt-[-18px]"
           />
        </div>
        <div className='text-[#333543] text-xs mt-24 ml-[-120px]'>
  <table className="w-full">
    <tbody>
      <tr className="border-none">
        <td className="font-semibold pr-8 py-2">Date of Booking:</td>
        <td>{bookingDetails.dateOfBooking}</td>
      </tr>
      <tr className="border-none">
        <td className="font-semibold pr-8 py-2">Mobile Number:</td>
        <td>{bookingDetails.mobileNumber}</td>
      </tr>
      <tr className="border-none">
        <td className="font-semibold pr-8 py-2">Email Address:</td>
        <td>{bookingDetails.email}</td>
      </tr>
      <tr className="border-none">
        <td className="font-semibold pr-8 py-2">Sport Choice:</td>
        <td>{bookingDetails.sportChoice}</td>
      </tr>
      <tr className="border-none">
        <td className="font-semibold pr-8 py-2">Pitch:</td>
        <td>{bookingDetails.pitch}</td>
      </tr>
      <tr className="border-none">
        <td className="font-semibold pr-8 py-2">Amount Paid:</td>
        <td className="font-bold">{bookingDetails.amountPaid}</td>
      </tr>
    </tbody>
  </table>
</div>

     </div>

      <button className="mt-6 ml-60 h-[38px] w-[140px] text-xs px-4 py-2 bg-playden-primary text-white rounded-lg hover:bg-purple-900">
        Confirm Booking
      </button>
    </div>
  );
};
export default BookingDetails;
