import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserKnowledgeResponse, fetchPieChartCountUsers, fetchPieChartHigher, fetchPieChartJunior, fetchPieChartKnowledgeJunior, fetchPieChartKnowledgeMiddle, fetchPieChartKnowledgeSenior } from '../services/fetchDataPieChart';

export interface PieChartState {
  juniorData: number | null;
  highData: number | null;
  juniorPercentage: number | null;
  knowledgeSeniorData: number | null;
  knowledgeMiddleData: number | null;
  knowledgeJuniorData: number | null;
  knowledgeAllData: number | null;
  knowledgeSeniorPercentage: number | null;
  knowledgeMiddlePercentage: number | null;
  knowledgeJuniorPercentage: number | null;
  loading: boolean
  error: string | null;
}

const initialState: PieChartState = {
  juniorData: null,
  highData: null,
  juniorPercentage: null,
  knowledgeSeniorData: null,
  knowledgeMiddleData: null,
  knowledgeJuniorData: null,
  knowledgeAllData: null,
  knowledgeSeniorPercentage: null,
  knowledgeMiddlePercentage: null,
  knowledgeJuniorPercentage: null,
  loading: false,
  error: null,
};

const pieChartSlice = createSlice({
  name: 'pieChart',
  initialState,
  reducers: {
    calculateJuniorPercentage: (state) => {
      if (state.juniorData !== null && state.highData !== null && state.highData !== 0) {
        const percentage = (state.juniorData / state.highData) * 100;
        if (percentage > 100) {
          state.juniorPercentage = 100;
        } else {
          state.juniorPercentage = Math.round(percentage);
        }
      } else if (state.highData === 0 && state.juniorData !== null && state.juniorData !== 0) {
        state.juniorPercentage = 100;
      } else {
        state.juniorPercentage = 0;
      }
    },
    calculateKnowledgeSeniorPercentage: (state) => {
      if (state.knowledgeSeniorData !== null && state.knowledgeAllData !== null) {
        const percentage = (state.knowledgeSeniorData / state.knowledgeAllData) * 100;
        state.knowledgeSeniorPercentage = Math.round(percentage);
      } else {
        state.knowledgeSeniorPercentage = 0;
      }
    },
    calculateKnowledgeMiddlePercentage: (state) => {
      if (state.knowledgeMiddleData !== null && state.knowledgeAllData !== null) {
        const percentage = (state.knowledgeMiddleData / state.knowledgeAllData) * 100;
        state.knowledgeMiddlePercentage = Math.round(percentage);
      } else {
        state.knowledgeMiddlePercentage = 0;
      }
    },
    calculateKnowledgeJuniorPercentage: (state) => {
      if (state.knowledgeJuniorData !== null && state.knowledgeAllData !== null) {
        const percentage = (state.knowledgeJuniorData / state.knowledgeAllData) * 100;
        state.knowledgeJuniorPercentage = Math.round(percentage);
      } else {
        state.knowledgeJuniorPercentage = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPieChartJunior.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPieChartJunior.fulfilled, (state, action: PayloadAction<UserKnowledgeResponse[]>) => {
      state.loading = false;
      if (action.payload.length > 0) {
        const firstItem = action.payload[0];
        state.juniorData = firstItem?.users_user_id;
      } else {
        state.juniorData = 0
      }
    })
    .addCase(fetchPieChartJunior.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    })
    .addCase(fetchPieChartHigher.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPieChartHigher.fulfilled, (state, action: PayloadAction<UserKnowledgeResponse[]>) => {
      state.loading = false;
      if (action.payload.length > 0) {
        const firstItem = action.payload[0];
        state.highData = firstItem?.users_user_id;
      } else {
        state.highData = 0
      }
    })
    .addCase(fetchPieChartHigher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    })
    .addCase(fetchPieChartKnowledgeSenior.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPieChartKnowledgeSenior.fulfilled, (state, action: PayloadAction<UserKnowledgeResponse[]>) => {
      state.loading = false;
      if (action.payload.length > 0) {
        const firstItem = action.payload[0];
        state.knowledgeSeniorData = firstItem?.users_user_id;
      } else {
        state.knowledgeSeniorData = 0
      }
    })
    .addCase(fetchPieChartKnowledgeSenior.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    })
    .addCase(fetchPieChartKnowledgeMiddle.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPieChartKnowledgeMiddle.fulfilled, (state, action: PayloadAction<UserKnowledgeResponse[]>) => {
      state.loading = false;
      if (action.payload.length > 0) {
        const firstItem = action.payload[0];
        state.knowledgeMiddleData = firstItem?.users_user_id;
      } else {
        state.knowledgeMiddleData = 0
      }
    })
    .addCase(fetchPieChartKnowledgeMiddle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    })
    .addCase(fetchPieChartKnowledgeJunior.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPieChartKnowledgeJunior.fulfilled, (state, action: PayloadAction<UserKnowledgeResponse[]>) => {
      state.loading = false;
      if (action.payload.length > 0) {
        const firstItem = action.payload[0];
        state.knowledgeJuniorData = firstItem?.users_user_id;
      } else {
        state.knowledgeJuniorData = 0
      }
    })
    .addCase(fetchPieChartKnowledgeJunior.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    })
    .addCase(fetchPieChartCountUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchPieChartCountUsers.fulfilled, (state, action: PayloadAction<UserKnowledgeResponse[]>) => {
      state.loading = false;
      if (action.payload.length > 0) {
        const firstItem = action.payload[0];
        state.knowledgeAllData = firstItem?.users_user_id;
      } else {
        state.knowledgeAllData = 0
      }
    })
    .addCase(fetchPieChartCountUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    })
  },
});

export const {
  calculateJuniorPercentage,
  calculateKnowledgeJuniorPercentage,
  calculateKnowledgeMiddlePercentage,
  calculateKnowledgeSeniorPercentage
} = pieChartSlice.actions;
export default pieChartSlice.reducer;
