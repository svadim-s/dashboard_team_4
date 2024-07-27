import React, { memo } from 'react'
import {Cell, Pie, ResponsiveContainer, PieChart, Tooltip, Label, Legend} from 'recharts'

import cls from './PieChart.module.scss'

type PieChartType = {
  data: { value: number, name: string, color: string }[]
  dataKey?: string
  innerRadius?: string
  outerRadius?: string
  legend?: boolean
  label?: 'value' | 'name'
  centerLabel?: boolean
  valueLabel?: number
  toolTip?: boolean
}

const PieTooltip = ({ active, payload }: { active?: boolean, payload?: any }) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0].payload;
    return (
      <div style={{ border: `1px solid ${color}`, padding: '10px', backgroundColor: '#fff' }}>
        <p style={{ color }}>{`${name} : ${value}%`}</p>
      </div>
    );
  }

  return null;
};

const renderCustomizedLabel = ({ percent }: { percent: number }) => {
  return `${(percent * 100).toFixed(0)}%`;
};

const renderCustomizedNameLabel = ({ name, x, y }: { name: string, x: number, y: number }) => {
  const words = name.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    if (currentLine.length + words[i].length + 1 <= 20) {
      currentLine += ' ' + words[i];
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }
  lines.push(currentLine);

  return (
    <text x={x} y={y} textAnchor="middle" fill="#fff">
      {lines.map((line, index) => (
        <tspan key={index} x={x} dy={index === 0 ? 0 : '1.2em'}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

export const PieChartComponent = memo((
  {
    data,
    dataKey = 'value',
    innerRadius = '65%',
    outerRadius = '100%',
    legend = false,
    label = 'value',
    centerLabel = false,
    valueLabel,
    toolTip
  }: PieChartType
) => {
  const getLabel = label === 'value' ? renderCustomizedLabel : renderCustomizedNameLabel;

  return (
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            label={getLabel}
            isAnimationActive={label && false}
          >
            {data.map((cell, index) => (
              <Cell key={`cell-${index}`} fill={cell.color}/>
            ))}
            {centerLabel && <Label position="center" value={`${valueLabel}%`} className={cls.label} />}
          </Pie>
          {legend && <Legend layout="vertical" align="left" verticalAlign="middle" iconType='circle' />}
          {toolTip && <Tooltip content={<PieTooltip />} />}
        </PieChart>
      </ResponsiveContainer>
  )
})
