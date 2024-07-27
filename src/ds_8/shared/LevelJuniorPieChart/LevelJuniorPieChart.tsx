import React, { useEffect, useState } from 'react'
import { PieChartComponent } from '../../../ds_res/src/Components/PieChart'
import cls from './LevelJuniorPieChart.module.scss'
import { useAppDispatch, useAppSelector } from '../../common/hooks/useAppDispatch'
import { calculateJuniorPercentage } from '../../slices/pieChartSlice'
import { fetchPieChartHigher, fetchPieChartJunior } from '../../services/fetchDataPieChart'

interface LevelJuniorPieChartProps {
  selectedFramework: string[]
  selectedDevEnv: string[]
  selectedTools: string[]
}

const LevelJuniorPieChart = ({ selectedDevEnv, selectedFramework, selectedTools }: LevelJuniorPieChartProps) => {
  const dispatch = useAppDispatch()
  const { juniorPercentage, juniorData, highData } = useAppSelector((state) => state.pieChart)
  const [dataPieChartJunior, setDataPieChartJunior] = useState([]);

  useEffect(() => {
    const skills = selectedFramework.concat(selectedDevEnv, selectedTools)

    const filtersPieChartJunior = skills.length > 0 ? {
      skills_название: ['=', ...skills],
      knowledge_levels_название: ['=', 'Junior']
    } : {};

    const filtersPieChartHigher = skills.length > 0 ? {
      skills_название: ['=', ...skills],
      knowledge_levels_название: ['=', 'Middle', 'Senior', 'Expert']
    } : {};

    dispatch(fetchPieChartJunior(filtersPieChartJunior))
    dispatch(fetchPieChartHigher(filtersPieChartHigher))
  }, [dispatch, selectedFramework, selectedDevEnv, selectedTools])

  useEffect(() => {
    if (juniorData !== null && highData !== null) {
      dispatch(calculateJuniorPercentage());
    }
  }, [juniorData, highData, dispatch]);

  useEffect(() => {
    setDataPieChartJunior([
      { name: 'Получили уровень выше Junior по средам разработки, фреймворкам и инструментам', value: 100 - juniorPercentage, color: '#E989CE'},
      { name: 'Получили уровень Junior', value: juniorPercentage, color: '#76EAAB'}
    ]);
  }, [juniorPercentage]);


  return (
    <div className={cls.pieChartWrapperLevel}>
      <div className={cls.chartWrapper}>
        <PieChartComponent data={dataPieChartJunior} label="name" centerLabel valueLabel={100 - juniorPercentage} toolTip />
      </div>
    </div>
  )
}

export default LevelJuniorPieChart
