import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { RootState } from "../../redux/store";
import { apiClient } from "../../utils/apiClient";
import PitchCard from "../../components/pitchCard.r";
import { filter, plus } from "../../assets/images";
import "react-toastify/dist/ReactToastify.css";

const PitchListing: React.FC = () => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token); // Fetch token from Redux state
  const [pitches, setPitches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false); // Flag to check if data is already fetched

  useEffect(() => {
    const fetchPitches = async () => {
      if (!token) {
        toast.error("No Bearer token provided. Please log in.", { position: "top-right" });
        return;
      }

      // Prevent refetching if data has already been fetched
      if (dataFetched) {
        return;
      }

      try {
        setLoading(true);
        const response = await apiClient("admin/pitches", "GET");

        const fetchedPitches = response.data.pitches || [];

        if (fetchedPitches.length === 0) {
          Swal.fire({
            title: "No Pitches Found",
            text: "There are currently no pitches in the database.",
            icon: "info",
            confirmButtonText: "OK",
          });
          toast.info("No pitch found", { position: "top-right" });
        } else {
          toast.success("Pitches loaded successfully!", { position: "top-right" });
        }

        // Update state with fetched pitches and set dataFetched flag to true
        setPitches(fetchedPitches);
        setDataFetched(true); // Mark as fetched
      } catch (error: any) {
        console.error("Fetch Error:", error);
        const errorMessage = error.response?.data?.message || "Failed to fetch pitches.";
        toast.error(errorMessage, { position: "top-right" });
      } finally {
        setLoading(false);
      }
    };

    fetchPitches();
  }, [token, dataFetched]); // Run only if token changes or data hasn't been fetched yet

  return (
    <div className="relative ml-72 p-8 mt-20 overflow-auto">
      <ToastContainer />
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl text-[#01031A] font-bold mb-4">Pitch Listing</h2>
        <button
          onClick={() => navigate("/add-new-pitch")}
          className="flex flex-row gap-2 bg-playden-primary text-white font-semibold p-3 rounded-lg"
        >
          <img src={plus} alt="plus icon" className="text-white font-bold mt-1" />
          <p>Add New Pitch</p>
        </button>
      </div>

      {/* Grid for Pitch Cards */}
      <div className="grid grid-cols-1 gap-6 mt-4">
        {loading ? (
          <p>Loading pitches...</p>
        ) : pitches.length > 0 ? (
          pitches.map((pitch: any) => (
            <PitchCard
              key={pitch.id}
              id={pitch.id}
              imageSrc={pitch.image}
              sport={pitch.sport}
              pitchSize={pitch.size}
              name={pitch.name}
              contact={pitch.contact}
              price={`₦${pitch.amount_per_hour}/hr`}
            />
          ))
        ) : (
          <p>No pitches found.</p>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button className="text-playden-primary">Previous</button>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-2 py-1 rounded ${page === 1 ? "bg-playden-primary text-white" : "bg-gray-100 text-black"}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="text-playden-primary">Next</button>
      </div>
    </div>
  );
};

export default PitchListing;
