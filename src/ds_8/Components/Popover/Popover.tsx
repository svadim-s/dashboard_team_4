import React, { useState, useEffect, memo, useCallback } from 'react';
import { ConfigProvider, Modal } from 'antd';
import Button from '../Button/Button';
import { ReactComponent as FilterIcon } from '../../assets/Filter.svg';
import cls from './Popover.module.scss'

import DropDown from '../DropDown/DropDown';
import useCheckbox, { CheckboxItem } from '../../common/hooks/useCheckbox';
import { useAppDispatch, useAppSelector } from '../../common/hooks/useAppDispatch';
import { fetchKnowledgeLevels } from '../../services/fetchKnowledgeLevels';
import { skillsDevEnvSelector, skillsFrameworkSelector, skillsToolsSelector } from '../../selectors/skillsSelector';
import { fetchSkillsDevEnv, fetchSkillsFramework, fetchSkillsTools } from '../../services/fetchSkills';

interface PopoverProps {
  onGradesChange: (grades: string[]) => void;
  onFrameworkChange: (framework: string[]) => void;
  onDevEnvChange: (devEnv: string[]) => void;
  onToolsChange: (tools: string[]) => void;
}

const Popover: React.FC<PopoverProps> = memo(({ onGradesChange, onDevEnvChange, onFrameworkChange, onToolsChange }) => {
  const dispatch = useAppDispatch();
  const { knowledgeData } = useAppSelector((state) => state.knowledge);

  const initialGradesData = knowledgeData.map((item: CheckboxItem) => ({
    ...item,
    checked: item.name === "Junior" || item.name === "Novice"
  }));
  const initialFrameworkData = useAppSelector(skillsFrameworkSelector).map((item: CheckboxItem) => ({
    ...item,
    checked: item.name === "React" || item.name === "Django" || item.name === "Angular"
  }));
  const initialDevEnvData = useAppSelector(skillsDevEnvSelector).map((item: CheckboxItem) => ({
    ...item,
    checked: item.name === "PyCharm" || item.name === "IntelliJ IDEA" || item.name === "Microsoft Visual Studio"
  }));;
  const initialToolsData = useAppSelector(skillsToolsSelector).map((item: CheckboxItem) => ({
    ...item,
    checked: item.name === "Figma" || item.name === "Git" || item.name === "Pythot/pytest" || item.name === "SQL/dbeaver"
  }));;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: gradeData, handleCheckBoxChange: handleGradeChange, handleToggleAll: handleToggleAllGrades } = useCheckbox('checkboxData', initialGradesData);
  const { data: frameworkData, handleCheckBoxChange: handleFrameworkChange, handleToggleAll: handleToggleAllFramework } = useCheckbox('checkboxFrameworkData', initialFrameworkData);
  const { data: devEnvData, handleCheckBoxChange: handleDevEnvChange, handleToggleAll: handleToggleAllDevEnv } = useCheckbox('checkboxDevEnvData', initialDevEnvData);
  const { data: toolsData, handleCheckBoxChange: handleToolsChange, handleToggleAll: handleToggleAllTools } = useCheckbox('checkboxToolsData', initialToolsData);

  useEffect(() => {
    dispatch(fetchKnowledgeLevels());
    dispatch(fetchSkillsFramework());
    dispatch(fetchSkillsDevEnv());
    dispatch(fetchSkillsTools());
  }, [dispatch]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = useCallback(() => {
    setIsModalOpen(false);

    const selectedGrades = gradeData.filter(item => item.checked).map(item => item.name);
    const selectedFramework = frameworkData.filter(item => item.checked).map(item => item.name);
    const selectedDevEnv = devEnvData.filter(item => item.checked).map(item => item.name);
    const selectedTools = toolsData.filter(item => item.checked).map(item => item.name);

    onGradesChange(selectedGrades);
    onFrameworkChange(selectedFramework);
    onDevEnvChange(selectedDevEnv);
    onToolsChange(selectedTools);
  }, [gradeData, frameworkData, devEnvData, toolsData, onGradesChange, onFrameworkChange, onDevEnvChange, onToolsChange]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button text='Фильтры' rightImg={<FilterIcon />} onClick={showModal} color='primary' />
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: '#978F8F',
              titleColor: '#fff',
              headerBg: '#978F8F'
            }
          },
        }}
      >
        <Modal
          title="Фильтрация динамики изменения уровня знаний и сравнение сотрудников"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <DropDown
            title="Грейд"
            data={gradeData}
            onChange={handleGradeChange}
            onToggleAll={handleToggleAllGrades}
          />
          <DropDown
            title="Фреймворк"
            data={frameworkData}
            onChange={handleFrameworkChange}
            onToggleAll={handleToggleAllFramework}
          />
          <DropDown
            title="Среда разработки"
            data={devEnvData}
            onChange={handleDevEnvChange}
            onToggleAll={handleToggleAllDevEnv}
          />
          <DropDown
            title="Инструменты"
            data={toolsData}
            onChange={handleToolsChange}
            onToggleAll={handleToggleAllTools}
          />
        </Modal>
      </ConfigProvider>
    </>
  );
});

export default Popover;
