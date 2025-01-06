import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { formatDate } from "../../utils/utils";
import NotFoundPage from "../../components/not-found-page";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user: any = useSelector((state: RootState) =>
    state.users.data.users?.find((user: any) => user.id === Number(id))
  );

  if (!user) {
    return <NotFoundPage errorMessage="User details cannot found" />;
  }

  return (
    <div className="bg-white p-8 rounded-lg">
      {/* Header */}
      <div className="flex justify-between w-full mb-6">
        <h2 className="text-2xl font-bold text-[#01031A]">User Details</h2>
        <select
          name="days"
          id="options"
          className="w-36 h-10 text-[16px] font-bold text-[#141B34] bg-[#8F55A224] border border-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>

      {/* User Info Section */}
      <div className="mt-10 flex">
        {/* Profile Image & Basic Info */}
        <div>
          <img
            src={
              user.profile_image ||
              "https://cdn.iconscout.com/icon/free/png-512/free-profile-icon-download-in-svg-png-gif-file-formats--communication-community-people-glyph-pack-network-icons-1254808.png?f=webp&w=512"
            }
            alt={`${user.username}'s profile`}
            className="w-52 h-58 mb-4"
          />
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-500">User ID: {user.id}</p>
        </div>

        {/* User Details Table */}
        <div className="ml-12 text-[#333543] text-sm">
          <h3 className="mb-4 font-bold text-lg">User Details</h3>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold py-2">Date Joined:</td>
                <td className="pl-5">{formatDate(user.created_at)}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2">Number of Bookings:</td>
                <td className="pl-5">{user.bookings_count}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2">Number of Cancellations:</td>
                <td className="pl-5">{user.cancelled_bookings_count}</td>
              </tr>
              {/* <tr>
                <td className="font-semibold py-2">Last Booking:</td>
                <td className="pl-5">{user.updated_at}</td>
              </tr> */}
              <tr>
                <td className="font-semibold py-2">Email Address:</td>
                <td className="pl-5">{user.email}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2">Mobile Number:</td>
                <td className="pl-5">{user.phone_number}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2">Play Points:</td>
                <td className="pl-5">{user.cashbacks_sum_coins || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="mt-12 flex gap-4">
        <button className="px-6 py-2 bg-playden-primary text-white rounded-lg text-xs h-[38px] w-[140px]">
          Suspend
        </button>
        <button className="px-6 py-2 bg-[#8F55A2] text-white rounded-lg text-xs h-[38px] w-[140px]">
          Ban/Delete
        </button>
      </div> */}
    </div>
  );
};

export default UserDetails;
