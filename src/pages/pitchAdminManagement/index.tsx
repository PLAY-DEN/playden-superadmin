import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/PitchAdmin";
import { RootState } from "../../redux/store";
import { Home7, Ellipse, plus } from "../../assets/images";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "../../components/pagination";
import { createAdmin } from "../../redux/adminSlice";
import { toast } from "react-toastify";

interface SummaryItem {
  title: string;
  amount: string | number;
  color: string;
  imageSrc: string;
}

const PitchAdminManagement: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state: RootState) => state.admin);

  const [adminSummary, setAdminSummary] = useState<SummaryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    user_role: "super_admin",
    full_name: "",
    email: "",
    username: "",
    address: "",
    phone_number: "",
    password: "",
  });
  

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createAdmin(formData)); 
    toast.success("Pitch Admin created successfully");
    setShowModal(false); 
    window.location.reload();

  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const adminUsers = (users?.data?.users || []).filter((user) =>
    user.user_role.includes("super_admin")
  );

  return (
    <div className="relative ml-64 p-8 mt-20">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl text-[#01031A] font-bold mb-4">Pitch Admin Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex flex-row gap-2 bg-playden-primary text-white font-semibold p-3 rounded-lg"
        >
          <img src={plus} alt="" className="text-white font-bold mt-1" />
          <p>Add New Admin</p>
        </button>
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
            <img src={Ellipse} alt="" className="object-cover mt-[-66px] w-[110px] h-[110px]" />
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
            {adminUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="border-b p-4 text-sm">{index + 1}</td>
                <td className="border-b p-4 text-sm">{user.full_name || user.username}</td>
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

      <Pagination />

      {/* Modal for Adding New Admin */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
      <form onSubmit={handleFormSubmit}>
      <label>User Role</label>
        <input
          type="text"
          name="user_role"
          defaultValue={formData.user_role}
          placeholder="User Role"
          value={formData.user_role}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <label>Full Name</label>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <label>Username: </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <label>Address: </label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <label>Phone Number: </label>
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="bg-playden-primary text-white p-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default PitchAdminManagement;
