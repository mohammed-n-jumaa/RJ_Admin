import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Clock, 
  TrendingUp,
  Filter,
  Plus,
  Download,
  Search,
  RefreshCw
} from 'lucide-react';
import StatsCards from '../../components/Subscriptions/StatsCards/StatsCards';
import FiltersSection from '../../components/Subscriptions/FiltersSection/FiltersSection';
import SubscriptionTable from '../../components/Subscriptions/SubscriptionTable/SubscriptionTable';
import SubscriptionModal from '../../components/Subscriptions/SubscriptionModal/SubscriptionModal';
import SuccessToast from '../../components/Shared/SuccessToast/SuccessToast';
import './Subscriptions.scss';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    programType: 'all',
    searchTerm: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // بيانات تجريبية
  const mockSubscriptions = [
    {
      id: 1,
      client: {
        id: 1,
        name: 'سارة أحمد',
        email: 'sara@example.com',
        phone: '0791234567',
        image: null
      },
      program: {
        id: 1,
        name: 'خسارة وزن',
        type: 'weight_loss',
        duration: '3 أشهر',
        price: 900,
        currency: 'دينار'
      },
      startDate: '2025-01-01',
      endDate: '2025-04-01',
      remainingDays: 30,
      paymentStatus: 'paid',
      subscriptionStatus: 'active',
      paymentMethod: 'تحويل بنكي',
      receiptUrl: 'https://example.com/receipt1.jpg',
      autoRenew: true,
      notes: 'دفعة شهر يناير',
      createdAt: '2024-12-20'
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
      program: {
        id: 2,
        name: 'زيادة كتلة عضلية',
        type: 'muscle_gain',
        duration: '2 أشهر',
        price: 700,
        currency: 'دينار'
      },
      startDate: '2024-12-15',
      endDate: '2025-02-15',
      remainingDays: 15,
      paymentStatus: 'pending',
      subscriptionStatus: 'expiring',
      paymentMethod: 'تحويل بنكي',
      receiptUrl: null,
      autoRenew: false,
      notes: 'بانتظار التحويل',
      createdAt: '2024-12-10'
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
      program: {
        id: 3,
        name: 'نحت الجسم',
        type: 'body_toning',
        duration: '1 شهر',
        price: 400,
        currency: 'دينار'
      },
      startDate: '2024-11-01',
      endDate: '2024-12-01',
      remainingDays: 0,
      paymentStatus: 'paid',
      subscriptionStatus: 'expired',
      paymentMethod: 'نقدي',
      receiptUrl: 'https://example.com/receipt3.jpg',
      autoRenew: false,
      notes: 'تم الانتهاء',
      createdAt: '2024-10-25'
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
      program: {
        id: 4,
        name: 'خسارة وزن',
        type: 'weight_loss',
        duration: '6 أشهر',
        price: 1800,
        currency: 'دينار'
      },
      startDate: '2025-01-10',
      endDate: '2025-07-10',
      remainingDays: 150,
      paymentStatus: 'paid',
      subscriptionStatus: 'active',
      paymentMethod: 'تحويل بنكي',
      receiptUrl: 'https://example.com/receipt4.jpg',
      autoRenew: true,
      notes: 'اشتراك نصف سنوي',
      createdAt: '2025-01-05'
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
      program: {
        id: 5,
        name: 'زيادة كتلة عضلية',
        type: 'muscle_gain',
        duration: '4 أشهر',
        price: 1400,
        currency: 'دينار'
      },
      startDate: '2024-12-01',
      endDate: '2025-04-01',
      remainingDays: 90,
      paymentStatus: 'paid',
      subscriptionStatus: 'active',
      paymentMethod: 'تحويل بنكي',
      receiptUrl: 'https://example.com/receipt5.jpg',
      autoRenew: true,
      notes: 'اشتراك ربع سنوي',
      createdAt: '2024-11-25'
    }
  ];

  useEffect(() => {
    loadSubscriptions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, subscriptions]);

  const loadSubscriptions = () => {
    setIsLoading(true);
    // محاكاة جلب البيانات من API
    setTimeout(() => {
      setSubscriptions(mockSubscriptions);
      setFilteredSubscriptions(mockSubscriptions);
      setIsLoading(false);
    }, 500);
  };

  const applyFilters = () => {
    let filtered = [...subscriptions];

    // فلتر الحالة
    if (filters.status !== 'all') {
      filtered = filtered.filter(sub => sub.subscriptionStatus === filters.status);
    }

    // فلتر نوع البرنامج
    if (filters.programType !== 'all') {
      filtered = filtered.filter(sub => sub.program.type === filters.programType);
    }

    // فلتر البحث
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.client.name.toLowerCase().includes(term) ||
        sub.client.email.toLowerCase().includes(term) ||
        sub.program.name.toLowerCase().includes(term)
      );
    }

    setFilteredSubscriptions(filtered);
  };

  const handleAddSubscription = () => {
    setSelectedSubscription(null);
    setIsModalOpen(true);
  };

  const handleEditSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
  };

  const handleSaveSubscription = (subscriptionData) => {
    if (selectedSubscription) {
      // تحديث اشتراك موجود
      const updatedSubscriptions = subscriptions.map(sub =>
        sub.id === selectedSubscription.id ? { ...subscriptionData, id: sub.id } : sub
      );
      setSubscriptions(updatedSubscriptions);
      showToast('تم تحديث الاشتراك بنجاح');
    } else {
      // إضافة اشتراك جديد
      const newSubscription = {
        ...subscriptionData,
        id: subscriptions.length + 1,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setSubscriptions([...subscriptions, newSubscription]);
      showToast('تم إضافة الاشتراك بنجاح');
    }
    setIsModalOpen(false);
  };

  const handleDeleteSubscription = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الاشتراك؟')) {
      const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id);
      setSubscriptions(updatedSubscriptions);
      showToast('تم حذف الاشتراك بنجاح');
    }
  };

  const handleRenewSubscription = (id) => {
    const subscription = subscriptions.find(sub => sub.id === id);
    if (subscription) {
      const newEndDate = new Date(subscription.endDate);
      newEndDate.setMonth(newEndDate.getMonth() + 1);
      
      const updatedSubscription = {
        ...subscription,
        endDate: newEndDate.toISOString().split('T')[0],
        subscriptionStatus: 'active',
        remainingDays: 30
      };
      
      const updatedSubscriptions = subscriptions.map(sub =>
        sub.id === id ? updatedSubscription : sub
      );
      
      setSubscriptions(updatedSubscriptions);
      showToast('تم تجديد الاشتراك بنجاح');
    }
  };

  const handleToggleStatus = (id, newStatus) => {
    const updatedSubscriptions = subscriptions.map(sub =>
      sub.id === id ? { ...sub, subscriptionStatus: newStatus } : sub
    );
    
    setSubscriptions(updatedSubscriptions);
    showToast(`تم تغيير حالة الاشتراك إلى ${getStatusText(newStatus)}`);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleExport = () => {
    const csvContent = [
      ['الاسم', 'البريد', 'البرنامج', 'المدة', 'تاريخ البداية', 'تاريخ الانتهاء', 'الحالة', 'السعر'],
      ...subscriptions.map(sub => [
        sub.client.name,
        sub.client.email,
        sub.program.name,
        sub.program.duration,
        sub.startDate,
        sub.endDate,
        getStatusText(sub.subscriptionStatus),
        `${sub.program.price} ${sub.program.currency}`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'الاشتراكات.csv';
    link.click();
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'نشط';
      case 'expiring': return 'قرب الانتهاء';
      case 'expired': return 'منتهي';
      default: return status;
    }
  };

  return (
    <div className="subscriptions">
      {/* Header */}
      <motion.div
        className="subscriptions__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="subscriptions__header-content">
          <div className="subscriptions__title-section">
            <h1 className="subscriptions__title">
              <Users size={32} />
              إدارة الاشتراكات
            </h1>
            <p className="subscriptions__subtitle">
              هذه الصفحة تتيح لك إدارة جميع الاشتراكات، تفعيل البرامج، متابعة الدفع، وتجديد الاشتراكات بسهولة.
            </p>
          </div>
          
          <div className="subscriptions__header-actions">
            <motion.button
              className="subscriptions__export-btn"
              onClick={handleExport}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              <span>تصدير البيانات</span>
            </motion.button>
            
            <motion.button
              className="subscriptions__add-btn"
              onClick={handleAddSubscription}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>إضافة اشتراك</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <StatsCards subscriptions={subscriptions} />

      {/* Filters Section */}
      <FiltersSection filters={filters} setFilters={setFilters} />

      {/* Table Section */}
      <div className="subscriptions__table-section">
        <div className="section-header">
          <h3>قائمة الاشتراكات</h3>
          <div className="table-actions">
            <button className="refresh-btn" onClick={loadSubscriptions}>
              <RefreshCw size={18} />
              تحديث
            </button>
            <div className="results-count">
              {filteredSubscriptions.length} من {subscriptions.length} اشتراك
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>جاري تحميل البيانات...</p>
          </div>
        ) : (
          <SubscriptionTable
            subscriptions={filteredSubscriptions}
            onEdit={handleEditSubscription}
            onDelete={handleDeleteSubscription}
            onRenew={handleRenewSubscription}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>

      {/* Success Toast */}
      <SuccessToast 
        message={toastMessage}
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subscription={selectedSubscription}
        onSave={handleSaveSubscription}
      />
    </div>
  );
};

export default Subscriptions;