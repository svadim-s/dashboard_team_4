import React, {memo} from 'react'
import './App.scss'

import Header from './Components/Header/Header';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';

import useStoredSettings from './common/hooks/useStoredSettings';
import KnowledgeTrendLineChart from './shared/KnowledgeTrendLineChart/KnowledgeTrendLineChart';
import SertificatesTrendBarChart from './shared/SertificatesTrendBarChart/SertificatesTrendBarChart';
import СomparisonEmployeeBarChart from './shared/СomparisonEmployeeBarChart/СomparisonEmployeeBarChart';
import KnowledgeSkillsPieChart from './shared/KnowledgeSkillsPieChart/KnowledgeSkillsPieChart';
import LevelJuniorPieChart from './shared/LevelJuniorPieChart/LevelJuniorPieChart';

const App = memo(() => {
  const {
    selectedDates,
    selectedGrades,
    selectedFramework,
    selectedDevEnv,
    selectedTools,
    setSelectedDates,
    setSelectedGrades,
    setSelectedFramework,
    setSelectedDevEnv,
    setSelectedTools,
  } = useStoredSettings();

  return (
    <div className='App scroller'>
      <Header
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        setSelectedGrades={setSelectedGrades}
        setSelectedFramework={setSelectedFramework}
        setSelectedDevEnv={setSelectedDevEnv}
        setSelectedTools={setSelectedTools}
      />
      <div className='content'>
        <div className='leftWrapper'>
          <KnowledgeTrendLineChart grades={selectedGrades} selectedDates={selectedDates} />
          <SertificatesTrendBarChart selectedDates={selectedDates} />
        </div>
        <div className='rightWrapper'>
          <СomparisonEmployeeBarChart
            selectedDevEnv={selectedDevEnv}
            selectedFramework={selectedFramework}
            selectedGrades={selectedGrades}
            selectedTools={selectedTools}
          />
          <div className='pieCharts'>
            <LevelJuniorPieChart
              selectedDevEnv={selectedDevEnv}
              selectedFramework={selectedFramework}
              selectedTools={selectedTools}
            />
            <KnowledgeSkillsPieChart />
          </div>
        </div>
      </div>
    </div>
  )
})

export default function WrappedApp() {
  const store = setupStore()

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
