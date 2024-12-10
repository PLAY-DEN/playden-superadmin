import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../redux/settingsSlice";
import { apiClient } from "../utils/apiClient";
import { RootState } from "../redux/store";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

const AccountSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { data: settings, loading, error } = useSelector((state: RootState) => state.settings);

  const wysiwyg = import.meta.env.VITE_WYSIWYG;

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    cashbackValue: "",
    referrerCreditValue: "",
    hasBookingCancellation: false,
    privacyPolicy: "",
    termsOfService: "",
    contactUs: "",
    pitchOwnerPercent: "",
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
        name: settings.name || "",
        url: settings.url || "",
        cashbackValue: settings.cashback_value?.toString() || "",
        referrerCreditValue: settings.referrer_credit_value?.referee?.toString() || "",
        hasBookingCancellation: settings.has_booking_cancellation || false,
        privacyPolicy: settings.privacy_policy || "",
        termsOfService: settings.terms_of_service || "",
        contactUs: settings.contact_us || "",
        pitchOwnerPercent: settings.pitch_owner_percent || "",
      });
    }
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditorChange = (content: string, name: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: content,
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.warning("The name field is required.");
      return;
    }

    try {
      setIsSaving(true);
      const response = await apiClient("1/settings", "PUT", formData); // Save API
      // console.log("Save Response:", response)
      toast.success("Settings saved successfully!");
    } catch (err: any) {
      toast.warning(err.response?.data?.message || "Failed to save settings");
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
      <h2 className="text-lg font-semibold mb-6">Account Settings</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* URL */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL
          </label>
          <input
            type="text"
            id="referrerCreditValue"
            name="referrerCreditValue"
            value={formData.referrerCreditValue}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Contact Us */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Contact No.
          </label>
          <input
            type="tel"
            id="contactUs"
            name="contactUs"
            value={formData.contactUs}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Referree Credit Value */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Referrer Credit value
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Cashback Value */}
        <div>
          <label htmlFor="cashbackValue" className="block text-sm font-medium text-gray-700">
            Cashback Value
          </label>
          <input
            type="number"
            id="cashbackValue"
            name="cashbackValue"
            value={formData.cashbackValue}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Privacy Policy */}
        <div className="col-span-2">
          <label htmlFor="privacyPolicy" className="block text-sm font-medium text-gray-700">
            Privacy Policy
          </label>
          <Editor
            value={formData.privacyPolicy}
            onEditorChange={(content) => handleEditorChange(content, "privacyPolicy")}
            init={{
              apiKey: wysiwyg,
              height: 300,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            }}
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="privacyPolicy" className="block text-sm font-medium text-gray-700">
            Terms of Services
          </label>
          <Editor
            value={formData.termsOfService}
            onEditorChange={(content) => handleEditorChange(content, "termsOfService")}
            init={{
              apiKey: wysiwyg,
              height: 300,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            }}
          />
        </div>

        {/* Save Button */}
        <div className="col-span-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full px-4 py-2 text-white rounded-md shadow-sm ${
              isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-playden-primary hover:bg-playden-primary"
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
