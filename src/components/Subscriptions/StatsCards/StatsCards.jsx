import React from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Calendar, Clock, TrendingUp } from 'lucide-react';
import './StatsCards.scss';

const StatsCards = ({ subscriptions }) => {
  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.subscriptionStatus === 'active').length,
    expiring: subscriptions.filter(s => s.subscriptionStatus === 'expiring').length,
    expired: subscriptions.filter(s => s.subscriptionStatus === 'expired').length,
    totalRevenue: subscriptions.reduce((sum, sub) => sum + sub.program.price, 0),
    monthlyRevenue: subscriptions
      .filter(s => s.subscriptionStatus === 'active')
      .reduce((sum, sub) => sum + sub.program.price, 0)
  };

  const cards = [
    {
      title: 'إجمالي الاشتراكات',
      value: stats.total,
      icon: Users,
      color: 'primary',
      change: '+12%'
    },
    {
      title: 'اشتراكات نشطة',
      value: stats.active,
      icon: TrendingUp,
      color: 'green',
      change: '+8%'
    },
    {
      title: 'قريبة الانتهاء',
      value: stats.expiring,
      icon: Clock,
      color: 'orange',
      change: '+5%'
    },
    {
      title: 'اشتراكات منتهية',
      value: stats.expired,
      icon: Calendar,
      color: 'red',
      change: '-3%'
    },
    {
      title: 'إجمالي الإيرادات',
      value: `${stats.totalRevenue} دينار`,
      icon: DollarSign,
      color: 'blue',
      change: '+15%'
    }
  ];

  return (
    <motion.div 
      className="stats-cards"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={`stat-card stat-card--${card.color}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="stat-card__icon">
            <card.icon size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__label">{card.title}</span>
            <div className="stat-card__value">{card.value}</div>
            <div className="stat-card__change">
              <span className={`change-text ${card.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {card.change}
              </span>
              <span className="change-label">عن الشهر الماضي</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsCards;