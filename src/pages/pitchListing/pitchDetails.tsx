import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "../../redux/bookingSlice";
import { RootState } from "../../redux/store";
import Pagination from "../../components/paginator";
import Input from "../../components/forms/input";
import Button from "../../components/forms/button";
import LoadingPage from "../../components/loading-page";
import ErrorPage from "../../components/error-page";
import { toast } from "react-toastify";
import pitchClient from "../../api/client/pitch";
import { fetchReviews } from "../../redux/reviewsSlice";
import { formatDate } from "../../utils/utils";
import BackButton from "../../components/BackButton";
// Import Swiper React components
import SwiperCore from "swiper";
import {
  Autoplay,
  EffectFade,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
import "swiper/swiper-bundle.css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PitchDetails: React.FC = () => {
  const { pitchId } = useParams<{ pitchId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch: any = useDispatch();
  const [activeTab, setActiveTab] = useState<"bookings" | "reviews">(
    "bookings"
  );

  const searchQuery = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const { bookings, loading, error, totalPages } = useSelector(
    (state: RootState) => state.bookings
  );
  const {
    reviews,
    loading: reviewLoading,
    error: reviewError,
  } = useSelector((state: RootState) => state.ratings);
  const [isFetchingPitch, setIsFetchingPitch] = useState(false);

  const [pitch, setPitch] = useState<any>();

  const fetchPitches = async (pitchId: string) => {
    setIsFetchingPitch(true);
    try {
      const response = await pitchClient.getPitch({}, pitchId);

      const fetchedPitch = response.data || {};
      console.log(fetchedPitch);

      setPitch(fetchedPitch);
    } catch (error: any) {
      console.error("Fetch Error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to fetch pitches.";
      toast.error(errorMessage, { position: "top-right" });
    } finally {
      setIsFetchingPitch(false);
    }
  };

  useEffect(() => {
    fetchPitches(pitchId!);
  }, [pitchId]);

  useEffect(() => {
    if (pitchId && activeTab === "bookings") {
      dispatch(
        fetchBookingHistory({ pitchId, search: searchQuery, page: currentPage })
      );
    }

    if (pitchId && activeTab === "reviews") {
      dispatch(fetchReviews({ pitchId }));
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

  return (
    <div className="bg-white p-8 rounded-lg">
      <BackButton />
      {/* Pitch Details */}
      {isFetchingPitch ? (
        <LoadingPage />
      ) : (
        <div className="fle gap-6 mt-6 w-[680px]">
          {pitch?.gallery.length > 0 && (
            <div className="w-ull w[680px] ">
              <Swiper
                onInit={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1}
                autoplay={true}
                speed={500}
                loop={true}
                className="mySwiper1 w-[680px relative rounded-[20px] h-80"
                modules={[Autoplay, EffectFade, Mousewheel, Keyboard]}
                keyboard={true}
                spaceBetween={8}
                direction="horizontal"
                touchAngle={45}
                draggable
              >
                {pitch?.gallery.length >= 2 && (
                  <div className="">
                    <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10  my-auto backdrop-blur-lg ">
                      <button onClick={handlePrev}>
                        <FaArrowLeft className="w-4 h-4 bg-white shadow-lg p-1 rounded-full" />
                      </button>
                    </div>

                    <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 my-auto backdrop-blur-lg">
                      <button onClick={handleNext} className="">
                        <FaArrowRight className="w-4 h-4 bg-white shadow-lg p-1 rounded-full" />
                      </button>
                    </div>
                  </div>
                )}

                {pitch?.gallery.map((image: string, index: number) => (
                  <SwiperSlide key={index} className="h-full">
                    <div className="relative w-full h-[295px] md:h-full overflow-hidden">
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        // fill
                        className="object-cover"
                        //  className="min-w-[300px] h-[189px] rounded-md"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <div className="gap-6 w-full flex mt-16">
            <img
              src={pitch?.image}
              alt="Pitch"
              className="min-w[300px] w-[189px] h-[189px] rounded-full"
            />
            <div className="text-sm mt-3">
              <p>
                <strong className="text-[#01031A]">PITCH NAME:</strong>{" "}
                {pitch?.name}
              </p>
              <p>
                <strong className="text-[#01031A]">SPORT:</strong>{" "}
                {pitch?.sport}
              </p>
              <p>
                <strong className="text-[#01031A]">PITCH SIZE:</strong>{" "}
                {pitch?.size}
              </p>
              <p>
                <strong className="text-[#01031A]">CONTACT:</strong>{" "}
                {pitch?.contact}
              </p>
              <p>
                <strong className="text-[#01031A]">PRICE:</strong> ₦
                {pitch?.amount_per_hour}/hr
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs for Booking History and Reviews */}
      <div className="mt-8">
        <div className="flex border-b border-gray-300">
          <button
            className={`py-2 px-4 ${
              activeTab === "bookings"
                ? "border-b-2 border-playden-primary text-playden-primary font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            Booking History
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "reviews"
                ? "border-b-2 border-playden-primary text-playden-primary font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>

        {activeTab === "bookings" && (
          <>
            <div className="mt-4">
              <form
                onSubmit={handleSearch}
                className="mb-4 flex items-center justify-end"
              >
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
                <LoadingPage />
              ) : error ? (
                <ErrorPage errorMessage={error} />
              ) : bookings.length === 0 ? (
                <ErrorPage errorMessage={"No bookings found."} />
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
                          <td className="border border-gray-300 p-2">
                            {booking.booking_code}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {booking.date}
                          </td>
                          <td className="border border-gray-300 p-2">
                            &#8358;{booking.sub_total || booking.total_cost}
                          </td>
                          <td className="border border-gray-300 p-2 cursor-pointer">
                            <Link
                              to={`/booking-management/${booking.id}`}
                              className="text-black font-semibold"
                            >
                              View details
                            </Link>
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
          </>
        )}

        {activeTab === "reviews" && (
          <div className="mt-4">
            {/* <form
              onSubmit={handleSearch}
              className="mb-4 flex items-center justify-end"
            >
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
            </form> */}

            {reviewLoading ? (
              <LoadingPage />
            ) : reviewError ? (
              <ErrorPage errorMessage={reviewError} />
            ) : reviews.length === 0 ? (
              <ErrorPage errorMessage={"No reviews found."} />
            ) : (
              <>
                <table className="w-full border">
                  <thead className="bg-gray-100 text-[#808B9B] text-left">
                    <tr>
                      <th className="p-2">User</th>
                      <th className="p-2">Review</th>
                      <th className="p-2">Rating</th>
                      <th className="p-2">Date/Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review, index) => (
                      <tr key={index} className="text-[14px] text-[#01031A] ">
                        <td className="border border-gray-300 p-2">
                          <div className="flex flex-col">
                            <span>
                              Fullname: {review.user?.full_name || "N/A"}
                            </span>
                            <span>
                              Username: {review.user?.username || "N/A"}
                            </span>
                            <span>Email: {review.user?.email || "N/A"}</span>
                            <span>
                              Phone: {review.user?.phone_number || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="border border-gray-300 p-2">
                          {review.review}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`inline-block ${
                                i < Math.floor(Number(review.rating))
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-sm ml-1">
                            ({review.rating})
                          </span>
                        </td>
                        <td className="border border-gray-300 p-2">
                          {formatDate(review.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PitchDetails;
