import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../utils/apiClient";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null, 
  loading: false,
  error: null,
};


export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { user_id: string; password: string }, thunkAPI) => {
    try {
      const response = await apiClient("auth/login", "POST", credentials);

     
      const token = response.data?.user?.token;
      const user = response.data?.user;

      if (!token) {
        throw new Error("Token not found in API response");
      }

      
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
        localStorage.setItem("token", action.payload.token); 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions; 
export default authSlice.reducer;
