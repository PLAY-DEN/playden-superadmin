// src/store/bookingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";
import API_ENDPOINTS from "../api/client/_endpoint";

interface ReviewState {
    reviews: any[];
    loading: boolean;
    error: string | null;
    totalPages: number;
}

const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null,
    totalPages: 1,
};

// Thunk to fetch booking history
export const fetchBookingHistory = createAsyncThunk(
    "bookings/fetchBookingHistory",
    async ({ pitchId, page, search }: { pitchId: string; page: number; search: string }, { rejectWithValue }) => {
        try {
            const response = await apiClient(
                `${API_ENDPOINTS.GET_PITCH_BOOKINGS.replace(":pitchId", pitchId)}?page=${page}&search=${search}`
            );
            const pitchData = response.data?.pitch?.[0];
            return {
                bookings: pitchData?.bookings || [],
                totalPages: response.data?.totalPages || 1, // Total pages from API response
            };
        } catch (error) {
            return rejectWithValue("Failed to fetch booking history");
        }
    }
);

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookingHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.reviews; // Store reviews
                state.totalPages = action.payload.totalPages; // Store total pages
            })
            .addCase(fetchBookingHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Store error message
            });
    },
});


export default bookingSlice.reducer;
