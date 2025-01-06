import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Input from "../forms/input";
import Button from "../forms/button";
import { Loader } from "rizzui";

interface AdminFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formData: any;
    formErrors: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    isLoading: boolean;
    isEditMode: boolean;
}

const AdminFormModal: React.FC<AdminFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    formErrors,
    handleInputChange,
    isLoading,
    isEditMode,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-semibold mb-4">{isEditMode ? "Edit Admin" : "Add New Admin"}</h2>
                <form onSubmit={onSubmit}>
                    <div className="w-full mb-4">
                        <label>User Role</label>
                        <select
                            disabled={isLoading}
                            className="py-1 rounded-full border-[0.4px] border-primary w-full"
                            value={formData.user_role}
                            onChange={handleInputChange}
                        >
                            <option value="super_admin">Super Admin</option>
                            <option value="pitch_owner">Pitch Admin</option>
                            <option value="pitch_manager">Pitch Manager</option>
                        </select>
                    </div>
                    <label>Full Name</label>
                    <Input
                        disabled={isLoading}
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="border px-2 py-1"
                        required
                        error={formErrors.full_name}
                    />
                    <label>Email:</label>
                    <Input
                        disabled={isLoading}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border px-2 py-1"
                        required
                        error={formErrors.email}
                    />
                    <label>Username: </label>
                    <Input
                        disabled={isLoading}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="border px-2 py-1"
                        required
                        error={formErrors.username}
                    />
                    <label>Address: </label>
                    <Input
                        disabled={isLoading}
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="border px-2 py-1"
                        required
                        error={formErrors.address}
                    />
                    <label>Phone Number: </label>
                    <Input
                        disabled={isLoading}
                        type="number"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="border px-2 py-1"
                        required
                        error={formErrors.phone_number}
                    />
                    {!isEditMode && (<>
                        <label>Password: </label>
                        <Input
                            disabled={isLoading}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="border px-2 py-1"
                            required
                            error={formErrors.password}
                        /></>)}
                    <div className="flex justify-end gap-2 mt-2">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="!bg-gray-500 text-white p-2 !rounded-full"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-playden-primary text-white p-2 !rounded-full">
                            {isLoading ? <Loader variant="spinner" /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminFormModal;