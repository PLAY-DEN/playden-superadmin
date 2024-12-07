import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";

// Fetch pending payouts with pagination
export const fetchPendingPayouts = createAsyncThunk(
  "financials/fetchPendingPayouts",
  async ({ page = 1, perPage = 10 }, thunkAPI) => {
    try {
      const response = await apiClient(
        `admin/pitch-owners/pending-payouts?page=${page}&per_page=${perPage}`,
        "GET"
      );
      return response.data; // Expecting data with { records, current_page, total_pages, total_items }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const financialsSlice = createSlice({
  name: "financials",
  initialState: {
    records: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    totalItems: 0, // New field to store the total items
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingPayouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingPayouts.fulfilled, (state, action) => {
        state.loading = false;
        const { records, current_page, total_pages, total_items } = action.payload;
        state.records = records || [];
        state.currentPage = current_page || 1;
        state.totalPages = total_pages || 1;
        state.totalItems = total_items || 0; // Store total_items
      })
      .addCase(fetchPendingPayouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = financialsSlice.actions;
export const { markAsPaid} = financialsSlice.actions;

export default financialsSlice.reducer;
