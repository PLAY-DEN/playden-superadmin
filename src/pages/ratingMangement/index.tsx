import React, { useEffect, useState } from "react";
import Pagination from "../../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";
import { toast, ToastContainer } from "react-toastify";
import { fetchRatings } from "../../redux/ratingSlice";
import { apiClient } from "../../utils/apiClient";
import API_ENDPOINTS from "../../api/client/_endpoint";

const RatingManagement: React.FC = () => {
  const dispatch: any = useDispatch();
  const [page, setCurrentPage] = useState(1);

  const { reviews, loading, error, totalPages } = useSelector(
    (state: RootState) => state.ratings
  );

  useEffect(() => {
    dispatch(fetchRatings({ page, search: "" }));
  }, [dispatch, page]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  const handleDeleteAdmin = async (ratingId: any) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this rating?"
    );
    if (!confirmDelete) return;

    try {
      await apiClient(API_ENDPOINTS.GET_RATINGS + `/${ratingId}`, "DELETE");
      toast.success("Rating deleted successfully");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg mb-20">
      <ToastContainer />
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">
          Reviews & Ratings Management
        </h2>
      </div>

      {/* User Table */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">Pitch</th>
            <th className="border border-gray-300 p-2">Rating</th>
            <th className="border border-gray-300 p-2">Review</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review: any) => (
            <tr key={review.id} className="hover:bg-gray-100">
              {/* User Column */}
              <td className="border border-gray-300 p-2">
                <div className="flex flex-col">
                  <span>Fullname: {review.user?.full_name || "N/A"}</span>
                  <span>Username: {review.user?.username || "N/A"}</span>
                  <span>Email: {review.user?.email || "N/A"}</span>
                  <span>Phone: {review.user?.phone_number || "N/A"}</span>
                </div>
              </td>

              {/* Pitch Column */}
              <td className="border border-gray-300 p-2">
                <div className="flex flex-col">
                  <span>{review.pitch?.name || "N/A"}</span>
                </div>
              </td>

              {/* Rating Column */}
              <td className="border border-gray-300 p-2 text-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`inline-block ${
                      i < Math.floor(Number(review.rating))
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm ml-1">({review.rating})</span>
              </td>

              {/* Review Column */}
              <td className="border border-gray-300 p-2">
                {review.review || "No review provided"}
              </td>

              {/* Date Column */}
              <td className="border border-gray-300 p-2">
                {new Date(review.created_at).toLocaleDateString()}
              </td>

              {/* Action Column */}
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => handleDeleteAdmin(review.id)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RatingManagement;
