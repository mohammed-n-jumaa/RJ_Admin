import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Target, Activity } from 'lucide-react';
import './SummaryBox.scss';

const SummaryBox = () => {
  const insights = [
    {
      id: 1,
      icon: TrendingUp,
      text: 'هذا الشهر شهد زيادة 18% في الاشتراكات'
    },
    {
      id: 2,
      icon: Target,
      text: 'برامج التنشيف هي الأكثر طلبًا'
    },
    {
      id: 3,
      icon: Activity,
      text: 'الالتزام الغذائي أعلى من الالتزام الرياضي'
    },
    {
      id: 4,
      icon: TrendingUp,
      text: 'نسبة تجديد الاشتراكات 75%'
    }
  ];

  return (
    <motion.div 
      className="summary-box"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="summary-box__header">
        <FileText size={24} />
        <h3>ملخص الأداء</h3>
      </div>
      
      <div className="summary-box__content">
        <div className="summary-box__insights">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              className="insight-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="insight-item__icon">
                <insight.icon size={18} />
              </div>
              <p className="insight-item__text">{insight.text}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="summary-box__stats">
          <div className="stat-item">
            <span className="stat-label">متوسط مدة الاشتراك</span>
            <span className="stat-value">3.2 شهر</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">نسبة الاحتفاظ</span>
            <span className="stat-value">82%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">معدل النمو الشهري</span>
            <span className="stat-value">12%</span>
          </div>
        </div>
      </div>
      
      <div className="summary-box__footer">
        <span className="update-time">آخر تحديث: اليوم 10:30 ص</span>
      </div>
    </motion.div>
  );
};

export default SummaryBox;