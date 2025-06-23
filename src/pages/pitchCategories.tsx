import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import categoryClient from "../api/client/category";
import LoadingPage from "../components/loading-page";
import ErrorPage from "../components/error-page";
import { RootState } from "../redux/store";
import Pagination from "../components/pagination";
import CreateCategoryModal from "../components/Modal";
import Button from "../components/forms/button";

const PitchCategories: React.FC = () => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleted, setIsDeleted] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [searchQuery, _setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setDebouncedSearch(searchQuery);
    }, 1000);
    return () => {
      clearTimeout(timer);
      setLoading(true);
    };
  }, [searchQuery]);

  const fetchCategories = async (page: number, search = "") => {
    if (!token) {
      navigate("/login");
      toast.error("Token expired, Kindly re-login");
      return;
    }

    setLoading(true);
    try {
      const response = await categoryClient.getCategories({
        page: page,
        search,
      });
      console.log(response.data);

      const fetchedPitches = response.data || [];

      const { current_page, last_page } = response.data;

      setCategories(fetchedPitches);
      setCurrentPage(current_page);
      setTotalPages(last_page);
    } catch (error: any) {
      console.error("Fetch Error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to fetch categories.";
      toast.error(errorMessage, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage, debouncedSearch);
    return () => setIsDeleted(false);
  }, [currentPage, isDeleted, debouncedSearch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  const handleEdit = (category: any) => {
    setIsEditMode(true);
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await categoryClient.deleteCategory(id);
      toast.success("Category deleted successfully");
      setIsDeleted(true);
    } catch (error: any) {
      const message = error.response?.data?.message || "Delete failed";
      toast.error(message);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingCategory(null);
  };

  const handleCategoryCreated = () => {
    fetchCategories(currentPage, debouncedSearch);
    handleModalClose();
  };

  return (
    <div className="bg-white p-8 rounded-lg mb-10">
      <ToastContainer />
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl text-[#01031A] font-bold mb-4">Category</h2>

        <Button
          className="bg-purple-900 text-white !px-0 !rounded-full"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Category
        </Button>

        <CreateCategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCategoryCreated={() => handleCategoryCreated()}
          isEdit={isEditMode}
          initialData={editingCategory}
        />
      </div>

      {loading ? (
        <LoadingPage />
      ) : categories.length === 0 ? (
        <ErrorPage errorMessage="No categories found." />
      ) : (
        <>
          <table className="w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                <th className="p-2">Image</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat: any, idx) => (
                <tr key={cat.id} className="border-t">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{cat.name}</td>
                  <td className="p-2">
                    <img
                      src={cat.featured_image}
                      width={40}
                      className="rounded"
                    />
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default PitchCategories;
