import React, { useEffect, useState } from 'react'
import cls from './DropDown.module.scss'
import CheckBox from '../CheckBox/CheckBox';
import Button from '../Button/Button';
import { ReactComponent as ArrowIcon } from '../../assets/Arrow.svg';

interface DropDownProps {
  title?: string;
  data: { name: string; checked: boolean }[];
  onChange: (index: number, checked: boolean) => void;
  onToggleAll: (checked: boolean) => void;
}

const DropDown = ({ title, data, onChange, onToggleAll }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    setAllSelected(data.every(item => item.checked));
  }, [data]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleAll = () => {
    const newAllSelected = !allSelected;
    setAllSelected(newAllSelected);
    onToggleAll(newAllSelected);
  };

  return (
    <div className={cls.dropdown}>
      <Button text={title} onClick={toggleOpen} color='secondary' leftImg={<ArrowIcon className={isOpen ? cls.rotatedOpen : cls.rotatedClose} />} />
      {isOpen && (
        <div className={cls.menu}>
          <Button text={allSelected ? "Убрать все" : "Выбрать все"} onClick={handleToggleAll} color='secondary' border />
          {data.map((item, index) => (
            <CheckBox
              key={index}
              label={item.name}
              checked={item.checked}
              onChange={(checked) => onChange(index, checked)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDown
