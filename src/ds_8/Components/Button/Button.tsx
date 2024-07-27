import React, { ReactNode } from 'react';
import cls from './Button.module.scss'

export interface ButtonProps {
  text?: string;
  leftImg?: ReactNode;
  rightImg?: ReactNode;
  onClick: () => void
  border?: boolean
  color?: 'primary' | 'secondary'
}

const Button = (props: ButtonProps) => {
  const { text, leftImg, rightImg, border, onClick, color } = props;

  return (
    <button className={`${cls.button} ${border ? cls.withBorder : cls.noBorder} ${cls[color]}`} onClick={onClick}>
      {leftImg}
      {text && <p className={cls.text}>{text}</p>}
      {rightImg}
    </button>
  );
};

export default Button;