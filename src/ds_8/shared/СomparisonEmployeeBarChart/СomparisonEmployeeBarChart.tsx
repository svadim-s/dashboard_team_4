import React, { useEffect, useState } from 'react'
import Search from '../../Components/Search/Search'
import BarChartComponent from '../../../ds_res/src/Components/BarChart/BarChart'
import cls from './СomparisonEmployeeBarChart.module.scss'
import { useAppDispatch, useAppSelector } from '../../common/hooks/useAppDispatch'
import useStoredSettings from '../../common/hooks/useStoredSettings';
import { fetchUserSkillsFirst, fetchUserSkillsSecond } from '../../services/fetchUserSkills'
import { firstUserSkillsSelector, secondUserSkillsSelector } from '../../selectors/userSkillsSelector'

interface СomparisonEmployeeBarChartProps {
  selectedGrades: string[]
  selectedFramework: string[]
  selectedDevEnv: string[]
  selectedTools: string[]
}

const СomparisonEmployeeBarChart = ({ selectedDevEnv, selectedFramework, selectedGrades, selectedTools }: СomparisonEmployeeBarChartProps) => {
  const dispatch = useAppDispatch()
  const [dataBarChartEmployee, setDataBarChartEmployee] = useState([]);
  const firstUserSkills = useAppSelector(firstUserSkillsSelector)
  const secondUserSkills = useAppSelector(secondUserSkillsSelector)

  const {
    selectedFirstUserId,
    selectedSecondUserId,
    setSelectedFirstUserId,
    setSelectedSecondUserId,
  } = useStoredSettings();

  useEffect(() => {
    const skills = selectedFramework.concat(selectedDevEnv, selectedTools)

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

    dispatch(fetchUserSkillsFirst(firstUserSkillsFilters))
    dispatch(fetchUserSkillsSecond(secondUserSkillsFilters))
  }, [selectedGrades, selectedSecondUserId, selectedFirstUserId, dispatch, selectedDevEnv, selectedTools, selectedFramework])

  useEffect(() => {
    setDataBarChartEmployee([
      { id: selectedFirstUserId, amount: firstUserSkills },
      { id: selectedSecondUserId, amount: secondUserSkills }
    ]);
  }, [selectedFirstUserId, selectedSecondUserId, firstUserSkills, secondUserSkills])

  const handleUserIdChange = (storageKey: string, value: string) => {
    localStorage.setItem(storageKey, JSON.stringify(value));
    if (storageKey === 'selectedSearchId1') {
      setSelectedFirstUserId(value);
    } else if (storageKey === 'selectedSearchId2') {
      setSelectedSecondUserId(value);
    }
  };

  return (
    <div className={cls.barChartEmployeeWrapper}>
      <p className={cls.employeeText}>Сравнение сотрудников по критериям (Навыки инструментов, Грейд)</p>
      <div className={cls.employeeContent}>
        <Search title='Введите ID-1' storageKey='selectedSearchId1' onChange={handleUserIdChange} initialData='3581' />
        <div className={cls.employeeChart}>
          <BarChartComponent data={dataBarChartEmployee} colors={['#8481F0', '#6DCCCC']} />
        </div>
        <Search title='Введите ID-2' storageKey='selectedSearchId2' onChange={handleUserIdChange} initialData='1649' />
      </div>
    </div>
  )
}

export default СomparisonEmployeeBarChart
