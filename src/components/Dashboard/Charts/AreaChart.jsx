import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import './Charts.scss';

const AreaChart = ({ data, height = 300 }) => {
  const chartData = data.length > 0 ? data : [
    { day: 'السبت', revenue: 1200 },
    { day: 'الأحد', revenue: 1800 },
    { day: 'الإثنين', revenue: 1500 },
    { day: 'الثلاثاء', revenue: 2200 },
    { day: 'الأربعاء', revenue: 1900 },
    { day: 'الخميس', revenue: 2500 },
    { day: 'الجمعة', revenue: 2100 },
  ];

  return (
    <div className="chart-wrapper" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis 
            dataKey="day" 
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-secondary)' }}
          />
          <YAxis 
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-secondary)' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            formatter={(value) => [`${value} دينار`, 'الدخل']}
            labelFormatter={(label) => `اليوم: ${label}`}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#4caf50" 
            fill="#4caf50"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;