import { createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

export interface LineChartResponse {
  fact_employee_skills_skill_id: number;
  date: string
}

interface FilterLineChartKnowledge {
  knowledge_levels_название?: (string | string[])[];
  дата?: (string | string[])[];
  область?: (string | string[])[];
}

interface FilterLineChart {
  дата?: (string | string[])[];
  область?: (string | string[])[];
}

export const fetchLineChartFillterKnowledge = createAsyncThunk<LineChartResponse[], FilterLineChartKnowledge>(
  'lineChart/fetchLineChartFillterKnowledge',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4_main',
        ['count(fact_employee_skills_skill_id)', 'year(дата)'],
        [],
        filters,
        {
          sort: ['дата'],
          schema_name: 'ds_8'
        },
        'lineChartFillterKnowledge',
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLineChart = createAsyncThunk<LineChartResponse[], FilterLineChart>(
  'lineChart/fetchLineChart',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4_main',
        ['count(fact_employee_skills_skill_id)', 'year(дата)'],
        [],
        filters,
        {
          sort: ['дата'],
          schema_name: 'ds_8'
        },
        'lineChart',
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

