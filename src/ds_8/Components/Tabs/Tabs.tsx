import React from 'react'
import cls from './Tabs.module.scss'

interface TabsProps {
  items: { value: string, label: string }[]
  value: string | null
  onChange: (value: string) => void
  direction?: 'row' | 'column'
}

const Tabs = ({ items, value, onChange, direction = 'row' }: TabsProps) => {
  return (
    <div className={direction === 'row' ? cls.TabsRow : cls.TabsColumn}>
      {items.map((item) => (
        <div
          className={
            `${cls.radio}
            ${value === item.value ? cls.checked : ''}`
          }
          key={item.value}
          onClick={() => onChange(item.value)}
        >
          <input
            id={item.value}
            value={item.value}
            type="radio"
            className={cls.radioInput}
            checked={value === item.value}
            onChange={e => e.stopPropagation()}
          />
          <label htmlFor={item.value} className={cls.label}>{item.label}</label>
        </div>
      ))}
    </div>
  )
}

export default Tabs
