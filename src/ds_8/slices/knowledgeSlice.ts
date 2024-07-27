import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { KnowledgeResponse, fetchKnowledgeLevels } from "../services/fetchKnowledgeLevels";

interface KnowledgeState {
  knowledgeData: KnowledgeResponse[]
  loading: boolean;
  error: string | null;
}

const initialState: KnowledgeState = {
  knowledgeData: [],
  loading: false,
  error: null,
};

const knowledgeSlice = createSlice({
  name: 'knowledge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKnowledgeLevels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchKnowledgeLevels.fulfilled, (state, action: PayloadAction<KnowledgeResponse[]>) => {
        state.loading = false;
        state.knowledgeData = action.payload;
      })
      .addCase(fetchKnowledgeLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
  }
});


export default knowledgeSlice.reducer;
