import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../redux/settingsSlice";
import { apiClient } from "../utils/apiClient";
import { RootState } from "../redux/store";

const AccountSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { data: settings, loading, error } = useSelector((state: RootState) => state.settings);

  const [formData, setFormData] = useState({
    name: "",
    contactUs: "",
    currency: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch settings on mount
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    // Populate form data when settings data is fetched
    if (settings) {
      setFormData({
        name: settings.data?.name || "",
        contactUs: settings.contactUs || "",
        currency: settings.currency || "",
      });
    }
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await apiClient("1/settings", "POST", formData); // Save API
      console.log("Save Response:", response);
      alert("Settings saved successfully!");
    } catch (err: any) {
      console.error("Error saving settings:", err);
      alert(err.response?.data || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="bg-white mt-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-white mt-8 text-red-600">
        <p>Error fetching account settings: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white mt-8 p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

      <form className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Contact Us Input */}
        <div>
          <label htmlFor="contactUs" className="block text-sm font-medium text-gray-700">
            Contact Us
          </label>
          <input
            type="text"
            id="contactUs"
            name="contactUs"
            value={formData.contactUs}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Currency Input */}
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
            Currency
          </label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Save Button */}
        <div>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full px-4 py-2 text-white rounded-md shadow-sm ${
              isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
