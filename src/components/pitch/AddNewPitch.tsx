import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCategoryModal from "../Modal";
import pitchClient from "../../api/client/pitch";
import PitchForm from "./PitchForm";
import Button from "../forms/button";
import { amenitiesOptions, defaultValues, facilitiesOptions, fetchData, FormData } from "../../data/PitchFormData";
import categoryClient from "../../api/client/category";
import userClient from "../../api/client/user";

const AddNewPitch: React.FC = () => {
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [owners, setOwners] = useState<{ value: string; label: string }[]>([]);
  const [managers, setManagers] = useState<{ value: string; label: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const [formData, setFormData] = useState<FormData>(defaultValues);

  const [amenities, setAmenities] = useState<any[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const getPitchOwners = () => {
    fetchData(
      userClient.getUsers,
      { user_role: 'pitch_owner' },
      (data) =>
        data.users.map((user: any) => ({
          value: user.id.toString(),
          label: `${user?.full_name} (${user?.phone_number})`,
        })),
      setOwners,
      "Error fetching pitch owners.",
      setIsLoading
    );
  };

  const getPitchManagers = () => {
    fetchData(
      userClient.getUsers,
      { user_role: 'pitch_manager' },
      (data) =>
        data.users.map((user: any) => ({
          value: user.id.toString(),
          label: `${user?.full_name} (${user?.phone_number})`,
        })),
        setManagers,
      "Error fetching pitch managers.",
      setIsLoading
    );
  };

  const getPitchCategories = () => {
    fetchData(
      categoryClient.getCategories,
      {},
      (data) =>
        data.map((category: any) => ({
          value: category.id.toString(),
          label: category.name,
        })),
      setCategories,
      "Error fetching categories.",
      setIsLoading
    );
  };

  useEffect(() => {
    getPitchOwners();
    getPitchCategories();
    getPitchManagers();
  }, []);

  const handleCategoryCreated = (newCategory: { id: string; name: string }) => {
    const newOption = { value: newCategory.id, label: newCategory.name };
    setCategories((prev) => [...prev, newOption]);
    setFormData((prev) => ({ ...prev, category_id: newCategory.id }));
    toast.success("New category added and selected!");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string; label: string } | null
  ) => {
    if (name === "pitch_owner_id") {
      setFormData((prev) => ({
        ...prev,
        id: selectedOption ? selectedOption.value : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption ? selectedOption.value : "",
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileInput(file);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(files);
  };

  const handleSave = async () => {
    // Define required fields
    const requiredFields = [
      { name: "name", label: "Pitch Name" },
      { name: "amountPerHour", label: "Pitch Price" },
      { name: "category_id", label: "Category" },
      { name: "contact", label: "Contact" },
      { name: "openingHours", label: "Opening Hours" },
      { name: "closingHours", label: "Closing Hours" },
      { name: "size", label: "Pitch Size" },
      { name: "owner_id", label: "Owner" },
    ];

    const newErrors: Record<string, string> = {};

    // Validate required fields
    requiredFields.forEach((field) => {
      const value = field.name.includes(".")
        ? field.name.split(".").reduce((acc: any, key) => acc && acc[key] !== undefined ? acc[key] : null, formData)
        : formData[field.name];

      if (!value || value.trim() === "") {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });

    if (!fileInput) {
      newErrors["image"] = "Please upload an image.";
    }

    // Set errors in state
    setErrors(newErrors);

    // If there are errors, return early
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Prepare validated form data
    const validatedFormData = {
      ...formData,
      amount_per_hour: parseFloat(formData.amountPerHour),
      discount: parseFloat(formData.discount),
      "location[latitude]": parseFloat(formData.location.latitude),
      "location[longitude]": parseFloat(formData.location.longitude),
      amenities: JSON.stringify(amenities),
      facilities: JSON.stringify(facilities),
      image: fileInput,
      opening_hours: `${formData.openingHours} - ${formData.closingHours}`,
      size: formData.size,
      gallery: galleryFiles
    };

    setIsLoading(true)

    try {
      await pitchClient.createPitch(validatedFormData);
      toast.success("Pitch created successfully!");
      setFormData(defaultValues);
    } catch (error) {
      toast.error("Error creating pitch.");
      console.error("Error creating pitch:", error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg">
      <ToastContainer />
      {/* Header Section */}
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Create New Pitch</h2>
        <Button
          className="bg-purple-900 text-white !px-0 !rounded-full"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Category
        </Button>
      </div>

      {/* Main Content Section */}

      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCategoryCreated={handleCategoryCreated}
      />
      <PitchForm
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        handleFileUpload={handleFileUpload}
        handleGalleryUpload={handleGalleryUpload}
        handleSelectChange={handleSelectChange}
        owners={owners}
        managers={managers}
        categories={categories}
        amenities={amenities}
        amenitiesOptions={amenitiesOptions}
        setAmenities={setAmenities}
        facilities={facilities}
        facilitiesOptions={facilitiesOptions}
        setFacilities={setFacilities}
        setFormData={setFormData}
        handleSave={handleSave}
        isLoading={isLoading}

      />
    </div>
  );
};

export default AddNewPitch;