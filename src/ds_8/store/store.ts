import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pieChartReducer from '../slices/pieChartSlice';
import usersReducer from '../slices/usersSlice';
import knowledgeReducer from '../slices/knowledgeSlice';
import sertificatesReducer from '../slices/sertificatesSlice';
import skillsReducer from '../slices/skillsSlice';
import userSkillsReducer from '../slices/userSkillsSlice';
import areaReducer from '../slices/areaSlice';
import lineChartReducer from '../slices/lineChartSlice';

const rootReducer = combineReducers({
  pieChart: pieChartReducer,
  users: usersReducer,
  knowledge: knowledgeReducer,
  sertificates: sertificatesReducer,
  skills: skillsReducer,
  userSkills: userSkillsReducer,
  area: areaReducer,
  lineChart: lineChartReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
