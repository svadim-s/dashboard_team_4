import React, { useState, useEffect, memo, useCallback } from 'react';
import { Modal } from 'antd';
import Button from '../Button/Button';
import { ReactComponent as FilterIcon } from '../../assets/Filter.svg';
import cls from './Popover.module.scss'

// @ts-ignore
import { KoobDataService } from 'bi-internal/services'
import DropDown from '../DropDown/DropDown';
import useCheckbox from '../../common/hooks/useCheckbox';
import { useAppDispatch, useAppSelector } from '../../common/hooks/useAppDispatch';
import { fetchKnowledgeLevels } from '../../services/fetchKnowledgeLevels';
import { skillsDevEnvSelector, skillsFrameworkSelector, skillsToolsSelector } from '../../selectors/skillsSelectors';
import { SkillsResponse, fetchSkillsDevEnv, fetchSkillsFramework, fetchSkillsTools } from '../../services/fetchSkills';
const { koobDataRequest3 } = KoobDataService

interface PopoverProps {
  onGradesChange: (grades: string[]) => void;
  onFrameworkChange: (framework: string[]) => void;
  onDevEnvChange: (devEnv: string[]) => void;
  onToolsChange: (tools: string[]) => void;
}

// const initialData = [
//   { name: 'Junior', checked: false },
//   { name: 'Middle', checked: false },
//   { name: 'Senior', checked: false },
//   { name: 'Novice', checked: false },
//   { name: 'Expert', checked: false },
//   { name: 'Использовал на проекте', checked: false },
// ];

// const initialDataFramework = [
//   { name: 'JS', checked: true },
//   { name: 'React', checked: false },
//   { name: 'Vue', checked: false },
// ];

// const initialDataDevEnv = [
//   { name: 'VSCode', checked: true },
//   { name: 'WebStorm', checked: false },
//   { name: 'PyCharm', checked: false },
// ];

// const initialDataTools = [
//   { name: '123', checked: true },
//   { name: '214', checked: false },
//   { name: '13525', checked: false },
// ];


const Popover: React.FC<PopoverProps> = memo(({ onGradesChange, onDevEnvChange, onFrameworkChange, onToolsChange }) => {
  const dispatch = useAppDispatch();
  const { knowledgeData } = useAppSelector((state) => state.knowledge);
  const initialFrameworkData = useAppSelector(skillsFrameworkSelector);
  const initialDevEnvData = useAppSelector(skillsDevEnvSelector);
  const initialToolsData = useAppSelector(skillsToolsSelector);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: gradeData, handleCheckBoxChange: handleGradeChange, handleToggleAll: handleToggleAllGrades, saveToLocalStorage: saveGradeData } = useCheckbox('checkboxData', knowledgeData);
  const { data: frameworkData, handleCheckBoxChange: handleFrameworkChange, handleToggleAll: handleToggleAllFramework, saveToLocalStorage: saveFrameworkData } = useCheckbox('checkboxFrameworkData', initialFrameworkData);
  const { data: devEnvData, handleCheckBoxChange: handleDevEnvChange, handleToggleAll: handleToggleAllDevEnv, saveToLocalStorage: saveDevEnvData } = useCheckbox('checkboxDevEnvData', initialDevEnvData);
  const { data: toolsData, handleCheckBoxChange: handleToolsChange, handleToggleAll: handleToggleAllTools, saveToLocalStorage: saveToolsData } = useCheckbox('checkboxToolsData', initialToolsData);

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

    saveGradeData();
    saveFrameworkData();
    saveDevEnvData();
    saveToolsData();
  }, [gradeData, frameworkData, devEnvData, toolsData, onGradesChange, onFrameworkChange, onDevEnvChange, onToolsChange, saveGradeData, saveFrameworkData, saveDevEnvData, saveToolsData]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button text='Фильтры' rightImg={<FilterIcon />} onClick={showModal} color='primary' />
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
    </>
  );
});

export default Popover;
