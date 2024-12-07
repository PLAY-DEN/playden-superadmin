import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingPayouts, markAsPaid, setPage } from "../../redux/financialsSlice";
import { Home7, Ellipse } from "../../assets/images";
import Pagination from "../../components/pagination";

const Financials: React.FC = () => {
  const dispatch = useDispatch();
  const { records, loading, error, currentPage, totalPages, perPage, totalItems } = useSelector(
    (state) => state.financials
  );

  useEffect(() => {
    dispatch(fetchPendingPayouts({ page: currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);

  const handleMarkAsPaid = (id: number) => {
    dispatch(markAsPaid(id));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className="relative ml-64 p-8 mt-20 overflow-auto">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Financial</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-transparent bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {/* Summary Cards */}
        <div
          className="min-w-[251px] h-[134px] rounded-md flex justify-between items-center"
          style={{ backgroundColor: "#D29AB8" }}
        >
          <div className="flex flex-col ml-5 text-xs text-white">
            <img src={Home7} alt="" className="w-[52px] h-[52px]" />
            <p>{totalItems}</p> {/* Display total_items here */}
            <p>Today Revenue</p>
          </div>
          <img src={Ellipse} alt="" className="object-cover mt-[-50px] w-[80px] h-[80px]" />
        </div>
      </div>

      <div className="flex gap-5">
        <div className="w-full">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="w-full text-left border-collapse">
              {/* Table Headings */}
              <thead>
                <tr>
                  <th className="border-b p-4">S/N</th>
                  <th className="border-b p-4">Name</th>
                  <th className="border-b p-4">Account No</th>
                  <th className="border-b p-4">Amount</th>
                  <th className="border-b p-4">Status</th>
                  <th className="border-b p-4">Date</th>
                  <th className="border-b p-4">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {records.length > 0 ? (
                  records.map((record, index) => (
                    <tr key={record.id}>
                      <td className="border-b p-4 text-sm">{index + 1}</td>
                      <td className="border-b p-4 text-sm">{record.name}</td>
                      <td className="border-b p-4 text-sm">{record.accountNo}</td>
                      <td className="border-b p-4 text-sm">{record.amount}</td>
                      <td className="border-b p-4 text-sm">{record.status}</td>
                      <td className="border-b p-4 text-sm">{record.date}</td>
                      <td className="border-b p-4 text-sm">
                        <button
                          onClick={() => handleMarkAsPaid(record.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs"
                        >
                          Mark as Paid
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-sm">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Financials;
