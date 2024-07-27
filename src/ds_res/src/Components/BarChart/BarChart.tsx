import React, { memo } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LabelList, YAxis, Cell } from 'recharts';

export type BarChartData = {
  year?: number;
  id?: string | number;
  amount: number;
};

interface BarChartComponentProps {
  data: BarChartData[];
  colors: string[];
}

const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any }) => {
  if (active && payload && payload.length) {
    const { year, id, amount } = payload[0].payload;
    return (
      <div style={{ padding: '10px', backgroundColor: '#fff' }}>
        <p style={{ color: '#222128' }}>{year ? `Год: ${year}` : `Сотрудник: ${id}`}</p>
        <p style={{ color: '#8481F0' }}>{year ? `Количество сертификатов: ${amount}` : `Количество навыков: ${amount}`}</p>
      </div>
    );
  }

  return null;
};

const BarChartComponent = memo(({data, colors}: BarChartComponentProps) => {
  const dataKey = data[0]?.year ? 'year' : 'id';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey={dataKey} tickMargin={15} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="amount" radius={[16, 16, 16, 16]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
})

export default BarChartComponent
