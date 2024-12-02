import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUploadComponent from "./FileUploadComponent";
import Select from "./forms/select";
import CreateCategoryModal from "./Modal";
import { MultiSelect } from "rizzui";
import pitchClient from "../api/client/pitch";

const AddNewPitch: React.FC = () => {
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    ownerId: "1",
    location: { latitude: "", longitude: "" },
    amenities: ['gmy','swiing ppol','bar'] ,
    facilities: ['gmy','swiing ppol','bar'] ,
    image: null,
    gallery: [],
  });

  const [amenities, setAmenities] = useState<any[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);

  const amenitiesOptions = [
    { label: 'Changing Room', value: 'Changing Room' },
    { label: 'Capacity', value: 'Capacity' },
    { label: 'Sitting Area', value: 'Sitting Area' },
  ];

  const facilitiesOptions = [
    { label: 'Swimming Pool', value: 'Swimming Pool' },
    { label: 'Garden', value: 'Garden' },
    { label: 'Tennis Court', value: 'Tennis Court' },
    { label: 'Gym', value: 'Gym' },
    { label: 'Wifi', value: 'Wifi' },
    { label: 'Spa', value: 'Spa' },
    { label: 'Restaurant', value: 'Restaurant' },
  ];

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      const baseUrl = 'http://localhost:8000' //import.meta.env.VITE_BASE_URL;
      const bearerToken = localStorage.getItem("token");

      try {
        const response = await fetch(`${baseUrl}/api/v1/admin/categories`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            // "Content-Type": "application/json",
            Accept: "application/json",
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

  // const handleSave = async () => {
  //   //  all required fields
  //   const requiredFields = [
  //     { name: "name", label: "Pitch Name" },
  //     { name: "amountPerHour", label: "Pitch Price" },
  //     { name: "discount", label: "Discount" },
  //     { name: "category_id", label: "Category" },
  //     { name: "contact", label: "Contact" },
  //     { name: "openingHours", label: "Opening Hours" },
  //     { name: "closingHours", label: "Closing Hours" },
  //     { name: "size", label: "Pitch Size" },
  //     { name: "pitchManager", label: "Pitch Manager" },
  //     { name: "ownerId", label: "Owner ID" },
  //     { name: "location.latitude", label: "Latitude" },
  //     { name: "location.longitude", label: "Longitude" },
  //   ];

  //   //  for missing values
  //   for (const field of requiredFields) {
  //     const value = field.name.includes(".")
  //       ? field.name.split(".").reduce((acc, key) => acc[key], formData)
  //       : formData[field.name];
  //     if (!value || value.trim() === "") {
  //       toast.error(`Please provide a value for ${field.label}.`);
  //       return;
  //     }
  //   }

  //   // Validate file input
  //   if (!fileInput) {
  //     toast.error("Please upload an image.");
  //     return;
  //   }

  //   // Proceed if all validations pass
  //   const formdata = new FormData();
  //   formdata.append("name", formData.name);
  //   formdata.append("amount_per_hour", formData.amountPerHour);
  //   formdata.append("discount", formData.discount);
  //   formdata.append("ratings", formData.ratings || "0");
  //   formdata.append("category_id", formData.category_id);
  //   formdata.append("contact", formData.contact);
  //   formdata.append("opening_hours", formData.openingHours);
  //   formdata.append("closing_hours", formData.closingHours);
  //   formdata.append("size", formData.size);
  //   formdata.append("image", fileInput);
  //   formdata.append("owner_id", formData.ownerId);
  //   formdata.append("amenities", JSON.stringify(amenities));
  //   formdata.append("facilities", JSON.stringify(facilities));
  //   // formdata.append("location", JSON.stringify(formData.location));
  //   formdata.append("location[latitude]", formData.location.latitude);
  //   formdata.append("location[longitude]", formData.location.longitude);

  //   const baseUrl = 'http://localhost:8000'//import.meta.env.VITE_BASE_URL;
  //   const bearerToken = localStorage.getItem("token");
  //   try {



  //     const response = await fetch(`${baseUrl}/api/v1/admin/pitches`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${bearerToken}` },
  //       body: formdata,
  //     });
  //     console.log(await response.json());

  //     if (!response.ok) throw new Error("Failed to create pitch.");
  //     const result = await response.json();
  //     toast.success("Pitch created successfully!");
  //     console.log("Result:", result);
  //   } catch (error) {
  //     toast.error("Error creating pitch.");
  //     console.error("Error:", error);
  //   }
  // };

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
  
    const newErrors: Record<string, string> = {};
  
    // Validate required fields
    for (const field of requiredFields) {
      const value = field.name.includes(".")
        ? field.name.split(".").reduce((acc, key) => acc[key], formData)
        : formData[field.name];
  
      if (!value || value.trim() === "") {
        newErrors[field.name] = `${field.label} is required.`;
      }
    }
  
    if (!fileInput) {
      newErrors["image"] = "Please upload an image.";
    }
  
    //  errors in state
    setErrors(newErrors);
  
    //
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  
    //  FormData
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
  

    formdata.append("amenities", JSON.stringify(formData.amenities || []));
    formdata.append("facilities", JSON.stringify(formData.facilities || []));
  
   
    const location =
      formData.location?.latitude && formData.location?.longitude
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
        throw new Error(errorData.message || "Failed to create pitch.");
      }
  
      const result = await response.json();
      toast.success("Pitch created successfully!");
      console.log("Result:", result);
    } catch (error: any) {
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
                      className= {`border px-2 py-1 ${errors.name ? "border-red-500" : ""}`}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </td>
                </tr>
                <tr>
                  <td>Pitch Size:</td>
                  <td>
                    <input
                      type="text"
                      name="size"
                      className={`border px-2 py-1 ${errors.size ? "border-red-500" : ""}`}
                      value={formData.size}
                      onChange={handleInputChange}
                    />
                    {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
                  </td>
                </tr>
                <tr>
                  <td>Pitch Price:</td>
                  <td>
                    <input
                      type="number"
                      name="amountPerHour"
                      className={`border px-2 py-1 ${errors.amountPerHour ? "border-red-500" : ""}`}
                      value={formData.amountPerHour}
                      onChange={handleInputChange}
                    />
                    {errors.amountPerHour && <p className="text-red-500 text-sm">{errors.amountPerHour}</p>}
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
                    {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
                  </td>
                </tr>
                <tr>
                  <td>Opening Hours:</td>
                  <td>
                    <input
                      type="time"
                      name={`border px-2 py-1 ${errors.openingHours ? "border-red-500" : ""}`}
                      className="border px-2 py-1"
                      value={formData.openingHours}
                      onChange={handleInputChange}
                    />
                  </td>
                  {errors.openingHours && <p className="text-red-500 text-sm">{errors.openingHours}</p>}
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
                    {errors.closingHours && <p className="text-red-500 text-sm">{errors.closingHours}</p>}
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
                    {errors.pitchManager && <p className="text-red-500 text-sm">{errors.pitchManager}</p>}
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
                    {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                  </td>
                </tr>
                <tr>
                  <td>Owner:</td>
                  <td>
                    You are to get the list of users with the role pitch other and pass it into a select form. NB the user id should be its value
                    {/* <input
                      type="text"
                      name="ownerId"
                      className="border px-2 py-1"
                      value={formData.ownerId}
                      onChange={handleInputChange}
                    />
                    {errors.ownerId && <p className="text-red-500 text-sm">{errors.ownerId}</p>}
                  </td>
                </tr>
                <tr>
                  <td>Category:</td>
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
                  {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
                  </td>
                </tr>
                <tr>
                  <td>Amenities:</td>
                  <td>
                    <MultiSelect
                      value={amenities}
                      options={amenitiesOptions}
                      onChange={setAmenities}
                      // error={error?.message}
                      className="w-full"
                      clearable={true}
                      onClear={() => setAmenities([])}
                      selectClassName="!h-[56px] rounded-full border-[0.4px] border-primary"
                      errorClassName="text-red-500"
                    />
                    {/* <Select
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
                    {errors.amenities && <p className="text-red-500 text-sm">{errors.amenities}</p>}
                  </td>
                </tr>
                <tr>
                  <td>Facilities:</td>
                  <td>
                    <div className="">

                      <MultiSelect
                        value={facilities}
                        options={facilitiesOptions}
                        onChange={setFacilities}
                        // error={error?.message}
                        className="w-full"
                        clearable={true}
                        onClear={() => setFacilities([])}
                        selectClassName="!h-[56px] rounded-full border-[0.4px] border-primary"
                        errorClassName="text-red-500"
                      />

                    </div>
                    {/* <Select
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
                    {errors.facilities && <p className="text-red-500 text-sm">{errors.facilities}</p>}
                  </td>
                </tr>
                <tr>
                  <td>Latitude:</td>
                  <td>
                    <input
                      type="number"
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
                    {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude}</p>}
                  </td>
                </tr>

                <tr>
                  <td>Longitude:</td>
                  <td>
                    <input
                      type="number"
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
                    {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude}</p>}
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
