import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  Weight, 
  Ruler,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ClientCard.scss';

const ClientCard = ({ client, onEdit, onDelete }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'expired': return '#f44336';
      case 'pending': return '#ff9800';
      default: return '#9e9e9e';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'مفعّل';
      case 'expired': return 'منتهي';
      case 'pending': return 'معلّق';
      default: return 'غير نشط';
    }
  };
  
  const handleCardClick = () => {
    navigate(`/training/client/${client.id}`);
  };
  
  return (
    <motion.div
      className="client-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={handleCardClick}
    >
      {/* Card Header */}
      <div className="client-card__header">
        <div className="client-card__avatar-section">
          <div className="client-card__avatar">
            {client.image ? (
              <img src={client.image} alt={client.name} />
            ) : (
              <div className="client-card__avatar-placeholder">
                {client.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div 
            className="client-card__status"
            style={{ background: getStatusColor(client.status) }}
          >
            {client.status === 'active' ? (
              <CheckCircle size={16} />
            ) : (
              <XCircle size={16} />
            )}
            <span>{getStatusText(client.status)}</span>
          </div>
        </div>
        
        <div className="client-card__actions" onClick={(e) => e.stopPropagation()}>
          <motion.button
            className="client-card__action-btn"
            onClick={() => onEdit(client)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit2 size={16} />
          </motion.button>
          <motion.button
            className="client-card__action-btn client-card__action-btn--danger"
            onClick={() => onDelete(client.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="client-card__body">
        <h3 className="client-card__name">{client.name}</h3>
        
        <div className="client-card__info-grid">
          <div className="client-card__info-item">
            <div className="client-card__info-icon">
              <Weight size={16} />
            </div>
            <div className="client-card__info-content">
              <span className="client-card__info-label">الوزن</span>
              <span className="client-card__info-value">{client.weight} كغ</span>
            </div>
          </div>
          
          <div className="client-card__info-item">
            <div className="client-card__info-icon">
              <Ruler size={16} />
            </div>
            <div className="client-card__info-content">
              <span className="client-card__info-label">الطول</span>
              <span className="client-card__info-value">{client.height} سم</span>
            </div>
          </div>
          
          <div className="client-card__info-item">
            <div className="client-card__info-icon">
              <Target size={16} />
            </div>
            <div className="client-card__info-content">
              <span className="client-card__info-label">الهدف</span>
              <span className="client-card__info-value">{client.goal}</span>
            </div>
          </div>
          
          <div className="client-card__info-item">
            <div className="client-card__info-icon">
              <TrendingUp size={16} />
            </div>
            <div className="client-card__info-content">
              <span className="client-card__info-label">العمر</span>
              <span className="client-card__info-value">{client.age} سنة</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="client-card__footer">
        <div className="client-card__date">
          <Calendar size={14} />
          <span>بداية: {client.startDate}</span>
        </div>
        <div className="client-card__date">
          <Calendar size={14} />
          <span>نهاية: {client.endDate}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientCard;