import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingDetails } from "../../redux/bookingManagementSlice";
import { RootState } from "../../redux/store";
import { formatDate } from "../../utils/utils";
import LoadingPage from "../../components/loading-page";
import NotFoundPage from "../../components/not-found-page";
import BackButton from "../../components/BackButton";

const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: any = useDispatch();

  // Extracting state using Redux selector
  const { bookingDetails, loading } = useSelector(
    (state: RootState) => state.bookingMgt
  );

  // Fetch booking details on mount or when `id` changes
  useEffect(() => {
    if (id) {
      dispatch(fetchBookingDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!bookingDetails) {
    return <NotFoundPage errorMessage={"No booking details found."} />;
  }

  const {
    // id: bookingId,
    user_id,
    pitch_id,
    sport,
    date,
    start_time,
    end_time,
    tournament,
    notes,
    total_cost,
    sub_total,
    qr_code_path,
    used_cashback,
    booking_code,
    status,
    payment_reference,
    created_at,
    updated_at,
    meta,
    has_paid_owner,
    pitch_owner_due,
    admin_commission,
  } = bookingDetails;

  return (
    <div className="bg-white p-8 rounded-lg">
      <BackButton />
      <div className="flex justify-between w-full">
        <h2 className="text-2xl text-[#01031A] font-bold mb-6">
          Booking Details
        </h2>
      </div>

      {/* Booking Information */}
      <div className="grid grid-cols-2 gap-8">
        {/* Booking Info */}
        <div>
          <table className="table-auto text-sm text-gray-700">
            <tbody>
              <tr>
                <td className="font-semibold pr-4">Booking ID:</td>
                <td>{booking_code}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">User ID:</td>
                <td>{user_id}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Pitch ID:</td>
                <td>{pitch_id}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Sport:</td>
                <td>{sport}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Date:</td>
                <td>{formatDate(date)}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Time:</td>
                <td>{`${start_time} - ${end_time}`}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Tournament:</td>
                <td>{tournament ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Notes:</td>
                <td>{notes || "None"}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Total Cost:</td>
                <td>&#8358;{total_cost}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Sub Total:</td>
                <td>&#8358;{sub_total}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Status:</td>
                <td>{status}</td>
              </tr>
              <tr className="">
                <td className="font-semibold pr-4">Payment Reference:</td>
                <td className="font-extrabold text-red">
                  {payment_reference || "User has not made payment"}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Used Cashback:</td>
                <td>{used_cashback ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Created At:</td>
                <td>{formatDate(created_at)}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Updated At:</td>
                <td>{formatDate(updated_at)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Meta Information</h3>
          <table className="table-auto text-sm text-gray-700 mb-6">
            <tbody>
              <tr>
                <td className="font-semibold pr-4">New Total:</td>
                <td>&#8358;{meta?.new_total}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Sub Total:</td>
                <td>&#8358;{meta?.sub_total}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Remaining Cashback:</td>
                <td>&#8358;{meta?.remaining_cashback}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Total Cashback:</td>
                <td>&#8358;{meta?.total_cashback}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Pitch Owner Due:</td>
                <td>&#8358;{pitch_owner_due}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Admin Commission:</td>
                <td>&#8358;{admin_commission}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Has Paid Owner:</td>
                <td>{has_paid_owner ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="font-bold text-lg mb-4">QR Code</h3>
          <img
            src={`data:image/png;base64,${qr_code_path}`}
            alt="QR Code"
            className="w-40 h-40"
          />
        </div>
      </div>

      {/* Action Button */}
      {/* <button className="mt-6 h-[38px] w-[140px] text-xs px-4 py-2 bg-playden-primary text-white rounded-lg hover:bg-purple-900">
        Confirm Booking
      </button> */}
    </div>
  );
};

export default BookingDetails;
