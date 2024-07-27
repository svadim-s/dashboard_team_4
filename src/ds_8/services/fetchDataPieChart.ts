import { createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

export interface UserKnowledgeResponse {
  users_user_id: number;
}

interface FiltersData {
  skills_название?: (string | string[])[];
  knowledge_levels_название?: (string | string[])[];
}

export const fetchPieChartJunior = createAsyncThunk<UserKnowledgeResponse[], FiltersData>(
  'pieChart/fetchPieChartJunior',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4',
        [],
        ['count(distinct(users_user_id))'],
        filters,
        { schema_name: 'ds_8' },
        'pieChartJunior'
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPieChartHigher = createAsyncThunk<UserKnowledgeResponse[], FiltersData>(
  'pieChart/fetchPieChartHigher',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4',
        [],
        ['count(distinct(users_user_id))'],
        filters,
        { schema_name: 'ds_8' },
        'pieChartHigher'
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPieChartKnowledgeSenior = createAsyncThunk<UserKnowledgeResponse[], void>(
  'pieChart/fetchPieChartKnowledgeSenior',
  async (_, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4',
        [],
        ['count(distinct(users_user_id))'],
        {
          knowledge_levels_название: ['=', 'Senior'],
        },
        { schema_name: 'ds_8' },
        'pieChartKnowledgeSenior'
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPieChartKnowledgeMiddle = createAsyncThunk<UserKnowledgeResponse[], void>(
  'pieChart/fetchPieChartKnowledgeMiddle',
  async (_, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4',
        [],
        ['count(distinct(users_user_id))'],
        {
          knowledge_levels_название: ['=', 'Middle'],
        },
        { schema_name: 'ds_8' },
        'pieChartKnowledgeMiddle'
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPieChartKnowledgeJunior = createAsyncThunk<UserKnowledgeResponse[], void>(
  'pieChart/fetchPieChartKnowledgeJunior',
  async (_, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4',
        [],
        ['count(distinct(users_user_id))'],
        {
          knowledge_levels_название: ['=', 'Junior'],
        },
        { schema_name: 'ds_8' },
        'pieChartKnowledgeJunior'
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPieChartCountUsers = createAsyncThunk<UserKnowledgeResponse[], void>(
  'pieChart/fetchPieChartCountUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4',
        [],
        ['count(distinct(users_user_id))'],
        {},
        { schema_name: 'ds_8' },
        'pieChartCountUsers'
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
