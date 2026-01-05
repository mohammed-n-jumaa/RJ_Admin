import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import './Dashboard.scss';

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      title: 'إجمالي العملاء',
      value: '156',
      change: '+12%',
      icon: Users,
      color: '#e91e63'
    },
    {
      id: 2,
      title: 'الإيرادات الشهرية',
      value: '$12,450',
      change: '+8%',
      icon: DollarSign,
      color: '#4caf50'
    },
    {
      id: 3,
      title: 'التمارين المكتملة',
      value: '2,340',
      change: '+15%',
      icon: Activity,
      color: '#2196f3'
    },
    {
      id: 4,
      title: 'معدل النجاح',
      value: '94%',
      change: '+3%',
      icon: TrendingUp,
      color: '#ff9800'
    }
  ];
  
  return (
    <div className="dashboard">
      <motion.div
        className="dashboard__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>مرحباً بك في لوحة التحكم 💪</h1>
        <p>نظرة عامة على أداء نظام اللياقة البدنية</p>
      </motion.div>
      
      <div className="dashboard__stats">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          >
            <div className="stat-card__icon" style={{ background: stat.color }}>
              <stat.icon size={24} />
            </div>
            
            <div className="stat-card__content">
              <p className="stat-card__title">{stat.title}</p>
              <h2 className="stat-card__value">{stat.value}</h2>
              <span className="stat-card__change positive">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="dashboard__welcome"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="welcome-card">
          <h2>🎉 مرحباً بك في Fitness Control System</h2>
          <p>
            هذا هو نظام إدارة المحتوى الخاص بموقع اللياقة البدنية.
            <br />
            يمكنك من هنا التحكم بكل أقسام الموقع بسهولة واحترافية.
          </p>
          
          <div className="welcome-card__features">
            <div className="feature">
              <span className="feature__icon">📝</span>
              <span className="feature__text">إدارة المحتوى الكامل</span>
            </div>
            <div className="feature">
              <span className="feature__icon">🏋️‍♀️</span>
              <span className="feature__text">إدارة البرامج التدريبية</span>
            </div>
            <div className="feature">
              <span className="feature__icon">🥗</span>
              <span className="feature__text">إدارة خطط التغذية</span>
            </div>
            <div className="feature">
              <span className="feature__icon">💬</span>
              <span className="feature__text">التواصل مع العملاء</span>
            </div>
          </div>
          
          <button className="welcome-card__btn">
            ابدأ الآن
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;