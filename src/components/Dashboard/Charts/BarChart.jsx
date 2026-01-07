import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import './Charts.scss';

const BarChart = ({ data, height = 300 }) => {
  const chartData = data.length > 0 ? data : [
    { program: 'تنشيف', completion: 82 },
    { program: 'نحت', completion: 75 },
    { program: 'زيادة عضل', completion: 68 },
    { program: 'لياقة عامة', completion: 88 },
    { program: 'تغذية', completion: 92 },
  ];

  return (
    <div className="chart-wrapper" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis 
            dataKey="program" 
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-secondary)' }}
          />
          <YAxis 
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-secondary)' }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            formatter={(value) => [`${value}%`, 'نسبة الإنجاز']}
            labelFormatter={(label) => `البرنامج: ${label}`}
          />
          <Legend />
          <Bar 
            dataKey="completion" 
            fill="#e91e63"
            radius={[4, 4, 0, 0]}
            name="نسبة الإنجاز"
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;