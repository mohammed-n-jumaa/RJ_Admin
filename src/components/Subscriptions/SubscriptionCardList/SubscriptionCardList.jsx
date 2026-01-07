import React, { useState } from 'react';
import { 
  Edit2, 
  RefreshCw, 
  Trash2,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react';
import './SubscriptionCardList.scss';

const SubscriptionCardList = ({ 
  subscriptions, 
  viewMode,
  onEdit, 
  onDelete, 
  onRenew,
  onToggleStatus 
}) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (id) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <span className="status-badge status-active">
            <CheckCircle size={14} />
            نشط
          </span>
        );
      case 'expiring':
        return (
          <span className="status-badge status-warning">
            <Clock size={14} />
            قرب الانتهاء
          </span>
        );
      case 'expired':
        return (
          <span className="status-badge status-danger">
            <AlertCircle size={14} />
            منتهي
          </span>
        );
      case 'pending':
        return (
          <span className="status-badge status-info">
            <Clock size={14} />
            بانتظار الدفع
          </span>
        );
      default:
        return null;
    }
  };

  const getPaymentBadge = (status) => {
    switch(status) {
      case 'paid':
        return <span className="payment-badge paid">✅ تم الدفع</span>;
      case 'pending':
        return <span className="payment-badge pending">⏳ بانتظار الدفع</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // List View Component
  const ListItem = ({ subscription }) => {
    const isExpanded = expandedItems.includes(subscription.id);
    
    return (
      <div className={`subscription-item list-item ${subscription.subscriptionStatus}`}>
        <div className="item-header" onClick={() => toggleExpand(subscription.id)}>
          <div className="client-info">
            <div className="client-avatar">
              {subscription.client.name.charAt(0)}
            </div>
            <div className="client-details">
              <h4 className="client-name">{subscription.client.name}</h4>
              <div className="client-contact">
                <span className="contact-item">
                  <Mail size={12} />
                  {subscription.client.email}
                </span>
                <span className="contact-item">
                  <Phone size={12} />
                  {subscription.client.phone}
                </span>
              </div>
            </div>
          </div>
          
          <div className="program-info">
            <span className="program-name">{subscription.program.name}</span>
            <span className="program-duration">{subscription.program.duration}</span>
          </div>
          
          <div className="status-info">
            {getStatusBadge(subscription.subscriptionStatus)}
            {getPaymentBadge(subscription.paymentStatus)}
          </div>
          
          <div className="days-remaining">
            <span className={`days ${subscription.remainingDays <= 7 ? 'warning' : ''}`}>
              {subscription.remainingDays} يوم
            </span>
          </div>
          
          <div className="price-info">
            <span className="price">
              <DollarSign size={14} />
              {subscription.program.price} {subscription.program.currency}
            </span>
          </div>
          
          <button className="expand-btn">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        {isExpanded && (
          <div className="item-details">
            <div className="details-grid">
              <div className="detail-column">
                <div className="detail-item">
                  <span className="detail-label">تاريخ البداية:</span>
                  <span className="detail-value">
                    <Calendar size={14} />
                    {formatDate(subscription.startDate)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">تاريخ الانتهاء:</span>
                  <span className="detail-value">
                    <Calendar size={14} />
                    {formatDate(subscription.endDate)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">التجديد التلقائي:</span>
                  <span className="detail-value">
                    {subscription.autoRenew ? '✅ مفعل' : '❌ غير مفعل'}
                  </span>
                </div>
              </div>
              
              <div className="detail-column">
                {subscription.notes && (
                  <div className="detail-item">
                    <span className="detail-label">ملاحظات:</span>
                    <span className="detail-value notes">{subscription.notes}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="item-actions">
              <button 
                className="action-btn edit-btn"
                onClick={() => onEdit(subscription)}
              >
                <Edit2 size={16} />
                تعديل
              </button>
              <button 
                className="action-btn renew-btn"
                onClick={() => onRenew(subscription.id)}
                disabled={subscription.subscriptionStatus !== 'expired'}
              >
                <RefreshCw size={16} />
                تجديد
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => onDelete(subscription.id)}
              >
                <Trash2 size={16} />
                حذف
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Grid View Component
  const GridItem = ({ subscription }) => {
    return (
      <div className={`subscription-item grid-item ${subscription.subscriptionStatus}`}>
        <div className="card-header">
          <div className="client-avatar large">
            {subscription.client.name.charAt(0)}
          </div>
          
          <div className="client-info">
            <h4 className="client-name">{subscription.client.name}</h4>
            <p className="client-email">{subscription.client.email}</p>
            <p className="client-phone">{subscription.client.phone}</p>
          </div>
          
          <div className="card-status">
            {getStatusBadge(subscription.subscriptionStatus)}
            {getPaymentBadge(subscription.paymentStatus)}
          </div>
        </div>
        
        <div className="card-content">
          <div className="program-card">
            <h5 className="program-title">{subscription.program.name}</h5>
            <div className="program-details">
              <span className="duration">
                <Calendar size={14} />
                {subscription.program.duration}
              </span>
              <span className="price">
                <DollarSign size={14} />
                {subscription.program.price} {subscription.program.currency}
              </span>
            </div>
          </div>
          
          <div className="dates-info">
            <div className="date-item">
              <span className="date-label">البداية:</span>
              <span className="date-value">{formatDate(subscription.startDate)}</span>
            </div>
            <div className="date-item">
              <span className="date-label">النهاية:</span>
              <span className="date-value">{formatDate(subscription.endDate)}</span>
            </div>
          </div>
          
          <div className="remaining-days">
            <span className={`days-count ${subscription.remainingDays <= 7 ? 'warning' : ''}`}>
              {subscription.remainingDays} يوم متبقي
            </span>
          </div>
          
          {subscription.notes && (
            <div className="notes-section">
              <span className="notes-label">ملاحظات:</span>
              <p className="notes-text">{subscription.notes}</p>
            </div>
          )}
        </div>
        
        <div className="card-actions">
          <button 
            className="action-btn edit-btn"
            onClick={() => onEdit(subscription)}
          >
            <Edit2 size={16} />
          </button>
          <button 
            className="action-btn renew-btn"
            onClick={() => onRenew(subscription.id)}
            disabled={subscription.subscriptionStatus !== 'expired'}
          >
            <RefreshCw size={16} />
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={() => onDelete(subscription.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  };

  // Empty State
  if (subscriptions.length === 0) {
    return (
      <div className="empty-state">
        <AlertCircle size={48} className="empty-icon" />
        <h3>لا توجد اشتراكات</h3>
        <p>لا توجد اشتراكات مطابقة لمعايير البحث المحددة</p>
      </div>
    );
  }

  return (
    <div className={`subscription-list ${viewMode}`}>
      {viewMode === 'list' ? (
        <div className="list-view">
          {subscriptions.map((subscription) => (
            <ListItem key={subscription.id} subscription={subscription} />
          ))}
        </div>
      ) : (
        <div className="grid-view">
          {subscriptions.map((subscription) => (
            <GridItem key={subscription.id} subscription={subscription} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionCardList;