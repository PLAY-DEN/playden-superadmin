import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../utils/apiClient";
import API_ENDPOINTS from "../../api/client/_endpoint";
import { formatDate } from "../../utils/utils";
import { useEffect, useState } from "react";
import AdminFormModal from "../../components/user/AdminFormModel";
import NotFoundPage from "../../components/not-found-page";
import { FaArrowLeft } from "react-icons/fa";
import BackButton from "../../components/BackButton";
import LoadingPage from "../../components/loading-page";

const defaultValue = {
  username: "",
  phone_number: "",
  full_name: "",
  email: "",
  address: "",
  password: "",
  user_role: "",
};

const AdminDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(defaultValue);
  const [formErrors, setFormErrors] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(true); // Set true by default for loading state
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<{ [key: string]: any } | null>(null);

  const getUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient(
        `${API_ENDPOINTS.GET_USERS}/${userId}`,
        "GET"
      );
      setUser(response?.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getUser(id);
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        phone_number: user.phone_number || "",
        full_name: user.full_name || "",
        email: user.email || "",
        address: user.address || "",
        password: "",
        user_role: user.user_role[0] || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { password, ...data } = formData;
    try {
      await apiClient(
        `${API_ENDPOINTS.GET_USERS}/${user?.id}?_method=PUT`,
        "POST",
        data
      );
      toast.success("Pitch Admin updated successfully");
      setShowModal(false);
      setFormErrors(defaultValue);
    } catch (error: any) {
      const errors = error.response?.data?.data;
      if (errors) {
        setFormErrors(errors);
      }
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAdmin = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (!confirmDelete) return;

    try {
      await apiClient(`${API_ENDPOINTS.GET_USERS}/${user?.id}`, "DELETE");
      toast.success("Admin deleted successfully");
      navigate("/pitch-admin-management");
    } catch (error: any) {
      toast.error(error.response?.data.message || "Something went wrong");
    }
  };

  if (isLoading) return <LoadingPage />;

  if (!user) return <NotFoundPage errorMessage="User data not available" />;

  return (
    <div className="bg-white p-8 rounded-lg">
      <ToastContainer />
      <BackButton />

      <div className="mt-10">
        <h2 className="text-xl font-semibold">
          {user.full_name
            ? `Full name: ${user.full_name}`
            : `Username: ${user.username}`}
        </h2>
      </div>

      <div className="flex flex-row">
        <div className="text-[#333543] text-xs mt-12">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold">Date Joined:</td>
                <td className="py-2">{formatDate(user.created_at)}</td>
              </tr>
              <tr>
                <td className="font-semibold">Mobile Number:</td>
                <td className="py-2">{user.phone_number || "N/A"}</td>
              </tr>
              <tr>
                <td className="font-semibold">Email Address:</td>
                <td className="py-2">{user.email || "N/A"}</td>
              </tr>
              <tr>
                <td className="font-semibold">User Role:</td>
                <td className="py-2">{user.user_role[0].replace("_", " ")}</td>
              </tr>
              <tr>
                <td className="font-semibold">Bank Name:</td>
                <td className="py-2">{user.bank_name || "N/A"}</td>
              </tr>
              <tr>
                <td className="font-semibold">Bank Details:</td>
                <td className="py-2">
                  {user.account_number && user.account_holder_name
                    ? `${user.account_holder_name} (${user.account_number})`
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-[20px] flex flex-row gap-3">
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
