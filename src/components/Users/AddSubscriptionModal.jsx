// src/components/Users/AddSubscriptionModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  User,
  Calendar,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  Plus,
  Search,
  Users,
  AlertCircle
} from 'lucide-react';
import './AddSubscriptionModal.scss';

const AddSubscriptionModal = ({ isOpen, onClose, onSave, subscription }) => {
  const [formData, setFormData] = useState({
    client: null,
    plan: {
      name: '',
      price: '',
      currency: 'دينار',
      duration: 'شهري',
      features: []
    },
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'active',
    paymentMethod: 'تحويل بنكي',
    autoRenew: true,
    notes: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  // Mock clients data
  const clients = [
    { id: 1, name: 'سارة أحمد', email: 'sara@example.com', phone: '0791234567' },
    { id: 2, name: 'ليلى محمود', email: 'layla@example.com', phone: '0797654321' },
    { id: 3, name: 'نور الدين', email: 'noor@example.com', phone: '0799876543' },
    { id: 4, name: 'مريم سالم', email: 'mariam@example.com', phone: '0795555555' },
    { id: 5, name: 'أحمد خالد', email: 'ahmed@example.com', phone: '0791111111' },
    { id: 6, name: 'فاطمة حسن', email: 'fatima@example.com', phone: '0792222222' },
  ];

  // Mock plans data
  const availablePlans = [
    {
      name: 'باقة اللياقة المتكاملة',
      price: 200,
      currency: 'دينار',
      duration: 'شهري',
      features: ['3 جلسات أسبوعياً', 'نظام غذائي', 'متابعة مستمرة']
    },
    {
      name: 'باقة خسارة الوزن',
      price: 250,
      currency: 'دينار',
      duration: 'شهري',
      features: ['4 جلسات أسبوعياً', 'نظام غذائي مخصص', 'متابعة يومية']
    },
    {
      name: 'باقة التنشيف',
      price: 300,
      currency: 'دينار',
      duration: '3 أشهر',
      features: ['5 جلسات أسبوعياً', 'نظام غذائي دقيق', 'متابعة مستمرة', 'تقارير أسبوعية']
    },
    {
      name: 'باقة المبتدئين',
      price: 150,
      currency: 'دينار',
      duration: 'شهري',
      features: ['2 جلسات أسبوعياً', 'نظام غذائي أساسي']
    },
    {
      name: 'باقة القوة والكتلة',
      price: 350,
      currency: 'دينار',
      duration: 'شهري',
      features: ['6 جلسات أسبوعياً', 'نظام غذائي عالي البروتين', 'متابعة مكثفة']
    },
    {
      name: 'باقة العضلات',
      price: 280,
      currency: 'دينار',
      duration: 'شهري',
      features: ['4 جلسات أسبوعياً', 'نظام غذائي متخصص', 'متابعة أسبوعية']
    }
  ];

  useEffect(() => {
    if (subscription) {
      setFormData({
        client: subscription.client,
        plan: subscription.plan,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        status: subscription.status,
        paymentMethod: subscription.paymentMethod,
        autoRenew: subscription.autoRenew,
        notes: subscription.notes || ''
      });
    } else {
      // Set end date based on start date and duration
      const endDate = new Date(formData.startDate);
      const duration = formData.plan.duration === '3 أشهر' ? 3 : 1;
      endDate.setMonth(endDate.getMonth() + duration);
      setFormData(prev => ({
        ...prev,
        endDate: endDate.toISOString().split('T')[0]
      }));
    }
  }, [subscription]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlanChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      plan: { ...prev.plan, [field]: value }
    }));

    // Update end date when duration changes
    if (field === 'duration') {
      const endDate = new Date(formData.startDate);
      const duration = value === '3 أشهر' ? 3 : 1;
      endDate.setMonth(endDate.getMonth() + duration);
      handleChange('endDate', endDate.toISOString().split('T')[0]);
    }
  };

  const handleStartDateChange = (value) => {
    handleChange('startDate', value);
    
    // Update end date
    const endDate = new Date(value);
    const duration = formData.plan.duration === '3 أشهر' ? 3 : 1;
    endDate.setMonth(endDate.getMonth() + duration);
    handleChange('endDate', endDate.toISOString().split('T')[0]);
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      handlePlanChange('features', [...formData.plan.features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = formData.plan.features.filter((_, i) => i !== index);
    handlePlanChange('features', newFeatures);
  };

  const handleSelectPlan = (plan) => {
    setFormData(prev => ({
      ...prev,
      plan: { ...plan }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client || !formData.plan.name || !formData.plan.price) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    onSave(formData);
    onClose();
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPlans = availablePlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="add-subscription-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="add-subscription-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="add-subscription-modal__header">
              <h2 className="add-subscription-modal__title">
                <Package size={24} />
                {subscription ? 'تعديل الاشتراك' : 'إضافة اشتراك جديد'}
              </h2>
              <button className="add-subscription-modal__close" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <form className="add-subscription-modal__form" onSubmit={handleSubmit}>
              {/* Client Selection */}
              <div className="form-section">
                <h3 className="form-section__title">
                  <User size={20} />
                  اختيار المتدرب
                </h3>
                
                <div className="search-box">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="ابحث عن متدرب..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {formData.client ? (
                  <div className="selected-client">
                    <div className="selected-client__info">
                      <div className="selected-client__avatar">
                        {formData.client.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="selected-client__name">{formData.client.name}</h4>
                        <div className="selected-client__contact">
                          <span>{formData.client.email}</span>
                          <span>•</span>
                          <span>{formData.client.phone}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="selected-client__remove"
                      onClick={() => handleChange('client', null)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="clients-list">
                    {filteredClients.map(client => (
                      <div
                        key={client.id}
                        className="client-item"
                        onClick={() => handleChange('client', client)}
                      >
                        <div className="client-item__avatar">
                          {client.name.charAt(0)}
                        </div>
                        <div className="client-item__info">
                          <h4 className="client-item__name">{client.name}</h4>
                          <div className="client-item__contact">
                            <span>{client.email}</span>
                            <span>•</span>
                            <span>{client.phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Plan Selection */}
              <div className="form-section">
                <h3 className="form-section__title">
                  <Package size={20} />
                  اختيار الباقة
                </h3>

                <div className="plans-grid">
                  {filteredPlans.map((plan, index) => (
                    <div
                      key={index}
                      className={`plan-card ${formData.plan.name === plan.name ? 'plan-card--selected' : ''}`}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      <div className="plan-card__header">
                        <h4 className="plan-card__name">{plan.name}</h4>
                        <div className="plan-card__price">
                          <span className="price">{plan.price}</span>
                          <span className="currency">{plan.currency}</span>
                          <span className="duration">/{plan.duration}</span>
                        </div>
                      </div>
                      <div className="plan-card__features">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="plan-card__feature">
                            <CheckCircle size={14} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="custom-plan">
                  <h4 className="custom-plan__title">أو إنشاء باقة مخصصة</h4>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">اسم الباقة *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.plan.name}
                        onChange={(e) => handlePlanChange('name', e.target.value)}
                        placeholder="أدخل اسم الباقة"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">السعر *</label>
                      <div className="price-input">
                        <input
                          type="number"
                          className="form-input"
                          value={formData.plan.price}
                          onChange={(e) => handlePlanChange('price', e.target.value)}
                          placeholder="0"
                          min="0"
                        />
                        <span className="currency-badge">دينار</span>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">المدة *</label>
                      <select
                        className="form-input"
                        value={formData.plan.duration}
                        onChange={(e) => handlePlanChange('duration', e.target.value)}
                      >
                        <option value="شهري">شهري</option>
                        <option value="3 أشهر">3 أشهر</option>
                        <option value="6 أشهر">6 أشهر</option>
                        <option value="سنوي">سنوي</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    
                    
                    {formData.plan.features.length > 0 && (
                      <div className="features-list">
                        {formData.plan.features.map((feature, index) => (
                          <div key={index} className="feature-tag">
                            <span>{feature}</span>
                            <button
                              type="button"
                              className="feature-tag__remove"
                              onClick={() => handleRemoveFeature(index)}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="form-section">
                <h3 className="form-section__title">
                  <Calendar size={20} />
                  تفاصيل الاشتراك
                </h3>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">تاريخ البدء *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.startDate}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">تاريخ الانتهاء</label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.endDate}
                      onChange={(e) => handleChange('endDate', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">الحالة *</label>
                    <select
                      className="form-input"
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                    >
                      <option value="active">نشط</option>
                      <option value="pending">معلق</option>
                      <option value="expiring">قريب الانتهاء</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">طريقة الدفع *</label>
                    <select
                      className="form-input"
                      value={formData.paymentMethod}
                      onChange={(e) => handleChange('paymentMethod', e.target.value)}
                    >
                      <option value="تحويل بنكي">تحويل بنكي</option>
                      <option value="نقدي">نقدي</option>
                      <option value="بطاقة ائتمان">بطاقة ائتمان</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <input
                      type="checkbox"
                      checked={formData.autoRenew}
                      onChange={(e) => handleChange('autoRenew', e.target.checked)}
                      className="checkbox"
                    />
                    <span>التجديد التلقائي</span>
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">ملاحظات</label>
                  <textarea
                    className="form-textarea"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="أضف أي ملاحظات إضافية..."
                    rows="3"
                  />
                </div>
              </div>

              {/* Summary */}
              {formData.client && formData.plan.name && (
                <div className="summary-section">
                  <h3 className="summary-section__title">ملخص الاشتراك</h3>
                  <div className="summary-content">
                    <div className="summary-item">
                      <span className="summary-label">المتدرب:</span>
                      <span className="summary-value">{formData.client.name}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">الباقة:</span>
                      <span className="summary-value">{formData.plan.name}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">المدة:</span>
                      <span className="summary-value">
                        من {formData.startDate} إلى {formData.endDate}
                      </span>
                    </div>
                    <div className="summary-item summary-item--total">
                      <span className="summary-label">الإجمالي:</span>
                      <span className="summary-value">
                        <DollarSign size={20} />
                        <span className="amount">{formData.plan.price}</span>
                        <span className="currency">{formData.plan.currency}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="add-subscription-modal__actions">
                <button 
                  type="button" 
                  className="add-subscription-modal__cancel"
                  onClick={onClose}
                >
                  إلغاء
                </button>
                <button 
                  type="submit" 
                  className="add-subscription-modal__submit"
                >
                  {subscription ? 'حفظ التعديلات' : 'إضافة الاشتراك'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddSubscriptionModal;