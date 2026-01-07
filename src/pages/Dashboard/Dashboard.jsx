import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  CheckCircle,
  Activity,
  PieChart as PieChartIcon,
  Target,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';
import TimeFilter from '../../components/Dashboard/TimeFilter/TimeFilter';
import MetricCard from '../../components/Dashboard/MetricCard/MetricCard';
import LineChart from '../../components/Dashboard/Charts/LineChart';
import AreaChart from '../../components/Dashboard/Charts/AreaChart';
import PieChart from '../../components/Dashboard/Charts/PieChart';
import DonutChart from '../../components/Dashboard/Charts/DonutChart';
import BarChart from '../../components/Dashboard/Charts/BarChart';
import StackedBarChart from '../../components/Dashboard/Charts/StackedBarChart';
import FunnelChart from '../../components/Dashboard/Charts/FunnelChart';
import SimpleHeatmapChart from '../../components/Dashboard/Charts/SimpleHeatmapChart';
import AlertsPanel from '../../components/Dashboard/AlertsPanel/AlertsPanel';
import SummaryBox from '../../components/Dashboard/SummaryBox/SummaryBox';
import './Dashboard.scss';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('this_week');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // الكشف عن حجم الشاشة
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 576);
      setIsTablet(width >= 576 && width < 992);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // بيانات تجريبية مبسطة
  const metrics = {
    totalSubscriptions: 156,
    newRegistrations: 24,
    totalRevenue: 34500,
    avgSubscriptionDuration: 3.2,
    completionRate: 78,
    previousPeriodChange: {
      subscriptions: 12,
      revenue: 8,
      registrations: 18
    }
  };

  // بيانات المخططات
  const growthData = [
    { month: 'يناير', subscriptions: 120 },
    { month: 'فبراير', subscriptions: 135 },
    { month: 'مارس', subscriptions: 148 },
    { month: 'أبريل', subscriptions: 142 },
    { month: 'مايو', subscriptions: 156 },
    { month: 'يونيو', subscriptions: 162 },
  ];

  const revenueData = [
    { day: 'السبت', revenue: 1200 },
    { day: 'الأحد', revenue: 1800 },
    { day: 'الإثنين', revenue: 1500 },
    { day: 'الثلاثاء', revenue: 2200 },
    { day: 'الأربعاء', revenue: 1900 },
    { day: 'الخميس', revenue: 2500 },
    { day: 'الجمعة', revenue: 2100 },
  ];

  const paymentStatusData = [
    { name: 'مدفوع', value: 156, color: '#4caf50' },
    { name: 'قيد الانتظار', value: 24, color: '#ff9800' },
    { name: 'منتهي', value: 12, color: '#f44336' },
  ];

  const programTypeData = [
    { name: 'تنشيف', value: 65, color: '#e91e63' },
    { name: 'نحت', value: 45, color: '#9c27b0' },
    { name: 'زيادة عضل', value: 30, color: '#2196f3' },
  ];

  const programCompletionData = [
    { program: 'تنشيف', completion: 82 },
    { program: 'نحت', completion: 75 },
    { program: 'زيادة عضل', completion: 68 },
  ];

  const engagementData = [
    { month: 'يناير', workout: 75, nutrition: 82 },
    { month: 'فبراير', workout: 78, nutrition: 85 },
    { month: 'مارس', workout: 72, nutrition: 80 },
  ];

  const funnelData = [
    { stage: 'التسجيلات', value: 200, fill: '#e91e63' },
    { stage: 'اشتراكات نشطة', value: 156, fill: '#9c27b0' },
    { stage: 'التجديدات', value: 120, fill: '#2196f3' },
  ];

  // ارتفاع المخططات حسب الجهاز
  const getChartHeight = () => {
    if (isMobile) return 200;
    if (isTablet) return 220;
    return 250;
  };

  const chartHeight = getChartHeight();

  // حجم الأيقونات حسب الجهاز
  const getIconSize = () => {
    if (isMobile) return 20;
    if (isTablet) return 24;
    return 32;
  };

  return (
    <div className="dashboard">
      {/* Page Header */}
      <motion.div
        className="dashboard__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="dashboard__header-content">
          <div className="dashboard__title-section">
            <h1 className="dashboard__title">
              <TrendingUp size={getIconSize()} />
              لوحة التحكم
            </h1>
            <p className="dashboard__subtitle">
              نظرة شاملة على أداء التطبيق وإحصائيات المتدربين
            </p>
          </div>
          
          <div className="dashboard__header-actions">
            <TimeFilter value={timeFilter} onChange={setTimeFilter} />
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        className="dashboard__metrics-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <MetricCard
          title="الاشتراكات النشطة"
          value={metrics.totalSubscriptions}
          change={metrics.previousPeriodChange.subscriptions}
          icon={Users}
          color="primary"
          format="number"
        />
        
        <MetricCard
          title="تسجيلات جديدة"
          value={metrics.newRegistrations}
          change={metrics.previousPeriodChange.registrations}
          icon={Activity}
          color="blue"
          format="number"
          showLineChart={!isMobile && !isTablet}
        />
        
        <MetricCard
          title="إجمالي الدخل"
          value={metrics.totalRevenue}
          change={metrics.previousPeriodChange.revenue}
          icon={DollarSign}
          color="green"
          format="currency"
          currency="دينار"
        />
        
        <MetricCard
          title="متوسط مدة الاشتراك"
          value={metrics.avgSubscriptionDuration}
          change={0}
          icon={Calendar}
          color="orange"
          format="duration"
          unit="شهر"
        />
        
        <MetricCard
          title="معدل الإنجاز"
          value={metrics.completionRate}
          change={5}
          icon={CheckCircle}
          color="purple"
          format="percentage"
          progress={metrics.completionRate}
        />
      </motion.div>

      {/* Charts Grid */}
      <div className="dashboard__charts-grid">
        {/* Growth Analytics */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="chart-card__header">
            <div className="chart-card__title">
              <TrendingUp size={isMobile ? 16 : 20} />
              <h3>تحليل النمو</h3>
            </div>
            <span className="chart-card__subtitle">عدد الاشتراكات بمرور الوقت</span>
          </div>
          <div className="chart-card__content">
            <LineChart data={growthData} height={chartHeight} />
          </div>
        </motion.div>

        {/* Revenue Analytics */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="chart-card__header">
            <div className="chart-card__title">
              <DollarSign size={isMobile ? 16 : 20} />
              <h3>تحليل الدخل</h3>
            </div>
            <span className="chart-card__subtitle">الدخل اليومي / الأسبوعي / الشهري</span>
          </div>
          <div className="chart-card__content">
            <AreaChart data={revenueData} height={chartHeight} />
          </div>
        </motion.div>

        {/* Payment Status Distribution */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="chart-card__header">
            <div className="chart-card__title">
              <PieChartIcon size={isMobile ? 16 : 20} />
              <h3>حالات الدفع</h3>
            </div>
            <span className="chart-card__subtitle">توزيع حالات الدفع</span>
          </div>
          <div className="chart-card__content">
            <PieChart data={paymentStatusData} height={chartHeight} />
          </div>
        </motion.div>

        {/* Program Type Distribution */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div className="chart-card__header">
            <div className="chart-card__title">
              <Target size={isMobile ? 16 : 20} />
              <h3>توزيع البرامج</h3>
            </div>
            <span className="chart-card__subtitle">أنواع البرامج الأكثر طلبًا</span>
          </div>
          <div className="chart-card__content">
            <DonutChart data={programTypeData} height={chartHeight} />
          </div>
        </motion.div>

        {/* Program Completion */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="chart-card__header">
            <div className="chart-card__title">
              <CheckCircle size={isMobile ? 16 : 20} />
              <h3>إنجاز البرامج</h3>
            </div>
            <span className="chart-card__subtitle">نسبة الالتزام لكل نوع برنامج</span>
          </div>
          <div className="chart-card__content">
            <BarChart data={programCompletionData} height={chartHeight} />
          </div>
        </motion.div>

        {/* Engagement Analytics */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
        >
          <div className="chart-card__header">
            <div className="chart-card__title">
              <Activity size={isMobile ? 16 : 20} />
              <h3>تحليل التفاعل</h3>
            </div>
            <span className="chart-card__subtitle">الالتزام بالتمارين مقابل الغذاء</span>
          </div>
          <div className="chart-card__content">
            <StackedBarChart data={engagementData} height={chartHeight} />
          </div>
        </motion.div>

        {/* Subscription Lifecycle */}
        <motion.div 
          className="chart-card chart-card--wide"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="chart-card__header">
            <div className="chart-card__title">
              <Clock size={isMobile ? 16 : 20} />
              <h3>دورة حياة الاشتراك</h3>
            </div>
            <span className="chart-card__subtitle">مسار الاحتفاظ بالمتدربات</span>
          </div>
          <div className="chart-card__content">
            <FunnelChart data={funnelData} height={chartHeight} />
          </div>
        </motion.div>

        {/* Time-Based Insights */}
        <motion.div 
          className="chart-card chart-card--wide"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55 }}
        >
          <div className="chart-card__header">
            <div className="chart-card__title">
              <Clock size={isMobile ? 16 : 20} />
              <h3>أفضل أوقات التفاعل</h3>
            </div>
            <span className="chart-card__subtitle">حرارة الالتزام خلال الأسبوع</span>
          </div>
          <div className="chart-card__content">
            <SimpleHeatmapChart height={chartHeight} />
          </div>
        </motion.div>
      </div>

      {/* Bottom Section - Alerts & Summary */}
      <div className="dashboard__bottom-section">
        <motion.div 
          className="alerts-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <AlertsPanel />
        </motion.div>
        
        <motion.div 
          className="summary-container"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65 }}
        >
          <SummaryBox />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;