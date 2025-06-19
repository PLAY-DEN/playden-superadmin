import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiClient } from "../utils/apiClient";
import { toast } from "react-toastify";
import Button from "./forms/button";

interface PitchCardProps {
  address: string;
  pitchState: string;
  pitchSize: string;
  imageSrc: string;
  name: string;
  contact: string;
  price: string;
  id: string;
  setIsDeleted: (isDeleted: boolean) => void;
}

const PitchCard: React.FC<PitchCardProps> = ({
  address,
  pitchState,
  pitchSize,
  imageSrc,
  name,
  contact,
  price,
  setIsDeleted,
  id,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/pitch-listing/${id}`, {
      // state: {
      //   sport,
      //   imageSrc,
      //   pitchSize,
      //   name,
      //   contact,
      //   price,
      // },
    });
  };

  const handleUpdate = () => {
    navigate(`/update-pitch/${id}`); // Navigate to update page
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await apiClient(`api/v1/admin/pitches/${id}`, "DELETE");
      alert("Pitch deleted.");
      toast.success("Pitch deleted");
      setIsDeleted(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white p-4 flex justify-between items-center gap-4 border rounded">
      <img src={imageSrc} alt="Pitch" className="rounded-md w-80 h-36" />
      <div className="flex-1 space-y-2 ">
        <h3 className="text-lg font-bold text-gray-700">{name}</h3>
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-semibold">Pitch Size:</span> {pitchSize}
          </p>
          <p>
            <span className="font-semibold">Contact:</span> {contact}
          </p>
          <p>
            <span className="font-semibold">Price:</span> {price}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {address.length > 100 ? (
              <>
                {showFullAddress ? address : `${address.substring(0, 100)}...`}
                <button
                  onClick={() => setShowFullAddress(!showFullAddress)}
                  className="text-playden-primary ml-2"
                >
                  {showFullAddress ? "Show less" : "Show more"}
                </button>
              </>
            ) : (
              address
            )}
          </p>
          <p>
            <span className="font-semibold">State:</span> {pitchState}
          </p>
        </div>
      </div>

      <div className="flex flex-ro gap-2 mr10">
        <Button
          className="text-white bg-playden-primary !rounded-lg  !py-2 !text-sm !w-fit"
          onClick={handleViewDetails}
        >
          View
        </Button>
        <Button
          disabled={isDeleting}
          className={"!bg-red !rounded-lg  !py-2 !text-sm !w-fit"}
          onClick={handleDelete}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>

        <Button
          className="!rounded-lg !py-2 !text-sm !w-fit !bg-transparent !border-2 !border-primary !text-primary "
          onClick={handleUpdate}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default PitchCard;
