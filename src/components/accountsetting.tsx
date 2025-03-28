import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../redux/settingsSlice";
import { apiClient } from "../utils/apiClient";
import { RootState } from "../redux/store";
import { toast, ToastContainer } from "react-toastify";
import { Switch } from "rizzui";
import LoadingPage from "./loading-page";
import ErrorPage from "./error-page";
// import "react-quill/dist/quill.snow.css";

const AccountSettings: React.FC = () => {
  const dispatch: any = useDispatch();
  const {
    data: settings,
    loading,
    error,
  } = useSelector((state: RootState) => state.settings);

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    pushNotificationsData: null,
    cashback_value: "",
    currency: "",
    referrerCreditValueReferee: "",
    referrerCreditValueReferrer: "",
    has_booking_cancellation: false,
    privacy_policy: "",
    terms_of_service: "",
    about_us: "",
    contact_us: "",
    pitch_owner_percent: "",
    first_booking_discount: 0,
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
        pushNotificationsData: settings.push_notifications_data || null,
        cashback_value: settings.cashback_value?.toString() || "",
        currency: settings.currency || "",
        referrerCreditValueReferee:
          settings.referrer_credit_value?.referee?.toString() || "",
        referrerCreditValueReferrer:
          settings.referrer_credit_value?.referrer?.toString() || "",
        has_booking_cancellation: settings.has_booking_cancellation || false,
        privacy_policy: settings.privacy_policy || "",
        terms_of_service: settings.terms_of_service || "",
        about_us: settings.about_us || "",
        contact_us: settings.contact_us || "",
        pitch_owner_percent: settings.pitch_owner_percent || "",
        first_booking_discount: settings.first_booking_discount * 100 || 0,
      });
    }
  }, [settings]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleEditorChange = (content: string, name: string) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: content,
  //   }));
  // };

  const handleSave = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.warning("The name field is required.");
      return;
    }

    const payload: any = {
      ...formData,
      referrer_credit_value: {
        referee: Number(formData.referrerCreditValueReferee),
        referrer: Number(formData.referrerCreditValueReferrer),
      },
      first_booking_discount: formData.first_booking_discount / 100,
    };

    delete payload.referrerCreditValueReferee;
    delete payload.referrerCreditValueReferrer;

    try {
      setIsSaving(true);
      await apiClient("api/v1/1/settings", "PUT", payload);
      // dispatch(fetchSettings());
      toast.success("Settings saved successfully!");
    } catch (err: any) {
      toast.warning(err.response?.data?.message || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <div className="">
      <ToastContainer />
      <h2 className="text-lg font-semibold mb-6">System Settings</h2>
      <form>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 border-r pr-3">
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* URL */}
            <div className="mb-4">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                URL
              </label>
              <input
                type="text"
                name="url"
                id="url"
                value={formData.url}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled
              />
            </div>

            {/* Cashback Value */}
            <div className="mb-4">
              <label
                htmlFor="cashback_value"
                className="block text-sm font-medium text-gray-700"
              >
                Cashback Value
              </label>
              <input
                type="number"
                name="cashback_value"
                id="cashback_value"
                value={formData.cashback_value}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Cashback Value */}
            <div className="mb-4">
              <label
                htmlFor="pitch_owner_percent"
                className="block text-sm font-medium text-gray-700"
              >
                Pitch Owner Percent
              </label>
              <input
                type="number"
                name="pitch_owner_percent"
                id="pitch_owner_percent"
                value={formData.pitch_owner_percent}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Currency */}
            <div className="mb-4">
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700"
              >
                Currency
              </label>
              <input
                type="text"
                name="currency"
                id="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled
              />
            </div>

            {/* Privacy Policy */}
            <div className="mb-4">
              <label
                htmlFor="privacy_policy"
                className="block text-sm font-medium text-gray-700"
              >
                Privacy Policy
              </label>
              <textarea
                name="privacy_policy"
                onChange={handleInputChange}
                rows={5}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {/* <ReactQuill
                theme="snow"
                value={formData.privacy_policy}
                onChange={(content: string) =>
                  handleEditorChange(content, "privacy_policy")
                }
              /> */}
            </div>

            {/* Privacy Policy */}
            <div className="mb-4">
              <label
                htmlFor="privacy_policy"
                className="block text-sm font-medium text-gray-700"
              >
                Terms of Service
              </label>
              <textarea
                name="terms_of_service"
                onChange={handleInputChange}
                rows={5}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              {/* <ReactQuill
                theme="snow"
                value={formData.terms_of_service}
                onChange={(content: string) =>
                  handleEditorChange(content, "terms_of_service")
                }
              /> */}
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          <div className="col-span-1">
            <div className="mb-4 flex justify-between items-center">
              <label
                htmlFor="contact_us"
                className="block text-sm font-medium text-gray-700"
              >
                Booking cancellation
              </label>

              <Switch
                name="has_booking_cancellation"
                checked={formData.has_booking_cancellation}
                onChange={handleInputChange}
              />
              {/* <input
                type="text"
                name="contact_us"
                id="contact_us"
                value={formData.contact_us}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              /> */}
            </div>

            <div className="mb-4">
              <label
                htmlFor="referrerCreditValueReferee"
                className="block text-sm font-medium text-gray-700"
              >
                Referee Credit Value
              </label>
              <input
                type="number"
                name="referrerCreditValueReferee"
                id="referrerCreditValueReferee"
                value={formData.referrerCreditValueReferee}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="referrerCreditValueReferrer"
                className="block text-sm font-medium text-gray-700"
              >
                Referrer Credit Value
              </label>
              <input
                type="number"
                name="referrerCreditValueReferrer"
                id="referrerCreditValueReferrer"
                value={formData.referrerCreditValueReferrer}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="referrerCreditValueReferrer"
                className="block text-sm font-medium text-gray-700"
              >
                First time booking discount (%)
              </label>
              <input
                type="number"
                name="first_booking_discount"
                id="first_booking_discount"
                value={formData.first_booking_discount}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
