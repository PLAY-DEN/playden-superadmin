import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUploadComponent from "./FileUploadComponent";
import Select from "./forms/select";
import CreateCategoryModal from "./Modal";

const AddNewPitch: React.FC = () => {
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    amountPerHour: "",
    discount: "",
    ratings: "",
    category_id: "",
    contact: "",
    openingHours: "",
    closingHours: "",
    size: "",
    pitchManager: "",
    managerContact: "",
    ownerId: "",
    location: { latitude: "", longitude: "" },
    amenities: ['gmy','swiing ppol','bar'] ,
    facilities: ['gmy','swiing ppol','bar'] ,
    image: null,
    gallery: [],
  });

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const bearerToken = localStorage.getItem("token");

      try {
        const response = await fetch(`${baseUrl}/admin/categories`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result = await response.json();
        //console.log("Fetched categories data:", result);

        if (result.success && Array.isArray(result.data)) {
          const formattedCategories = result.data.map((category: any) => ({
            value: category.id.toString(),
            label: category.name,
          }));
          setCategories(formattedCategories);

          //  default category if not selected
          if (formattedCategories.length > 0 && !formData.category_id) {
            setFormData((prev) => ({
              ...prev,
              category_id: formattedCategories[0].value,
            }));
          }
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        toast.error("Error fetching categories.");
        console.error("Error:", error);
      }
    };

    fetchCategories();
  }, [formData.category_id]);

  const handleCategoryCreated = (newCategory: { id: string; name: string }) => {
    const newOption = { value: newCategory.id, label: newCategory.name };
    setCategories((prev) => [...prev, newOption]);
    setFormData((prev) => ({ ...prev, category_id: newCategory.id }));
    toast.success("New category added and selected!");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string; label: string } | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleFileUpload = (image: File) => setFileInput(image);

  const getCategories = () => {
    // get the categories from the server
    // pass it to the select menu for the catgories,
    // your value shohuld be the id of the category and the label shohuld be thhe name

  }

  // facilities /ammenities should be like thhis
  // ['gmy','swiing ppol','bar'] 

  const handleSave = async () => {
    const requiredFields = [
      { name: "name", label: "Pitch Name" },
      { name: "amountPerHour", label: "Pitch Price" },
      { name: "category_id", label: "Category" },
      { name: "contact", label: "Contact" },
      { name: "openingHours", label: "Opening Hours" },
      { name: "closingHours", label: "Closing Hours" },
      { name: "size", label: "Pitch Size" },
    ];
  
    for (const field of requiredFields) {
      const value = field.name.includes(".")
        ? field.name.split(".").reduce((acc, key) => acc[key], formData)
        : formData[field.name];
      if (!value || value.trim() === "") {
        toast.error(`Please provide a value for ${field.label}.`);
        return;
      }
    }
  
    if (!fileInput) {
      toast.error("Please upload an image.");
      return;
    }
  
    // Prepare FormData
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("amount_per_hour", formData.amountPerHour);
    formdata.append("discount", formData.discount || "0");
    formdata.append("ratings", formData.ratings || "0");
    formdata.append("category_id", formData.category_id);
    formdata.append("contact", formData.contact);
    formdata.append("opening_hours", formData.openingHours);
    formdata.append("closing_hours", formData.closingHours);
    formdata.append("size", formData.size);
    formdata.append("image", fileInput);
    formdata.append("owner_id", formData.ownerId || null); // Optional field
  
    // Ensure amenities and facilities are arrays
    formdata.append("amenities", JSON.stringify(formData.amenities || []));
    formdata.append("facilities", JSON.stringify(formData.facilities || []));
  
    // Ensure location is an array
    const location = formData.location.latitude && formData.location.longitude
      ? [formData.location.latitude, formData.location.longitude]
      : [];
    formdata.append("location", JSON.stringify(location));
  
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const bearerToken = localStorage.getItem("token");
  
    try {
      const response = await fetch(`${baseUrl}/admin/pitches`, {
        method: "POST",
        headers: { Authorization: `Bearer ${bearerToken}` },
        body: formdata,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response Data:", errorData);
        console.log(formData.amenities);
        throw new Error(errorData.message || "Failed to create pitch.");
      }
  
      const result = await response.json();
      toast.success("Pitch created successfully!");
      console.log("Result:", result);
    } catch (error) {
      toast.error(`Error creating pitch: ${error.message}`);
      console.error("Error:", error);
    }
  };
  
  
  


  return (
    <div className="mt-20 relative ml-72 p-8">
      <ToastContainer />
      {/* Header Section */}
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Pitch Listing</h2>
        <select
          name="days"
          id="options"
          className="text-[16px] font-bold text-[#141B34] w-36 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
        >
          <option value="days">Last 30 days</option>
        </select>
      </div>

      {/* Main Content Section */}
      <div className="p-6">
        <h1 className="text-lg mb-4">Create New Pitch</h1>
        <button
        className="bg-purple-900 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Category
      </button>
      
      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCategoryCreated={handleCategoryCreated}
      />
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            {/* Left Section */}
            <table className="w-1/2 text-left text-[#333543] border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th colSpan={2} className="text-lg text-left pb-2 pt-5">
                    Pitch Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pitch Name:</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="border px-2 py-1"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Pitch Size:</td>
                  <td>
                    <input
                      type="text"
                      name="size"
                      className="border px-2 py-1"
                      value={formData.size}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Pitch Price:</td>
                  <td>
                    <input
                      type="text"
                      name="amountPerHour"
                      className="border px-2 py-1"
                      value={formData.amountPerHour}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Discount:</td>
                  <td>
                    <input
                      type="number"
                      name="discount"
                      className="border px-2 py-1"
                      value={formData.discount}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Opening Hours:</td>
                  <td>
                    <input
                      type="time"
                      name="openingHours"
                      className="border px-2 py-1"
                      value={formData.openingHours}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Closing Hours:</td>
                  <td>
                    <input
                      type="time"
                      name="closingHours"
                      className="border px-2 py-1"
                      value={formData.closingHours}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Right Section */}
            <table className="w-1/2 text-left text-[#333543] border-separate border-spacing-y-2 ml-8">
              <thead>
                <tr>
                  <th colSpan={2} className="text-lg text-left pb-2 pt-5">
                    Additional Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pitch Manager:</td>
                  <td>
                    <input
                      type="text"
                      name="pitchManager"
                      className="border px-2 py-1"
                      value={formData.pitchManager}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Manager Contact:</td>
                  <td>
                    <input
                      type="text"
                      name="contact"
                      className="border px-2 py-1"
                      value={formData.contact}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Owner ID:</td>
                  <td>
                    <input
                      type="text"
                      name="ownerId"
                      className="border px-2 py-1"
                      value={formData.ownerId}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Category ID:</td>
                  <td>
                  <Select
                    options={categories}
                    value={categories.find(
                      (opt) => opt.value === formData.category_id
                    )}
                    onChange={(selected) =>
                      handleSelectChange("category_id", selected)
                    }
                  />
                  </td>
                </tr>
                <tr>
                  <td>Amenities:</td>
                  <td>
                    <Select
                      options={[
                        { value: "wifi", label: "WiFi" },
                        { value: "parking", label: "Parking" },
                        { value: "restrooms", label: "Restrooms" },
                      ]}
                      isMulti
                      name="amenities"
                      onChange={(selected) =>
                        setFormData((prev) => ({
                          ...prev,
                          amenities: selected.map((s) => s.value),
                        }))
                      }
                      className="!py-1"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Facilities:</td>
                  <td>
                    <Select
                      options={[
                        { value: "gym", label: "Gym" },
                        { value: "swimming_pool", label: "Swimming Pool" },
                      ]}
                      isMulti
                      name="facilities"
                      onChange={(selected) =>
                        setFormData((prev) => ({
                          ...prev,
                          facilities: selected.map((s) => s.value),
                        }))
                      }
                      className="!py-1"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Latitude:</td>
                  <td>
                    <input
                      type="text"
                      name="latitude"
                      placeholder="Latitude"
                      className="border px-2 py-1"
                      value={formData.location.latitude}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            latitude: e.target.value,
                          },
                        }))
                      }
                    />
                  </td>
                </tr>

                <tr>
                  <td>Longitude:</td>
                  <td>
                    <input
                      type="text"
                      name="longitude"
                      placeholder="Longitude"
                      className="border px-2 py-1"
                      value={formData.location.longitude}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            longitude: e.target.value,
                          },
                        }))
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <FileUploadComponent onFileUpload={handleFileUpload} error={null} />
        </div>

        <div className="flex justify-center mt-5">
          <button
            className="bg-playden-primary text-white py-2 px-16 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPitch;
