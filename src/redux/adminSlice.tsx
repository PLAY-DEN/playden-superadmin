import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";

export const createAdmin = createAsyncThunk(
  "adminUser/createAdmin",
  async (adminData: any, { rejectWithValue }) => {
    try {
      const response = await apiClient("admin/users", "POST", adminData);
    //   console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create admin");
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: { loading: false, error: null },
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
      });
  },
});

export default adminUserSlice.reducer;
