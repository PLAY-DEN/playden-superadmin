import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUploadComponent from "./FileUploadComponent";
import Select from "./forms/select";

const AddNewPitch: React.FC = () => {
  const [fileInput, setFileInput] = useState<File | null>(null);

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
    amenities: [],
    facilities: [],
    image: null,
  });

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

  const handleFileUpload = (image: File) => {
    setFileInput(image);
  };

  const handleSave = async () => {
    if (!fileInput) {
      toast.error("Please upload an image file.");
      return;
    }

    if (!fileInput.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (e.g., JPEG or PNG).");
      return;
    }

    if (!formData.category_id) {
      console.log("Category ID is missing:", formData.category_id);
      toast.error("Please select a category ID.");
      return;
    }

    if (!formData.contact) {
      toast.error("Please provide a contact.");
      return;
    }

    if (!formData.image) {
      toast.error("Please upload an image.");
      return;
    }

    if (!formData.location.latitude || !formData.location.longitude) {
      toast.error("Please provide both latitude and longitude.");
      return;
    }

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const bearerToken = localStorage.getItem("token");

    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("amount_per_hour", formData.amountPerHour);
    formdata.append("discount", formData.discount || "0");
    formdata.append("ratings", formData.ratings || "0");
    formdata.append("category_id", formData.category_id);
    formdata.append("contact", formData.contact);
    formdata.append(
      "opening_hours",
      `${formData.openingHours} - ${formData.closingHours}`
    );
    formdata.append("size", formData.size);
    formdata.append("image", formData.image);
    formdata.append("owner_id", formData.ownerId);
    formdata.append(
      "location",
      JSON.stringify({ latitude: "40.712776", longitude: "-74.005974" })
    );
    formdata.append(
      "amenities",
      JSON.stringify(["Combo", "Walk way", "Water pool"])
    );
    formdata.append(
      "facilities",
      JSON.stringify(["Restrooms", "Gim", "Swimming pool", "Eatery"])
    );

    try {
      console.log("FormData content:", formdata);
      formdata.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await fetch(`${baseUrl}/admin/pitches`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: formdata,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server error response:", errorResponse);
        toast.error(
          `Error creating pitch: ${
            errorResponse.message || response.statusText
          }`
        );
        return;
      }

      const result = await response.json();
      toast.success("Pitch created successfully!");
      console.log("Pitch created successfully:", result);
    } catch (error) {
      toast.error(`Error creating pitch: ${error.message}`);
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
                      options={[
                        { value: "1", label: "Football" },
                        { value: "2", label: "Basketball" },
                        { value: "3", label: "Tennis" },
                      ]}
                      value={
                        formData.category_id
                          ? {
                              value: formData.category_id,
                              label: options.find(
                                (opt) => opt.value === formData.category_id
                              )?.label,
                            }
                          : null
                      }
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
