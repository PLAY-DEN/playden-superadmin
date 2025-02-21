import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/utils";
import NotFoundPage from "../../components/not-found-page";
import BackButton from "../../components/BackButton";
import AddPlayPointModel from "../../components/user/AddPlayPointModel";
import { toast, ToastContainer } from "react-toastify";
import { apiClient } from "../../utils/apiClient";
import API_ENDPOINTS from "../../api/client/_endpoint";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: any }>({});
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<{ [key: string]: any }>({});

  const getUser = async (userId: any) => {
    const response = await apiClient(
      `${API_ENDPOINTS.GET_USERS}/${userId}`,
      "GET"
    );
    setUser(response?.data);
  };

  useEffect(() => {
    getUser(id);
  }, [id]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | { name: string; value: string }
  ) => {
    const { name, value } = "target" in e ? e.target : e;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlayPoint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.playpoint_amount == null) {
      setFormErrors((p) => ({ ...p, playpoint_amount: "Amount is required" }));
      return;
    }
    setIsLoading(true);
    try {
      await apiClient(`${API_ENDPOINTS.ADD_PLAYPOINT}`, "POST", {
        ...formData,
        user_id: user.id,
      });
      toast.success("Added successfully");
      setShowModal(false);
      setFormErrors({});
      getUser(id);
    } catch (error: any) {
      const errors = error.response?.data?.data;
      if (errors) {
        setFormErrors(errors); // Update formErrors state with server errors
      }
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAdmin = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await apiClient(API_ENDPOINTS.GET_USERS + `/${user.id}`, "DELETE");
      toast.success("Admin deleted successfully");
      navigate("/user-management"); // Navigate to admin list or another page after deletion
    } catch (error: any) {
      toast.error(error.response?.data.message || "Something went wrong");
    }
  };

  const handleSuspendUser = async (isR = false) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to suspend this user?"
    );
    if (!confirmDelete) return;

    try {
      if (isR) {
        await apiClient(`api/v1/user/un-suspend/${user.id}`, "POST");
        toast.success("Admin un-suspended successfully");
      } else {
        await apiClient(`api/v1/user/suspend/${user.id}`, "DELETE");
        toast.success("Admin suspended successfully");
      }
      getUser(id); // Reload the user details after suspension/unsuspension
    } catch (error: any) {
      toast.error(error.response?.data.message || "Something went wrong");
    }
  };

  const formatDateSafe = (date: string) => {
    const parsedDate = new Date(date);
    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      return "Invalid Date"; // You can return a fallback message
    }
    return formatDate(parsedDate.toISOString()); // Your existing formatDate logic
  };

  if (!user || !user.user_role) {
    return <NotFoundPage errorMessage="User details cannot found" />;
  }

  return (
    <div className="bg-white p-8 rounded-lg">
      <ToastContainer />
      <BackButton />
      {/* Header */}
      <div className="flex justify-between w-full mb-6">
        <h2 className="text-2xl font-bold text-[#01031A]">User Details</h2>
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
            className="w-52 h-58 mb-4 rounded-lg"
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
                <td className="pl-5">{formatDateSafe(user.created_at)}</td>
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
              <tr className="border-none">
                <td className="font-semibold py-2">User Role:</td>
                <td className="pl-5">
                  {user?.user_role}
                  {/* {JSON.parse(user?.user_role)[0]
                    .replace("_", " ")
                    .toUpperCase()} */}
                </td>
              </tr>
              <tr>
                <td className="font-semibold py-2">Play Points:</td>
                <td className="pl-5">{user.cashbacks_sum_coins || 0}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2">Status:</td>
                <td className="pl-5">
                  {user.deleted_at ? (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
                      Suspended
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                      Active
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr className="my-12 "/>
      {/* Action Buttons */}
      <div className="flex gap-4">
        {!user.deleted_at ? (
          <button
            onClick={() => handleSuspendUser(false)}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg text-xs h-[38px] w-[140px]"
          >
            Suspend
          </button>
        ) : (
          <button
            onClick={() => handleSuspendUser(true)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg text-xs h-[38px] w-[140px]"
          >
            Unsuspend
          </button>
        )}
        <button
          onClick={handleDeleteAdmin}
          className="px-6 py-2 bg-[#e34c4c] text-white rounded-lg text-xs h-[38px] w-[140px]"
        >
          Delete
        </button>
      </div>
      <div className="mt-5 flex gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-playden-primary text-white rounded-lg text-xs h-[38px] w-[140px]"
        >
          Add PlayPoint
        </button>
        {/* <button className="px-6 py-2 bg-[#8F55A2] text-white rounded-lg text-xs h-[38px] w-[140px]">
          Delete
        </button> */}
      </div>

      {showModal && (
        <AddPlayPointModel
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddPlayPoint}
          formData={formData}
          formErrors={formErrors}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default UserDetails;
