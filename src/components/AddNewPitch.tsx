import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "./forms/select";
import CreateCategoryModal from "./Modal";
import { MultiSelect } from "rizzui";
import pitchClient from "../api/client/pitch";
import Input from "./forms/input";

const AddNewPitch: React.FC = () => {
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [owners, setOwners] = useState<{ value: string; label: string }[]>([]);
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
    owner_id: "",
    location: { latitude: "", longitude: "" },
    amenities: ['gmy', 'swiing ppol', 'bar'],
    facilities: ['gmy', 'swiing ppol', 'bar'],
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

  useEffect(() => {
    const fetchOwners = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const bearerToken = localStorage.getItem("token");

      try {
        const response = await fetch(`${baseUrl}/admin/users?user_role=pitch_owner`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const result = await response.json();

        console.log("Fetched owners data:", result);
        if (result.success && Array.isArray(result.data.users)) {
          const formattedOwners = result.data.users.map((user: any) => ({
            value: user.id.toString(),
            label: user.id.toString(),
          }));
          setOwners(formattedOwners);
           //  default id if not selected
           if (formattedOwners.length > 0 && !formData.owner_id) {
            setFormData((prev) => ({
              ...prev,
              owner_id: formattedOwners[0].value,
            }));
          }
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        toast.error("Error fetching users.");
        console.error("Error:", error);
      }
    };

    fetchOwners();
  }, []);


  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const bearerToken = localStorage.getItem("token");

      try {
        const response = await fetch(`${baseUrl}/admin/categories`, {
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
    console.log(`Updating ${name} with value:`, selectedOption?.value);
    
    
    if (name === 'pitch_owner_id') {
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

  const handleFileUpload = (image: File) => setFileInput(image);


  const handleSave = async () => {

    // TODO
    // Here you should add your proper validation logic and save the pitch to the server
    // You should also return error messages to form inputs instead of toast, toast is for completed or failed operation
    // add loading stage

    // break your code is to large here
    // i've started the api client creation process, you study and follow aslonh

    // Validate required fields
    console.log("Form Data on Save:", formData);

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
    for (const field of requiredFields) {
      const value = field.name.includes(".")
        ? field.name.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), formData)
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
console.log( Object.keys(newErrors));

    //
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Ensure data types are correct
    const validatedFormData = {
      ...formData,
      amount_per_hour: parseFloat(formData.amountPerHour),
      discount: parseFloat(formData.discount),
      "location[latitude]": parseFloat(formData.location.latitude),
      "location[longitude]": parseFloat(formData.location.longitude),
      amenities: JSON.stringify(amenities),
      facilities: JSON.stringify(facilities),
      image: fileInput,
      opening_hours: formData.openingHours,
      closing_hours: formData.closingHours,
      size: formData.size,
      // pitch_owner_id: formData.owner_id,
      // pitchManager: parseInt(formData.pitchManager),
      // gallery: JSON.stringify(gallery)
    };
    // console.log(gallery);
    // return;
    try {
      const result = await pitchClient.createPitch(validatedFormData);
      toast.success("Pitch created successfully!");
      console.log("Result:", result);
    } catch (error) {
      toast.error("Error creating pitch.");
      console.error("Error creating pitch:", error);
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
                    <Input
                      type="text"
                      name="name"
                      className={`border px-2 py-1 ${errors.name ? "border-red-500" : ""}`}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </td>
                </tr>
                <tr>
                  <td>Pitch Size:</td>
                  <td>
                    <Input
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
                    <Input
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
                    <Input
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
                    <Input
                      type="time"
                      name="openingHours"
                      className={`border px-2 py-1 ${errors.openingHours ? "border-red-500" : ""}`}
                      value={formData.openingHours}
                      onChange={handleInputChange}
                    />
                  </td>
                  {errors.openingHours && <p className="text-red-500 text-sm">{errors.openingHours}</p>}
                </tr>
                <tr>
                  <td>Closing Hours:</td>
                  <td>
                    <Input
                      type="time"
                      name="closingHours"
                      className="border px-2 py-1"
                      value={formData.closingHours}
                      onChange={handleInputChange}
                    />
                    {errors.closingHours && <p className="text-red-500 text-sm">{errors.closingHours}</p>}
                  </td>
                </tr>
                <tr>
                  <td>Images</td>
                  <td>
                    <Input
                      type="file"
                      name="gallery"
                      className="border px-2 py-1"
                      required
                      onChange={handleFileUpload}
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
                    <Input
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
                    <Input
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
                    {/* You are to get the list of users with the role pitch other and pass it into a select form. NB the user id should be its value */}
                    <Select
  options={owners}
  value={owners.find((opt) => opt.value === formData.owner_id)}
  onChange={(selected) =>
    handleSelectChange("owner_id", selected)
  }
/>

                    {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
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
                      selectClassName="!px-2 py-1 rounded-full border-[0.4px] border-primary"
                      errorClassName="text-red-500"
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
                        selectClassName="!px-2 py-1 rounded-full border-[0.4px] border-primary"
                        errorClassName="text-red-500"
                      />
                      {errors.facilities && <p className="text-red-500 text-sm">{errors.facilities}</p>}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Latitude:</td>
                  <td>
                    <Input
                      type="number"
                      name="latitude"
                      placeholder="Latitude"
                      className="border px-2 py-1"
                      value={formData.location.latitude}
                      onChange={(e: any) =>
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
                    <Input
                      type="number"
                      name="longitude"
                      placeholder="Longitude"
                      className="border px-2 py-1"
                      value={formData.location.longitude}
                      onChange={(e: any) =>
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

          {/* <FileUploadComponent onFileUpload={handleFileUpload} error={null} /> */}
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
