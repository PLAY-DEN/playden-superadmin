import React, { useEffect, useState } from "react";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "../../redux/bookingSlice";
import { RootState } from "../../redux/store";
import { Loader } from "rizzui";
import Pagination from "../../components/paginator";
import Input from "../../components/forms/input";
import Button from "../../components/forms/button";

const PitchDetails: React.FC = () => {
  const { pitchId } = useParams<{ pitchId: string }>();
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch: any = useDispatch();
  const [activeTab, setActiveTab] = useState<"bookings" | "reviews">("bookings");

  const searchQuery = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const { bookings, loading, error, totalPages } = useSelector(
    (state: RootState) => state.bookings
  );

  useEffect(() => {
    if (pitchId && activeTab === "bookings") {
      dispatch(fetchBookingHistory({ pitchId, search: searchQuery, page: currentPage }));
    }
  }, [pitchId, activeTab, searchQuery, currentPage, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ search: searchQuery, page: newPage.toString() });
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search") as string;
    setSearchParams({ search: searchValue, page: "1" });
  };

  const {
    sport = "N/A",
    imageSrc = "N/A",
    pitchSize = "N/A",
    name = "N/A",
    contact = "N/A",
    price = "N/A",
  } = state || {};

  return (
    <div className="relative ml-72 p-8 mt-20 overflow-auto">
      {/* Pitch Details */}
      <div className="flex gap-6 mt-6 w-[680px]">
        <img
          src={imageSrc}
          alt="Pitch"
          className="min-w-[300px] h-[189px] rounded-md"
        />
        <div className="text-sm mt-3">
          <p>
            <strong className="text-[#01031A]">PITCH NAME:</strong> {name}
          </p>
          <p>
            <strong className="text-[#01031A]">SPORT:</strong> {sport}
          </p>
          <p>
            <strong className="text-[#01031A]">PITCH SIZE:</strong> {pitchSize}
          </p>
          <p>
            <strong className="text-[#01031A]">CONTACT:</strong> {contact}
          </p>
          <p>
            <strong className="text-[#01031A]">PRICE:</strong> {price}
          </p>
        </div>
      </div>

      {/* Tabs for Booking History and Reviews */}
      <div className="mt-8">
        <div className="flex border-b border-gray-300">
          <button
            className={`py-2 px-4 ${activeTab === "bookings"
              ? "border-b-2 border-playden-primary text-playden-primary font-bold"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("bookings")}
          >
            Booking History
          </button>
          <button
            className={`py-2 px-4 ${activeTab === "reviews"
              ? "border-b-2 border-playden-primary text-playden-primary font-bold"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>

        {activeTab === "bookings" && (
          <div className="mt-4">
            <form onSubmit={handleSearch} className="mb-4 flex items-center justify-end">
              <Input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search bookings..."
                className="border px-2 py-1  w-100"
              />
              <Button
                type="submit"
                className="ml-2 px-2 py-1 bg-playden-primary text-white !rounded-full"
              >
                Search
              </Button>
            </form>

            {loading ? (
              <div className="flex justify-center"><Loader /></div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : bookings.length === 0 ? (
              <p className="flex justify-center">No bookings found.</p>
            ) : (
              <>
                <table className="w-full border">
                  <thead className="bg-gray-100 text-[#808B9B] text-left">
                    <tr>
                      <th className="p-2">ID</th>
                      <th className="p-2">Date/Time</th>
                      <th className="p-2">Amount</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr
                        key={index}
                        className="text-[14px] text-[#01031A] font-semibold"
                      >
                        <td className="p-2">{booking.booking_code}</td>
                        <td className="p-2">{booking.date}</td>
                        <td className="p-1">&#8358;{booking.sub_total || booking.total_cost}</td>
                        <td className="p-1 cursor-pointer">
                          <u>View More</u>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="mt-4">
            <p className="text-gray-500 italic">Reviews functionality is yet to be implemented.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PitchDetails;


// import React, { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBookingHistory } from "../../redux/bookingSlice";
// import { RootState } from "../../redux/store";
// import { Loader } from "rizzui";
// import Pagination from "../../components/paginator";

// const PitchDetails: React.FC = () => {
//   const { pitchId } = useParams<{ pitchId: string }>();
//   const { state } = useLocation();
//   const dispatch: any = useDispatch();
//   const [activeTab, setActiveTab] = useState<"bookings" | "reviews">("bookings");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const { bookings, loading, error } = useSelector(
//     (state: RootState) => state.bookings
//   );

//   useEffect(() => {
//     if (pitchId && activeTab === "bookings") {
//       dispatch(fetchBookingHistory(pitchId));
//     }
//   }, [pitchId, activeTab, dispatch]);

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const {
//     sport = "N/A",
//     imageSrc = "N/A",
//     pitchSize = "N/A",
//     name = "N/A",
//     contact = "N/A",
//     price = "N/A",
//   } = state || {};

//   return (
//     <div className="relative ml-72 p-8 mt-20 overflow-auto">
//       {/* Pitch Details */}
//       <div className="flex gap-6 mt-6 w-[680px]">
//         <img
//           src={imageSrc}
//           alt="Pitch"
//           className="min-w-[300px] h-[189px] rounded-md"
//         />
//         <div className="text-sm mt-3">
//           <p>
//             <strong className="text-[#01031A]">PITCH NAME:</strong> {name}
//           </p>
//           <p>
//             <strong className="text-[#01031A]">SPORT:</strong> {sport}
//           </p>
//           <p>
//             <strong className="text-[#01031A]">PITCH SIZE:</strong> {pitchSize}
//           </p>
//           <p>
//             <strong className="text-[#01031A]">CONTACT:</strong> {contact}
//           </p>
//           <p>
//             <strong className="text-[#01031A]">PRICE:</strong> {price}
//           </p>
//         </div>
//       </div>

//       {/* Tabs for Booking History and Reviews */}
//       <div className="mt-8">
//         <div className="flex border-b border-gray-300">
//           <button
//             className={`py-2 px-4 ${activeTab === "bookings"
//               ? "border-b-2 border-playden-primary text-playden-primary font-bold"
//               : "text-gray-500"
//               }`}
//             onClick={() => setActiveTab("bookings")}
//           >
//             Booking History
//           </button>
//           <button
//             className={`py-2 px-4 ${activeTab === "reviews"
//               ? "border-b-2 border-playden-primary text-playden-primary font-bold"
//               : "text-gray-500"
//               }`}
//             onClick={() => setActiveTab("reviews")}
//           >
//             Reviews
//           </button>
//         </div>

//         {activeTab === "bookings" && (
//           <div className="mt-4">
//             {loading ? (
//               <div className="flex justify-center"><Loader /></div>
//             ) : error ? (
//               <p className="text-red-500">{error}</p>
//             ) : bookings.length === 0 ?
//               <p className="flex justify-center">No bookings found.</p>
//               : (
//                 <>

//                   <table className="w-full border">
//                     <thead className="bg- border text-[#808B9B] text-left">
//                       <tr>
//                         <th className="p-2">ID</th>
//                         <th className="p-2">Date/Time</th>
//                         <th className="p-2">Amount</th>
//                         <th className="p-2">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {bookings.map((booking, index) => (
//                         <tr
//                           key={index}
//                           className="text-[14px] text-[#01031A] font-semibold"
//                         >
//                           <td className="p-2">{booking.booking_code}</td>
//                           <td className="p-2">{booking.date}</td>
//                           <td className="p-1">&#8358;{booking.sub_total || booking.total_cost}</td>
//                           <td className="p-1 cursor-pointer">
//                             <u>View More</u>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>

//                   <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//                 </>
//               )}
//           </div>
//         )}

//         {activeTab === "reviews" && (
//           <div className="mt-4">
//             <p className="text-gray-500 italic">Reviews functionality is yet to be implemented.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PitchDetails;
