import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchBookingDetails } from '../redux/bookingManagementSlice';
import { bookingImg } from '../assets/images';

const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  
  const dispatch = useDispatch();
  
  // Fetching booking details from Redux state
  const { bookingDetails, loading, error } = useSelector((state: RootState) => state.bookingMgt);
  
  // Fetch booking details when the booking ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchBookingDetails(id)); //  action to fetch booking details by ID
    }
  }, [dispatch, id]);
  // console.log(bookingDetails);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  
  if (!bookingDetails) return <p>No booking details found.</p>;


  //Most of the required Datas are not in the API Data.

  return (
    <div className="bg-white relative ml-72 p-8 mt-24">
      <div className="flex flex-row justify-between w-full">
        <h2 className="text-2xl text-[#01031A] font-bold mb-6">Booking Confirmation</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">{bookingDetails.booking_code || 'N/A'}</h2>
        <p className="text-gray-500">{bookingDetails.id}</p>
      </div>

      <div className="mt-[-20px] flex flex-row">
        <div>
          <h2 className="ml-60 mt-14 font-bold">Booking Details</h2>
          <img
            src={bookingImg}
            alt={`${bookingDetails.user?.username}'s profile`}
            className="mt-[-18px]"
          />
        </div>

        <div className="text-[#333543] text-xs mt-24 ml-[-120px]">
          <table className="w-full">
            <tbody>
              <tr className="border-none">
                <td className="font-semibold pr-8 py-2">Date of Booking:</td>
                <td>{bookingDetails.date}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold pr-8 py-2">Mobile Number:</td>
                <td>{bookingDetails.user?.phone_number || 'N/A'}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold pr-8 py-2">Email Address:</td>
                <td>{bookingDetails.user?.email || 'N/A'}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold pr-8 py-2">Sport Choice:</td>
                <td>{bookingDetails.sport || 'N/A'}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold pr-8 py-2">Pitch:</td>
                <td>{bookingDetails.name || 'N/A'}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold pr-8 py-2">Amount Paid:</td>
                <td className="font-bold">{bookingDetails.total_cost || 'N/A'}</td>
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
