// src/pages/Users/Payments/Payments.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  FileText,
  Download,
  Plus,
  BarChart3,
  Banknote,
  Receipt,
  Eye,
  Edit2,
  Trash2
} from 'lucide-react';
import PaymentCard from '../../../components/Users/PaymentCard';
import PaymentDetailsModal from '../../../components/Users/PaymentDetailsModal';
import './Payments.scss';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const initialPayments = [
    {
      id: 1,
      client: {
        id: 1,
        name: 'سارة أحمد',
        email: 'sara@example.com',
        image: null
      },
      subscription: {
        id: 1,
        name: 'باقة اللياقة المتكاملة'
      },
      amount: 200,
      currency: 'دينار',
      date: '2025-01-01',
      time: '10:30',
      status: 'confirmed',
      paymentMethod: 'تحويل بنكي',
      bankName: 'البنك الأهلي',
      accountNumber: 'SA1234567890123456789012',
      referenceNumber: 'REF-001',
      receiptNumber: 'RC-001',
      notes: 'دفعة شهر يناير',
      attachment: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      confirmedBy: 'المدربة',
      confirmationDate: '2025-01-01',
      transactionId: 'TRX-20250101-001'
    },
    {
      id: 2,
      client: {
        id: 2,
        name: 'ليلى محمود',
        email: 'layla@example.com',
        image: null
      },
      subscription: {
        id: 2,
        name: 'باقة خسارة الوزن'
      },
      amount: 250,
      currency: 'دينار',
      date: '2024-12-15',
      time: '14:45',
      status: 'confirmed',
      paymentMethod: 'تحويل بنكي',
      bankName: 'بنك الرياض',
      accountNumber: 'SA9876543210987654321098',
      referenceNumber: 'REF-002',
      receiptNumber: 'RC-002',
      notes: 'دفعة شهر ديسمبر',
      attachment: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      confirmedBy: 'المدربة',
      confirmationDate: '2024-12-15',
      transactionId: 'TRX-20241215-002'
    },
    {
      id: 3,
      client: {
        id: 3,
        name: 'نور الدين',
        email: 'noor@example.com',
        image: null
      },
      subscription: {
        id: 3,
        name: 'باقة التنشيف'
      },
      amount: 300,
      currency: 'دينار',
      date: '2024-11-01',
      time: '09:15',
      status: 'confirmed',
      paymentMethod: 'تحويل بنكي',
      bankName: 'البنك الأهلي',
      accountNumber: 'SA1234567890123456789012',
      referenceNumber: 'REF-003',
      receiptNumber: 'RC-003',
      notes: 'دفعة شهر نوفمبر',
      attachment: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      confirmedBy: 'المدربة',
      confirmationDate: '2024-11-01',
      transactionId: 'TRX-20241101-003'
    },
    {
      id: 4,
      client: {
        id: 4,
        name: 'مريم سالم',
        email: 'mariam@example.com',
        image: null
      },
      subscription: {
        id: 4,
        name: 'باقة المبتدئين'
      },
      amount: 150,
      currency: 'دينار',
      date: '2025-01-10',
      time: '16:20',
      status: 'pending',
      paymentMethod: 'تحويل بنكي',
      bankName: 'البنك السعودي الفرنسي',
      accountNumber: 'SA5555555555555555555555',
      referenceNumber: 'REF-004',
      receiptNumber: 'RC-004',
      notes: 'بانتظار التأكيد',
      attachment: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      confirmedBy: null,
      confirmationDate: null,
      transactionId: 'TRX-20250110-004'
    },
    {
      id: 5,
      client: {
        id: 5,
        name: 'أحمد خالد',
        email: 'ahmed@example.com',
        image: null
      },
      subscription: {
        id: 5,
        name: 'باقة القوة والكتلة'
      },
      amount: 350,
      currency: 'دينار',
      date: '2025-01-05',
      time: '11:00',
      status: 'rejected',
      paymentMethod: 'تحويل بنكي',
      bankName: 'بنك الجزيرة',
      accountNumber: 'SA6666666666666666666666',
      referenceNumber: 'REF-005',
      receiptNumber: 'RC-005',
      notes: 'التحويل غير مكتمل',
      attachment: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      confirmedBy: 'المدربة',
      confirmationDate: '2025-01-05',
      transactionId: 'TRX-20250105-005'
    },
    {
      id: 6,
      client: {
        id: 6,
        name: 'فاطمة حسن',
        email: 'fatima@example.com',
        image: null
      },
      subscription: {
        id: 6,
        name: 'باقة العضلات'
      },
      amount: 280,
      currency: 'دينار',
      date: '2024-12-20',
      time: '13:30',
      status: 'confirmed',
      paymentMethod: 'تحويل بنكي',
      bankName: 'البنك الأهلي',
      accountNumber: 'SA1234567890123456789012',
      referenceNumber: 'REF-006',
      receiptNumber: 'RC-006',
      notes: 'دفعة شهر ديسمبر',
      attachment: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      confirmedBy: 'المدربة',
      confirmationDate: '2024-12-20',
      transactionId: 'TRX-20241220-006'
    },
    {
      id: 7,
      client: {
        id: 7,
        name: 'خالد محمد',
        email: 'khaled@example.com',
        image: null
      },
      subscription: {
        id: 7,
        name: 'باقة التغذية المتقدمة'
      },
      amount: 400,
      currency: 'دينار',
      date: '2025-01-15',
      time: '15:45',
      status: 'pending',
      paymentMethod: 'تحويل بنكي',
      bankName: 'بنك البلاد',
      accountNumber: 'SA7777777777777777777777',
      referenceNumber: 'REF-007',
      receiptNumber: 'RC-007',
      notes: 'جديد - بانتظار المراجعة',
      attachment: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      confirmedBy: null,
      confirmationDate: null,
      transactionId: 'TRX-20250115-007'
    },
    {
      id: 8,
      client: {
        id: 8,
        name: 'نادية علي',
        email: 'nadia@example.com',
        image: null
      },
      subscription: {
        id: 8,
        name: 'باقة اللياقة العامة'
      },
      amount: 180,
      currency: 'دينار',
      date: '2024-12-25',
      time: '12:00',
      status: 'confirmed',
      paymentMethod: 'تحويل بنكي',
      bankName: 'البنك الأهلي',
      accountNumber: 'SA1234567890123456789012',
      referenceNumber: 'REF-008',
      receiptNumber: 'RC-008',
      notes: 'دفعة شهر ديسمبر',
      attachment: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      confirmedBy: 'المدربة',
      confirmationDate: '2024-12-25',
      transactionId: 'TRX-20241225-008'
    }
  ];

  useEffect(() => {
    setPayments(initialPayments);
    setFilteredPayments(initialPayments);
  }, []);

  // Statistics
  const stats = {
    total: payments.length,
    confirmed: payments.filter(p => p.status === 'confirmed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    rejected: payments.filter(p => p.status === 'rejected').length,
    totalAmount: payments.reduce((sum, payment) => sum + payment.amount, 0),
    monthlyAmount: payments
      .filter(p => {
        const paymentDate = new Date(p.date);
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return paymentDate.getMonth() === currentMonth && 
               paymentDate.getFullYear() === currentYear;
      })
      .reduce((sum, payment) => sum + payment.amount, 0)
  };

  // Get unique months for filter
  const getMonths = () => {
    const months = new Set();
    payments.forEach(payment => {
      const date = new Date(payment.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthYear);
    });
    return Array.from(months).sort().reverse();
  };

  // Filter and Search
  useEffect(() => {
    let filtered = [...payments];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(payment => payment.status === filterStatus);
    }

    // Apply month filter
    if (filterMonth !== 'all') {
      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.date);
        const paymentMonth = `${paymentDate.getFullYear()}-${String(paymentDate.getMonth() + 1).padStart(2, '0')}`;
        return paymentMonth === filterMonth;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'amount-high':
          return b.amount - a.amount;
        case 'amount-low':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    setFilteredPayments(filtered);
  }, [payments, searchTerm, filterStatus, filterMonth, sortBy]);

  const handleStatusChange = (id, newStatus) => {
    setPayments(payments.map(payment =>
      payment.id === id ? {
        ...payment,
        status: newStatus,
        confirmedBy: newStatus === 'confirmed' ? 'المدربة' : payment.confirmedBy,
        confirmationDate: newStatus === 'confirmed' ? new Date().toISOString().split('T')[0] : payment.confirmationDate
      } : payment
    ));
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsDetailsModalOpen(true);
  };

  const handleExportData = () => {
    const csvContent = [
      ['الاسم', 'الباقة', 'المبلغ', 'العملة', 'التاريخ', 'الحالة', 'رقم العملية', 'رقم المرجع', 'الملاحظات'],
      ...payments.map(p => [
        p.client.name,
        p.subscription.name,
        p.amount,
        p.currency,
        p.date,
        p.status === 'confirmed' ? 'مؤكد' : p.status === 'pending' ? 'قيد الانتظار' : 'مرفوض',
        p.transactionId,
        p.referenceNumber,
        p.notes
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'المدفوعات.csv';
    link.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#4caf50';
      case 'pending': return '#ff9800';
      case 'rejected': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'مؤكد';
      case 'pending': return 'قيد الانتظار';
      case 'rejected': return 'مرفوض';
      default: return 'غير محدد';
    }
  };

  const handleAddPayment = () => {
    // سيتم تنفيذها في المودال الخاص بإضافة دفعة
    alert('سيتم تنفيذ إضافة دفعة جديدة في الخطوات القادمة');
  };

  return (
    <div className="payments">
      {/* Page Header */}
      <motion.div
        className="payments__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="payments__header-content">
          <div className="payments__title-section">
            <h1 className="payments__title">
              <CreditCard size={32} />
              إدارة المدفوعات
            </h1>
            <p className="payments__subtitle">
              قم بإدارة جميع تحويلات المتدربين وتأكيد الدفعات
            </p>
          </div>
          
          <div className="payments__header-actions">
            <motion.button
              className="payments__export-btn"
              onClick={handleExportData}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              <span>تصدير البيانات</span>
            </motion.button>
            
            <motion.button
              className="payments__add-btn"
              onClick={handleAddPayment}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>إضافة دفعة</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        className="payments__stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="payment-stat-card">
          <div className="payment-stat-card__icon payment-stat-card__icon--primary">
            <Banknote size={24} />
          </div>
          <div className="payment-stat-card__content">
            <span className="payment-stat-card__label">إجمالي المدفوعات</span>
            <span className="payment-stat-card__value">{stats.total}</span>
          </div>
        </div>
        
        <div className="payment-stat-card">
          <div className="payment-stat-card__icon payment-stat-card__icon--success">
            <CheckCircle size={24} />
          </div>
          <div className="payment-stat-card__content">
            <span className="payment-stat-card__label">مؤكد</span>
            <span className="payment-stat-card__value">{stats.confirmed}</span>
          </div>
        </div>
        
        <div className="payment-stat-card">
          <div className="payment-stat-card__icon payment-stat-card__icon--warning">
            <Clock size={24} />
          </div>
          <div className="payment-stat-card__content">
            <span className="payment-stat-card__label">قيد الانتظار</span>
            <span className="payment-stat-card__value">{stats.pending}</span>
          </div>
        </div>
        
        <div className="payment-stat-card">
          <div className="payment-stat-card__icon payment-stat-card__icon--danger">
            <XCircle size={24} />
          </div>
          <div className="payment-stat-card__content">
            <span className="payment-stat-card__label">مرفوض</span>
            <span className="payment-stat-card__value">{stats.rejected}</span>
          </div>
        </div>
        
        <div className="payment-stat-card">
          <div className="payment-stat-card__icon payment-stat-card__icon--revenue">
            <DollarSign size={24} />
          </div>
          <div className="payment-stat-card__content">
            <span className="payment-stat-card__label">إجمالي المبالغ</span>
            <span className="payment-stat-card__value">{stats.totalAmount} دينار</span>
          </div>
        </div>
        
        <div className="payment-stat-card">
          <div className="payment-stat-card__icon payment-stat-card__icon--chart">
            <TrendingUp size={24} />
          </div>
          <div className="payment-stat-card__content">
            <span className="payment-stat-card__label">هذا الشهر</span>
            <span className="payment-stat-card__value">{stats.monthlyAmount} دينار</span>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="payments__filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="payments__search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="ابحث عن دفعة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="payments__filter-group">
          <div className="filter-box">
            <Filter size={20} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">جميع الحالات</option>
              <option value="confirmed">مؤكد</option>
              <option value="pending">قيد الانتظار</option>
              <option value="rejected">مرفوض</option>
            </select>
          </div>
          
          <div className="filter-box">
            <Calendar size={20} />
            <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
              <option value="all">جميع الأشهر</option>
              {getMonths().map(month => {
                const [year, monthNum] = month.split('-');
                const monthName = new Date(year, monthNum - 1).toLocaleDateString('ar-SA', {
                  month: 'long',
                  year: 'numeric'
                });
                return (
                  <option key={month} value={month}>{monthName}</option>
                );
              })}
            </select>
          </div>
          
          <div className="filter-box">
            <BarChart3 size={20} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">الأحدث</option>
              <option value="oldest">الأقدم</option>
              <option value="amount-high">المبلغ الأعلى</option>
              <option value="amount-low">المبلغ الأدنى</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Payments Grid */}
      <motion.div
        className="payments__grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence>
          {filteredPayments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <PaymentCard
                payment={payment}
                onStatusChange={handleStatusChange}
                onViewDetails={handleViewDetails}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPayments.length === 0 && (
        <motion.div
          className="payments__empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CreditCard size={64} />
          <h3>لا توجد مدفوعات</h3>
          <p>لا توجد مدفوعات مسجلة حتى الآن</p>
        </motion.div>
      )}

      {/* Payment Details Modal */}
      <PaymentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        payment={selectedPayment}
        onStatusChange={handleStatusChange}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
      />
    </div>
  );
};

export default Payments;