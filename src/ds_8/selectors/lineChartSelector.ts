import { RootState } from "../store/store";

export const lineChartDataSelector = ((state: RootState) => state.lineChart.lineChartData)
export const lineFilterKnowledgeDataSelector = ((state: RootState) => state.lineChart.lineChartFilterKnowledgeData)
export const lineChartPercentageDataSelector = ((state: RootState) => state.lineChart.lineChartPercentageData)
