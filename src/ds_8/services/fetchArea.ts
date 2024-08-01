import { createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

export interface AreaResponse {
  area: string;
}

export const fetchArea = createAsyncThunk<AreaResponse[], void>(
  'users/fetchArea',
  async (_, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4_main',
        ['область'],
        [],
        {},
        {
          schema_name: 'ds_8'
        },
        'area',
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
