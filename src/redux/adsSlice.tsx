// bookingManagementSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";
import API_ENDPOINTS from "../api/client/_endpoint";

interface BookingsState {
  ads: any[];
  currentPage: number;
  lastPage: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  ads: [],
  currentPage: 1,
  lastPage: 1,
  totalItems: 0,
  loading: false,
  error: null,
};

// Thunk for fetching ads with pagination
export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async ({ page, search }: { page: number; search?: string }) => {
    try {
      const query = new URLSearchParams({
        page: String(page),
        search: search || "",
      }).toString();
      const response = await apiClient(
        `${API_ENDPOINTS.GET_ADS}?${query}`,
        "GET"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch ads");
    }
  }
);

// Thunk for fetching booking details by ID
export const fetchBookingDetails = createAsyncThunk(
  "ads/fetchBookingDetails",
  async (id: string) => {
    try {
      const response = await apiClient(
        `${API_ENDPOINTS.GET_BOOKINGS}/${id}`,
        "GET"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch booking details");
    }
  }
);

const adsSlice = createSlice({
  name: "bookingMgt",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = action.payload.ads;
        state.currentPage = action.payload.current_page;
        state.lastPage = action.payload.last_page;
        state.totalItems = action.payload.total;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      // For fetching booking details
      .addCase(fetchBookingDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingDetails.fulfilled, (state) => {
        state.loading = false;
        // state.bookingDetails = action.payload; // Store booking details in state
      })
      .addCase(fetchBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { setCurrentPage } = adsSlice.actions;

export default adsSlice.reducer;
