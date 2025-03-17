import React from "react";
import Input from "../forms/input";
// import Select from "../forms/select";
import { Loader, MultiSelect, Select } from "rizzui";
import Button from "../forms/button";

// Define the interface for the props
interface PitchFormProps {
  formData: any;
  errors: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGalleryUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, selectedOption: any) => void;
  owners: any[];
  managers: any[];
  categories: any[];
  amenities: any[];
  amenitiesOptions: any[];
  setAmenities: (selected: any[]) => void;
  facilities: any[];
  facilitiesOptions: any[];
  setFacilities: (selected: any[]) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleSave: () => void;
  isLoading: boolean;
}

const PitchForm: React.FC<PitchFormProps> = ({
  formData,
  errors,
  handleInputChange,
  handleFileUpload,
  handleGalleryUpload,
  handleSelectChange,
  owners,
  managers,
  categories,
  amenities,
  amenitiesOptions,
  setAmenities,
  facilities,
  facilitiesOptions,
  setFacilities,
  setFormData,
  handleSave,
  isLoading,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="space-y-4">
            <div>
              <label>Pitch Name:</label>
              <Input
                disabled={isLoading}
                type="text"
                name="name"
                className={`border px-2 py-1 ${
                  errors.name ? "border-red-500" : ""
                }`}
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label>Pitch Address:</label>
              <Input
                disabled={isLoading}
                type="text"
                name="address"
                className={`border px-2 py-1 ${
                  errors.address ? "border-red-500" : ""
                }`}
                value={formData.address}
                onChange={handleInputChange}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            <div>
              <label>Pitch Size:</label>
              <Input
                disabled={isLoading}
                type="text"
                name="size"
                className={`border px-2 py-1 ${
                  errors.size ? "border-red-500" : ""
                }`}
                value={formData.size}
                onChange={handleInputChange}
              />
              {errors.size && (
                <p className="text-red-500 text-sm">{errors.size}</p>
              )}
            </div>

            <div>
              <label>Pitch Price:</label>
              <Input
                disabled={isLoading}
                type="number"
                name="amountPerHour"
                className={`border px-2 py-1 ${
                  errors.amountPerHour ? "border-red-500" : ""
                }`}
                value={formData.amountPerHour}
                onChange={handleInputChange}
              />
              {errors.amountPerHour && (
                <p className="text-red-500 text-sm">{errors.amountPerHour}</p>
              )}
            </div>

            <div>
              <label>Discount:</label>
              <Input
                disabled={isLoading}
                type="number"
                name="discount"
                className="border px-2 py-1"
                value={formData.discount}
                onChange={handleInputChange}
              />
              {errors.discount && (
                <p className="text-red-500 text-sm">{errors.discount}</p>
              )}
            </div>

            <div>
              <label>Opening Hours:</label>
              <Input
                disabled={isLoading}
                type="time"
                name="openingHours"
                className={`border px-2 py-1 ${
                  errors.openingHours ? "border-red-500" : ""
                }`}
                value={formData.openingHours}
                onChange={handleInputChange}
              />
              {errors.openingHours && (
                <p className="text-red-500 text-sm">{errors.openingHours}</p>
              )}
            </div>

            <div>
              <label>Closing Hours:</label>
              <Input
                disabled={isLoading}
                type="time"
                name="closingHours"
                className="border px-2 py-1"
                value={formData.closingHours}
                onChange={handleInputChange}
              />
              {errors.closingHours && (
                <p className="text-red-500 text-sm">{errors.closingHours}</p>
              )}
            </div>

            <div>
              <label>Image:</label>
              <Input
                disabled={isLoading}
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

            <div>
              <label>Gallery:</label>
              <Input
                disabled={isLoading}
                type="file"
                name="gallery"
                className="border px-2 py-1"
                required
                multiple
                onChange={handleGalleryUpload}
              />
              {Object.keys(errors)
                .filter((key) => key.startsWith("gallery"))
                .map((key, index) => (
                  <p key={index} className="text-red-500 text-sm">
                    {errors[key]}
                  </p>
                ))}
              {/* {errors.gallery && (
                                <p className="text-red-500 text-sm">{errors.gallery}</p>
                            )} */}
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <div>
              <label>Pitch Manager</label>
              <Select
                disabled={isLoading}
                selectClassName="py-1 rounded-full border-[0.4px] border-primary"
                options={managers}
                value={managers.find(
                  (opt: any) => opt.value === formData.manager_id
                )}
                onChange={(selected: any) =>
                  handleSelectChange("manager_id", selected)
                }
              />
              {errors.manager_id && (
                <p className="text-red-500 text-sm">{errors.manager_id}</p>
              )}
            </div>

            <div>
              <label>Pitch Contact:</label>
              <Input
                disabled={isLoading}
                type="text"
                name="contact"
                className="border px-2 py-1"
                value={formData.contact}
                onChange={handleInputChange}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact}</p>
              )}
            </div>

            <div>
              <label>Pitch Owner (Admin):</label>
              <Select
                disabled={isLoading}
                selectClassName="py-1 rounded-full border-[0.4px] border-primary"
                options={owners}
                value={owners.find(
                  (opt: any) => opt.value === formData.owner_id
                )}
                onChange={(selected: any) =>
                  handleSelectChange("owner_id", selected)
                }
              />
              {errors.owner_id && <p className="text-red-500 text-sm">{errors.owner_id}</p>}
            </div>

            <div>
              <label>Category:</label>
              <Select
                disabled={isLoading}
                selectClassName="py-1 rounded-full border-[0.4px] border-primary"
                options={categories}
                value={categories.find(
                  (opt: any) => opt.value === formData.category_id
                )}
                onChange={(selected: any) =>
                  handleSelectChange("category_id", selected)
                }
              />
              {errors.category_id && (
                <p className="text-red-500 text-sm">{errors.category_id}</p>
              )}
            </div>

            <div>
              <label>Amenities:</label>
              <MultiSelect
                disabled={isLoading}
                value={amenities}
                options={amenitiesOptions}
                onChange={setAmenities}
                className="w-full"
                clearable={true}
                onClear={() => setAmenities([])}
                selectClassName="!px-2 py-1 rounded-full border-[0.4px] border-primary"
                errorClassName="text-red-500"
              />
              {errors.amenities && (
                <p className="text-red-500 text-sm">{errors.amenities}</p>
              )}
            </div>

            <div>
              <label>Facilities:</label>
              <MultiSelect
                disabled={isLoading}
                value={facilities}
                options={facilitiesOptions}
                onChange={setFacilities}
                className="w-full"
                clearable={true}
                onClear={() => setFacilities([])}
                selectClassName="!px-2 py-1 rounded-full border-[0.4px] border-primary"
                errorClassName="text-red-500"
              />
              {errors.facilities && (
                <p className="text-red-500 text-sm">{errors.facilities}</p>
              )}
            </div>

            <div>
              <label>Latitude:</label>
              <Input
                disabled={isLoading}
                type="number"
                name="latitude"
                placeholder="Latitude"
                className="border px-2 py-1"
                value={formData.location.latitude}
                onChange={(e: any) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      latitude: e.target.value,
                    },
                  }))
                }
              />
              {errors.latitude && (
                <p className="text-red-500 text-sm">{errors.latitude}</p>
              )}
            </div>

            <div>
              <label>Longitude:</label>
              <Input
                disabled={isLoading}
                type="number"
                name="longitude"
                placeholder="Longitude"
                className="border px-2 py-1"
                value={formData.location.longitude}
                onChange={(e: any) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      longitude: e.target.value,
                    },
                  }))
                }
              />
              {errors.longitude && (
                <p className="text-red-500 text-sm">{errors.longitude}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <Button
          className="bg-playden-primary text-white py-2 px-16 !rounded-full"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? <Loader variant="spinner" /> : "Save"}
        </Button>
      </div>
    </>
  );
};

export default PitchForm;
