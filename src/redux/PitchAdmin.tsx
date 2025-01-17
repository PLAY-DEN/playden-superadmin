import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";
import API_ENDPOINTS from "../api/client/_endpoint";

interface AdminState {
  users: any;
  loading: boolean;
  error: string | null;
  currentPage: number;
  lastPage: number;
  totalItems: number;
}

const initialState: AdminState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  lastPage: 0,
  totalItems: 0,
};

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async ({
    page,
    search,
    user_role,
  }: {
    page: number;
    search?: string;
    user_role: string;
  }) => {
    try {
      const query = new URLSearchParams({
        page: String(page),
        search: search || "",
        user_role,
      }).toString();
      const data = await apiClient(
        `${API_ENDPOINTS.GET_USERS}?${query}`,
        "GET"
      );
      return data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch users"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        
        state.loading = false;
        state.users = action.payload as any;
        state.currentPage = action.payload.data.current_page;
        state.lastPage = action.payload.data.last_page;
        state.totalItems = action.payload.data.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});
export const { setCurrentPage } = adminSlice.actions;
export default adminSlice.reducer;
