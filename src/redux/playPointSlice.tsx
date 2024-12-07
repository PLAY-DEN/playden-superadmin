import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";

interface Metadata {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface PlaypointsState {
  playpoints: any[]; 
  meta: Metadata | null; 
  loading: boolean;
  error: string | null;
}

const initialState: PlaypointsState = {
  playpoints: [],
  meta: null,
  loading: false,
  error: null,
};

export const fetchActivePlaypoints = createAsyncThunk(
  "playpoints/fetchActivePlaypoints",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await apiClient(`admin/playpoints?status=active&page=${page}`, "GET");
      console.log(response);
      return {
        playpoints: response.data.playpoints,
        meta: {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
        },
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch playpoints");
    }
  }
);

const playpointsSlice = createSlice({
  name: "playpoints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivePlaypoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivePlaypoints.fulfilled, (state, action) => {
        state.loading = false;
        state.playpoints = action.payload.playpoints;
        state.meta = action.payload.meta;
      })
      .addCase(fetchActivePlaypoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default playpointsSlice.reducer;
