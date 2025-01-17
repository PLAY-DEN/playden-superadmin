import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";
import API_ENDPOINTS from "../api/client/_endpoint";

// Fetch users with statistics
export const fetchRatings = createAsyncThunk(
  "users/fetchRatings",
  async (
    {
      page,
      search,
    }: {
      page: number;
      search: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await apiClient(
        API_ENDPOINTS.GET_RATINGS + `?page=${page}&search=${search}`,
        "GET"
      );
      return response.data; // Expecting { users, statistics }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error getting users"
      );
    }
  }
);

const userSlice = createSlice({
  name: "ratings",
  initialState: {
    data: {
      ratings: [],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store users and statistics in the state
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export default userSlice.reducer;
