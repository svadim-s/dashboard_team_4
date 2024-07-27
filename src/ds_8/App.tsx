import React, {memo, useEffect, useState} from 'react'
import './App.scss'

import {PieChartComponent} from "../ds_res/src/Components/PieChart";
import Header from './Components/Header/Header';
import BarChartComponent from '../ds_res/src/Components/BarChart/BarChart';
import Tabs from './Components/Tabs/Tabs';
import { useAppDispatch, useAppSelector } from './common/hooks/useAppDispatch';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import LineChartComponent from '../ds_res/src/Components/LineChart/LineChart';
import Search from './Components/Search/Search';

import { FilterDates, fetchSertificates } from './services/fetchSertificates';
import { fetchPieChartCountUsers, fetchPieChartHigher, fetchPieChartJunior, fetchPieChartKnowledgeJunior, fetchPieChartKnowledgeMiddle, fetchPieChartKnowledgeSenior } from './services/fetchDataPieChart';
import { calculateJuniorPercentage, calculateKnowledgeJuniorPercentage, calculateKnowledgeMiddlePercentage, calculateKnowledgeSeniorPercentage } from './slices/pieChartSlice';
import { knowledgeAllDataSelector, knowledgeJuniorDataSelector, knowledgeJuniorPercentageSelector, knowledgeMiddleDataSelector, knowledgeMiddlePercentageSelector, knowledgeSeniorDataSelector, knowledgeSeniorPercentageSelector } from './selectors/pieChartSelectors';
import { fetchUserSkillsFirst, fetchUserSkillsSecond } from './services/fetchUserSkills';
import { fetchArea } from './services/fetchArea';
import { fetchLineChart, fetchLineChartFillterKnowledge } from './services/fetchLineChart';
import { calculateLineChartPercentage } from './slices/lineChartSlice';
import useStoredSettings from './common/hooks/useStoredSettings';

const App = memo(() => {
  const dispatch = useAppDispatch()

  const {
    selectedDates,
    isFilters,
    selectedGrades,
    selectedFramework,
    selectedDevEnv,
    selectedTools,
    selectedFirstUserId,
    selectedSecondUserId,
    selectedTab,
    setSelectedDates,
    setIsFilters,
    setSelectedGrades,
    setSelectedFramework,
    setSelectedDevEnv,
    setSelectedTools,
    setSelectedFirstUserId,
    setSelectedSecondUserId,
    setSelectedTab,
  } = useStoredSettings();

  const { sertificateData } = useAppSelector((state) => state.sertificates)
  const { juniorPercentage, juniorData, highData } = useAppSelector((state) => state.pieChart)
  const { firstUserSkills, secondUserSkills } = useAppSelector((state) => state.userSkills)
  const { areaData } = useAppSelector((state) => state.area)
  const { lineChartData, lineChartFilterKnowledgeData, lineChartPercentageData } = useAppSelector((state) => state.lineChart)
  const knowledgeJuniorData = useAppSelector(knowledgeJuniorDataSelector)
  const knowledgeMiddleData = useAppSelector(knowledgeMiddleDataSelector)
  const knowledgeSeniorData = useAppSelector(knowledgeSeniorDataSelector)
  const knowledgeAllData = useAppSelector(knowledgeAllDataSelector)
  const knowledgeJuniorPercentage = useAppSelector(knowledgeJuniorPercentageSelector)
  const knowledgeMiddlePercentage = useAppSelector(knowledgeMiddlePercentageSelector)
  const knowledgeSeniorPercentage = useAppSelector(knowledgeSeniorPercentageSelector)

  const [knowledgeData, setKnowledgeData] = useState([]);
  const [dataPieChartJunior, setDataPieChartJunior] = useState([]);
  const [dataBarChartEmployee, setDataBarChartEmployee] = useState([]);

  useEffect(() => {
    const filterDates: FilterDates = isFilters && selectedDates ? {
      год_сертификата: ['and',
        ['>=', Number(selectedDates[0].format('YYYY'))],
        ['<=', Number(selectedDates[1].format('YYYY'))]
      ]
    } : {};

    const skills = selectedFramework.concat(selectedDevEnv, selectedTools)

    const filtersPieChartJunior = skills.length > 0 ? {
      skills_название: ['=', ...skills],
      knowledge_levels_название: ['=', 'Junior']
    } : {};

    const filtersPieChartHigher = skills.length > 0 ? {
      skills_название: ['=', ...skills],
      knowledge_levels_название: ['=', 'Middle', 'Senior', 'Expert']
    } : {};

    const filtersLineChartKnowledge = isFilters && selectedDates ? {
      knowledge_levels_название: ['=', ...selectedGrades],
      дата: ['and',
        ['>=', `${selectedDates[0].format('YYYY')}-01-01`],
        ['<=', `${selectedDates[1].format('YYYY')}-12-31`]
      ],
      область: ['=', selectedTab]
    } : {}

    const filtersLineChart = isFilters && selectedDates ? {
      дата: ['and',
        ['>=', `${selectedDates[0].format('YYYY')}-01-01`],
        ['<=', `${selectedDates[1].format('YYYY')}-12-31`]
      ],
      область: ['=', selectedTab]
    } : {}

    const firstUserSkillsFilters = selectedFirstUserId ? {
      users_user_id: ['=', selectedFirstUserId],
      knowledge_levels_название: ['=', ...selectedGrades],
      skills_название: ['=', ...skills]
    } : {}

    const secondUserSkillsFilters = selectedSecondUserId ? {
      users_user_id: ['=', selectedSecondUserId],
      knowledge_levels_название: ['=', ...selectedGrades],
      skills_название: ['=', ...skills]
    } : {}

    dispatch(fetchLineChartFillterKnowledge(filtersLineChartKnowledge))
    dispatch(fetchLineChart(filtersLineChart))
    dispatch(fetchSertificates(filterDates))
    dispatch(fetchPieChartJunior(filtersPieChartJunior))
    dispatch(fetchPieChartHigher(filtersPieChartHigher))
    dispatch(fetchPieChartKnowledgeJunior())
    dispatch(fetchPieChartKnowledgeMiddle())
    dispatch(fetchPieChartKnowledgeSenior())
    dispatch(fetchPieChartCountUsers())
    dispatch(fetchUserSkillsFirst(firstUserSkillsFilters))
    dispatch(fetchUserSkillsSecond(secondUserSkillsFilters))
  }, [dispatch, selectedDates, isFilters, selectedFirstUserId, selectedSecondUserId, selectedGrades, selectedFramework, selectedDevEnv, selectedTools, selectedTab])

  useEffect(() => {
    if (juniorData !== null && highData !== null) {
      dispatch(calculateJuniorPercentage());
    }
    if (knowledgeJuniorData !== null && knowledgeAllData !== null) {
      dispatch(calculateKnowledgeJuniorPercentage())
    }
    if (knowledgeMiddleData !== null && knowledgeAllData !== null) {
      dispatch(calculateKnowledgeMiddlePercentage())
    }
    if (knowledgeSeniorData !== null && knowledgeAllData !== null) {
      dispatch(calculateKnowledgeSeniorPercentage())
    }
    if (lineChartData !== null && lineChartFilterKnowledgeData !== null) {
      dispatch(calculateLineChartPercentage())
    }
  }, [juniorData, highData, knowledgeJuniorData, knowledgeMiddleData, knowledgeSeniorData, knowledgeAllData, selectedFramework, selectedDevEnv, selectedTools, lineChartData, lineChartFilterKnowledgeData, dispatch]);

  useEffect(() => {
    setKnowledgeData([
      { name: 'Junior', value: knowledgeJuniorPercentage, color: '#9E59E4' },
      { name: 'Middle', value: knowledgeMiddlePercentage, color: '#E459C5' },
      { name: 'Senior', value: knowledgeSeniorPercentage, color: '#5C59E4' },
    ]);
    setDataPieChartJunior([
      { name: 'Получили уровень выше Junior по средам разработки, фреймворкам и инструментам', value: 100 - juniorPercentage, color: '#E989CE'},
      { name: 'Получили уровень Junior', value: juniorPercentage, color: '#76EAAB'}
    ]);
    setDataBarChartEmployee([
      { id: selectedFirstUserId, amount: firstUserSkills },
      { id: selectedSecondUserId, amount: secondUserSkills }
    ]);
  }, [knowledgeJuniorPercentage, knowledgeMiddlePercentage, knowledgeSeniorPercentage, juniorPercentage, firstUserSkills, secondUserSkills, selectedFirstUserId, selectedSecondUserId]);

  useEffect(() => {
    dispatch(fetchArea())
  }, [dispatch])

  const handleUserIdChange = (storageKey: string, value: string) => {
    localStorage.setItem(storageKey, JSON.stringify(value));
    if (storageKey === 'selectedSearchId1') {
      setSelectedFirstUserId(value);
    } else if (storageKey === 'selectedSearchId2') {
      setSelectedSecondUserId(value);
    }
  };

  const tabItems = areaData?.map((item) => ({
    value: item['область'],
    label: item['область'].charAt(0).toUpperCase() + item['область'].slice(1).replace('_', ' ')
  }));

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
    localStorage.setItem('selectedTab', newTab);
  };

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
          <div className='lineChartWrapper'>
            <p className='lineChartText'>Динамика изменения уровня знаний {selectedGrades.join(', ')} для {selectedTab && selectedTab.replace(/_/g, " ")}</p>
            <div className='lineChartContainer'>
              <div className='lineChart'>
                <LineChartComponent data={lineChartPercentageData} />
              </div>
              <Tabs
                items={tabItems}
                value={selectedTab}
                onChange={handleTabChange}
                direction='column'
              />
            </div>
          </div>
          <div className='barChartWrapper'>
            <p className='barChartText'>Динамика получения сертификатов</p>
            <div className='barChart'>
              <BarChartComponent data={sertificateData} colors={['#8481F0']} />
            </div>
          </div>
        </div>
        <div className='rightWrapper'>
          <div className='barChartEmployeeWrapper'>
            <p className='employeeText'>Сравнение сотрудников по критериям (Навыки инструментов, Грейд)</p>
            <div className='employeeContent'>
              <Search title='Введите ID-1' storageKey='selectedSearchId1' onChange={handleUserIdChange} />
              <div className='employeeChart'>
                <BarChartComponent data={dataBarChartEmployee} colors={['#8481F0', '#6DCCCC']} />
              </div>
              <Search title='Введите ID-2' storageKey='selectedSearchId2' onChange={handleUserIdChange} />
            </div>
          </div>
          <div className='pieCharts'>
            <div className="pieChartWrapperLevel">
              <div className='chartWrapper'>
                <PieChartComponent data={dataPieChartJunior} label="name" centerLabel valueLabel={100 - juniorPercentage} toolTip />
              </div>
            </div>
            <div className="pieChartWrapperSkills">
              <p className='pieChartText'>Процент сотрудников по уровням знаний в категориях: инструменты, среды разработки, фреймворки</p>
              <div className='pieChartSkills'>
                <div className='chartWrapper'>
                  <PieChartComponent data={knowledgeData} innerRadius='0%' legend label="value" />
                </div>
              </div>
            </div>
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
