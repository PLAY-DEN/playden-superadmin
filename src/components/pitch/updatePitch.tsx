import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCategoryModal from "../Modal";
import pitchClient from "../../api/client/pitch";
import PitchForm from "./PitchForm";
import Button from "../forms/button";
import { useParams } from "react-router-dom";
import {
  amenitiesOptions,
  defaultValues,
  facilitiesOptions,
  fetchData,
  FormData,
  validateHourlyDiscounts,
} from "../../data/PitchFormData";
import userClient from "../../api/client/user";
import categoryClient from "../../api/client/category";

const UpdatePitch = () => {
  const { pitchId } = useParams<{ pitchId: string }>();
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [owners, setOwners] = useState<{ value: string; label: string }[]>([]);
  const [managers, setManagers] = useState<{ value: string; label: string }[]>(
    []
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>(defaultValues);

  const [amenities, setAmenities] = useState<any[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [hourlyDiscounts, setHourlyDiscounts] = React.useState<
    { hours: number | null; discount: number | null }[]
  >([]);

  const handleAddDiscount = () => {
    setHourlyDiscounts([...hourlyDiscounts, { hours: null, discount: null }]);
  };

  const handleDiscountChange = (
    index: number,
    field: string,
    value: number
  ) => {
    const updatedDiscounts: any = [...hourlyDiscounts];
    updatedDiscounts[index][field] = value;
    setHourlyDiscounts(updatedDiscounts);
  };

  const handleRemoveDiscount = (index: number) => {
    setHourlyDiscounts(hourlyDiscounts.filter((_, i) => i !== index));
  };

  const getPitchOwners = () => {
    fetchData(
      userClient.getUsers,
      { user_role: "pitch_owner" },
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

  const getPitchManagers = () => {
    fetchData(
      userClient.getUsers,
      { user_role: "pitch_manager" },
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

  useEffect(() => {
    getPitchOwners();
    getPitchCategories();
    getPitchManagers();
  }, []);

  const fetchPitch = async () => {
    try {
      const response = await pitchClient.getPitch({}, pitchId!);
      const pitch = response.data;

      const openingHours = pitch.opening_hours.split(" - ");
      const hourlyDiscounts = JSON.parse(pitch.hourly_discounts) || [];

      setFormData({
        name: pitch.name,
        address: pitch.address,
        amountPerHour: pitch.amount_per_hour.toString(),
        discount: pitch.discount.toString(),
        // ratings: pitch.ratings.toString(),
        category_id: pitch.category_id.toString(),
        contact: pitch.contact,
        openingHours: openingHours[0],
        closingHours: openingHours[1],
        size: pitch.size,
        // pitchManager: pitch.pitch_manager,
        // managerContact: pitch.manager_contact,
        owner_id: pitch.owner_id.toString(),
        manager_id: pitch.managers[0]?.id.toString(),
        location: {
          latitude: pitch.location.latitude.toString(),
          longitude: pitch.location.longitude.toString(),
        },
        amenities: pitch.amenities,
        facilities: pitch.facilities,
        image: pitch.image,
        gallery: pitch.gallery,
        hourlyDiscounts,
        discount_description: pitch.discount_description || null,
      });

      setAmenities(pitch.amenities);
      setFacilities(pitch.facilities);
      setHourlyDiscounts(hourlyDiscounts);
    } catch (error) {
      toast.error("Error fetching pitch details.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPitch();
  }, [pitchId]);

  const handleCategoryCreated = (newCategory: { id: string; name: string }) => {
    const newOption = { value: newCategory.id, label: newCategory.name };
    setCategories((prev) => [...prev, newOption]);
    setFormData((prev) => ({ ...prev, category_id: newCategory.id }));
    toast.success("New category added and selected!");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
      { name: "address", label: "Pitch Address" },
      { name: "amountPerHour", label: "Pitch Price" },
      { name: "category_id", label: "Category" },
      { name: "contact", label: "Contact" },
      { name: "openingHours", label: "Opening Hours" },
      { name: "closingHours", label: "Closing Hours" },
      { name: "size", label: "Pitch Size" },
      { name: "owner_id", label: "Owner" },
      { name: "manager_id", label: "Manager" },
    ];

    const newErrors: Record<string, string> = {};

    // Validate required fields
    requiredFields.forEach((field) => {
      const value = field.name.includes(".")
        ? field.name
            .split(".")
            .reduce(
              (acc: any, key) =>
                acc && acc[key] !== undefined ? acc[key] : null,
              formData
            )
        : formData[field.name];

      if (!value || value.trim() === "") {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });

    if (!fileInput && !formData.image) {
      newErrors["image"] = "Please upload an image.";
    }

    const validate = validateHourlyDiscounts(hourlyDiscounts);
    if (validate) {
      newErrors["hourlyDiscounts"] = validate;
    } else if (
      hourlyDiscounts.length > 0 &&
      formData.discount_description == null
    ) {
      newErrors["hourlyDiscounts"] = "You must add a discount description";
    }

    // Set errors in state
    setErrors(newErrors);
    // validateHourlyDiscounts

    // If there are errors, return early
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    const { gallery, ...rest } = formData;
    // Prepare validated form data
    const validatedFormData: any = {
      ...rest,
      amount_per_hour: parseFloat(formData.amountPerHour),
      discount: parseFloat(formData.discount),
      "location[latitude]": parseFloat(formData.location.latitude),
      "location[longitude]": parseFloat(formData.location.longitude),
      amenities: JSON.stringify(amenities),
      facilities: JSON.stringify(facilities),
      opening_hours: `${formData.openingHours} - ${formData.closingHours}`,
      size: formData.size,
      hourly_discounts: JSON.stringify(hourlyDiscounts),
    };

    if (fileInput) {
      validatedFormData["image"] = fileInput;
    } else {
      delete validatedFormData["image"];
    }

    if (galleryFiles.length > 0) {
      galleryFiles.forEach((file, index) => {
        validatedFormData[`gallery[${index}]`] = file;
      });
    } else {
      Object.keys(validatedFormData).forEach((key) => {
        if (key.startsWith("gallery[")) {
          delete validatedFormData[key];
        }
      });
    }
    setIsLoading(true);

    try {
      await pitchClient.updatePitch(validatedFormData, pitchId!);
      toast.success("Pitch updated successfully!");
      fetchPitch();
    } catch (error: any) {
      toast.error("Error updating pitch.");
      const e = error?.data;
      if (e) setErrors(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg">
      <ToastContainer />
      {/* Header Section */}
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Edit Pitch</h2>
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
        handleAddDiscount={handleAddDiscount}
        handleDiscountChange={handleDiscountChange}
        handleRemoveDiscount={handleRemoveDiscount}
        hourlyDiscounts={hourlyDiscounts}
      />

      <div className="w-full">
        {/* Show existing image and gallery */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Existing Image</h3>
          {formData.image ? (
            <img
              src={formData.image}
              alt="Existing Pitch"
              className="w-24 h-24 rounded-lg shadow-md"
            />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Existing Gallery</h3>
          {formData.gallery && formData.gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.gallery.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-24 h-24 rounded-lg shadow-md"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No gallery images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePitch;
