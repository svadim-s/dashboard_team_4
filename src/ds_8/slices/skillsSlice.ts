import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SkillsResponse, fetchSkillsDevEnv, fetchSkillsFramework, fetchSkillsTools } from "../services/fetchSkills";

interface SkillState {
  frameworkData: SkillsResponse[]
  devEnvData: SkillsResponse[]
  toolsData: SkillsResponse[]
  loading: boolean;
  error: string | null;
}

const initialState: SkillState = {
  frameworkData: [],
  devEnvData: [],
  toolsData: [],
  loading: false,
  error: null,
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillsFramework.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkillsFramework.fulfilled, (state, action: PayloadAction<SkillsResponse[]>) => {
        state.loading = false;
        state.frameworkData = action.payload;
      })
      .addCase(fetchSkillsFramework.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(fetchSkillsDevEnv.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkillsDevEnv.fulfilled, (state, action: PayloadAction<SkillsResponse[]>) => {
        state.loading = false;
        state.devEnvData = action.payload;
      })
      .addCase(fetchSkillsDevEnv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(fetchSkillsTools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkillsTools.fulfilled, (state, action: PayloadAction<SkillsResponse[]>) => {
        state.loading = false;
        state.toolsData = action.payload;
      })
      .addCase(fetchSkillsTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
  }
});

export default skillsSlice.reducer;
