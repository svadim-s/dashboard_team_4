import { createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

export interface UserResponse {
  users_user_id: number;
}

export const fetchUsers = createAsyncThunk<UserResponse[], void>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4',
        ['users_user_id'],
        [],
        {},
        { schema_name: 'ds_8' },
        'users'
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
