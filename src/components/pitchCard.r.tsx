import { useNavigate } from "react-router-dom";
import { apiClient } from "../utils/apiClient";

interface PitchCardProps {
  sport: string;
  pitchSize: string;
  imageSrc: string;
  name: string;
  contact: string;
  price: string;
  id: string;
}

const PitchCard: React.FC<PitchCardProps> = ({
  sport,
  pitchSize,
  imageSrc,
  name,
  contact,
  price,
  id,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/pitch-listing/${id}`, {
      state: {
        sport,
        imageSrc,
        pitchSize,
        name,
        contact,
        price,
      },
    });
  };

  const handleUpdate = () => {
    navigate(`/update-pitch/${id}`); // Navigate to update page
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pitch? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await apiClient(`admin/pitches/${id}`, "DELETE");
      alert("Pitch deleted successfully.");
      window.location.reload();
    } catch (error: any) {
      console.error("Error deleting pitch:", error);
      alert("Failed to delete the pitch. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 flex items-center gap-4">
      <img src={imageSrc} alt="Pitch" className="rounded-md w-80 h-36" />
      <div className="flex-1">
        <p className="text-sm font-bold">SPORT: {sport}</p>
        <p className="text-sm">PITCH SIZE: {pitchSize}</p>
        <p className="text-sm">PITCH Name: {name}</p>
        <p className="text-sm">MOBILE NUMBER: {contact}</p>
        <p className="text-sm">PRICE: {price}</p>
      </div>
      <div className="flex flex-col gap-20 items-center">
        <button
          className="text-white bg-playden-primary rounded-xl w-36 h-10 px-w py-2 text-sm"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        <div className="flex flex-row gap-2 mr-10">
          <button
            className="bg-white border-2 border-red-500 rounded-lg px-4 py-2 text-xs text-red"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-playden-primary rounded-lg px-4 py-2 text-xs text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PitchCard;
