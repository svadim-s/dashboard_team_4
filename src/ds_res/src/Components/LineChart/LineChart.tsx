import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartData {
  percentage: number;
  date: string;
}

const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any }) => {
  if (active && payload && payload.length) {
    const { date, percentage } = payload[0].payload;
    return (
      <div style={{ padding: '10px', backgroundColor: '#fff' }}>
        <p style={{ color: '#222128' }}>{`Год: ${date}`}</p>
        <p style={{ color: '#8481F0' }}>{`Процент сотрудников: ${percentage}%`}</p>
      </div>
    );
  }

  return null;
};


const LineChartComponent = memo(({ data }: { data: LineChartData[] }) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="percentage" stroke="#A6CEE3" activeDot strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
})

export default LineChartComponent
