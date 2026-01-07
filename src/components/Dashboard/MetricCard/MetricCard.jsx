import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './MetricCard.scss';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  format, 
  unit, 
  currency, 
  progress, 
  showLineChart 
}) => {
  const isPositive = change >= 0;
  const formattedChange = `${isPositive ? '+' : ''}${change}%`;
  
  const formatValue = () => {
    switch(format) {
      case 'currency':
        return `${value.toLocaleString()} ${currency || ''}`;
      case 'percentage':
        return `${value}%`;
      case 'duration':
        return `${value} ${unit || ''}`;
      default:
        return value.toLocaleString();
    }
  };

  const getColorClass = () => {
    switch(color) {
      case 'primary': return 'metric-card--primary';
      case 'blue': return 'metric-card--blue';
      case 'green': return 'metric-card--green';
      case 'orange': return 'metric-card--orange';
      case 'purple': return 'metric-card--purple';
      default: return 'metric-card--primary';
    }
  };

  return (
    <motion.div 
      className={`metric-card ${getColorClass()}`}
      whileHover={{ y: -5 }}
    >
      <div className="metric-card__icon">
        <Icon size={24} />
      </div>
      
      <div className="metric-card__content">
        <span className="metric-card__label">{title}</span>
        <div className="metric-card__value">{formatValue()}</div>
        
        <div className="metric-card__change">
          {isPositive ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          <span className={`change-text ${isPositive ? 'positive' : 'negative'}`}>
            {formattedChange}
          </span>
          <span className="change-label">عن الفترة السابقة</span>
        </div>
      </div>
      
      {format === 'percentage' && progress && (
        <div className="metric-card__progress">
          <div 
            className="metric-card__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      {showLineChart && (
        <div className="metric-card__chart">
          <svg width="100" height="30" viewBox="0 0 100 30">
            <path
              d="M0,20 L25,15 L50,10 L75,5 L100,0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;