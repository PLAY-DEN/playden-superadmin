import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Input from "../forms/input";
import Button from "../forms/button";
import { Loader } from "rizzui";

interface AddPlayPointModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: any;
  formErrors: any;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  isLoading: boolean;
}

const AddPlayPointModel: React.FC<AddPlayPointModelProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  formErrors,
  handleInputChange,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{"Add PlayPoint"}</h2>
        <form onSubmit={onSubmit}>
          <label>PlayPoint Amount</label>
          <Input
            disabled={isLoading}
            type="number"
            name="playpoint_amount"
            placeholder="Amount"
            value={formData.playpoint_amount}
            onChange={handleInputChange}
            className="border px-2 py-1"
            // required
            error={formErrors.playpoint_amount}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button
              type="button"
              onClick={onClose}
              className="!bg-gray-500 text-white p-2 !rounded-full"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-playden-primary text-white p-2 !rounded-full"
            >
              {isLoading ? <Loader variant="spinner" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayPointModel;
