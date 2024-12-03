import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home7, Ellipse } from "../../assets/images";
import Pagination from "../../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/userSlice";
import { RootState } from "../../redux/store";

const UserManagement: React.FC = () => {
  const dispatch = useDispatch();

  // Get data from Redux state
  const { data, loading, error } = useSelector((state: RootState) => state.users);

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div className="ml-72 p-8 mt-20 ">Loading...</div>;
  if (error) return <div className="ml-72 p-8 mt-20 ">Error: {error}</div>;
// console.log(users.users);



  return (
    <div className="relative ml-72 p-8 mt-20">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl text-[#01031A] font-bold mb-6">User Management</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">last 30 days</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="min-w-[320px] h-[180px] bg-[#D29AB8] rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{data.statistics.total_users}</p>
            <p>Total users</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
        <div className="min-w-[320px] h-[180px] bg-playden-primary rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{data.statistics.total_active_users}</p>
            <p>active user</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
        <div className="min-w-[320px] h-[180px] bg-[#01031A] rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{data.statistics.total_inactive_users}</p>
            <p>Ban/Suspended</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone Number</th>
            <th className="border border-gray-300 p-2">Number of Bookings</th>
            <th className="border border-gray-300 p-2">Number of Cancellations</th>
            <th className="border border-gray-300 p-2">Playpoints</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.users && Array.isArray(data.users) && data.users.length > 0 ? (
            data.users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 py-2 px-1">{user.full_name}</td>
                <td className="border border-gray-300 py-2 px-1">{user.email}</td>
                <td className="border border-gray-300 py-2 px-1 text-center">{user.phone_number}</td>
                <td className="border border-gray-300 py-2 px-1 text-center">{user.bookings}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <span className="bg-[#4F772D] text-white px-6 py-1 rounded-lg">
                    {user.cancellations}
                  </span>
                </td>
                <td className="border border-gray-300 py-2 px-1 text-center">{user.playpoints}</td>
                <td className="border border-gray-300 py-2 px-1 text-center">{'Active'}</td>
                <td className="border border-gray-300 py-2 px-1 text-center">
                  <Link
                    to={`/user-management/User-details/${user.id}`}
                    className="text-sm font-bold cursor-pointer"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>


      </table>
      <Pagination currentPage={0} totalPages={0} onPageChange={function (page: number): void {
        throw new Error("Function not implemented.");
      }} />
    </div>
  );
};

export default UserManagement;
