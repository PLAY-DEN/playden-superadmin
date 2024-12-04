import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";

// Async thunk to fetch cancellations
export const fetchCancellations = createAsyncThunk(
  "cancellations/fetchCancellations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient("bookings?status=cancelled", "GET");
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cancellationSlice = createSlice({
    name: "cancellations",
    initialState: {
      bookings: [], // Default to an empty array
      statistics: {}, // Default to an empty object
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCancellations.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCancellations.fulfilled, (state, action) => {
          state.loading = false;
          state.bookings = action.payload.bookings || [];
          state.statistics = action.payload.statistics || {};
        })
        .addCase(fetchCancellations.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  

export default cancellationSlice.reducer;
