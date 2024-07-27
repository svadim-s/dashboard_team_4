import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SertificateResponse, fetchSertificates } from "../services/fetchSertificates";

interface UserState {
  sertificateData: SertificateResponse[]
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  sertificateData: [],
  loading: false,
  error: null,
};

const sertificatesSlice = createSlice({
  name: 'sertificates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSertificates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSertificates.fulfilled, (state, action: PayloadAction<SertificateResponse[]>) => {
        state.loading = false;
        state.sertificateData = action.payload;
      })
      .addCase(fetchSertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
  }
});


export default sertificatesSlice.reducer;
