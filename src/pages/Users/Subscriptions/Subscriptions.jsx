// src/pages/Users/Subscriptions/Subscriptions.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  TrendingUp,
  DollarSign,
  Plus,
  Download,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import SubscriptionCard from '../../../components/Users/SubscriptionCard';
import AddSubscriptionModal from '../../../components/Users/AddSubscriptionModal';
import './Subscriptions.scss';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const initialSubscriptions = [
    {
      id: 1,
      client: {
        id: 1,
        name: 'سارة أحمد',
        email: 'sara@example.com',
        phone: '0791234567',
        image: null
      },
      plan: {
        name: 'باقة اللياقة المتكاملة',
        price: 200,
        currency: 'دينار',
        duration: 'شهري',
        features: ['3 جلسات أسبوعياً', 'نظام غذائي', 'متابعة مستمرة']
      },
      startDate: '2025-01-01',
      endDate: '2025-04-01',
      status: 'active',
      paymentMethod: 'تحويل بنكي',
      transactionId: 'TRX-001',
      lastPayment: '2025-01-01',
      nextPayment: '2025-02-01',
      totalPaid: 200,
      remainingDays: 30,
      autoRenew: true
    },
    {
      id: 2,
      client: {
        id: 2,
        name: 'ليلى محمود',
        email: 'layla@example.com',
        phone: '0797654321',
        image: null
      },
      plan: {
        name: 'باقة خسارة الوزن',
        price: 250,
        currency: 'دينار',
        duration: 'شهري',
        features: ['4 جلسات أسبوعياً', 'نظام غذائي مخصص', 'متابعة يومية']
      },
      startDate: '2024-12-15',
      endDate: '2025-03-15',
      status: 'active',
      paymentMethod: 'تحويل بنكي',
      transactionId: 'TRX-002',
      lastPayment: '2024-12-15',
      nextPayment: '2025-01-15',
      totalPaid: 250,
      remainingDays: 15,
      autoRenew: true
    },
    {
      id: 3,
      client: {
        id: 3,
        name: 'نور الدين',
        email: 'noor@example.com',
        phone: '0799876543',
        image: null
      },
      plan: {
        name: 'باقة التنشيف',
        price: 300,
        currency: 'دينار',
        duration: '3 أشهر',
        features: ['5 جلسات أسبوعياً', 'نظام غذائي دقيق', 'متابعة مستمرة', 'تقارير أسبوعية']
      },
      startDate: '2024-11-01',
      endDate: '2025-01-01',
      status: 'expired',
      paymentMethod: 'تحويل بنكي',
      transactionId: 'TRX-003',
      lastPayment: '2024-11-01',
      nextPayment: null,
      totalPaid: 900,
      remainingDays: 0,
      autoRenew: false
    },
    {
      id: 4,
      client: {
        id: 4,
        name: 'مريم سالم',
        email: 'mariam@example.com',
        phone: '0795555555',
        image: null
      },
      plan: {
        name: 'باقة المبتدئين',
        price: 150,
        currency: 'دينار',
        duration: 'شهري',
        features: ['2 جلسات أسبوعياً', 'نظام غذائي أساسي']
      },
      startDate: '2025-01-10',
      endDate: '2025-02-10',
      status: 'pending',
      paymentMethod: 'تحويل بنكي',
      transactionId: 'TRX-004',
      lastPayment: null,
      nextPayment: '2025-01-10',
      totalPaid: 0,
      remainingDays: 5,
      autoRenew: false
    },
    {
      id: 5,
      client: {
        id: 5,
        name: 'أحمد خالد',
        email: 'ahmed@example.com',
        phone: '0791111111',
        image: null
      },
      plan: {
        name: 'باقة القوة والكتلة',
        price: 350,
        currency: 'دينار',
        duration: 'شهري',
        features: ['6 جلسات أسبوعياً', 'نظام غذائي عالي البروتين', 'متابعة مكثفة']
      },
      startDate: '2025-01-05',
      endDate: '2025-02-05',
      status: 'active',
      paymentMethod: 'تحويل بنكي',
      transactionId: 'TRX-005',
      lastPayment: '2025-01-05',
      nextPayment: '2025-02-05',
      totalPaid: 350,
      remainingDays: 25,
      autoRenew: true
    },
    {
      id: 6,
      client: {
        id: 6,
        name: 'فاطمة حسن',
        email: 'fatima@example.com',
        phone: '0792222222',
        image: null
      },
      plan: {
        name: 'باقة العضلات',
        price: 280,
        currency: 'دينار',
        duration: 'شهري',
        features: ['4 جلسات أسبوعياً', 'نظام غذائي متخصص', 'متابعة أسبوعية']
      },
      startDate: '2024-12-20',
      endDate: '2025-01-20',
      status: 'expiring',
      paymentMethod: 'تحويل بنكي',
      transactionId: 'TRX-006',
      lastPayment: '2024-12-20',
      nextPayment: '2025-01-20',
      totalPaid: 280,
      remainingDays: 2,
      autoRenew: true
    }
  ];

  useEffect(() => {
    setSubscriptions(initialSubscriptions);
    setFilteredSubscriptions(initialSubscriptions);
  }, []);

  // Statistics
  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    expired: subscriptions.filter(s => s.status === 'expired').length,
    pending: subscriptions.filter(s => s.status === 'pending').length,
    expiring: subscriptions.filter(s => s.status === 'expiring').length,
    totalRevenue: subscriptions.reduce((sum, sub) => sum + sub.totalPaid, 0),
    monthlyRevenue: subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, sub) => sum + sub.plan.price, 0)
  };

  // Filter and Search
  useEffect(() => {
    let filtered = [...subscriptions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(sub =>
        sub.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.plan.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(sub => sub.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.startDate) - new Date(a.startDate);
        case 'oldest':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'price-high':
          return b.plan.price - a.plan.price;
        case 'price-low':
          return a.plan.price - b.plan.price;
        case 'expiring':
          return a.remainingDays - b.remainingDays;
        default:
          return 0;
      }
    });

    setFilteredSubscriptions(filtered);
  }, [subscriptions, searchTerm, filterStatus, sortBy]);

  const handleAddSubscription = (subscriptionData) => {
    const newSubscription = {
      ...subscriptionData,
      id: subscriptions.length + 1,
      totalPaid: subscriptionData.plan.price
    };
    
    setSubscriptions([...subscriptions, newSubscription]);
    setIsModalOpen(false);
  };

  const handleUpdateSubscription = (id, updates) => {
    setSubscriptions(subscriptions.map(sub =>
      sub.id === id ? { ...sub, ...updates } : sub
    ));
  };

  const handleDeleteSubscription = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الاشتراك؟')) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    }
  };

  const handleRenewSubscription = (id) => {
    const subscription = subscriptions.find(sub => sub.id === id);
    if (subscription) {
      const newEndDate = new Date(subscription.endDate);
      newEndDate.setMonth(newEndDate.getMonth() + 1);
      
      handleUpdateSubscription(id, {
        endDate: newEndDate.toISOString().split('T')[0],
        status: 'active',
        remainingDays: 30
      });
    }
  };

  const handleExportData = () => {
    const csvContent = [
      ['الاسم', 'البريد', 'الباقة', 'السعر', 'الحالة', 'تاريخ البدء', 'تاريخ الانتهاء', 'المبلغ المدفوع'],
      ...subscriptions.map(sub => [
        sub.client.name,
        sub.client.email,
        sub.plan.name,
        `${sub.plan.price} ${sub.plan.currency}`,
        sub.status === 'active' ? 'نشط' : sub.status === 'expired' ? 'منتهي' : 'معلق',
        sub.startDate,
        sub.endDate,
        sub.totalPaid
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'الاشتراكات.csv';
    link.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'expired': return '#f44336';
      case 'pending': return '#ff9800';
      case 'expiring': return '#ff5722';
      default: return '#9e9e9e';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'expired': return 'منتهي';
      case 'pending': return 'معلق';
      case 'expiring': return 'قريب الانتهاء';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="subscriptions">
      {/* Page Header */}
      <motion.div
        className="subscriptions__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="subscriptions__header-content">
          <div className="subscriptions__title-section">
            <h1 className="subscriptions__title">
              <CreditCard size={32} />
              إدارة الاشتراكات
            </h1>
            <p className="subscriptions__subtitle">
              قم بإدارة جميع اشتراكات المتدربين والمتابعة المالية
            </p>
          </div>
          
          <div className="subscriptions__header-actions">
            <motion.button
              className="subscriptions__export-btn"
              onClick={handleExportData}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              <span>تصدير البيانات</span>
            </motion.button>
            
            <motion.button
              className="subscriptions__add-btn"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>إضافة اشتراك</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        className="subscriptions__stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="subscription-stat-card">
          <div className="subscription-stat-card__icon subscription-stat-card__icon--primary">
            <Users size={24} />
          </div>
          <div className="subscription-stat-card__content">
            <span className="subscription-stat-card__label">إجمالي الاشتراكات</span>
            <span className="subscription-stat-card__value">{stats.total}</span>
          </div>
        </div>
        
        <div className="subscription-stat-card">
          <div className="subscription-stat-card__icon subscription-stat-card__icon--success">
            <CheckCircle size={24} />
          </div>
          <div className="subscription-stat-card__content">
            <span className="subscription-stat-card__label">نشط</span>
            <span className="subscription-stat-card__value">{stats.active}</span>
          </div>
        </div>
        
        <div className="subscription-stat-card">
          <div className="subscription-stat-card__icon subscription-stat-card__icon--warning">
            <AlertCircle size={24} />
          </div>
          <div className="subscription-stat-card__content">
            <span className="subscription-stat-card__label">قريب الانتهاء</span>
            <span className="subscription-stat-card__value">{stats.expiring}</span>
          </div>
        </div>
        
        <div className="subscription-stat-card">
          <div className="subscription-stat-card__icon subscription-stat-card__icon--danger">
            <XCircle size={24} />
          </div>
          <div className="subscription-stat-card__content">
            <span className="subscription-stat-card__label">منتهي</span>
            <span className="subscription-stat-card__value">{stats.expired}</span>
          </div>
        </div>
        
        <div className="subscription-stat-card">
          <div className="subscription-stat-card__icon subscription-stat-card__icon--info">
            <DollarSign size={24} />
          </div>
          <div className="subscription-stat-card__content">
            <span className="subscription-stat-card__label">الإيراد الشهري</span>
            <span className="subscription-stat-card__value">{stats.monthlyRevenue} دينار</span>
          </div>
        </div>
        
        <div className="subscription-stat-card">
          <div className="subscription-stat-card__icon subscription-stat-card__icon--revenue">
            <TrendingUp size={24} />
          </div>
          <div className="subscription-stat-card__content">
            <span className="subscription-stat-card__label">إجمالي الإيرادات</span>
            <span className="subscription-stat-card__value">{stats.totalRevenue} دينار</span>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="subscriptions__filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="subscriptions__search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="ابحث عن اشتراك..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="subscriptions__filter-group">
          <div className="filter-box">
            <Filter size={20} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="expiring">قريب الانتهاء</option>
              <option value="expired">منتهي</option>
              <option value="pending">معلق</option>
            </select>
          </div>
          
          <div className="filter-box">
            <BarChart3 size={20} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">الأحدث</option>
              <option value="oldest">الأقدم</option>
              <option value="price-high">السعر الأعلى</option>
              <option value="price-low">السعر الأدنى</option>
              <option value="expiring">قريب الانتهاء</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Subscriptions Grid */}
      <motion.div
        className="subscriptions__grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence>
          {filteredSubscriptions.map((subscription, index) => (
            <motion.div
              key={subscription.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <SubscriptionCard
                subscription={subscription}
                onUpdate={handleUpdateSubscription}
                onDelete={handleDeleteSubscription}
                onRenew={handleRenewSubscription}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredSubscriptions.length === 0 && (
        <motion.div
          className="subscriptions__empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CreditCard size={64} />
          <h3>لا توجد اشتراكات</h3>
          <p>ابدأ بإضافة اشتراك جديد باستخدام الزر أعلاه</p>
        </motion.div>
      )}

      {/* Add/Edit Modal */}
      <AddSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddSubscription}
        subscription={selectedSubscription}
      />
    </div>
  );
};

export default Subscriptions;