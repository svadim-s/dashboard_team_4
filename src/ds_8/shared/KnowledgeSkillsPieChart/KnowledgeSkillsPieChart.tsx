import React, { useEffect, useState } from 'react'
import cls from './KnowledgeSkillsPieChart.module.scss'
import { PieChartComponent } from '../../../ds_res/src/Components/PieChart'
import { useAppDispatch, useAppSelector } from '../../common/hooks/useAppDispatch'
import { fetchPieChartCountUsers, fetchPieChartKnowledgeJunior, fetchPieChartKnowledgeMiddle, fetchPieChartKnowledgeSenior } from '../../services/fetchDataPieChart'
import { knowledgeAllDataSelector, knowledgeJuniorDataSelector, knowledgeJuniorPercentageSelector, knowledgeMiddleDataSelector, knowledgeMiddlePercentageSelector, knowledgeSeniorDataSelector, knowledgeSeniorPercentageSelector } from '../../selectors/pieChartSelector'
import { calculateKnowledgeJuniorPercentage, calculateKnowledgeMiddlePercentage, calculateKnowledgeSeniorPercentage } from '../../slices/pieChartSlice'

const KnowledgeSkillsPieChart = () => {
  const dispatch = useAppDispatch()
  const knowledgeJuniorData = useAppSelector(knowledgeJuniorDataSelector)
  const knowledgeMiddleData = useAppSelector(knowledgeMiddleDataSelector)
  const knowledgeSeniorData = useAppSelector(knowledgeSeniorDataSelector)
  const knowledgeAllData = useAppSelector(knowledgeAllDataSelector)
  const knowledgeJuniorPercentage = useAppSelector(knowledgeJuniorPercentageSelector)
  const knowledgeMiddlePercentage = useAppSelector(knowledgeMiddlePercentageSelector)
  const knowledgeSeniorPercentage = useAppSelector(knowledgeSeniorPercentageSelector)

  const [knowledgeData, setKnowledgeData] = useState([]);

  useEffect(() => {
    dispatch(fetchPieChartKnowledgeJunior())
    dispatch(fetchPieChartKnowledgeMiddle())
    dispatch(fetchPieChartKnowledgeSenior())
    dispatch(fetchPieChartCountUsers())
  }, [dispatch])

  useEffect(() => {
    if (knowledgeJuniorData !== null && knowledgeAllData !== null) {
      dispatch(calculateKnowledgeJuniorPercentage())
    }
    if (knowledgeMiddleData !== null && knowledgeAllData !== null) {
      dispatch(calculateKnowledgeMiddlePercentage())
    }
    if (knowledgeSeniorData !== null && knowledgeAllData !== null) {
      dispatch(calculateKnowledgeSeniorPercentage())
    }
  }, [knowledgeJuniorData, knowledgeMiddleData, knowledgeSeniorData, knowledgeAllData, dispatch]);

  useEffect(() => {
    setKnowledgeData([
      { name: 'Junior', value: knowledgeJuniorPercentage, color: '#9E59E4' },
      { name: 'Middle', value: knowledgeMiddlePercentage, color: '#E459C5' },
      { name: 'Senior', value: knowledgeSeniorPercentage, color: '#5C59E4' },
    ]);
  }, [knowledgeJuniorPercentage, knowledgeMiddlePercentage, knowledgeSeniorPercentage]);


  return (
    <div className={cls.pieChartWrapperSkills}>
      <p className={cls.pieChartText}>Процент сотрудников по уровням знаний в категориях: инструменты, среды разработки, фреймворки</p>
      <div className={cls.pieChartSkills}>
        <div className={cls.chartWrapper}>
          <PieChartComponent data={knowledgeData} innerRadius='0%' legend label="value" />
        </div>
      </div>
    </div>
  )
}

export default KnowledgeSkillsPieChart
