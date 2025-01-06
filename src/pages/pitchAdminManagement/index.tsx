import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/PitchAdmin";
import { RootState } from "../../redux/store";
import { Home7, Ellipse, plus } from "../../assets/images";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";
import { toast, ToastContainer } from "react-toastify";
import { apiClient } from "../../utils/apiClient";
import API_ENDPOINTS from "../../api/client/_endpoint";
import Button from "../../components/forms/button";
import AdminFormModal from "../../components/user/AdminFormModel";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";

interface SummaryItem {
  title: string;
  amount: string | number;
  color: string;
  imageSrc: string;
}

const defaultValue = {
  username: "",
  phone_number: "",
  full_name: "",
  email: "",
  address: "",
  password: "",
  user_role: "",
};

const PitchAdminManagement: React.FC = () => {
  const dispatch: any = useDispatch();
  const { users, loading, error } =
    useSelector((state: RootState) => state.admin) || {};

  const [adminSummary, setAdminSummary] = useState<SummaryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(defaultValue);

  const [formErrors, setFormErrors] = useState(defaultValue);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (users?.data?.statistics) {
      const stats = users.data.statistics;
      setAdminSummary([
        {
          title: "Total Admins",
          amount: stats.users_by_role?.super_admin || 0,
          color: "#D29AB8",
          imageSrc: Home7,
        },
        {
          title: "Total Spots",
          amount: stats.total_users || 0,
          color: "#5A2C76",
          imageSrc: Home7,
        },
        {
          title: "Total Active Users",
          amount: stats.total_active_users || 0,
          color: "#9C27B0",
          imageSrc: Home7,
        },
        {
          title: "Users Joined Last 24 Hours",
          amount: stats.users_joined_last_24_hours || 0,
          color: "#673AB7",
          imageSrc: Home7,
        },
      ]);
    }
  }, [users]);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient(API_ENDPOINTS.GET_USERS, "POST", formData);
      toast.success("Pitch Admin created successfully");
      setShowModal(false);
      setFormData(defaultValue);
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

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  const adminUsers = (users?.data?.users || []).filter((user: any) => {
    const roleArray = JSON.parse(user.user_role);
    return ["super_admin", "pitch_owner", "pitch_manager"].includes(
      roleArray[0]
    );
  });

  return (
    <div className="bg-white p-8 rounded-lg mb-20">
      <ToastContainer />
      <div className="flex flex-row justify-between items-center mb-2">
        <h2 className="text-2xl text-[#01031A] font-bold mb-4">
          Pitch Admin Management
        </h2>
        <Button
          onClick={() => setShowModal(true)}
          className="flex gap-2 bg-playden-primary text-white font-semibold !items-center !px-0 !rounded-full"
        >
          <img src={plus} alt="" className="text-white font-bold mt-1" />
          <p>Add New Admin</p>
        </Button>
      </div>

      {/* Admin Summary Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {adminSummary.map((item, index) => (
          <div
            key={index}
            className="min-w-[320px] h-[180px] rounded-md flex justify-between items-center"
            style={{ backgroundColor: item.color }}
          >
            <div className="flex flex-col ml-5 text-white">
              <img src={item.imageSrc} alt="" className="w-[52px] h-[52px]" />
              <p>{item.amount}</p>
              <p>{item.title}</p>
            </div>
            <img
              src={Ellipse}
              alt=""
              className="object-cover mt-[-66px] w-[110px] h-[110px]"
            />
          </div>
        ))}
      </div>

      {/* Admin Users Table */}
      {adminUsers.length === 0 ? (
        <div>No user found</div>
      ) : (
        <table className="w-full text-left text-[#01031A] border-collapse mb-8">
          <thead>
            <tr>
              <th className="border-b p-4 font-semibold">S/N</th>
              <th className="border-b p-4 font-semibold">Name</th>
              <th className="border-b p-4 font-semibold">Email</th>
              <th className="border-b p-4 font-semibold">Phone Number</th>
              <th className="border-b p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user: any, index: number) => (
              <tr key={user.id}>
                <td className="border-b p-4 text-sm">{index + 1}</td>
                <td className="border-b p-4 text-sm">
                  {user.full_name || user.username}
                </td>
                <td className="border-b p-4 text-sm">{user.email}</td>
                <td className="border-b p-4 text-sm">{user.phone_number}</td>
                <td className="border-b p-4 text-sm text-playden-primary cursor-pointer">
                  <Link
                    to={`/pitch-admin-management/${user.id}`}
                    state={{ user }}
                    className="font-bold"
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination
        currentPage={0}
        totalPages={0}
        onPageChange={function (page: number): void {
          throw new Error("Function not implemented.");
        }}
      />

      {/* Modal for Adding New Admin */}
      {showModal && (
        <AdminFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleFormSubmit}
          formData={formData}
          formErrors={formErrors}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
          isEditMode={false}
        />
      )}
    </div>
  );
};

export default PitchAdminManagement;
