// src/components/Users/PaymentDetailsModal.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  Clock,
  CreditCard,
  Banknote,
  Receipt,
  FileText,
  Image as ImageIcon,
  Printer,
  Share2
} from 'lucide-react';
import './PaymentDetailsModal.scss';

const PaymentDetailsModal = ({ 
  isOpen, 
  onClose, 
  payment, 
  onStatusChange,
  getStatusColor,
  getStatusText
}) => {
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const imageRef = useRef(null);

  if (!isOpen || !payment) return null;

  const statusColor = getStatusColor ? getStatusColor(payment.status) : 
    payment.status === 'confirmed' ? '#4caf50' :
    payment.status === 'pending' ? '#ff9800' : '#f44336';

  const statusText = getStatusText ? getStatusText(payment.status) : 
    payment.status === 'confirmed' ? 'مؤكد' :
    payment.status === 'pending' ? 'قيد الانتظار' : 'مرفوض';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleZoomIn = () => {
    setImageScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setImageScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleRotate = () => {
    setImageRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setImageScale(1);
    setImageRotation(0);
  };

  const handleDownloadImage = () => {
    if (payment.attachment) {
      const link = document.createElement('a');
      link.href = payment.attachment;
      link.download = `إيصال_${payment.transactionId}.jpg`;
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleConfirm = () => {
    onStatusChange(payment.id, 'confirmed');
  };

  const handleReject = () => {
    onStatusChange(payment.id, 'rejected');
  };

  const getStatusIcon = () => {
    switch (payment.status) {
      case 'confirmed':
        return <CheckCircle size={24} />;
      case 'rejected':
        return <XCircle size={24} />;
      case 'pending':
        return <AlertCircle size={24} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="payment-details-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="payment-details-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="payment-details-modal__header">
              <div className="payment-details-modal__title-section">
                <h2 className="payment-details-modal__title">
                  <Receipt size={24} />
                  تفاصيل الدفعة
                </h2>
                <div 
                  className="payment-details-modal__status"
                  style={{ 
                    background: `${statusColor}15`,
                    borderColor: statusColor,
                    color: statusColor
                  }}
                >
                  {getStatusIcon()}
                  <span>{statusText}</span>
                </div>
              </div>
              
              <div className="payment-details-modal__actions">
                <button 
                  className="payment-details-modal__action-btn"
                  onClick={handlePrint}
                  aria-label="طباعة"
                >
                  <Printer size={20} />
                </button>
                
                <button 
                  className="payment-details-modal__action-btn"
                  onClick={handleDownloadImage}
                  disabled={!payment.attachment}
                  aria-label="تحميل الصورة"
                >
                  <Download size={20} />
                </button>
                
                <button 
                  className="payment-details-modal__close-btn"
                  onClick={onClose}
                  aria-label="إغلاق"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="payment-details-modal__content">
              {/* Left Column - Payment Info */}
              <div className="payment-details-modal__left">
                {/* Client Info */}
                <div className="info-section">
                  <h3 className="info-section__title">
                    <User size={20} />
                    معلومات المتدرب
                  </h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">الاسم:</span>
                      <span className="info-value">{payment.client.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">البريد الإلكتروني:</span>
                      <span className="info-value">{payment.client.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">الباقة:</span>
                      <span className="info-value">{payment.subscription.name}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="info-section">
                  <h3 className="info-section__title">
                    <CreditCard size={20} />
                    تفاصيل الدفعة
                  </h3>
                  <div className="info-grid">
                    <div className="info-item info-item--amount">
                      <span className="info-label">المبلغ:</span>
                      <div className="info-value amount-value">
                        <Banknote size={24} />
                        <span className="amount">{payment.amount}</span>
                        <span className="currency">{payment.currency}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-label">التاريخ:</span>
                      <span className="info-value">
                        <Calendar size={16} />
                        {formatDate(payment.date)}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">الوقت:</span>
                      <span className="info-value">
                        <Clock size={16} />
                        {payment.time}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">طريقة الدفع:</span>
                      <span className="info-value">{payment.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Bank & Transaction Info */}
                <div className="info-section">
                  <h3 className="info-section__title">
                    <Receipt size={20} />
                    معلومات البنك والمعاملة
                  </h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">اسم البنك:</span>
                      <span className="info-value">{payment.bankName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">رقم الحساب:</span>
                      <span className="info-value account-number">{payment.accountNumber}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">رقم المرجع:</span>
                      <span className="info-value reference">{payment.referenceNumber}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">رقم الإيصال:</span>
                      <span className="info-value receipt">{payment.receiptNumber}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">رقم العملية:</span>
                      <span className="info-value transaction">{payment.transactionId}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {payment.notes && (
                  <div className="info-section">
                    <h3 className="info-section__title">
                      <FileText size={20} />
                      الملاحظات
                    </h3>
                    <div className="notes-content">
                      {payment.notes}
                    </div>
                  </div>
                )}

                {/* Confirmation Info */}
                {payment.confirmedBy && (
                  <div className="info-section">
                    <h3 className="info-section__title">
                      <CheckCircle size={20} />
                      معلومات التأكيد
                    </h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">تم التأكيد بواسطة:</span>
                        <span className="info-value">{payment.confirmedBy}</span>
                      </div>
                      {payment.confirmationDate && (
                        <div className="info-item">
                          <span className="info-label">تاريخ التأكيد:</span>
                          <span className="info-value">{formatDate(payment.confirmationDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Receipt Image */}
              <div className="payment-details-modal__right">
                {payment.attachment ? (
                  <div className="receipt-section">
                    <div className="receipt-section__header">
                      <h3 className="receipt-section__title">
                        <ImageIcon size={20} />
                        إيصال الدفع
                      </h3>
                      
                      <div className="receipt-section__controls">
                        <button 
                          className="control-btn"
                          onClick={handleZoomOut}
                          aria-label="تصغير"
                        >
                          <ZoomOut size={18} />
                        </button>
                        
                        <span className="zoom-level">{Math.round(imageScale * 100)}%</span>
                        
                        <button 
                          className="control-btn"
                          onClick={handleZoomIn}
                          aria-label="تكبير"
                        >
                          <ZoomIn size={18} />
                        </button>
                        
                        <button 
                          className="control-btn"
                          onClick={handleRotate}
                          aria-label="تدوير"
                        >
                          <RotateCw size={18} />
                        </button>
                        
                        <button 
                          className="control-btn"
                          onClick={handleReset}
                          aria-label="إعادة تعيين"
                        >
                          <RotateCw size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="receipt-image-container">
                      <img
                        ref={imageRef}
                        src={payment.attachment}
                        alt="إيصال الدفع"
                        className="receipt-image"
                        style={{
                          transform: `scale(${imageScale}) rotate(${imageRotation}deg)`,
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>
                    
                    <div className="receipt-section__footer">
                      <p className="receipt-help">
                        يمكنك تكبير وتصغير وتدوير الصورة للحصول على رؤية أفضل
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="no-receipt">
                    <ImageIcon size={64} />
                    <h3>لا يوجد إيصال مرفق</h3>
                    <p>لم يتم رفع إيصال الدفع لهذه العملية</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer - Action Buttons */}
            <div className="payment-details-modal__footer">
              {payment.status === 'pending' && (
                <>
                  <button 
                    className="payment-details-modal__btn payment-details-modal__btn--reject"
                    onClick={handleReject}
                  >
                    <XCircle size={20} />
                    <span>رفض الدفعة</span>
                  </button>
                  
                  <button 
                    className="payment-details-modal__btn payment-details-modal__btn--confirm"
                    onClick={handleConfirm}
                  >
                    <CheckCircle size={20} />
                    <span>تأكيد الدفعة</span>
                  </button>
                </>
              )}
              
              {(payment.status === 'confirmed' || payment.status === 'rejected') && (
                <button 
                  className="payment-details-modal__btn payment-details-modal__btn--pending"
                  onClick={() => onStatusChange(payment.id, 'pending')}
                >
                  <AlertCircle size={20} />
                  <span>إعادة للانتظار</span>
                </button>
              )}
              
              <button 
                className="payment-details-modal__btn payment-details-modal__btn--close"
                onClick={onClose}
              >
                <span>إغلاق</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentDetailsModal;