import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";
import API_ENDPOINTS from "../api/client/_endpoint";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    name: "Sophie Suer Admin",
    email: "Zakbuilds213@gmail.com",
},
  token: localStorage.getItem("token") || null,  // Retrieve token from localStorage on initialization
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
    API_ENDPOINTS.LOGIN,
    async (credentials: { user_id: string; password: string }, thunkAPI) => {
      try {
        const response = await apiClient(API_ENDPOINTS.LOGIN, "POST", credentials);
        
        // Extract token and user from the nested `data` field
        const token = response.data?.user?.token; 
        const user = response.data?.user;
        
        if (!token) {
          throw new Error("Token not found in API response");
        }
  
        // Return both user and token
        return { user, token };
      } catch (error: any) {
        console.error("Login Error:", error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
  
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);  // Store token in localStorage

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
