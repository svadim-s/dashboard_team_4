import React, { useEffect } from 'react'
import BarChartComponent from '../../../ds_res/src/Components/BarChart/BarChart'
import cls from './SertificatesTrendBarChart.module.scss'
import { useAppDispatch, useAppSelector } from '../../common/hooks/useAppDispatch'
import { FilterDates, fetchSertificates } from '../../services/fetchSertificates'
import { Dayjs } from 'dayjs'

interface SertificatesTrendBarChartProps {
  selectedDates: [Dayjs, Dayjs] | null
}

const SertificatesTrendBarChart = ({selectedDates}: SertificatesTrendBarChartProps) => {
  const dispatch = useAppDispatch()
  const { sertificateData } = useAppSelector((state) => state.sertificates)

  useEffect(() => {
    const filterDates: FilterDates = selectedDates ? {
      год_сертификата: ['and',
        ['>=', Number(selectedDates[0].format('YYYY'))],
        ['<=', Number(selectedDates[1].format('YYYY'))]
      ]
    } : {};

    dispatch(fetchSertificates(filterDates))
  }, [dispatch, selectedDates])

  return (
    <div className={cls.barChartWrapper}>
      <p className={cls.barChartText}>Динамика получения сертификатов</p>
      <div className={cls.barChart}>
        <BarChartComponent data={sertificateData} colors={['#8481F0']} />
      </div>
    </div>
  )
}

export default SertificatesTrendBarChart
