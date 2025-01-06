import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";
import API_ENDPOINTS from "../api/client/_endpoint";

// Fetch pending payouts with pagination
export const fetchPendingPayouts = createAsyncThunk(
  "financials/fetchPendingPayouts",
  async (
    {
      page = 1,
      perPage = 10,
    }: {
      page: number;
      perPage: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await apiClient(
        `${API_ENDPOINTS.GET_PENDING_PAYOUT}?page=${page}&per_page=${perPage}`,
        "GET"
      );
      
      const data = response.data?.pitch_owners;
console.log( data);

      return {
        records: data?.data || [],
        current_page: data?.current_page,
        total_pages: data?.total_pages,
        total_items: data?.total_items,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error getting records"
      );
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
        const { records, current_page, total_pages, total_items } =
          action.payload;
        state.records = records || [];
        state.currentPage = current_page || 1;
        state.totalPages = total_pages || 1;
        state.totalItems = total_items || 0; // Store total_items
      })
      .addCase(fetchPendingPayouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export const { setPage } = financialsSlice.actions;

export default financialsSlice.reducer;
