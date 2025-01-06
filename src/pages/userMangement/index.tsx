import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home7, Ellipse } from "../../assets/images";
import Pagination from "../../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/userSlice";
import { RootState } from "../../redux/store";
import Input from "../../components/forms/input";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";

const UserManagement: React.FC = () => {
  const dispatch: any = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const { data, loading, error } = useSelector(
    (state: RootState) => state.users
  ) as {
    data: {
      users: {
        id: number;
        full_name: string;
        email: string;
        phone_number: string;
        bookings_count: number;
        cancelled_bookings_count: number;
        playpoints: number;
      }[];
      statistics: {
        total_users: number;
        total_active_users: number;
        total_inactive_users: number;
      };
    };
    loading: boolean;
    error: string | null;
  };

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, search: "" })); // Fetch users on page load or page change
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = data.users?.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  const { total_users, total_active_users, total_inactive_users } =
    data.statistics;
  const totalPages = Math.ceil(total_users / 15);

  return (
    <div className="bg-white p-8 rounded-lg mb-20">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">User Management</h2>
        <Input
          type="text"
          placeholder="Search users..."
          className="border border-gray-300 rounded-md px-4 py-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard
          bgColor="#D29AB8"
          title="Total Users"
          value={total_users}
          icon={Home7}
        />
        <SummaryCard
          bgColor="#4CAF50"
          title="Active Users"
          value={total_active_users}
          icon={Home7}
        />
        <SummaryCard
          bgColor="#F44336"
          title="Inactive Users"
          value={total_inactive_users}
          icon={Home7}
        />
      </div>

      {/* User Table */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone Number</th>
            <th className="border border-gray-300 p-2">Bookings</th>
            <th className="border border-gray-300 p-2">Cancellations</th>
            <th className="border border-gray-300 p-2">Playpoints</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserManagement;

// Reusable Summary Card Component
interface SummaryCardProps {
  bgColor: string;
  title: string;
  value: number;
  icon: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  bgColor,
  title,
  value,
  icon,
}) => (
  <div
    className="min-w-[320px] h-[180px] rounded-md flex justify-between items-center"
    style={{ backgroundColor: bgColor }}
  >
    <div className="flex flex-col ml-5 text-white">
      <img src={icon} alt="" className="w-[52px] h-[52px]" />
      <p>{value}</p>
      <p>{title}</p>
    </div>
    <img
      src={Ellipse}
      alt=""
      className="object-cover mt-[-68px] w-[110px] h-[110px]"
    />
  </div>
);

// Reusable User Row Component
interface UserRowProps {
  user: {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    bookings_count: number;
    cancelled_bookings_count: number;
    playpoints: number;
  };
}

const UserRow: React.FC<UserRowProps> = ({ user }) => (
  <tr className="hover:bg-gray-100">
    <td className="border border-gray-300 py-2 px-1">{user.full_name}</td>
    <td className="border border-gray-300 py-2 px-1">{user.email}</td>
    <td className="border border-gray-300 py-2 px-1 text-center">
      {user.phone_number}
    </td>
    <td className="border border-gray-300 py-2 px-1 text-center">
      {user.bookings_count}
    </td>
    <td className="border border-gray-300 py-2 px-1 text-center">
      {user.cancelled_bookings_count}
    </td>
    <td className="border border-gray-300 py-2 px-1 text-center">
      {user.playpoints || 0}
    </td>
    <td className="border border-gray-300 py-2 px-1 text-center">Active</td>
    <td className="border border-gray-300 py-2 px-1 text-center">
      <Link
        to={`/user-management/User-details/${user.id}`}
        className="text-sm font-bold"
      >
        View Details
      </Link>
    </td>
  </tr>
);
