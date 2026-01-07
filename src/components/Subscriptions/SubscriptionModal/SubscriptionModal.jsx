import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Target, 
  Calendar, 
  DollarSign, 
  CreditCard,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import './SubscriptionModal.scss';

const SubscriptionModal = ({ isOpen, onClose, subscription, onSave }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    programId: '',
    duration: '1',
    durationUnit: 'months',
    price: '',
    paymentStatus: 'pending',
    subscriptionStatus: 'active',
    startDate: new Date().toISOString().split('T')[0],
    receiptUrl: '',
    autoRenew: false,
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [receiptPreview, setReceiptPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // بيانات تجريبية للعملاء والبرامج
  const clients = [
    { id: 1, name: 'سارة أحمد', email: 'sara@example.com' },
    { id: 2, name: 'ليلى محمود', email: 'layla@example.com' },
    { id: 3, name: 'نور الدين', email: 'noor@example.com' },
    { id: 4, name: 'مريم سالم', email: 'mariam@example.com' },
    { id: 5, name: 'أحمد خالد', email: 'ahmed@example.com' }
  ];

  const programs = [
    { id: 1, name: 'خسارة وزن', basePrice: 300 },
    { id: 2, name: 'زيادة كتلة عضلية', basePrice: 350 },
    { id: 3, name: 'نحت الجسم', basePrice: 400 },
    { id: 4, name: 'لياقة عامة', basePrice: 250 },
    { id: 5, name: 'تغذية متخصصة', basePrice: 200 }
  ];

  useEffect(() => {
    if (subscription) {
      setFormData({
        clientId: subscription.client.id,
        programId: subscription.program.id,
        duration: subscription.program.duration.replace(/\D/g, ''),
        durationUnit: subscription.program.duration.includes('شهر') ? 'months' : 'weeks',
        price: subscription.program.price.toString(),
        paymentStatus: subscription.paymentStatus,
        subscriptionStatus: subscription.subscriptionStatus,
        startDate: subscription.startDate,
        receiptUrl: subscription.receiptUrl || '',
        autoRenew: subscription.autoRenew,
        notes: subscription.notes || ''
      });
      setReceiptPreview(subscription.receiptUrl || '');
    } else {
      resetForm();
    }
  }, [subscription]);

  const resetForm = () => {
    setFormData({
      clientId: '',
      programId: '',
      duration: '1',
      durationUnit: 'months',
      price: '',
      paymentStatus: 'pending',
      subscriptionStatus: 'active',
      startDate: new Date().toISOString().split('T')[0],
      receiptUrl: '',
      autoRenew: false,
      notes: ''
    });
    setReceiptPreview('');
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // حذف خطأ الحقل عند التعديل
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // حساب السعر عند تغيير البرنامج أو المدة
    if (name === 'programId' || name === 'duration') {
      calculatePrice();
    }
  };

  const calculatePrice = () => {
    if (formData.programId && formData.duration) {
      const program = programs.find(p => p.id === parseInt(formData.programId));
      if (program) {
        const duration = parseInt(formData.duration);
        const unit = formData.durationUnit;
        let price = program.basePrice * duration;
        
        if (unit === 'weeks') {
          price = (program.basePrice / 4) * duration;
        }
        
        setFormData(prev => ({ ...prev, price: Math.round(price).toString() }));
      }
    }
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // في التطبيق الحقيقي، هنا سيتم رفع الملف للخادم
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result);
        setFormData(prev => ({ ...prev, receiptUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientId) newErrors.clientId = 'يرجى اختيار المتدربة';
    if (!formData.programId) newErrors.programId = 'يرجى اختيار البرنامج';
    if (!formData.duration || formData.duration < 1) newErrors.duration = 'المدة غير صالحة';
    if (!formData.price || formData.price < 1) newErrors.price = 'السعر غير صالح';
    if (!formData.startDate) newErrors.startDate = 'تاريخ البداية مطلوب';
    
    if (formData.paymentStatus === 'paid' && !formData.receiptUrl) {
      newErrors.receiptUrl = 'يرجى رفع إيصال الدفع';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // محاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const selectedClient = clients.find(c => c.id === parseInt(formData.clientId));
      const selectedProgram = programs.find(p => p.id === parseInt(formData.programId));

      const subscriptionData = {
        client: {
          id: selectedClient.id,
          name: selectedClient.name,
          email: selectedClient.email
        },
        program: {
          id: selectedProgram.id,
          name: selectedProgram.name,
          type: selectedProgram.name.toLowerCase().includes('خسارة') ? 'weight_loss' : 
                selectedProgram.name.toLowerCase().includes('عضلية') ? 'muscle_gain' : 'body_toning',
          duration: `${formData.duration} ${formData.durationUnit === 'months' ? 'أشهر' : 'أسابيع'}`,
          price: parseInt(formData.price),
          currency: 'دينار'
        },
        startDate: formData.startDate,
        endDate: calculateEndDate(),
        remainingDays: calculateRemainingDays(),
        paymentStatus: formData.paymentStatus,
        subscriptionStatus: formData.paymentStatus === 'paid' ? 'active' : 'pending',
        paymentMethod: 'تحويل بنكي',
        receiptUrl: formData.receiptUrl,
        autoRenew: formData.autoRenew,
        notes: formData.notes
      };

      onSave(subscriptionData);
      resetForm();
    } catch (error) {
      console.error('Error saving subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateEndDate = () => {
    const startDate = new Date(formData.startDate);
    const duration = parseInt(formData.duration);
    const unit = formData.durationUnit;

    if (unit === 'months') {
      startDate.setMonth(startDate.getMonth() + duration);
    } else {
      startDate.setDate(startDate.getDate() + (duration * 7));
    }

    return startDate.toISOString().split('T')[0];
  };

  const calculateRemainingDays = () => {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(calculateEndDate());
    const today = new Date();
    
    if (today > endDate) return 0;
    
    const diffTime = endDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'نشط';
      case 'pending': return 'معلق';
      case 'expired': return 'منتهي';
      default: return status;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="subscription-modal-overlay">
          <motion.div 
            className="subscription-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="modal-header">
              <h2>
                {subscription ? 'تعديل الاشتراك' : 'إضافة اشتراك جديد'}
              </h2>
              <button className="close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="subscription-form">
              <div className="form-grid">
                {/* اختيار المتدربة */}
                <div className="form-group">
                  <label>
                    <User size={18} />
                    <span>المتدربة *</span>
                  </label>
                  <select
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    className={errors.clientId ? 'error' : ''}
                  >
                    <option value="">اختر المتدربة...</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} ({client.email})
                      </option>
                    ))}
                  </select>
                  {errors.clientId && <span className="error-message">{errors.clientId}</span>}
                </div>

                {/* اختيار البرنامج */}
                <div className="form-group">
                  <label>
                    <Target size={18} />
                    <span>نوع البرنامج *</span>
                  </label>
                  <select
                    name="programId"
                    value={formData.programId}
                    onChange={handleChange}
                    className={errors.programId ? 'error' : ''}
                  >
                    <option value="">اختر البرنامج...</option>
                    {programs.map(program => (
                      <option key={program.id} value={program.id}>
                        {program.name} ({program.basePrice} دينار/شهر)
                      </option>
                    ))}
                  </select>
                  {errors.programId && <span className="error-message">{errors.programId}</span>}
                </div>

                {/* المدة */}
                <div className="form-group">
                  <label>
                    <Calendar size={18} />
                    <span>المدة *</span>
                  </label>
                  <div className="duration-input">
                    <input
                      type="number"
                      name="duration"
                      min="1"
                      max="12"
                      value={formData.duration}
                      onChange={handleChange}
                      className={errors.duration ? 'error' : ''}
                    />
                    <select
                      name="durationUnit"
                      value={formData.durationUnit}
                      onChange={handleChange}
                    >
                      <option value="weeks">أسابيع</option>
                      <option value="months">أشهر</option>
                    </select>
                  </div>
                  {errors.duration && <span className="error-message">{errors.duration}</span>}
                </div>

                {/* السعر */}
                <div className="form-group">
                  <label>
                    <DollarSign size={18} />
                    <span>السعر *</span>
                  </label>
                  <div className="price-input">
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={errors.price ? 'error' : ''}
                      readOnly
                    />
                    <span className="currency">دينار</span>
                  </div>
                  {errors.price && <span className="error-message">{errors.price}</span>}
                </div>

                {/* تاريخ البداية */}
                <div className="form-group">
                  <label>
                    <Calendar size={18} />
                    <span>تاريخ البداية *</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={errors.startDate ? 'error' : ''}
                  />
                  {errors.startDate && <span className="error-message">{errors.startDate}</span>}
                </div>

                {/* حالة الدفع */}
                <div className="form-group">
                  <label>
                    <CreditCard size={18} />
                    <span>حالة الدفع</span>
                  </label>
                  <div className="status-options">
                    <button
                      type="button"
                      className={`status-option ${formData.paymentStatus === 'paid' ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentStatus: 'paid' }))}
                    >
                      <CheckCircle size={16} />
                      <span>تم الدفع ✅</span>
                    </button>
                    <button
                      type="button"
                      className={`status-option ${formData.paymentStatus === 'pending' ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentStatus: 'pending' }))}
                    >
                      <Clock size={16} />
                      <span>بانتظار الدفع ⏳</span>
                    </button>
                  </div>
                </div>

                {/* رفع الإيصال */}
                {formData.paymentStatus === 'paid' && (
                  <div className="form-group full-width">
                    <label>
                      <Upload size={18} />
                      <span>إيصال التحويل البنكي *</span>
                    </label>
                    <div className="receipt-upload">
                      <input
                        type="file"
                        id="receipt"
                        accept="image/*,.pdf"
                        onChange={handleReceiptUpload}
                        className="file-input"
                      />
                      <label htmlFor="receipt" className="upload-btn">
                        <Upload size={20} />
                        <span>رفع الإيصال</span>
                      </label>
                      {receiptPreview && (
                        <div className="receipt-preview">
                          <img src={receiptPreview} alt="Receipt Preview" />
                          <button 
                            type="button"
                            className="remove-preview"
                            onClick={() => {
                              setReceiptPreview('');
                              setFormData(prev => ({ ...prev, receiptUrl: '' }));
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    {errors.receiptUrl && <span className="error-message">{errors.receiptUrl}</span>}
                    <p className="help-text">
                      ملاحظة: الاشتراك لن يبدأ حتى يتم تأكيد الدفع ورفع الإيصال.
                    </p>
                  </div>
                )}

                {/* التجديد التلقائي */}
                <div className="form-group full-width">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="autoRenew"
                      checked={formData.autoRenew}
                      onChange={handleChange}
                    />
                    <span>التجديد التلقائي للاشتراك</span>
                  </label>
                </div>

                {/* الملاحظات */}
                <div className="form-group full-width">
                  <label>ملاحظات</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="أي ملاحظات إضافية..."
                  />
                </div>
              </div>

              {/* معلومات الحساب */}
              {formData.clientId && formData.programId && (
                <div className="summary-section">
                  <h4>ملخص الاشتراك</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span>اسم المتدربة:</span>
                      <strong>{clients.find(c => c.id === parseInt(formData.clientId))?.name}</strong>
                    </div>
                    <div className="summary-item">
                      <span>البرنامج:</span>
                      <strong>{programs.find(p => p.id === parseInt(formData.programId))?.name}</strong>
                    </div>
                    <div className="summary-item">
                      <span>المدة:</span>
                      <strong>{formData.duration} {formData.durationUnit === 'months' ? 'أشهر' : 'أسابيع'}</strong>
                    </div>
                    <div className="summary-item">
                      <span>السعر:</span>
                      <strong className="price">{formData.price} دينار</strong>
                    </div>
                    <div className="summary-item">
                      <span>تاريخ الانتهاء:</span>
                      <strong>{calculateEndDate()}</strong>
                    </div>
                    <div className="summary-item">
                      <span>الأيام المتبقية:</span>
                      <strong>{calculateRemainingDays()} يوم</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* أزرار الإجراء */}
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  إلغاء
                </button>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="spinner-small"></div>
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      {subscription ? 'تحديث الاشتراك' : '✅ حفظ وتفعيل الاشتراك'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionModal;