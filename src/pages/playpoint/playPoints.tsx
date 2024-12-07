import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchActivePlaypoints } from "../../redux/playPointSlice";
import { Home7, Ellipse } from "../../assets/images";
import Pagination from "../../components/pagination";

const PlaypointUsage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { playpoints, loading, error, meta } = useSelector((state: RootState) => state.playpoints);

  useEffect(() => {
    dispatch(fetchActivePlaypoints(currentPage));
  }, [dispatch, currentPage]);

  // Update total pages when metadata changes
  useEffect(() => {
    if (meta) {
      setTotalPages(meta.last_page);
    }
  }, [meta]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p className="ml-72 p-8 mt-20 ">Loading playpoints...</p>;
  if (error) return <p className="text-red-500 ml-72 p-8 mt-20 ">Error: {error}</p>;
  if (!playpoints || playpoints.length === 0) return <p className="relative ml-72 p-8 mt-20 overflow-auto">No playpoints found.</p>; // Handle empty state

  return (
    <div className="relative ml-72 p-8 mt-20 overflow-auto">
      {/* Header and Filter */}
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Playpoint Usage</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="min-w-[320px] h-[180px] bg-[#D29AB8] rounded-md flex justify-between items-center">
          <div className="flex flex-col ml-5 text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{meta?.total || 0}</p>
            <p>Today Redeemed</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-68px] w-[110px] h-[110px]" />
        </div>
        {/* Repeat for other summary cards */}
      </div>

      {/* Playpoint Usage Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">S/N</th>
            <th className="border-b p-4">Status</th>
            <th className="border-b p-4">Booking ID</th>
            <th className="border-b p-4">Playpoints Redeemed</th>
            <th className="border-b p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {playpoints.map((usage, index) => (
            <tr key={usage.id}>
              <td className="border-b p-4 text-sm">{(currentPage - 1) * meta.per_page + index + 1}</td>
              <td className="border-b p-4 text-sm">{usage.status}</td>
              <td className="border-b p-4 text-sm">{usage.id}</td>
              <td className="border-b p-4 text-sm">{usage.coins}</td>
              <td className="border-b p-4 text-sm">{usage.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PlaypointUsage;
