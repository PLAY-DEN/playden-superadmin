import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../utils/apiClient";

const UpdatePitch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sport: "",
    pitchSize: "",
    name: "",
    contact: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPitchDetails = async () => {
      try {
        const response = await apiClient(`admin/pitches/${id}`, "GET");
        const pitch = response.data.pitch;

        setFormData({
          sport: pitch.sport,
          pitchSize: pitch.size,
          name: pitch.name,
          contact: pitch.contact,
          price: pitch.amount_per_hour.toString(),
          image: pitch.image,
        });
      } catch (error: any) {
        console.error("Failed to fetch pitch details:", error);
        alert("Failed to fetch pitch details.");
      }
    };

    if (id) {
      fetchPitchDetails();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await apiClient(`admin/pitches/${id}`, "PUT", formData);
      alert("Pitch updated successfully.");
      navigate("/pitch-listing");
    } catch (error: any) {
      console.error("Error updating pitch:", error);
      alert("Failed to update the pitch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative ml-72 p-8 mt-20">
      <h2 className="text-2xl font-bold mb-6">Update Pitch</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-semibold">Sport:</label>
          <input
            type="text"
            name="sport"
            value={formData.sport}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Pitch Size:</label>
          <input
            type="text"
            name="pitchSize"
            value={formData.pitchSize}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Price (per hour):</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
        {/* <div>
          <label className="block font-semibold">Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div> */}
        <button
          type="submit"
          className="bg-playden-primary text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Pitch"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePitch;
