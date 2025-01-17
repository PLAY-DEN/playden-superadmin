// src/store/reviewSlice.ts
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
export const fetchReviews = createAsyncThunk(
    "pitch/ratings",
    async ({ pitchId }: { pitchId: string; }, { rejectWithValue }) => {
        try {
            const response = await apiClient(
                `${API_ENDPOINTS.GET_PITCH_RATINGS.replace(":pitchId", pitchId)}`
            );
            console.log(response.data);

            const pitchData = response.data?.ratings;
            return {
                reviews: pitchData || [],
                totalPages: response.data?.last_page || 1, // Total pages from API response
            };
        } catch (error) {
            return rejectWithValue("Failed to fetch booking history");
        }
    }
);

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


const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.reviews; // Store reviews
                state.totalPages = action.payload.totalPages; // Store total pages
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Store error message
            })

            .addCase(fetchRatings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRatings.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.reviews; // Store reviews
                state.totalPages = action.payload.totalPages; // Store total pages
            })
            .addCase(fetchRatings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Store error message
            });
    },
});


export default reviewSlice.reducer;
