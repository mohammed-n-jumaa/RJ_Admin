import React, { useState } from 'react';
import { 
  Eye, 
  Edit2, 
  RefreshCw, 
  Trash2,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';
import './SubscriptionTable.scss';

const SubscriptionTable = ({ 
  subscriptions, 
  onEdit, 
  onDelete, 
  onRenew,
  onToggleStatus,
  viewMode,
  setViewMode
}) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <span className="status-badge active">
            <CheckCircle size={14} />
            نشط
          </span>
        );
      case 'expiring':
        return (
          <span className="status-badge warning">
            <Clock size={14} />
            قرب الانتهاء
          </span>
        );
      case 'expired':
        return (
          <span className="status-badge danger">
            <AlertCircle size={14} />
            منتهي
          </span>
        );
      case 'pending':
        return (
          <span className="status-badge info">
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
        return (
          <span className="payment-badge success">
            <CheckCircle size={14} />
            تم الدفع
          </span>
        );
      case 'pending':
        return (
          <span className="payment-badge warning">
            <Clock size={14} />
            بانتظار الدفع
          </span>
        );
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

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === subscriptions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(subscriptions.map(sub => sub.id));
    }
  };

  // Mobile Card View
  const MobileCard = ({ subscription }) => (
    <div className="subscription-card">
      <div className="card-header" onClick={() => toggleCard(subscription.id)}>
        <div className="client-info">
          <div className="avatar">
            {subscription.client.name.charAt(0)}
          </div>
          <div className="client-details">
            <h4 className="client-name">{subscription.client.name}</h4>
            <p className="client-email">{subscription.client.email}</p>
          </div>
          <button className="expand-btn">
            {expandedCard === subscription.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        <div className="card-status">
          {getStatusBadge(subscription.subscriptionStatus)}
          <div className="program-name">{subscription.program.name}</div>
        </div>
      </div>
      
      {expandedCard === subscription.id && (
        <div className="card-details">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">المدة:</span>
              <span className="detail-value">{subscription.program.duration}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">تاريخ البداية:</span>
              <span className="detail-value">{formatDate(subscription.startDate)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">تاريخ الانتهاء:</span>
              <span className="detail-value">{formatDate(subscription.endDate)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">الأيام المتبقية:</span>
              <span className={`detail-value ${subscription.remainingDays <= 7 ? 'warning' : ''}`}>
                {subscription.remainingDays} يوم
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">حالة الدفع:</span>
              <span className="detail-value">{getPaymentBadge(subscription.paymentStatus)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">السعر:</span>
              <span className="detail-value price">
                {subscription.program.price} {subscription.program.currency}
              </span>
            </div>
          </div>
          
          <div className="card-actions">
            <button 
              className="action-btn edit"
              onClick={() => onEdit(subscription)}
            >
              <Edit2 size={16} />
              تعديل
            </button>
            <button 
              className="action-btn renew"
              onClick={() => onRenew(subscription.id)}
              disabled={subscription.subscriptionStatus !== 'expired'}
            >
              <RefreshCw size={16} />
              تجديد
            </button>
            <button 
              className="action-btn delete"
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

  // Desktop Table View
  const DesktopTable = () => (
    <div className="table-responsive">
      <table className="subscriptions-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === subscriptions.length && subscriptions.length > 0}
                onChange={toggleSelectAll}
                className="select-checkbox"
              />
            </th>
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
              <td colSpan="10" className="no-data">
                <div className="empty-state">
                  <AlertCircle size={48} />
                  <p>لا توجد اشتراكات مطابقة للبحث</p>
                </div>
              </td>
            </tr>
          ) : (
            subscriptions.map((subscription) => (
              <tr key={subscription.id} className={selectedRows.includes(subscription.id) ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(subscription.id)}
                    onChange={() => toggleRowSelection(subscription.id)}
                    className="select-checkbox"
                  />
                </td>
                <td>
                  <div className="client-cell">
                    <div className="avatar">
                      {subscription.client.name.charAt(0)}
                    </div>
                    <div className="client-info">
                      <div className="client-name">{subscription.client.name}</div>
                      <div className="client-email">{subscription.client.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="program-cell">
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
                  <span className={`days-remaining ${subscription.remainingDays <= 7 ? 'warning' : ''}`}>
                    {subscription.remainingDays} يوم
                  </span>
                </td>
                <td>{getPaymentBadge(subscription.paymentStatus)}</td>
                <td>{getStatusBadge(subscription.subscriptionStatus)}</td>
                <td>
                  <div className="actions-cell">
                    <button 
                      className="action-btn view"
                      onClick={() => onEdit(subscription)}
                      title="عرض التفاصيل"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="action-btn edit"
                      onClick={() => onEdit(subscription)}
                      title="تعديل"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="action-btn renew"
                      onClick={() => onRenew(subscription.id)}
                      disabled={subscription.subscriptionStatus !== 'expired'}
                      title="تجديد"
                    >
                      <RefreshCw size={16} />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => onDelete(subscription.id)}
                      title="حذف"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  // Bulk Actions
  const BulkActions = () => {
    if (selectedRows.length === 0) return null;
    
    const handleBulkDelete = () => {
      if (window.confirm(`هل أنت متأكد من حذف ${selectedRows.length} اشتراك؟`)) {
        selectedRows.forEach(id => {
          onDelete(id);
        });
        setSelectedRows([]);
      }
    };

    const handleBulkExport = () => {
      const selectedSubscriptions = subscriptions.filter(sub => selectedRows.includes(sub.id));
      const csvContent = [
        ['الاسم', 'البريد', 'البرنامج', 'المدة', 'تاريخ البداية', 'تاريخ الانتهاء', 'الحالة', 'السعر'],
        ...selectedSubscriptions.map(sub => [
          sub.client.name,
          sub.client.email,
          sub.program.name,
          sub.program.duration,
          sub.startDate,
          sub.endDate,
          sub.subscriptionStatus,
          `${sub.program.price} ${sub.program.currency}`
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `الاشتراكات_المحددة_${selectedRows.length}.csv`;
      link.click();
    };

    return (
      <div className="bulk-actions">
        <div className="selected-count">
          تم اختيار {selectedRows.length} اشتراك
        </div>
        <div className="bulk-buttons">
          <button className="bulk-btn export" onClick={handleBulkExport}>
            <Download size={16} />
            تصدير المحدد
          </button>
          <button className="bulk-btn delete" onClick={handleBulkDelete}>
            <Trash2 size={16} />
            حذف المحدد
          </button>
          <button className="bulk-btn clear" onClick={() => setSelectedRows([])}>
            إلغاء التحديد
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="subscription-table-container">
      {/* View Toggle for Desktop */}
      {window.innerWidth > 768 && (
        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            <span>عرض جدول</span>
          </button>
          <button 
            className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
          >
            <span>عرض بطاقات</span>
          </button>
        </div>
      )}

      {/* Bulk Actions */}
      <BulkActions />

      {/* Content based on view mode */}
      {viewMode === 'cards' ? (
        <div className="cards-view">
          {subscriptions.length === 0 ? (
            <div className="no-data">
              <div className="empty-state">
                <AlertCircle size={48} />
                <p>لا توجد اشتراكات مطابقة للبحث</p>
              </div>
            </div>
          ) : (
            <div className="cards-grid">
              {subscriptions.map((subscription) => (
                <MobileCard key={subscription.id} subscription={subscription} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <DesktopTable />
      )}
    </div>
  );
};

export default SubscriptionTable;