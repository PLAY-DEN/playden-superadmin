import { useEffect, useState } from "react";
// import { Button } from "rizzui";
import { FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Input from "../../components/forms/input";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../components/forms/button";
import API_ENDPOINTS from "../../api/client/_endpoint";
import { apiClient } from "../../utils/apiClient";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    username: "",
    phone_number: "",
    address: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  // const [error, setError] = useState(null);
  const [isPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState({
    update: false,
    changePassword: false,
  });


  const fetchProfileData = async () => {
    try {
      const response = await apiClient(`${API_ENDPOINTS.GET_USER_}`, "GET");

      const userData = response.data; // Corrected data extraction

      // Update state with received data, replacing `null` values with empty strings
      setFormData({
        full_name: userData.full_name ?? "",
        email: userData.email ?? "",
        username: userData.username ?? "",
        phone_number: userData.phone_number ?? "",
        address: userData.address ?? "",
        oldPassword: "",
        password: "",
        confirmPassword: "",
      });

      console.log("Updated FormData State:", formData);
    } catch (err: any) {
      // setError(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsLoading((prev) => ({ ...prev, update: true }));
    const { oldPassword, password, confirmPassword, ...rest } = formData;
    try {
      await apiClient(
        `${API_ENDPOINTS.GET_USER_}`,
        "PUT",
        JSON.stringify(rest)
      );

      toast.success("Profile updated successfully!");
      fetchProfileData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const handleChangePassword = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading((prev) => ({ ...prev, changePassword: true }));

    try {
      await apiClient(
        `${API_ENDPOINTS.GET_USER_}`,
        "PUT",
        JSON.stringify({
          old_password: formData.oldPassword,
          new_password: formData.password,
          type: "password",
        })
      );
      toast.success("Password changed successfully!");
      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        password: "",
        confirmPassword: "",
      }));
    } catch (err: any) {
      console.log(err.response.data.data);

      if (err?.response?.data?.data) {
        const errorData = err?.response?.data?.data;
        for (const key in errorData) {
          if (errorData.hasOwnProperty(key)) {
            toast.error(errorData[key]);
          }
        }
      } else {
        // toast.error(err.message);
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, changePassword: false }));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
      <div className="space-y-4 mt-4">
        <Input
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
          placeholder="Full name"
          icon={<FiUser />}
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          icon={<FiMail />}
        />
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          icon={<FiUser />}
        />
        <Input
          label="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          placeholder="Phone number"
          icon={<FiPhone />}
        />
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          icon={<FiMapPin />}
        />
        <Button
          //   label="Update"
          onClick={handleUpdate}
          isLoading={isLoading.update}
          className="!rounded-full !w-full"
        >
          Update
        </Button>
      </div>
      <div className="w-full border my-6" />
      <div className="space-y-4">
        <Input
          label="Old Password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleInputChange}
          placeholder="Old password"
          type={isPasswordVisible ? "text" : "password"}
          //   icon={
          //     <IconButton
          //       icon={isPasswordVisible ? <FiEyeOff /> : <FiEye />}
          //       onClick={() => setIsPasswordVisible((prev) => !prev)}
          //     />
          //   }
        />
        <Input
          label="New Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          type={isPasswordVisible ? "text" : "password"}
          //   icon={
          //     <IconButton
          //       icon={isPasswordVisible ? <FiEyeOff /> : <FiEye />}
          //       onClick={() => setIsPasswordVisible((prev) => !prev)}
          //     />
          //   }
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm password"
          type={isPasswordVisible ? "text" : "password"}
          //   icon={
          //     <IconButton
          //       icon={isPasswordVisible ? <FiEyeOff /> : <FiEye />}
          //       onClick={() => setIsPasswordVisible((prev) => !prev)}
          //     />
          //   }
        />
        <Button
          //   label="Change Password"
          onClick={handleChangePassword}
          isLoading={isLoading.changePassword}
          className="!rounded-full !w-full"
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
