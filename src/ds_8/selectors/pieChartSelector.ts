import { RootState } from "../store/store";

export const knowledgeJuniorDataSelector = ((state: RootState) => state.pieChart.knowledgeJuniorData)
export const knowledgeMiddleDataSelector = ((state: RootState) => state.pieChart.knowledgeMiddleData)
export const knowledgeSeniorDataSelector = ((state: RootState) => state.pieChart.knowledgeSeniorData)
export const knowledgeAllDataSelector = ((state: RootState) => state.pieChart.knowledgeAllData)

export const knowledgeJuniorPercentageSelector = ((state: RootState) => state.pieChart.knowledgeJuniorPercentage)
export const knowledgeMiddlePercentageSelector = ((state: RootState) => state.pieChart.knowledgeMiddlePercentage)
export const knowledgeSeniorPercentageSelector = ((state: RootState) => state.pieChart.knowledgeSeniorPercentage)

export const levelJuniorDataSelector = ((state: RootState) => state.pieChart.juniorData)
export const levelHigherDataSelector = ((state: RootState) => state.pieChart.highData)
export const levelJuniorPercentageSelector = ((state: RootState) => state.pieChart.juniorPercentage)
