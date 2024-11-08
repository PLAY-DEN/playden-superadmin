import React from 'react';
import { Link } from 'react-router-dom';

const bookings = [
  { id: 1, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 2, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 3, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 4, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 5, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 6, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 7, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 8, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 9, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 10, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 11, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 12, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 13, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 14, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 15, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 16, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 17, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 18, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 19, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
  { id: 20, name: "Oyinkansola Salaye", bookingId: "#445064", phoneNumber: "07060496488", status: "Confirmed", date: "8/8/2024", pitch: "PLUTO" },
];

const BookingManagement: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md relative ml-72 p-8 mt-20 overflow-auto">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl text-[#01031A] font-bold mb-6">Booking Confirmation </h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">last 30 days</option>
        </select>
      </div>

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
              <td className="border-b p-4 text-sm">{booking.name}</td>
              <td className="border-b p-4 text-sm">{booking.bookingId}</td>
              <td className="border-b p-4 text-sm">{booking.phoneNumber}</td>
              <td className="border-b p-4 text-sm">
                <span className={`p-2 rounded-2xl ${booking.status === "Confirmed" ? "bg-[#4F772D] text-white text-sm" : "bg-red-500 text-white"}`}>
                  {booking.status}
                </span>
              </td>
              <td className="border-b p-4 text-sm">{booking.date}</td>
              <td className="border-b p-4 text-sm">{booking.pitch}</td>
              <td className="border-b p-4 text-sm">
                <Link to={`/booking-management/${booking.id}`} className="text-black font-semibold">View details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
