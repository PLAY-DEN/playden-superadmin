import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../utils/apiClient';


interface PlaypointsState {
  playpoints: any[]; 
  loading: boolean;
  error: string | null;
}

const initialState: PlaypointsState = {
  playpoints: [],
  loading: false,
  error: null,
};

export const fetchActivePlaypoints = createAsyncThunk(
  'playpoints/fetchActivePlaypoints',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient('admin/playpoints?status=active', 'GET');
      console.log(response);
      return response.data.playpoints;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch playpoints');
    }
  }
);

const playpointsSlice = createSlice({
  name: 'playpoints',
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
        state.playpoints = action.payload; 
      })
      .addCase(fetchActivePlaypoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default playpointsSlice.reducer;
