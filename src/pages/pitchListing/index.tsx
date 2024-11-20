import React, { useEffect, useState } from "react";
import { filter, plus } from "../../assets/images";
import PitchCard from "../../components/pitchCard.r";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PitchListing: React.FC = () => {
  const navigate = useNavigate();
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPitches = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      // Retrieve the token from localStorage
      const token = localStorage.getItem("auth_token");  // Assuming 'auth_token' is the key where token is stored
      if (!token) {
        toast.error("No Bearer token provided", { position: "top-right" });
        return;
      }

      // Add the token to the Authorization header
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const url = `${import.meta.env.VITE_BASE_URL}/api/v1/admin/pitches`;  // Using environment variable for API base URL
        console.log("Fetching from:", url);

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          const errorResponse = await response.json();
          console.log("Error response:", errorResponse);  // Log the error body
          if (errorResponse.message === "Unauthenticated.") {
            toast.error("Your session has expired or the token is invalid. Please log in again.", { position: "top-right" });
          } else {
            toast.error("An error occurred while fetching pitches.", { position: "top-right" });
          }
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setPitches(result.data || []);  // Update based on API response structure
        toast.success("Pitches loaded successfully!", { position: "top-right" });
      } catch (error: any) {
        console.error("Fetch Error:", error);
        toast.error(error.message || "Failed to fetch pitches.", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPitches();
  }, []);

  return (
    <div className="relative ml-72 p-8 mt-20 overflow-auto">
        <ToastContainer />
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl text-[#01031A] font-bold mb-4">Pitch Listing</h2>
        <div className="flex flex-row gap-2">
          <p className="text-[#141B34] text-[17px] font-bold mt-2 ml-64">
            showing
          </p>
          <select
            name="days"
            id="options"
            className="text-[17px] font-bold text-[#141B34] w-24 h-10 border border-[#8F55A224] bg-[#8F55A224] rounded-md"
            defaultValue={12}
          >
            <option value="days">12</option>
          </select>
        </div>
        <div className="bg-[#8F55A224] font-bold text-[#141B34] flex flex-row w-32 h-12 py-4 px-3 justify-between rounded-lg ml-10">
          <img src={filter} alt="filter" className="w-4 h-4" />
          <p className="mt-[-5px]">filter</p>
        </div>
        <button
          onClick={() => navigate("/add-new-pitch")}
          className="flex flex-row gap-2 bg-playden-primary text-white font-semibold p-3 rounded-lg"
        >
          <img src={plus} alt="" className="text-white font-bold mt-1" />
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
              manager={pitch.manager_name}
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
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
