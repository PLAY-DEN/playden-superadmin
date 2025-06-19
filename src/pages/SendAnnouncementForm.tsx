import { useState } from "react";
import { ApiClient } from "../api/client";
import { toast, ToastContainer } from "react-toastify";
import Input from "../components/forms/input";
// import Textarea from "../components/forms/textarea";
import { Button, Textarea } from "rizzui";

interface FormData {
  message_title: string;
  message_body: string;
  user_type: string;
}

interface FormErrors {
  message_title?: string;
  message_body?: string;
  user_type?: string;
}

const SendAnnouncementForm = () => {
  const [formData, setFormData] = useState<FormData>({
    message_title: "",
    message_body: "",
    user_type: "all",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccess(false);

    if (
      !formData.message_title ||
      !formData.message_body ||
      !formData.user_type
    ) {
      setErrors({
        message_title: !formData.message_title
          ? "Title is required"
          : undefined,
        message_body: !formData.message_body ? "Body is required" : undefined,
        user_type: !formData.user_type ? "User type is required" : undefined,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await ApiClient.post(
        `/api/v1/send-announcement`,
        {},
        {
          params: {
            message_title: formData.message_title,
            message_body: formData.message_body,
            user_type: formData.user_type,
          },
        }
      );

      console.log("Success:", response);
      setSuccess(true);
      setFormData({
        message_title: "",
        message_body: "",
        user_type: "all",
      });
    } catch (error: any) {
      console.error("Error sending announcement:", error);
      toast.error("Error sending announcement.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg">
      <ToastContainer />
      {/* Header Section */}
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl text-[#01031A] font-bold">Send Announcement</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="">Message Title</label>
          <Input
            disabled={isLoading}
            type="text"
            name="message_title"
            placeholder="Title"
            className={`border px-2 py-1 w-full ${
              errors.message_title ? "border-red-500" : ""
            }`}
            value={formData.message_title}
            onChange={handleInputChange}
          />
          {errors.message_title && (
            <p className="text-red-500 text-sm">{errors.message_title}</p>
          )}
        </div>

        <div>
          <label htmlFor="">Message Body</label>
          <Textarea
            disabled={isLoading}
            name="message_body"
            placeholder="Discount Description"
            className={`border px-2 py-1 w-full rounded-xl ${
              errors.message_body ? "border-red-500" : ""
            }`}
            value={formData.message_body}
            onChange={handleInputChange}
          />
          {errors.message_body && (
            <p className="text-red-500 text-sm">{errors.message_body}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white px-4 py-2 rounded-lg w-full"
        >
          {isLoading ? "Sending..." : "Send Announcement"}
        </Button>

        {success && (
          <p className="text-green-600 text-sm">
            Announcement sent successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default SendAnnouncementForm;
