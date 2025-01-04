import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";
import API_ENDPOINTS from "../api/client/_endpoint";

// Action to create an admin (as you already have)
export const createAdmin = createAsyncThunk(
  "adminUser/createAdmin",
  async (adminData: any, { rejectWithValue }) => {
    try {
      const response = await apiClient(API_ENDPOINTS.GET_USERS, "POST", adminData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create admin");
    }
  }
);

// Action to set logged-in admin details
export const setAdmin = createAsyncThunk(
  "adminUser/setAdmin",
  async (adminData: { name: string; email: string }) => {
    // You can call an API here if necessary to get admin data
    return adminData; // Return the passed adminData
  }
);

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    loading: false,
    error: null,
    admin: {}, // Store the admin data here
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle the setAdmin action
      .addCase(setAdmin.fulfilled, (state, action) => {
        state.admin = action.payload; // Store the logged-in admin's data
      });
  },
});

export default adminUserSlice.reducer;
