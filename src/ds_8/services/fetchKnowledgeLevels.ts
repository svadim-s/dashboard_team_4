import { createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

export interface KnowledgeResponse {
  name: string;
  checked: boolean;
}

export const fetchKnowledgeLevels = createAsyncThunk<KnowledgeResponse[], void>(
  'knowledge/fetchKnowledgeLevels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4',
        ['knowledge_levels_название'],
        [],
        {},
        {
          schema_name: 'ds_8'
        },
        'knowledge'
      );
      const mappedData = response.map((item: any) => ({
        name: item['knowledge_levels_название'],
        checked: false
      }));

      return mappedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
