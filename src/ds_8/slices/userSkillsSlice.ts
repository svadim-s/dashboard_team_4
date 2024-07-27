import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserResponse, fetchUsers } from "../services/fetchUsers";
import { UserSkillsResponse, fetchUserSkillsFirst, fetchUserSkillsSecond } from "../services/fetchUserSkills";

interface UserState {
  firstUserSkills: number | null;
  secondUserSkills: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  firstUserSkills: null,
  secondUserSkills: null,
  loading: false,
  error: null,
};

const userSkillsSlice = createSlice({
  name: 'userSkills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSkillsFirst.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSkillsFirst.fulfilled, (state, action: PayloadAction<UserSkillsResponse[]>) => {
        state.loading = false;
        if (action.payload.length > 0) {
          const firstItem = action.payload[0];
          state.firstUserSkills = firstItem?.skills_skill_id;
        } else {
          state.firstUserSkills = 0
        }
      })
      .addCase(fetchUserSkillsFirst.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(fetchUserSkillsSecond.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserSkillsSecond.fulfilled, (state, action: PayloadAction<UserSkillsResponse[]>) => {
        state.loading = false;
        if (action.payload.length > 0) {
          const firstItem = action.payload[0];
          state.secondUserSkills = firstItem?.skills_skill_id;
        } else {
          state.secondUserSkills = 0
        }
      })
      .addCase(fetchUserSkillsSecond.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
  }
});


export default userSkillsSlice.reducer;
