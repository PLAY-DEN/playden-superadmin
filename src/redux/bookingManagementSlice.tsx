// bookingManagementSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../utils/apiClient';

interface BookingsState {
  bookings: any[];
  bookingDetails: any | null;  
  currentPage: number;
  lastPage: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  bookingDetails: null, 
  currentPage: 1,
  lastPage: 1,
  totalItems: 0,
  loading: false,
  error: null,
};

// Thunk for fetching bookings with pagination
export const fetchBookingsMgt = createAsyncThunk(
  'bookings/fetchBookings',
  async ({ page }: { page: number; }) => {
    try {
      const response = await apiClient(`bookings?page=${page}`, 'GET');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch bookings');
    }
  }
);

// Thunk for fetching booking details by ID
export const fetchBookingDetails = createAsyncThunk(
  'bookings/fetchBookingDetails',
  async (id: string) => {
    try {
      const response = await apiClient(`bookings/${id}`, 'GET');  
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch booking details');
    }
  }
);

const bookingMgtSlice = createSlice({
  name: 'bookingMgt',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsMgt.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingsMgt.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.currentPage = action.payload.current_page;
        state.lastPage = action.payload.last_page;
        state.totalItems = action.payload.total;
      })
      .addCase(fetchBookingsMgt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      // For fetching booking details
      .addCase(fetchBookingDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload; // Store booking details in state
      })
      .addCase(fetchBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setCurrentPage } = bookingMgtSlice.actions;

export default bookingMgtSlice.reducer;
