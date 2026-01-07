import React from 'react';
import { 
  Eye, 
  Edit2, 
  RefreshCw, 
  Pause, 
  XCircle,
  Download,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import './SubscriptionTable.scss';

const SubscriptionTable = ({ 
  subscriptions, 
  onEdit, 
  onDelete, 
  onRenew,
  onToggleStatus 
}) => {
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <span className="status-badge status-badge--success">
            <CheckCircle size={14} />
            نشط
          </span>
        );
      case 'expiring':
        return (
          <span className="status-badge status-badge--warning">
            <Clock size={14} />
            قرب الانتهاء
          </span>
        );
      case 'expired':
        return (
          <span className="status-badge status-badge--danger">
            <AlertCircle size={14} />
            منتهي
          </span>
        );
      case 'pending':
        return (
          <span className="status-badge status-badge--info">
            <Clock size={14} />
            بانتظار الدفع
          </span>
        );
      default:
        return <span className="status-badge">-</span>;
    }
  };

  const getPaymentBadge = (status) => {
    switch(status) {
      case 'paid':
        return (
          <span className="payment-badge payment-badge--success">
            <CheckCircle size={14} />
            تم الدفع
          </span>
        );
      case 'pending':
        return (
          <span className="payment-badge payment-badge--warning">
            <Clock size={14} />
            بانتظار الدفع
          </span>
        );
      default:
        return <span className="payment-badge">-</span>;
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

  return (
    <div className="subscription-table">
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>اسم المتدربة</th>
              <th>نوع البرنامج</th>
              <th>المدة</th>
              <th>تاريخ البداية</th>
              <th>تاريخ الانتهاء</th>
              <th>الأيام المتبقية</th>
              <th>حالة الدفع</th>
              <th>حالة الاشتراك</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  <div className="empty-state">
                    <AlertCircle size={48} />
                    <p>لا توجد اشتراكات مطابقة للبحث</p>
                  </div>
                </td>
              </tr>
            ) : (
              subscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td>
                    <div className="client-info">
                      {subscription.client.image ? (
                        <img src={subscription.client.image} alt={subscription.client.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {subscription.client.name.charAt(0)}
                        </div>
                      )}
                      <div className="client-details">
                        <div className="client-name">{subscription.client.name}</div>
                        <div className="client-email">{subscription.client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="program-info">
                      <div className="program-name">{subscription.program.name}</div>
                      <div className="program-price">
                        {subscription.program.price} {subscription.program.currency}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="duration-badge">
                      {subscription.program.duration}
                    </span>
                  </td>
                  <td>{formatDate(subscription.startDate)}</td>
                  <td>{formatDate(subscription.endDate)}</td>
                  <td>
                    <div className={`days-remaining ${subscription.remainingDays <= 7 ? 'warning' : ''}`}>
                      {subscription.remainingDays} يوم
                    </div>
                  </td>
                  <td>{getPaymentBadge(subscription.paymentStatus)}</td>
                  <td>{getStatusBadge(subscription.subscriptionStatus)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view-btn"
                        title="عرض التفاصيل"
                        onClick={() => onEdit(subscription)}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        title="تعديل الاشتراك"
                        onClick={() => onEdit(subscription)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="action-btn renew-btn"
                        title="تجديد الاشتراك"
                        onClick={() => onRenew(subscription.id)}
                        disabled={subscription.subscriptionStatus !== 'expired'}
                      >
                        <RefreshCw size={16} />
                      </button>
                      <button 
                        className="action-btn pause-btn"
                        title="تجميد الاشتراك"
                        onClick={() => onToggleStatus(
                          subscription.id, 
                          subscription.subscriptionStatus === 'active' ? 'expiring' : 'active'
                        )}
                      >
                        <Pause size={16} />
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        title="إلغاء الاشتراك"
                        onClick={() => onDelete(subscription.id)}
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionTable;