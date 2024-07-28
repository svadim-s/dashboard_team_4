import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const useStoredSettings = () => {
  const initialDates: [Dayjs, Dayjs] = [dayjs('2015'), dayjs('2024')];
  const initialGrades: string[] = ['Junior', 'Novice'];
  const initialFrameworks: string[] = ['React', 'Django', 'Angular'];
  const initialDevEnv: string[] = ['PyCharm', 'IntelliJ IDEA', 'Microsoft Visual Studio'];
  const initialTools: string[] = ['Figma', 'Git', 'Pythot/pytest', 'SQL/dbeaver'];

  const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs] | null>(initialDates);
  const [selectedGrades, setSelectedGrades] = useState<string[]>(initialGrades);
  const [selectedFramework, setSelectedFramework] = useState<string[]>(initialFrameworks);
  const [selectedDevEnv, setSelectedDevEnv] = useState<string[]>(initialDevEnv);
  const [selectedTools, setSelectedTools] = useState<string[]>(initialTools);
  const [selectedFirstUserId, setSelectedFirstUserId] = useState<string>('3581');
  const [selectedSecondUserId, setSelectedSecondUserId] = useState<string>('1649');
  const [selectedTab, setSelectedTab] = useState<string | null>('фреймворки');

  useEffect(() => {
    const storedDates = localStorage.getItem('selectedDates');
    const storedGrades = localStorage.getItem('checkboxData');
    const storedFramework = localStorage.getItem('checkboxFrameworkData');
    const storedDevEnv = localStorage.getItem('checkboxDevEnvData');
    const storedTools = localStorage.getItem('checkboxToolsData');
    const firstUserId = localStorage.getItem('selectedSearchId1');
    const secondUserId = localStorage.getItem('selectedSearchId2');
    const storedTab = localStorage.getItem('selectedTab');

    if (storedDates) {
      const parsedDates = JSON.parse(storedDates).map((date: string) => dayjs(date)) as [Dayjs, Dayjs];
      setSelectedDates(parsedDates);
    }
    if (storedGrades) {
      setSelectedGrades(Object.keys(JSON.parse(storedGrades)).filter(key => JSON.parse(storedGrades)[key]));
    }
    if (storedFramework) {
      setSelectedFramework(Object.keys(JSON.parse(storedFramework)).filter(key => JSON.parse(storedFramework)[key]));
    }
    if (storedDevEnv) {
      setSelectedDevEnv(Object.keys(JSON.parse(storedDevEnv)).filter(key => JSON.parse(storedDevEnv)[key]));
    }
    if (storedTools) {
      setSelectedTools(Object.keys(JSON.parse(storedTools)).filter(key => JSON.parse(storedTools)[key]));
    }
    if (firstUserId) {
      setSelectedFirstUserId(JSON.parse(firstUserId));
    }
    if (secondUserId) {
      setSelectedSecondUserId(JSON.parse(secondUserId));
    }
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);

  return {
    selectedDates,
    selectedGrades,
    selectedFramework,
    selectedDevEnv,
    selectedTools,
    selectedFirstUserId,
    selectedSecondUserId,
    selectedTab,
    setSelectedDates,
    setSelectedGrades,
    setSelectedFramework,
    setSelectedDevEnv,
    setSelectedTools,
    setSelectedFirstUserId,
    setSelectedSecondUserId,
    setSelectedTab,
  };
};

export default useStoredSettings;
