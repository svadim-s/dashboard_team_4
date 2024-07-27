import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LineChartResponse, fetchLineChart, fetchLineChartFillterKnowledge } from "../services/fetchLineChart";

interface LineChartState {
  lineChartData: LineChartResponse[];
  lineChartFilterKnowledgeData: LineChartResponse[];
  lineChartPercentageData: { date: string, percentage: number }[];
  loading: boolean;
  error: string | null;
}

const initialState: LineChartState = {
  lineChartData: [],
  lineChartFilterKnowledgeData: [],
  lineChartPercentageData: [],
  loading: false,
  error: null,
};

const lineChartSlice = createSlice({
  name: 'lineChart',
  initialState,
  reducers: {
    calculateLineChartPercentage: (state) => {
      if (state.lineChartData.length > 0 && state.lineChartFilterKnowledgeData.length > 0) {
        const percentageData = state.lineChartData.map((lineData) => {
          const matchingFilterData = state.lineChartFilterKnowledgeData.find(
            filterData => filterData['дата'] === lineData['дата']
          );

          if (matchingFilterData) {
            const percentage = Math.round((matchingFilterData.fact_employee_skills_skill_id / lineData.fact_employee_skills_skill_id) * 100);
            return {
              date: lineData['дата'],
              percentage
            };
          } else {
            return {
              date: lineData['дата'],
              percentage: 0
            };
          }
        });

        state.lineChartPercentageData = percentageData;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLineChart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLineChart.fulfilled, (state, action: PayloadAction<LineChartResponse[]>) => {
        state.loading = false;
        state.lineChartData = action.payload;
      })
      .addCase(fetchLineChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(fetchLineChartFillterKnowledge.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLineChartFillterKnowledge.fulfilled, (state, action: PayloadAction<LineChartResponse[]>) => {
        state.loading = false;
        state.lineChartFilterKnowledgeData = action.payload;
      })
      .addCase(fetchLineChartFillterKnowledge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
  }
});

export const { calculateLineChartPercentage } = lineChartSlice.actions;
export default lineChartSlice.reducer;
