import { createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import { KoobDataService } from 'bi-internal/services';
const { koobDataRequest3 } = KoobDataService;

export interface SertificateResponse {
  amount: number;
  year: number;
}

export interface FilterDates {
  год_сертификата?: [
    string,
    [string, number],
    [string, number]
  ];
}

export const fetchSertificates = createAsyncThunk<SertificateResponse[], FilterDates>(
  'sertificates/fetchSertificates',
  async (filterDates, { rejectWithValue }) => {
    try {
      const response = await koobDataRequest3(
        'team_4.team_4',
        [],
        ['count(distinct(fact_employee_sertificates_fact_id))', 'год_сертификата'],
        filterDates,
        { schema_name: 'ds_8' },
        'sertificates'
      );
      const mappedData = response.map((item: any) => ({
        amount: item['fact_employee_sertificates_fact_id'],
        year: item['год_сертификата']
      }));

      return mappedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
