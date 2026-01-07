// src/components/Users/SubscriptionCard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  Calendar,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Edit2,
  Trash2,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Receipt,
  Shield,
  Plus,
  X
} from 'lucide-react';
import './SubscriptionCard.scss';

const SubscriptionCard = ({ 
  subscription, 
  onUpdate, 
  onDelete, 
  onRenew,
  getStatusColor,
  getStatusText
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const statusColor = getStatusColor ? getStatusColor(subscription.status) : 
    subscription.status === 'active' ? '#4caf50' :
    subscription.status === 'expired' ? '#f44336' :
    subscription.status === 'pending' ? '#ff9800' : '#ff5722';

  const statusText = getStatusText ? getStatusText(subscription.status) : 
    subscription.status === 'active' ? 'نشط' :
    subscription.status === 'expired' ? 'منتهي' :
    subscription.status === 'pending' ? 'معلق' : 'قريب الانتهاء';

  const handleStatusChange = (newStatus) => {
    onUpdate(subscription.id, { status: newStatus });
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

  const calculateProgress = () => {
    const start = new Date(subscription.startDate);
    const end = new Date(subscription.endDate);
    const now = new Date();
    
    const totalDuration = end - start;
    const elapsed = now - start;
    
    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  };

  const getStatusIcon = () => {
    switch (subscription.status) {
      case 'active':
        return <CheckCircle size={16} />;
      case 'expired':
        return <XCircle size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      case 'expiring':
        return <Clock size={16} />;
      default:
        return null;
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="subscription-card">
      <div className="subscription-card__header">
        <div className="subscription-card__client-info">
          <div className="subscription-card__avatar">
            {subscription.client.image ? (
              <img src={subscription.client.image} alt={subscription.client.name} />
            ) : (
              <div className="subscription-card__avatar-placeholder">
                <User size={20} />
              </div>
            )}
          </div>
          
          <div className="subscription-card__client-details">
            <h4 className="subscription-card__client-name">{subscription.client.name}</h4>
            <div className="subscription-card__client-contact">
              <span>{subscription.client.email}</span>
              <span>•</span>
              <span>{subscription.client.phone}</span>
            </div>
          </div>
        </div>

        <div className="subscription-card__header-actions">
          <div 
            className="subscription-card__status"
            style={{ 
              background: `${statusColor}15`,
              borderColor: statusColor,
              color: statusColor
            }}
          >
            {getStatusIcon()}
            <span>{statusText}</span>
          </div>

          <button 
            className="subscription-card__more-btn"
            onClick={() => setShowActions(!showActions)}
            aria-label="المزيد"
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Actions Dropdown */}
      {showActions && (
        <div className="subscription-card__actions-dropdown">
          {subscription.status === 'active' && (
            <button 
              className="action-btn action-btn--warning"
              onClick={() => handleStatusChange('expiring')}
            >
              <AlertCircle size={16} />
              <span>تحديد كقريب الانتهاء</span>
            </button>
          )}
          
          {subscription.status === 'expiring' && (
            <button 
              className="action-btn action-btn--success"
              onClick={() => handleStatusChange('active')}
            >
              <CheckCircle size={16} />
              <span>تحديد كنشط</span>
            </button>
          )}
          
          {subscription.status === 'pending' && (
            <button 
              className="action-btn action-btn--success"
              onClick={() => handleStatusChange('active')}
            >
              <CheckCircle size={16} />
              <span>تفعيل الاشتراك</span>
            </button>
          )}
          
          {subscription.status === 'expired' && (
            <button 
              className="action-btn action-btn--primary"
              onClick={() => onRenew(subscription.id)}
            >
              <RefreshCw size={16} />
              <span>تجديد الاشتراك</span>
            </button>
          )}
          
          <button className="action-btn action-btn--edit">
            <Edit2 size={16} />
            <span>تعديل</span>
          </button>
          
          <button 
            className="action-btn action-btn--danger"
            onClick={() => onDelete(subscription.id)}
          >
            <Trash2 size={16} />
            <span>حذف</span>
          </button>
        </div>
      )}

      {/* Plan Info */}
      <div className="subscription-card__plan">
        <h3 className="subscription-card__plan-name">{subscription.plan.name}</h3>
        <div className="subscription-card__plan-price">
          <DollarSign size={20} />
          <span className="price">{subscription.plan.price}</span>
          <span className="currency">{subscription.plan.currency}</span>
          <span className="duration">/{subscription.plan.duration}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="subscription-card__progress">
        <div className="subscription-card__progress-header">
          <span>مدة الاشتراك</span>
          <span className="subscription-card__remaining-days">
            <Clock size={14} />
            {subscription.remainingDays} يوم متبقي
          </span>
        </div>
        <div className="subscription-card__progress-bar">
          <motion.div 
            className="subscription-card__progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 1 }}
            style={{ background: statusColor }}
          />
        </div>
        <div className="subscription-card__progress-dates">
          <span className="start-date">{formatDate(subscription.startDate)}</span>
          <span className="end-date">{formatDate(subscription.endDate)}</span>
        </div>
      </div>

      {/* Payment Info */}
      <div className="subscription-card__payment-info">
        <div className="payment-info-item">
          <CreditCard size={16} />
          <span className="label">طريقة الدفع:</span>
          <span className="value">{subscription.paymentMethod}</span>
        </div>
        
        {subscription.transactionId && (
          <div className="payment-info-item">
            <Receipt size={16} />
            <span className="label">رقم العملية:</span>
            <span className="value transaction-id">{subscription.transactionId}</span>
          </div>
        )}
        
        {subscription.lastPayment && (
          <div className="payment-info-item">
            <Calendar size={16} />
            <span className="label">آخر دفعة:</span>
            <span className="value">{formatDate(subscription.lastPayment)}</span>
          </div>
        )}
        
        {subscription.nextPayment && (
          <div className="payment-info-item">
            <Calendar size={16} />
            <span className="label">الدفعة القادمة:</span>
            <span className="value">{formatDate(subscription.nextPayment)}</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default SubscriptionCard;