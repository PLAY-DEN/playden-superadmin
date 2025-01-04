import { toast, ToastContainer } from 'react-toastify';
import { bookingImg } from '../../assets/images';
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from '../../utils/apiClient';
import API_ENDPOINTS from '../../api/client/_endpoint';
import { formatDate } from '../../utils/utils';
import { useEffect, useState } from 'react';
import AdminFormModal from '../../components/user/AdminFormModel';

const defaultValue = {
  username: "",
  phone_number: "",
  full_name: "",
  email: "",
  address: "",
  password: "",
  user_role: ""
};

const AdminDetails: React.FC = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState(defaultValue);

  const [formErrors, setFormErrors] = useState(defaultValue);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!user) {
    return <div>User data not available.</div>;
  }

  useEffect(() => {

    setFormData({
      username: user.username || "",
      phone_number: user.phone_number || "",
      full_name: user.full_name || "",
      email: user.email || "",
      address: user.address || "",
      password: "", // Assuming password is not retrieved for security reasons
      user_role: user.user_role || ""
    })
    return () => {

    }
  }, [user])


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { name: string; value: string }
  ) => {
    const { name, value } = "target" in e ? e.target : e;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient(`${API_ENDPOINTS.GET_USERS}/${user.id}?_method=PUT`, "POST", formData);
      toast.success("Pitch Admin created successfully");
      setShowModal(false);
      setFormErrors(defaultValue);
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

  // Handle Delete Admin
  const handleDeleteAdmin = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    if (!confirmDelete) return;

    try {
      await apiClient(API_ENDPOINTS.GET_USERS + `/${user.id}`, "DELETE");
      toast.success("Admin deleted successfully");
      navigate("/pitch-admin-management"); // Navigate to admin list or another page after deletion
    } catch (error: any) {
      toast.error(error.response?.data.message || "Something went wrong");
    }
  };


  return (
    <div className="bg-white relative ml-72 p-8 mt-24">
      <ToastContainer />
      {/* Header */}
      <div className="flex flex-row justify-between w-full">
        <h2 className="text-2xl text-[#01031A] font-bold mb-6">Admin Details</h2>
      </div>

      {/* Admin Details */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">{user.full_name ? `Full name: ${user.full_name}` : `Username: ${user.username}`}</h2>
      </div>

      <div className="flex flex-row">
        {/* Profile Image */}
        <div>
          <h2 className="ml-60 mt-5 font-bold">Admin Details</h2>
          <img
            src={user.profile_image || bookingImg}
            alt={`${user.full_name || user.username}'s profile`}
            className="mt-[-5px] rounded-lg"
          />
        </div>

        {/* Details Table */}
        <div className="text-[#333543] text-xs mt-12 ml-[-95px]">
          <table className="w-full">
            <tbody>
              <tr className="border-none">
                <td className="font-semibold">Date Joined:</td>
                <td className="pl-5 py-2">{formatDate(user.created_at)}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold">Mobile Number:</td>
                <td className="pl-5 py-2">{user.phone_number}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold">Email Address:</td>
                <td className="pl-5 py-2">{user.email}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold">Pitch Owned:</td>
                <td className="pl-5 py-2">{user.pitchOwned}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold">Bank Name:</td>
                <td className="pl-5 py-2">{user.bankName}</td>
              </tr>
              <tr className="border-none">
                <td className="font-semibold">Bank Details:</td>
                <td className="pl-5 py-2">{user.bankDetails}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Action Buttons */}
        <div className="mt-[280px] flex flex-row gap-3 ml-[-280px]">
          <button
            onClick={() => setShowModal(true)}
            className="h-[38px] w-[140px] text-xs px-4 py-2 bg-playden-primary text-white rounded-lg cursor-pointer"
          >
            Edit Admin
          </button>
          <button
            onClick={handleDeleteAdmin}
            className="h-[38px] w-[140px] text-xs px-4 py-2 bg-[#8F55A2] text-white rounded-lg cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      {showModal && (
        <AdminFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleFormSubmit}
          formData={formData}
          formErrors={formErrors}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
          isEditMode={true}
        />
      )}

    </div>
  );
};

export default AdminDetails;
