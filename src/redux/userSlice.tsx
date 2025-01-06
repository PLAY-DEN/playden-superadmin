import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";
import API_ENDPOINTS from "../api/client/_endpoint";

// Fetch users with statistics
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, search }: {
    page: number;
    search: string;
  }, thunkAPI) => {
    try {
      const response = await apiClient(API_ENDPOINTS.GET_USERS + `?page=${page}&search=${search}`, "GET");
      return response.data; // Expecting { users, statistics }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "Error getting users");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: {
      users: [],
      statistics: {
        total_active_users: 0,
        total_inactive_users: 0,
        total_users: 0,
        users_by_role: {},
        users_joined_last_24_hours: 0,
      },
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store users and statistics in the state
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export default userSlice.reducer;
