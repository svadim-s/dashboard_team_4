import React from 'react';
import cls from './CheckBox.module.scss'

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={cls.CheckBox}>
      <label className={cls.wrapper}>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <p className={cls.text}>{label}</p>
      </label>
    </div>
  );
};

export default CheckBox;
