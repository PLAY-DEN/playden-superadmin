import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  fetchBookingsMgt,
  setCurrentPage,
} from "../../redux/bookingManagementSlice";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";
import Input from "../../components/forms/input";
import LoadingPage from "../../components/loading-page";
import { formatDate } from "../../utils/utils";

const BookingManagement: React.FC = () => {
  const dispatch: any = useDispatch();
  const { bookings, loading, currentPage, lastPage } = useSelector(
    (state: RootState) => state.bookingMgt
  );
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Handle search query with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setDebouncedSearch(searchQuery);
    }, 1000);
    return () => {
      clearTimeout(timer);
      setIsLoading(true);
    };
  }, [searchQuery]);

  // Fetch bookings when page or search query changes
  useEffect(() => {
    dispatch(fetchBookingsMgt({ page: currentPage, search: debouncedSearch }));
  }, [dispatch, currentPage, debouncedSearch]);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading || isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-white p-8 rounded-lg mb-20">
      {/* Header and Search */}
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Bookings</h2>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search bookings..."
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
        />
      </div>

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
                <td className="border-b p-4 text-sm">
                  {booking.user?.username || "N/A"}
                </td>
                <td className="border-b p-4 text-sm">{booking.booking_code}</td>
                <td className="border-b p-4 text-sm">
                  {booking.user?.phone_number || "N/A"}
                </td>
                <td className="border-b p-4 text-sm">
                  <span
                    className={`p-2 rounded-2xl ${
                      booking.status.toLowerCase() === "confirmed" ||
                      booking.status.toLowerCase() === "completed"
                        ? "bg-[#4F772D] text-white text-sm"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="border-b p-4 text-sm">{formatDate(booking.date)}</td>
                <td className="border-b p-4 text-sm">
                  {booking.pitch?.name || "N/A"}
                </td>
                <td className="border-b p-4 text-sm">
                  <Link
                    to={`/booking-management/${booking.id}`}
                    className="text-black font-semibold"
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={lastPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookingManagement;
