import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/PitchAdmin";
import { RootState } from "../../redux/store";
import { Home7, Ellipse, plus } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch]);

  // Update adminSummary dynamically
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

  const adminUsers = (users?.data?.users || []).filter((user) =>
    user.user_role.includes("super_admin")
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative ml-64 p-8 mt-20">
      {/* Header Section */}
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl text-[#01031A] font-bold mb-4">Pitch Admin Management</h2>
        <div className="flex flex-row gap-2">
          <p className="text-[#141B34] text-[17px] font-bold mt-2 ml-72">showing</p>
          <select
            name="days"
            id="options"
            className="text-[17px] font-bold text-[#141B34] w-24 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
            defaultValue={12}
          >
            <option value="days">12</option>
          </select>
        </div>
        <button
          onClick={() => navigate("/add-new-admin")}
          className="flex flex-row gap-2 bg-playden-primary text-white font-semibold p-3 rounded-lg"
        >
          <img src={plus} alt="" className="text-white font-bold mt-1" />
          <p>Add New Admin</p>
        </button>
      </div>

      {/* Summary Cards */}
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

      {/* Admin Records Table */}
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
              <th className="border-b p-4 font-semibold">Name of Pitch</th>
              <th className="border-b p-4 font-semibold">Bank Name</th>
              <th className="border-b p-4 font-semibold">Bank Details</th>
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
                <td className="border-b p-4 text-sm">{user.pitchName}</td>
                <td className="border-b p-4 text-sm">{user.bankName}</td>
                <td className="border-b p-4 text-sm">{user.bankDetails}</td>
                <td className="border-b p-4 text-sm text-playden-primary cursor-pointer">
                  <Link to={`/pitch-admin-management/${user.id}`} className="font-bold">
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination />
    </div>
  );
};

export default PitchAdminManagement;
