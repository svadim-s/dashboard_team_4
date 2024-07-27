import React, { useState, useEffect, memo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Popover from '../Popover/Popover';
import { ReactComponent as KorusIcon } from '../../assets/Korus.svg';
import { ConfigProvider, DatePicker } from 'antd';
import cls from './Header.module.scss'

interface HeaderProps {
  selectedDates: [Dayjs, Dayjs] | null;
  setSelectedDates: (dates: [Dayjs, Dayjs] | null) => void;
  setSelectedGrades: (grades: string[]) => void;
  setSelectedFramework: (framework: string[]) => void;
  setSelectedDevEnv: (devEnv: string[]) => void;
  setSelectedTools: (tools: string[]) => void;
}

const Header = memo(({ selectedDates, setSelectedDates, setSelectedDevEnv, setSelectedFramework, setSelectedGrades, setSelectedTools }: HeaderProps) => {
  // const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs] | null>(null);
  // const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  // const [selectedFramework, setSelectedFramework] = useState<string[]>([]);
  // const [selectedDevEnv, setSelectedDevEnv] = useState<string[]>([]);
  // const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const { RangePicker } = DatePicker;

  // useEffect(() => {
  //   const storedDates = localStorage.getItem('selectedDates');
  //   if (storedDates) {
  //     const parsedDates = JSON.parse(storedDates).map((date: string) => dayjs(date)) as [Dayjs, Dayjs];
  //     setSelectedDates(parsedDates);
  //   }
  // }, []);

  const handleDatesChange = (dates: [Dayjs, Dayjs] | null) => {
    setSelectedDates(dates);
    if (dates) {
      localStorage.setItem('selectedDates', JSON.stringify(dates.map(date => date.toISOString())));
    } else {
      localStorage.removeItem('selectedDates');
    }
  };

  const handleGradesChange = (grades: string[]) => {
    setSelectedGrades(grades);
  };

  const handleFramworkChange = (framework: string[]) => {
    setSelectedFramework(framework);
  };

  const handleDevEnvChange = (devEnv: string[]) => {
    setSelectedDevEnv(devEnv);
  };

  const handleToolsChange = (tools: string[]) => {
    setSelectedTools(tools);
  };

  const disabledDate = (current: Dayjs) => {
    return current && current.year() < 1990;
  };

  return (
    <div className={cls.header}>
      <div className={cls.title}>
        <p className={cls.text}>KORUS analysis</p>
        <KorusIcon />
      </div>
      <div className={cls.dates}>
        <ConfigProvider
          theme={{
            components: {
              DatePicker: {
                activeBg: '#222128',
                activeBorderColor: '#978F8F',
                colorText: '#fff',
                colorBgContainer: '#222128',
                colorBgElevated: '#222128',
                multipleItemBg: '#222128',
                colorTextHeading: '#fff',
                colorIcon: '#fff',
                colorTextDisabled: '#978F8F',
                colorIconHover: '#978F8F',
                cellActiveWithRangeBg: '#978F8F'
              }
            },
          }}
        >
          <RangePicker
            onChange={handleDatesChange}
            value={selectedDates}
            variant='filled'
            picker='year'
            disabledDate={disabledDate}
          />
        </ConfigProvider>
      </div>
      <Popover
        onGradesChange={handleGradesChange}
        onDevEnvChange={handleDevEnvChange}
        onFrameworkChange={handleFramworkChange}
        onToolsChange={handleToolsChange}
      />
    </div>
  );
});

export default Header;
