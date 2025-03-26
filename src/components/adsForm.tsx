import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../redux/settingsSlice";
import { apiClient } from "../utils/apiClient";
import { RootState } from "../redux/store";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "./loading-page";
import ErrorPage from "./error-page";
import Input from "./forms/input";
import Button from "./forms/button";
import pitchClient from "../api/client/pitch";
import { Select } from "rizzui";
import { objectToFormData } from "../utils/utils";
import { ApiClient } from "../api/client";
import API_ENDPOINTS from "../api/client/_endpoint";
// import "react-quill/dist/quill.snow.css";

const AdsForm: React.FC = () => {
  const dispatch: any = useDispatch();
  const {
    data: settings,
    loading,
    error,
  } = useSelector((state: RootState) => state.settings);

  const [pitches, setPitches] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "carousel",
    pitch_id: "",
  });

  const [fileInput, setFileInput] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isSaving, setIsSaving] = useState(false);

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const fetchPitches = async (page: number, search = "") => {
    setIsLoading(true);
    try {
      const response = await pitchClient.getPitches({
        page: page,
        search,
      });

      const fetchedPitches = response.data.pitches || [];

      const { current_page, last_page } = response.data;

      setPitches(fetchedPitches);
      setCurrentPage(current_page);
      setTotalPages(last_page);

      const options = fetchedPitches.map((user: any) => ({
        value: user.id.toString(),
        label: `${user?.name}`,
      }));
      setOptions(options);
    } catch (error: any) {
      console.error("Fetch Error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to fetch pitches.";
      toast.error(errorMessage, { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPitches(currentPage, debouncedSearch);
    // return () => setIsDeleted(false);
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    // Populate form data when settings data is fetched
    if (settings) {
      setFormData({
        title: settings.title || "",
        content: settings.content || "",
        type: settings.type || "carousel",
        pitch_id: settings.pitch_id?.toString() || "",
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileInput(file);
  };

  // const handleEditorChange = (content: string, name: string) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: content,
  //   }));
  // };

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string; label: string } | null
  ) => {
    if (name === "pitch_id") {
      setFormData((prev) => ({
        ...prev,
        pitch_id: selectedOption ? selectedOption.value : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption ? selectedOption.value : "",
      }));
    }
  };

  const handleSave = async () => {
    let newErrors: Record<string, string> = {};
    // Validation
    if (!formData.title.trim()) {
      newErrors["title"] = "The name field is required.";
    }

    if (!fileInput) {
      newErrors["image"] = "Please upload an image.";
    }

    setErrors(newErrors);

    // If there are errors, return early
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const payload: any = {
      ...formData,
      content: formData.title,
      type: "carousel",
      image: fileInput,
    };
    console.log(payload);

    try {
      setIsSaving(true);
      const formData = objectToFormData(payload);
      await ApiClient.post(API_ENDPOINTS.GET_ADS, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // dispatch(fetchSettings());
      toast.success("Ads saved successfully!");
    } catch (err: any) {
      const errorData = err?.data || {};
      const newErrors: { [key: string]: string } = {};

      for (const key in errorData) {
        if (errorData.hasOwnProperty(key)) {
          newErrors[key] = errorData[key];
        }
      }

      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        toast.error("Error creating ads.");
      }
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
      <h2 className="text-lg font-semibold mb-6">Ads Manager</h2>
      <form>
        <div className="">
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* URL */}
          {/* <div className="mb-4">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <Input
              type="text"
              name="content"
              id="content"
              value={formData.content}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled
            />
          </div> */}

          {/* Cashback Value */}
          <div className="mb-4">
            <label
              htmlFor="cashback_value"
              className="block text-sm font-medium text-gray-700"
            >
              Ads Image (360 * 120)
            </label>

            <Input
              disabled={isSaving}
              type="file"
              name="image"
              className="border px-2 py-1"
              required
              onChange={handleFileUpload}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
          </div>

          {/* Cashback Value */}
          <div className="mb-4">
            <label
              htmlFor="pitch_owner_percent"
              className="block text-sm font-medium text-gray-700"
            >
              Pitch (optional)
            </label>
            <Select
              name="pitch_id"
              id="pitch_id"
              value={pitches.find((opt: any) => {
                return opt.id == formData.pitch_id;
              })}
              onChange={(selected: any) => {
                handleSelectChange("pitch_id", selected);
              }}
              selectClassName="rounded-full"
              options={options}
            >
              <option value=""></option>
            </Select>
            {errors.pitch_id && (
              <p className="text-red-500 text-sm">{errors.pitch_id}</p>
            )}
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdsForm;
