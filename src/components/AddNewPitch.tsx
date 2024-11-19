import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUploadComponent from "./FileUploadComponent";
import Select from "./forms/select";

const AddNewPitch: React.FC = () => {
  const [fileInput, setFileInput] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setFileInput(file);
  };

  const handleSave = async () => {
    if (!fileInput) {
      toast.error("Please upload an image file.");
      return;
    }


    const baseUrl = process.env.REACT_APP_BASE_URL;
    const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    const formdata = new FormData();
    formdata.append("name", "Amara pitch");
    formdata.append("amount_per_hour", "5500");
    formdata.append("discount", "0");
    formdata.append("ratings", "0");
    formdata.append("category_id", "3");
    formdata.append("contact", "+23489898393");
    formdata.append("opening_hours", "06:00 - 18:00");
    formdata.append("size", "Large");
    formdata.append("image", fileInput);
    formdata.append("owner_id", "21");
    formdata.append("location[latitude]", "40.712776");
    formdata.append("location[longitude]", "-74.005974");
    formdata.append("amenities[0]", "Combo");
    formdata.append("amenities[1]", "Walk way");
    formdata.append("amenities[2]", "Water pool");
    formdata.append("facilities[0]", "Restrooms");
    formdata.append("facilities[1]", "Gym");
    formdata.append("facilities[2]", "Swimming pool");
    formdata.append("facilities[3]", "Eatery");
    formdata.append("categories[0]", "3");
    formdata.append("categories[1]", "2");
    formdata.append("categories[2]", "4");

    try {
      const response = await fetch(`${baseUrl}/api/v1/admin/pitches`, {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
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
        <h1 className="text-lg mb-4">Plutus Clubhouse Field</h1>
        <div className="flex flex-col">
          {/* Tables Section */}
          <div className="flex w-full justify-between ml8">
            {/* First Table */}
            <table className="w-1/2 text-left text-[#333543] border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th colSpan={2} className="text-lg text-left pb-2 pt-5">Pitch Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pitch Size:</td>
                  <td>2,377 kilometers</td>
                </tr>
                <tr>
                  <td>Pitch Sport:</td>
                  <td>
                    <Select
                      options={[
                        { value: "football", label: "Football" },
                        { value: "basketball", label: "Basketball" },
                      ]}
                      value={""}
                      setValue={() => {}}
                      className="!py-1"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Pitch Address:</td>
                  <td>Plutus Clubhouse, U/Rimi, Kaduna</td>
                </tr>
                <tr>
                  <td>Pitch Price:</td>
                  <td>
                    <Select
                      options={[
                        { value: "low", label: "Low" },
                        { value: "medium", label: "Medium" },
                        { value: "high", label: "High" },
                      ]}
                      value={""}
                      setValue={() => {}}
                      className="!py-1"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Opening Hours:</td>
                  <td>7:00 AM</td>
                </tr>
                <tr>
                  <td>Closing Hours:</td>
                  <td>10:00 PM</td>
                </tr>
              </tbody>
            </table>

            {/* Second Table */}
            <table className="w-1/2 text-left text-[#333543] border-separate border-spacing-y-2 ml-8 mt-12">
              <tbody>
                <tr>
                  <td>Pitch Manager:</td>
                  <td>Ahmed Salisu</td>
                </tr>
                <tr>
                  <td>Manager Contact:</td>
                  <td>08034763911</td>
                </tr>
                <tr>
                  <td>Pitch Owner:</td>
                  <td>
                    <Select
                      options={[
                        { value: "john", label: "John Doe" },
                        { value: "jane", label: "Jane Smith" },
                      ]}
                      value={""}
                      setValue={() => {}}
                      className="!py-1"
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
                      ]}
                      value={""}
                      setValue={() => {}}
                      className="!py-1"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Facilities:</td>
                  <td>
                    <Select
                      options={[
                        { value: "restrooms", label: "Restrooms" },
                        { value: "gym", label: "Gym" },
                      ]}
                      value={""}
                      setValue={() => {}}
                      className="!py-1"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <FileUploadComponent onFileUpload={handleFileUpload} error={null} />
        </div>

        {/* Save Button */}
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
