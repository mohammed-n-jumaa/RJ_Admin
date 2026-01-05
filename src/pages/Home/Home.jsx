import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Dumbbell, 
  Apple, 
  MessageSquare, 
  Settings, 
  TrendingUp,
  Plus,
  Edit,
  Eye,
  Calendar,
  Bell,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const navigate = useNavigate();
  
  // Quick Actions
  const quickActions = [
    {
      id: 1,
      title: 'إضافة عميل جديد',
      description: 'أضف عميل جديد للنظام',
      icon: Users,
      color: '#e91e63',
      path: '/users/clients',
      action: 'add'
    },
    {
      id: 2,
      title: 'إنشاء برنامج تدريبي',
      description: 'صمم برنامج تدريبي جديد',
      icon: Dumbbell,
      color: '#ff5722',
      path: '/training/programs',
      action: 'create'
    },
    {
      id: 3,
      title: 'إضافة خطة غذائية',
      description: 'أنشئ خطة تغذية مخصصة',
      icon: Apple,
      color: '#4caf50',
      path: '/nutrition/meal-plans',
      action: 'create'
    },
    {
      id: 4,
      title: 'الرسائل الجديدة',
      description: 'تحقق من رسائل العملاء',
      icon: MessageSquare,
      color: '#2196f3',
      path: '/communication/chat',
      badge: 5
    },
    {
      id: 5,
      title: 'تحديث المحتوى',
      description: 'عدّل محتوى الموقع',
      icon: Edit,
      color: '#9c27b0',
      path: '/content/hero'
    },
    {
      id: 6,
      title: 'معاينة الموقع',
      description: 'شاهد الموقع بشكل مباشر',
      icon: Eye,
      color: '#ff9800',
      action: 'preview'
    }
  ];
  
  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      title: 'تم إضافة عميل جديد',
      description: 'سارة أحمد - اشتراك شهري',
      time: 'منذ 5 دقائق',
      icon: Users,
      color: '#e91e63'
    },
    {
      id: 2,
      title: 'رسالة جديدة',
      description: 'محمد علي يسأل عن البرنامج',
      time: 'منذ 15 دقيقة',
      icon: MessageSquare,
      color: '#2196f3'
    },
    {
      id: 3,
      title: 'تحديث خطة تغذية',
      description: 'تم تعديل خطة ليلى محمود',
      time: 'منذ ساعة',
      icon: Apple,
      color: '#4caf50'
    },
    {
      id: 4,
      title: 'برنامج تدريبي جديد',
      description: 'برنامج مبتدئين - المستوى 1',
      time: 'منذ ساعتين',
      icon: Dumbbell,
      color: '#ff5722'
    }
  ];
  
  // System Status
  const systemStatus = [
    { label: 'العملاء النشطون', value: '142', icon: CheckCircle2, status: 'active' },
    { label: 'المدفوعات المعلقة', value: '8', icon: Clock, status: 'pending' },
    { label: 'البرامج المفعلة', value: '23', icon: Zap, status: 'active' },
    { label: 'الإشعارات', value: '12', icon: Bell, status: 'warning' }
  ];
  
  const handleQuickAction = (action) => {
    if (action.action === 'preview') {
      window.open('/', '_blank');
    } else {
      navigate(action.path);
    }
  };
  
  return (
    <div className="home">
      {/* Hero Section */}
      <motion.div
        className="home__hero"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="home__hero-content">
          <div className="home__hero-text">
            <motion.div
              className="home__greeting"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="home__greeting-emoji">👋</span>
              <span className="home__greeting-text">أهلاً بك مجدداً</span>
            </motion.div>
            
            <motion.h1
              className="home__title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              مركز التحكم الرياضي
            </motion.h1>
            
            <motion.p
              className="home__subtitle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              جاهز لإدارة نظام اللياقة البدنية بكل احترافية
            </motion.p>
          </div>
          
          <motion.div
            className="home__hero-illustration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="home__hero-circle">
              <span className="home__hero-emoji">💪</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Quick Actions */}
      <section className="home__section">
        <div className="home__section-header">
          <h2 className="home__section-title">🚀 إجراءات سريعة</h2>
          <p className="home__section-subtitle">ابدأ مهامك الأكثر أهمية</p>
        </div>
        
        <div className="home__quick-actions">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              className="quick-action-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleQuickAction(action)}
            >
              <div 
                className="quick-action-card__icon"
                style={{ background: action.color }}
              >
                <action.icon size={24} />
                {action.badge && (
                  <span className="quick-action-card__badge">{action.badge}</span>
                )}
              </div>
              
              <div className="quick-action-card__content">
                <h3 className="quick-action-card__title">{action.title}</h3>
                <p className="quick-action-card__description">{action.description}</p>
              </div>
              
              <div className="quick-action-card__arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Content Grid */}
      <div className="home__grid">
        {/* Recent Activity */}
        <motion.section
          className="home__activity"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="home__section-header">
            <h2 className="home__section-title">📋 النشاط الأخير</h2>
            <button className="home__view-all">عرض الكل</button>
          </div>
          
          <div className="activity-timeline">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="activity-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div 
                  className="activity-item__icon"
                  style={{ background: activity.color }}
                >
                  <activity.icon size={16} />
                </div>
                
                <div className="activity-item__content">
                  <h4 className="activity-item__title">{activity.title}</h4>
                  <p className="activity-item__description">{activity.description}</p>
                  <span className="activity-item__time">{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* System Status */}
        <motion.section
          className="home__status"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="home__section-header">
            <h2 className="home__section-title">⚡ حالة النظام</h2>
          </div>
          
          <div className="status-grid">
            {systemStatus.map((status, index) => (
              <motion.div
                key={index}
                className={`status-card status-card--${status.status}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="status-card__icon">
                  <status.icon size={20} />
                </div>
                <div className="status-card__info">
                  <p className="status-card__label">{status.label}</p>
                  <h3 className="status-card__value">{status.value}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="quick-stat">
              <span className="quick-stat__icon">📅</span>
              <div className="quick-stat__info">
                <p className="quick-stat__label">جلسات اليوم</p>
                <h4 className="quick-stat__value">12</h4>
              </div>
            </div>
            
            <div className="quick-stat">
              <span className="quick-stat__icon">💰</span>
              <div className="quick-stat__info">
                <p className="quick-stat__label">إيرادات الشهر</p>
                <h4 className="quick-stat__value">$8,250</h4>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* Call to Action */}
      <motion.section
        className="home__cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="cta-card">
          <div className="cta-card__content">
            <h2 className="cta-card__title">🎯 جاهز للبدء؟</h2>
            <p className="cta-card__description">
              ابدأ بإدارة عملائك وبرامجك التدريبية بكل سهولة من هنا
            </p>
          </div>
          <div className="cta-card__actions">
            <button 
              className="cta-card__btn cta-card__btn--primary"
              onClick={() => navigate('/users/clients')}
            >
              <Users size={20} />
              <span>إدارة العملاء</span>
            </button>
            <button 
              className="cta-card__btn cta-card__btn--secondary"
              onClick={() => navigate('/training/programs')}
            >
              <Dumbbell size={20} />
              <span>البرامج التدريبية</span>
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;