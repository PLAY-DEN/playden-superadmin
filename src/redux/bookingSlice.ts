// src/store/bookingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";

interface BookingState {
  bookings: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

// Thunk to fetch booking history
export const fetchBookingHistory = createAsyncThunk(
  "bookings/fetchBookingHistory",
  async (pitchId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient(`admin/pitches/bookings/${pitchId}`);
      const pitchData = response.data?.pitch?.[0]; 
      return pitchData?.bookings || []; // Return the bookings array
    } catch (error) {
      return rejectWithValue("Failed to fetch booking history");
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload; // Store the fetched bookings
      })
      .addCase(fetchBookingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Store the error message
      });
  },
});

export default bookingSlice.reducer;
