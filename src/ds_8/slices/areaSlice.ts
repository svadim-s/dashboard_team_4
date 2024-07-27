import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AreaResponse, fetchArea } from "../services/fetchArea";

interface AreaState {
  areaData: AreaResponse[]
  loading: boolean;
  error: string | null;
}

const initialState: AreaState = {
  areaData: [],
  loading: false,
  error: null,
};

const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArea.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArea.fulfilled, (state, action: PayloadAction<AreaResponse[]>) => {
        state.loading = false;
        state.areaData = action.payload;
      })
      .addCase(fetchArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
  }
});


export default areaSlice.reducer;
