import { createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

export interface SkillsResponse {
  name: string;
  checked: boolean;
}

export const fetchSkillsTools = createAsyncThunk<SkillsResponse[], void>(
  'skills/fetchSkillsTools',
  async (_, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4_main',
        ['skills_название'],
        [],
        {
          область: ['=', 'инструменты']
        },
        { schema_name: 'ds_8' },
        'skillsTools'
      );
      const mappedData = response.map((item: any) => ({
        name: item['skills_название'],
        checked: false
      }));

      return mappedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSkillsFramework = createAsyncThunk<SkillsResponse[], void>(
  'skills/fetchSkillsFramework',
  async (_, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4_main',
        ['skills_название'],
        [],
        {
          область: ['=', 'фреймворки']
        },
        { schema_name: 'ds_8' },
        'skillsFramework'
      );
      const mappedData = response.map((item: any) => ({
        name: item['skills_название'],
        checked: false
      }));

      return mappedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSkillsDevEnv = createAsyncThunk<SkillsResponse[], void>(
  'skills/fetchSkillsDevEnv',
  async (_, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4_main',
        ['skills_название'],
        [],
        {
          область: ['=', 'среды_разработки']
        },
        { schema_name: 'ds_8' },
        'skillsDevEnv'
      );
      const mappedData = response.map((item: any) => ({
        name: item['skills_название'],
        checked: false
      }));

      return mappedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
