import React, { useEffect } from 'react'
import cls from './KnowledgeTrendLineChart.module.scss'
import LineChartComponent from '../../../ds_res/src/Components/LineChart/LineChart'
import Tabs from '../../Components/Tabs/Tabs'
import { useAppDispatch, useAppSelector } from '../../common/hooks/useAppDispatch'
import useStoredSettings from '../../common/hooks/useStoredSettings';
import { fetchLineChart, fetchLineChartFillterKnowledge } from '../../services/fetchLineChart'
import { calculateLineChartPercentage } from '../../slices/lineChartSlice'
import { fetchArea } from '../../services/fetchArea'
import { Dayjs } from 'dayjs'

interface KnowledgeTrendLineChartProps {
  grades: string[]
  selectedDates: [Dayjs, Dayjs] | null
}

const KnowledgeTrendLineChart = ({grades, selectedDates}: KnowledgeTrendLineChartProps) => {
  const dispatch = useAppDispatch()

  const {
    selectedTab,
    setSelectedTab,
  } = useStoredSettings();

  const { lineChartData, lineChartFilterKnowledgeData, lineChartPercentageData } = useAppSelector((state) => state.lineChart)
  const { areaData } = useAppSelector((state) => state.area)

  useEffect(() => {
    const filtersLineChartKnowledge = selectedDates ? {
      knowledge_levels_название: ['=', ...grades],
      дата: ['and',
        ['>=', `${selectedDates[0].format('YYYY')}-01-01`],
        ['<=', `${selectedDates[1].format('YYYY')}-12-31`]
      ],
      область: ['=', selectedTab]
    } : {}

    const filtersLineChart = selectedDates ? {
      дата: ['and',
        ['>=', `${selectedDates[0].format('YYYY')}-01-01`],
        ['<=', `${selectedDates[1].format('YYYY')}-12-31`]
      ],
      область: ['=', selectedTab]
    } : {}

    dispatch(fetchLineChartFillterKnowledge(filtersLineChartKnowledge))
    dispatch(fetchLineChart(filtersLineChart))
  }, [dispatch, selectedDates, selectedTab, grades])

  useEffect(() => {
    dispatch(fetchArea())
  }, [dispatch])

  useEffect(() => {
    if (lineChartData !== null && lineChartFilterKnowledgeData !== null) {
      dispatch(calculateLineChartPercentage())
    }
  }, [lineChartData, lineChartFilterKnowledgeData, dispatch]);

  const tabItems = areaData?.map((item) => ({
    value: item['область'],
    label: item['область'].charAt(0).toUpperCase() + item['область'].slice(1).replace('_', ' ')
  }));

  const handleTabChange = (newTab) => {
    setSelectedTab(newTab);
    localStorage.setItem('selectedTab', newTab);
  };

  return (
    <div className={cls.lineChartWrapper}>
      <p className={cls.lineChartText}>Динамика изменения уровня знаний {grades.join(', ')} для {selectedTab && selectedTab.replace(/_/g, " ")}</p>
      <div className={cls.lineChartContainer}>
        <div className={cls.lineChart}>
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
  )
}

export default KnowledgeTrendLineChart
