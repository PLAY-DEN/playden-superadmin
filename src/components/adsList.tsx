import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { fetchAds, setCurrentPage } from "../redux/adsSlice";
import LoadingPage from "./loading-page";
import Input from "./forms/input";
import Pagination from "./paginator";
import { formatDate } from "../utils/utils";
import { apiClient } from "../utils/apiClient";
import API_ENDPOINTS from "../api/client/_endpoint";
import { toast } from "react-toastify";

const AdsList: React.FC = () => {
  const dispatch: any = useDispatch();
  const { ads, loading, currentPage, lastPage } = useSelector(
    (state: RootState) => state.adsMgt
  );
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [isDeleted, setIsDeleted] = useState(false);

  // Handle search query with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setDebouncedSearch(searchQuery);
    }, 1000);
    return () => {
      clearTimeout(timer);
      setIsLoading(true);
    };
  }, [searchQuery]);

  // Fetch bookings when page or search query changes
  // useEffect(() => {
  //   dispatch(fetchAds({ page: currentPage, search: debouncedSearch }));
  // }, [dispatch, currentPage, debouncedSearch]);

  useEffect(() => {
    dispatch(fetchAds({ page: currentPage, search: debouncedSearch }));
    return () => setIsDeleted(false);
  }, [currentPage, isDeleted, debouncedSearch]);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [, setIsDeleting] = useState({});

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    setIsDeleting({ id: true });
    try {
      const endpoint = `${API_ENDPOINTS.GET_ADS}/${id}`;
      await apiClient(endpoint, "DELETE");
      toast.success("Ads deleted");
      setIsDeleted(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete.");
    } finally {
      setIsDeleting({ id: false });
    }
  };

  if (loading || isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="">
      {/* Header and Search */}
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-lg text-[#01031A] font-bold">Ads List</h2>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search ads..."
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
        />
      </div>

      {Array.isArray(ads) && ads.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4">S/N</th>
              <th className="border-b p-4">Title</th>
              <th className="border-b p-4">Image</th>
              <th className="border-b p-4">Type</th>
              <th className="border-b p-4">Pitch</th>
              <th className="border-b p-4">Date</th>
              <th className="border-b p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, index) => (
              <tr key={ad.id}>
                <td className="border-b p-4 text-sm">{index + 1}</td>
                <td className="border-b p-4 text-sm">{ad.title || "N/A"}</td>
                <td className="border-b p-4 text-sm">
                  <img
                    src={ad.image}
                    className="w-[360px] h-[120px] rounded-lg"
                    alt=""
                  />
                </td>
                <td className="border-b p-4 text-sm">{ad.type || "N/A"}</td>

                <td className="border-b p-4 text-sm">
                  {ad.pitch?.name || "N/A"}
                </td>
                <td className="border-b p-4 text-sm">
                  {formatDate(ad.created_at)}
                </td>
                <td className="border-b p-4 text-sm">
                  <Link
                    to={"#"}
                    onClick={() => handleDelete(ad.id)}
                    className="text-black font-semibold"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No ads found.</p>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={lastPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdsList;
