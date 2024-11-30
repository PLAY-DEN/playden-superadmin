import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchBookingsMgt, setCurrentPage } from '../../redux/bookingManagementSlice';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination';

const BookingManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error, currentPage, lastPage } = useSelector(
    (state: RootState) => state.bookingMgt
  );

  // Fetch bookings when the page changes
  useEffect(() => {
    dispatch(fetchBookingsMgt({ page: currentPage, limit: 15 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    dispatch(fetchBookingsMgt({ page: newPage, limit: 15 }));
  };

  return (
    <div className="bg-white relative ml-72 p-8 mt-20 overflow-auto">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl text-[#01031A] font-bold mb-6">Booking Confirmation</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {Array.isArray(bookings) && bookings.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4">S/N</th>
              <th className="border-b p-4">Name</th>
              <th className="border-b p-4">Booking ID</th>
              <th className="border-b p-4">Phone Number</th>
              <th className="border-b p-4">Status</th>
              <th className="border-b p-4">Date</th>
              <th className="border-b p-4">Pitch</th>
              <th className="border-b p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <td className="border-b p-4 text-sm">{index + 1}</td>
                <td className="border-b p-4 text-sm">{booking.user?.username || 'N/A'}</td>
                <td className="border-b p-4 text-sm">{booking.id}</td>
                <td className="border-b p-4 text-sm">{booking.user?.phone_number || 'N/A'}</td>
                <td className="border-b p-4 text-sm">
                  <span
                    className={`p-2 rounded-2xl ${
                      booking.status === 'Confirmed' ? 'bg-[#4F772D] text-white text-sm' : 'bg-red-500 text-white'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="border-b p-4 text-sm">{booking.date}</td>
                <td className="border-b p-4 text-sm">{booking.pitch?.name || 'N/A'}</td>
                <td className="border-b p-4 text-sm">
                  <Link to={`/booking-management/${booking.id}`} className="text-black font-semibold">
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={lastPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookingManagement;
