import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../utils/apiClient';

interface AdminState {
  users: any[];
  loading: boolean;
  error: string | null;
}


const initialState: AdminState = {
  users: [],
  loading: false,
  error: null,
};


export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (token: string) => {
  try {
    
    const data = await apiClient('admin/users', 'GET');
    console.log(data);
    return data; 
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch users');
  }
});


const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export default adminSlice.reducer;
