import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import categoryClient from "../api/client/category";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryCreated: (newCategory: { id: string; name: string }) => void;
  isEdit?: boolean;
  initialData?: { id: string; name: string; featured_image?: string };
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  onCategoryCreated,
  isEdit = false,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && initialData) {
      setName(initialData.name || "");
    }
    setErrors({}); // Reset errors
  }, [isEdit, initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileInput(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name) {
      setErrors({ name: "Category name is required." });
      return;
    }

    if (!isEdit && !fileInput) {
      setErrors({ featured_image: "Featured image is required." });
      return;
    }
    if (isEdit && !fileInput && !initialData?.featured_image) {
      setErrors({ featured_image: "Featured image is required." });
      return;
    }
    const formData = {
      name: name,
      featured_image: fileInput,
    };

    setIsSubmitting(true);

    try {
      let response;
      if (isEdit && initialData) {
        response = await categoryClient.updateCategory(
          formData,
          initialData?.id || ""
        );
      } else {
        response = await categoryClient.createCategory(formData);
      }

      const newCategory = {
        id: response.data.id,
        name: response.data.name,
      };

      toast.success(isEdit ? "Category updated" : "Category created");

      if (!isEdit) {
        // Reset the form fields after successful creation
        setName("");
        setFileInput(null);
      }

      // Pass the created category to the parent component
      onCategoryCreated(newCategory);

      onClose();
    } catch (error: any) {
      console.log("Error creating/updating category:", error);
      toast.error(`Error: ${error.message}`);
      const e = error?.data;
      if (e) setErrors(e);
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Create New Category</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.featured_image && (
            <p className="text-red-500 text-sm mt-1">{errors.featured_image}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="bg-purple-900 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
