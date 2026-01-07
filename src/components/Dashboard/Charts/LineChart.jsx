import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import './Charts.scss';

const LineChart = ({ data, height = 250 }) => {
  const chartData = data && data.length > 0 ? data : [
    { month: 'يناير', subscriptions: 120 },
    { month: 'فبراير', subscriptions: 135 },
    { month: 'مارس', subscriptions: 148 },
    { month: 'أبريل', subscriptions: 142 },
    { month: 'مايو', subscriptions: 156 },
    { month: 'يونيو', subscriptions: 162 },
  ];

  return (
    <div className="chart-wrapper" style={{ height: `${height}px`, minHeight: '180px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={chartData}
          margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis 
            dataKey="month" 
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
          />
          <YAxis 
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              borderRadius: '8px'
            }}
            formatter={(value) => [`${value}`, 'الاشتراكات']}
            labelFormatter={(label) => `الشهر: ${label}`}
          />
          <Legend 
            wrapperStyle={{ fontSize: '11px' }}
            formatter={() => 'الاشتراكات'}
          />
          <Line 
            type="monotone" 
            dataKey="subscriptions" 
            stroke="#e91e63" 
            strokeWidth={2}
            dot={{ stroke: '#e91e63', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="الاشتراكات"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;