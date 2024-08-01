import { createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

export interface UserSkillsResponse {
  skills_skill_id: number;
}

interface UserSkillsFilters {
  skills_название?: (string | string[])[];
  knowledge_levels_название?: (string | string[])[];
  users_user_id?: (string | string[])[];
}

export const fetchUserSkillsFirst = createAsyncThunk<UserSkillsResponse[], UserSkillsFilters>(
  'userSkills/fetchUserSkillsFirst',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4_main',
        [],
        ['count(distinct(skills_skill_id))'],
        filters,
        { schema_name: 'ds_8' },
        'userSkillsFirst'
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserSkillsSecond = createAsyncThunk<UserSkillsResponse[], UserSkillsFilters>(
  'userSkills/fetchUserSkillsSecond',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4_main',
        [],
        ['count(distinct(skills_skill_id))'],
        filters,
        { schema_name: 'ds_8' },
        'userSkillsSecond'
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
