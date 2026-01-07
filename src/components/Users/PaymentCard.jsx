// src/components/Users/PaymentCard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Receipt,
  Banknote,
  Image as ImageIcon,
  FileText,
  Check,
  X,
  Download
} from 'lucide-react';
import './PaymentCard.scss';

const PaymentCard = ({ 
  payment, 
  onStatusChange, 
  onViewDetails,
  getStatusColor,
  getStatusText
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const statusColor = getStatusColor ? getStatusColor(payment.status) : 
    payment.status === 'confirmed' ? '#4caf50' :
    payment.status === 'pending' ? '#ff9800' : '#f44336';

  const statusText = getStatusText ? getStatusText(payment.status) : 
    payment.status === 'confirmed' ? 'مؤكد' :
    payment.status === 'pending' ? 'قيد الانتظار' : 'مرفوض';

  const handleConfirm = () => {
    onStatusChange(payment.id, 'confirmed');
    setShowActions(false);
  };

  const handleReject = () => {
    onStatusChange(payment.id, 'rejected');
    setShowActions(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getStatusIcon = () => {
    switch (payment.status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'rejected':
        return <XCircle size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  const handleDownloadReceipt = () => {
    if (payment.attachment) {
      const link = document.createElement('a');
      link.href = payment.attachment;
      link.download = `receipt_${payment.transactionId}.jpg`;
      link.click();
    }
  };

  return (
    <div className="payment-card">
      {/* Header */}
      <div className="payment-card__header">
        <div className="payment-card__client-info">
          <div className="payment-card__avatar">
            {payment.client.image ? (
              <img src={payment.client.image} alt={payment.client.name} />
            ) : (
              <div className="payment-card__avatar-placeholder">
                <User size={20} />
              </div>
            )}
          </div>
          
          <div className="payment-card__client-details">
            <h4 className="payment-card__client-name">{payment.client.name}</h4>
            <div className="payment-card__subscription">
              {payment.subscription.name}
            </div>
          </div>
        </div>

        <div className="payment-card__header-actions">
          <div 
            className="payment-card__status"
            style={{ 
              background: `${statusColor}15`,
              borderColor: statusColor,
              color: statusColor
            }}
          >
            {getStatusIcon()}
            <span>{statusText}</span>
          </div>

          <div className="payment-card__action-buttons">
            <button 
              className="payment-card__view-btn"
              onClick={() => onViewDetails(payment)}
              aria-label="عرض التفاصيل"
            >
              <Eye size={18} />
            </button>
            
            <button 
              className="payment-card__more-btn"
              onClick={() => setShowActions(!showActions)}
              aria-label="المزيد"
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Actions Dropdown */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            className="payment-card__actions-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            {payment.status === 'pending' && (
              <>
                <button 
                  className="action-btn action-btn--success"
                  onClick={handleConfirm}
                >
                  <Check size={16} />
                  <span>تأكيد الدفعة</span>
                </button>
                
                <button 
                  className="action-btn action-btn--danger"
                  onClick={handleReject}
                >
                  <X size={16} />
                  <span>رفض الدفعة</span>
                </button>
              </>
            )}
            
            {(payment.status === 'confirmed' || payment.status === 'rejected') && (
              <button 
                className="action-btn action-btn--warning"
                onClick={() => onStatusChange(payment.id, 'pending')}
              >
                <AlertCircle size={16} />
                <span>إعادة للانتظار</span>
              </button>
            )}
            
            {payment.attachment && (
              <button 
                className="action-btn action-btn--info"
                onClick={handleDownloadReceipt}
              >
                <Download size={16} />
                <span>تحميل الإيصال</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Info */}
      <div className="payment-card__info">
        <div className="payment-card__amount">
          <Banknote size={24} />
          <div className="amount-details">
            <span className="value">{payment.amount}</span>
            <span className="currency">{payment.currency}</span>
          </div>
        </div>

        <div className="payment-card__details">
          <div className="detail-item">
            <Calendar size={16} />
            <span className="label">التاريخ:</span>
            <span className="value">{formatDate(payment.date)}</span>
          </div>
          
          <div className="detail-item">
            <Clock size={16} />
            <span className="label">الوقت:</span>
            <span className="value">{formatTime(payment.time)}</span>
          </div>
          
          <div className="detail-item">
            <CreditCard size={16} />
            <span className="label">طريقة الدفع:</span>
            <span className="value">{payment.paymentMethod}</span>
          </div>
          
          {payment.referenceNumber && (
            <div className="detail-item">
              <Receipt size={16} />
              <span className="label">رقم المرجع:</span>
              <span className="value reference">{payment.referenceNumber}</span>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {payment.notes && (
        <div className="payment-card__notes">
          <FileText size={16} />
          <span className="notes-text">{payment.notes}</span>
        </div>
      )}

      {/* Attachment Preview */}
      {payment.attachment && (
        <div className="payment-card__attachment">
          <div className="attachment-header">
            <ImageIcon size={16} />
            <span>إيصال الدفع</span>
          </div>
          <div className="attachment-preview" onClick={() => onViewDetails(payment)}>
            <img src={payment.attachment} alt="إيصال الدفع" />
          </div>
        </div>
      )}

      {/* Transaction ID */}
      <div className="payment-card__transaction-id">
        <span className="label">رقم العملية:</span>
        <span className="value">{payment.transactionId}</span>
      </div>

      {/* Expand Button */}
      <button 
        className="payment-card__expand-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <span>عرض أقل</span>
            <ChevronUp size={16} />
          </>
        ) : (
          <>
            <span>عرض المزيد</span>
            <ChevronDown size={16} />
          </>
        )}
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="payment-card__expanded-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Bank Details */}
            <div className="expanded-section">
              <h5 className="expanded-section__title">معلومات البنك</h5>
              <div className="bank-details">
                <div className="bank-detail-item">
                  <span className="label">اسم البنك:</span>
                  <span className="value">{payment.bankName}</span>
                </div>
                <div className="bank-detail-item">
                  <span className="label">رقم الحساب:</span>
                  <span className="value account-number">{payment.accountNumber}</span>
                </div>
              </div>
            </div>

            {/* Receipt Info */}
            {payment.receiptNumber && (
              <div className="expanded-section">
                <h5 className="expanded-section__title">معلومات الإيصال</h5>
                <div className="receipt-info">
                  <Receipt size={18} />
                  <span className="receipt-number">{payment.receiptNumber}</span>
                </div>
              </div>
            )}

            {/* Confirmation Info */}
            {payment.status === 'confirmed' && payment.confirmedBy && (
              <div className="expanded-section">
                <h5 className="expanded-section__title">معلومات التأكيد</h5>
                <div className="confirmation-info">
                  <div className="confirmation-item">
                    <span className="label">تم التأكيد بواسطة:</span>
                    <span className="value">{payment.confirmedBy}</span>
                  </div>
                  {payment.confirmationDate && (
                    <div className="confirmation-item">
                      <span className="label">تاريخ التأكيد:</span>
                      <span className="value">{formatDate(payment.confirmationDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Client Contact */}
            <div className="expanded-section">
              <h5 className="expanded-section__title">معلومات الاتصال</h5>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="label">البريد الإلكتروني:</span>
                  <span className="value">{payment.client.email}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentCard;