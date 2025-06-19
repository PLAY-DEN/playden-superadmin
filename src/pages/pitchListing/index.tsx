import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RootState } from "../../redux/store";
import PitchCard from "../../components/pitchCard.r";
import { plus } from "../../assets/images";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../components/paginator";
import Button from "../../components/forms/button";
import pitchClient from "../../api/client/pitch";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";
import { Input } from "rizzui";

const PitchListing: React.FC = () => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [pitches, setPitches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleted, setIsDeleted] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setDebouncedSearch(searchQuery);
    }, 1000);
    return () => {
      clearTimeout(timer);
      setLoading(true);
    };
  }, [searchQuery]);

  const fetchPitches = async (page: number, search = "") => {
    if (!token) {
      navigate("/login");
      toast.error("Token expired, Kindly re-login");
      return;
    }

    setLoading(true);
    try {
      const response = await pitchClient.getPitches({
        page: page,
        search,
      });

      const fetchedPitches = response.data.pitches || [];

      const { current_page, last_page } = response.data;

      setPitches(fetchedPitches);
      setCurrentPage(current_page);
      setTotalPages(last_page);
    } catch (error: any) {
      console.error("Fetch Error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to fetch pitches.";
      toast.error(errorMessage, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPitches(currentPage, debouncedSearch);
    return () => setIsDeleted(false);
  }, [currentPage, isDeleted, debouncedSearch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white p-8 rounded-lg mb-10">
      <ToastContainer />
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl text-[#01031A] font-bold mb-4">
          Pitch Listing
        </h2>
        <Button
          onClick={() => navigate("/add-new-pitch")}
          className="flex gap-2 bg-playden-primary text-white font-semibold !items-center !px-0 !rounded-full"
        >
          <img
            src={plus}
            alt="plus icon"
            className="text-white font-bold mt-1 h-3"
          />
          <p>Add New Pitch</p>
        </Button>
      </div>

      <Input
        label="Search pitches"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search pitches..."
        inputClassName="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none w-fit"
        clearable
        onClear={() => setSearchQuery("")}
      />
      {loading ? (
        <LoadingPage />
      ) : pitches.length === 0 ? (
        <div className="h-full w-full mt-3">
          <ErrorPage errorMessage="No pitches found." />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 mt-4">
            {pitches.map((pitch: any) => (
              <PitchCard
                key={pitch.id}
                id={pitch.id}
                imageSrc={pitch.image}
                address={pitch.address}
                pitchState={pitch.state}
                pitchSize={pitch.size}
                name={pitch.name}
                contact={pitch.contact}
                price={`₦${pitch.amount_per_hour}/hr`}
                setIsDeleted={setIsDeleted}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default PitchListing;
