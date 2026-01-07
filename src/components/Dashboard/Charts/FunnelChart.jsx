import React, { useState, useEffect } from 'react';
import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell
} from 'recharts';
import './Charts.scss';

const FunnelChart = ({ data, height = 250 }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 576);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartData = data && data.length > 0 ? data : [
    { stage: 'التسجيلات', value: 200, fill: '#e91e63' },
    { stage: 'اشتراكات نشطة', value: 156, fill: '#9c27b0' },
    { stage: 'التجديدات', value: 120, fill: '#2196f3' },
    { stage: 'منتهية', value: 45, fill: '#4caf50' },
  ];

  const CustomLabel = (props) => {
    const { x, y, width, height, value, stage } = props;
    if (!value || !stage) return null;
    
    const labelX = isMobile ? x + width / 2 : x + width + 10;
    const textAnchor = isMobile ? 'middle' : 'start';
    
    return (
      <g>
        <text
          x={labelX}
          y={y + height / 2}
          fill="var(--text-primary)"
          fontSize={isMobile ? 10 : 12}
          textAnchor={textAnchor}
          dy=".32em"
        >
          {isMobile ? `${value}` : `${stage}: ${value}`}
        </text>
      </g>
    );
  };

  return (
    <div className="chart-wrapper" style={{ height: `${height}px`, minHeight: '180px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsFunnelChart margin={{ top: 10, right: isMobile ? 5 : 100, bottom: 10, left: 5 }}>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              borderRadius: '8px'
            }}
            formatter={(value, name, props) => [`${value} متدربة`, props.payload.stage]}
          />
          <Funnel
            data={chartData}
            dataKey="value"
            nameKey="stage"
            isAnimationActive
            label={CustomLabel}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunnelChart;