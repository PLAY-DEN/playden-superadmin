import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchActivePlaypoints } from "../../redux/playPointSlice";
import { Home7, Ellipse } from "../../assets/images";
import Pagination from "../../components/pagination";
import { Loader } from "rizzui";
import { formatDate } from "../../utils/utils";

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

  return (
    <div className="flex justify-center items-center ml-72 mt-40">
      {!loading && (
        <>
          {error && <p className="text-red-500 ml-72 p-8 mt-20">Error: {error}</p>}
          {!playpoints || playpoints.length === 0 ? (
            <p className="text-center text-gray-500">No PlayPoints found.</p>
          ) : (
            <div className="relative ml72 p-8 mt20 overflow-auto">
              {/* Header and Filter */}
              <div className="flex flex-row justify-between mb-6">
                <h2 className="text-2xl text-[#01031A] font-bold">PlayPoint Usage</h2>
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
                    {/* <th className="border-b p-4">Booking ID</th> */}
                    <th className="border-b p-4">Playpoints Redeemed</th>
                    <th className="border-b p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {playpoints.map((usage, index) => (
                    <tr key={usage.id}>
                      <td className="border-b p-4 text-sm">
                        {(currentPage - 1) * meta.per_page + index + 1}
                      </td>
                      <td className="border-b p-4 text-sm">{usage.status}</td>
                      {/* <td className="border-b p-4 text-sm">{usage.id}</td> */}
                      <td className="border-b p-4 text-sm">{usage.coins}</td>
                      <td className="border-b p-4 text-sm">{formatDate(usage.updated_at)}</td>
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
          )}
        </>
      )}
      {loading && <Loader />}
    </div>
  );
  
};

export default PlaypointUsage;
