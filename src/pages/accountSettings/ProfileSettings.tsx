import { useState } from "react";
// import { Button } from "rizzui";
import { FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Input from "../../components/forms/input";
import { ToastContainer } from "react-toastify";
import Button from "../../components/forms/button";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    address: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState({
    update: false,
    changePassword: false,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    setIsLoading((prev) => ({ ...prev, update: true }));
    // Simulate API call
    setTimeout(
      () => setIsLoading((prev) => ({ ...prev, update: false })),
      1500
    );
  };

  const handleChangePassword = () => {
    setIsLoading((prev) => ({ ...prev, changePassword: true }));
    // Simulate API call
    setTimeout(
      () => setIsLoading((prev) => ({ ...prev, changePassword: false })),
      1500
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
      <div className="space-y-4 mt-4">
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
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
          name="phoneNumber"
          value={formData.phoneNumber}
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
