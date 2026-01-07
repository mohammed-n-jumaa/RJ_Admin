// src/pages/Training/Chat/ChatList/ChatList.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  Users,
  MessageSquareMore,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ChatList.scss';

const ChatList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - سيتم جلبها من API في التطبيق الحقيقي
  const chats = [
    {
      id: 1,
      client: {
        id: 1,
        name: 'سارة أحمد',
        image: null,
        status: 'active',
        goal: 'إنقاص الوزن',
        lastActive: '10:30'
      },
      lastMessage: 'شكراً على التمرين الجديد، كان ممتازاً!',
      unreadCount: 3,
      lastMessageTime: '10:30',
      isOnline: true,
      lastSeen: 'دقيقة واحدة'
    },
    {
      id: 2,
      client: {
        id: 2,
        name: 'ليلى محمود',
        image: null,
        status: 'active',
        goal: 'بناء العضلات',
        lastActive: '09:15'
      },
      lastMessage: 'هل يمكنني تغيير موعد الجلسة؟',
      unreadCount: 0,
      lastMessageTime: '09:15',
      isOnline: true,
      lastSeen: '5 دقائق'
    },
    {
      id: 3,
      client: {
        id: 3,
        name: 'نور الدين',
        image: null,
        status: 'expired',
        goal: 'تنشيف',
        lastActive: 'أمس'
      },
      lastMessage: 'شكراً على كل شيء، كان رحلة رائعة',
      unreadCount: 0,
      lastMessageTime: 'أمس',
      isOnline: false,
      lastSeen: '2 يوم'
    },
    {
      id: 4,
      client: {
        id: 4,
        name: 'مريم سالم',
        image: null,
        status: 'pending',
        goal: 'لياقة عامة',
        lastActive: 'الثلاثاء'
      },
      lastMessage: 'متى سأستلم البرنامج الجديد؟',
      unreadCount: 1,
      lastMessageTime: 'الثلاثاء',
      isOnline: false,
      lastSeen: '3 أيام'
    },
    {
      id: 5,
      client: {
        id: 5,
        name: 'أحمد خالد',
        image: null,
        status: 'active',
        goal: 'زيادة الوزن',
        lastActive: 'الإثنين'
      },
      lastMessage: 'لدي سؤال حول التغذية...',
      unreadCount: 2,
      lastMessageTime: 'الإثنين',
      isOnline: true,
      lastSeen: 'ساعة'
    },
    {
      id: 6,
      client: {
        id: 6,
        name: 'فاطمة حسن',
        image: null,
        status: 'active',
        goal: 'تحسين القوة',
        lastActive: 'اليوم'
      },
      lastMessage: 'التمرين الأخير كان صعباً لكن ممتع',
      unreadCount: 0,
      lastMessageTime: 'اليوم',
      isOnline: true,
      lastSeen: '30 دقيقة'
    }
  ];

  // Statistics
  const stats = {
    total: chats.length,
    unread: chats.reduce((sum, chat) => sum + chat.unreadCount, 0),
    online: chats.filter(chat => chat.isOnline).length,
    active: chats.filter(chat => chat.client.status === 'active').length
  };

  // Filter and Search
  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.client.goal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || chat.client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleChatSelect = (chat) => {
    navigate(`/training/chat/${chat.client.id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'expired': return '#f44336';
      case 'pending': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  return (
    <div className="chat-list">
      {/* Page Header */}
      <motion.div
        className="chat-list__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="chat-list__header-content">
          <div className="chat-list__title-section">
            <h1 className="chat-list__title">
              <MessageSquareMore size={32} />
              محادثات المتدربين
            </h1>
            <p className="chat-list__subtitle">
              تواصل مع المتدربين ومتابعة المحادثات
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        className="chat-list__stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="chat-stat-card">
          <div className="chat-stat-card__icon chat-stat-card__icon--primary">
            <MessageSquare size={24} />
          </div>
          <div className="chat-stat-card__content">
            <span className="chat-stat-card__label">إجمالي المحادثات</span>
            <span className="chat-stat-card__value">{stats.total}</span>
          </div>
        </div>

        <div className="chat-stat-card">
          <div className="chat-stat-card__icon chat-stat-card__icon--warning">
            <MessageSquare size={24} />
          </div>
          <div className="chat-stat-card__content">
            <span className="chat-stat-card__label">غير مقروء</span>
            <span className="chat-stat-card__value">{stats.unread}</span>
          </div>
        </div>

        <div className="chat-stat-card">
          <div className="chat-stat-card__icon chat-stat-card__icon--success">
            <CheckCircle size={24} />
          </div>
          <div className="chat-stat-card__content">
            <span className="chat-stat-card__label">متصل الآن</span>
            <span className="chat-stat-card__value">{stats.online}</span>
          </div>
        </div>

        <div className="chat-stat-card">
          <div className="chat-stat-card__icon chat-stat-card__icon--info">
            <Users size={24} />
          </div>
          <div className="chat-stat-card__content">
            <span className="chat-stat-card__label">نشط</span>
            <span className="chat-stat-card__value">{stats.active}</span>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="chat-list__filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="chat-search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="ابحث عن محادثة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="chat-filter-box">
          <Filter size={20} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="expired">منتهي</option>
            <option value="pending">معلّق</option>
          </select>
        </div>
      </motion.div>

      {/* Chats List */}
      <motion.div
        className="chat-list__container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="chat-list__content">
          <AnimatePresence>
            {filteredChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                className="chat-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                onClick={() => handleChatSelect(chat)}
              >
                <div className="chat-item__left">
                  <div className="chat-item__avatar">
                    {chat.client.image ? (
                      <img src={chat.client.image} alt={chat.client.name} />
                    ) : (
                      <div className="chat-item__avatar-placeholder">
                        {chat.client.name.charAt(0)}
                      </div>
                    )}
                    {chat.isOnline && <div className="chat-item__online-dot" />}
                  </div>
                  
                  <div className="chat-item__info">
                    <h4 className="chat-item__name">{chat.client.name}</h4>
                    <div className="chat-item__goal">{chat.client.goal}</div>
                  </div>
                </div>

                <div className="chat-item__right">
                  <div className="chat-item__message-preview">
                    <p className="chat-item__last-message">{chat.lastMessage}</p>
                    <div className="chat-item__meta">
                      <span className="chat-item__time">
                        <Clock size={12} />
                        {chat.lastMessageTime}
                      </span>
                      {chat.unreadCount > 0 && (
                        <span className="chat-item__unread-badge">{chat.unreadCount}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="chat-item__status-section">
                    <div 
                      className="chat-item__status" 
                      style={{ background: getStatusColor(chat.client.status) }}
                    >
                      {chat.client.status === 'active' ? 'نشط' : 
                       chat.client.status === 'expired' ? 'منتهي' : 'معلّق'}
                    </div>
                    <ChevronRight size={16} className="chat-item__chevron" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {filteredChats.length === 0 && (
        <motion.div
          className="chat-list__empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MessageSquare size={64} />
          <h3>لا توجد محادثات</h3>
          <p>ابدأ محادثة جديدة مع أحد المتدربين</p>
        </motion.div>
      )}
    </div>
  );
};

export default ChatList;