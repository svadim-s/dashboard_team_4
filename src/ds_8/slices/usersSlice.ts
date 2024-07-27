import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserResponse, fetchUsers } from "../services/fetchUsers";

interface UserState {
  data: UserResponse[]
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserResponse[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
  }
});


export default usersSlice.reducer;
