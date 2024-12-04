import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCancellations } from "../../redux/cancellationSlice"; // Import the thunk
import { Home7, Ellipse } from "../../assets/images";
import Pagination from "../../components/pagination";

const CancellationManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { bookings = [], statistics = {}, loading, error } = useSelector(
    (state) => state.cancellations
  );

  useEffect(() => {
    dispatch(fetchCancellations());
  }, [dispatch]);

  return (
    <div className="bg-white relative ml-72 p-8 mt-20 overflow-auto">
      {/* Header and Filter */}
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Cancellation</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="min-w-[320px] h-[180px] bg-[#D29AB8] rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{statistics.cancelled_bookings || 0}</p>
            <p>Today’s Cancellations</p>
          </div>
          <img
            src={Ellipse}
            alt=""
            className="object-cover mt-[-68px] w-[110px] h-[110px]"
          />
        </div>
      </div>

      {/* Cancellation Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4">S/N</th>
              <th className="border-b p-4">Pitch Name</th>
              <th className="border-b p-4">Booking Code</th>
              <th className="border-b p-4">Contact</th>
              <th className="border-b p-4">Status</th>
              <th className="border-b p-4">Date</th>
              <th className="border-b p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td className="border-b p-4 text-sm">{index + 1}</td>
                  <td className="border-b p-4 text-sm">{booking.pitch?.name || "N/A"}</td>
                  <td className="border-b p-4 text-sm">{booking.booking_code}</td>
                  <td className="border-b p-4 text-sm">{booking.contact}</td>
                  <td className="border-b p-4 text-sm">
                    <span className={`p-2 rounded-2xl text-sm ${booking.status === "cancelled" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="border-b p-4 text-sm">{booking.date}</td>
                  <td className="border-b p-4 text-sm">
                    <Link
                      to={`/cancellation-details/${booking.id}`}
                      className="text-black font-semibold"
                    >
                      View details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-sm">
                  No cancellations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Pagination />
    </div>
  );
};

export default CancellationManagement;
