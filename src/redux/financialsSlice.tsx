import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";

// Fetch pending payouts
export const fetchPendingPayouts = createAsyncThunk(
  "financials/fetchPendingPayouts",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient("admin/pitch-owners/pending-payouts", "GET");
      console.log(response);
      return response; // Expecting an array of records
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Mark payout as paid
export const markAsPaid = createAsyncThunk(
  "financials/markAsPaid",
  async (id, thunkAPI) => {
    try {
      await apiClient(`admin/pitch-owners/pending-payouts/${id}`, "POST");
      return id; // Return the ID of the marked record
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingPayouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingPayouts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = Array.isArray(action.payload) ? action.payload : []; // Ensure it's an array
      })
      .addCase(fetchPendingPayouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAsPaid.fulfilled, (state, action) => {
        state.records = state.records.filter((record) => record.id !== action.payload); // Remove the paid record
      });
  },
});

export default financialsSlice.reducer;
