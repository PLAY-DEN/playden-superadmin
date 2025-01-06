import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingPayouts,
  // markAsPaid,
  setPage,
} from "../../redux/financialsSlice";
import { Home7, Ellipse } from "../../assets/images";
import Pagination from "../../components/pagination";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";
import { apiClient } from "../../utils/apiClient";
import API_ENDPOINTS from "../../api/client/_endpoint";
import { toast, ToastContainer } from "react-toastify";

const Financials: React.FC = () => {
  const dispatch: any = useDispatch();
  const {
    records,
    loading,
    error,
    currentPage,
    totalPages,
    perPage,
    totalItems,
  } = useSelector((state: any) => state.financials);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchPendingPayouts({ page: currentPage, perPage }));
  }, [dispatch, currentPage, perPage]);

  const handleMarkAsPaid = async (id: number) => {
    // dispatch(markAsPaid(id));
    console.log(id);

    setIsLoading(true);
    try {
      await apiClient(API_ENDPOINTS.MARK_AS_PAID, "POST", {
        owner_id: id,
      });
      dispatch(fetchPendingPayouts({ page: currentPage, perPage }));
    } catch (error: any) {
      toast.success("Marked successfully");
      toast.error(
        error?.response?.data?.data?.owner_id || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }
  // console.log(records);

  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Financial</h2>
      </div>
      <ToastContainer />
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
          <img
            src={Ellipse}
            alt=""
            className="object-cover mt-[-50px] w-[80px] h-[80px]"
          />
        </div>
      </div>

      <div className="flex gap-5">
        <div className="w-full">
          {
            <table className="w-full text-left border-collapse">
              {/* Table Headings */}
              <thead>
                <tr>
                  <th className="border-b p-4">S/N</th>
                  <th className="border-b p-4">Name</th>
                  {/* <th className="border-b p-4">Account No</th> */}
                  <th className="border-b p-4">Amount</th>
                  {/* <th className="border-b p-4">Status</th>
                  <th className="border-b p-4">Date</th> */}
                  <th className="border-b p-4">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {records.length > 0 ? (
                  records.map((record: any, index: number) => (
                    <tr key={record.id}>
                      <td className="border-b p-4 text-sm">{index + 1}</td>
                      <td className="border-b p-4 text-sm">
                        <div>
                          {record?.owner?.name || record?.owner?.username}
                        </div>
                        <div>{record?.owner?.email}</div>
                        <div>{record?.owner?.phone_number}</div>
                      </td>
                      {/* <td className="border-b p-4 text-sm">
                        {record.accountNo}
                      </td> */}
                      <td className="border-b p-4 text-sm">
                        {record.pending_payout}
                      </td>
                      {/* <td className="border-b p-4 text-sm">{record.status}</td>
                      <td className="border-b p-4 text-sm">{record.date}</td> */}
                      <td className="border-b p-4 text-sm">
                        <button
                          disabled={isLoading}
                          onClick={() => handleMarkAsPaid(record?.owner?.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs"
                        >
                          {isLoading ? "Marking..." : "Mark as Paid"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-sm">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          }
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
