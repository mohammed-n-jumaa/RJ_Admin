// src/pages/Training/Chat/ChatRoom/ChatRoom.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Info,
  Check,
  CheckCheck,
  Clock,
  X,
  FileText,
  Menu,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './ChatRoom.scss';

const ChatRoom = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showClientInfo, setShowClientInfo] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Mock client data
  const client = {
    id: parseInt(clientId),
    name: 'سارة أحمد',
    image: null,
    status: 'active',
    phone: '0791234567',
    age: 28,
    goal: 'إنقاص الوزن',
    weight: '65 كغ',
    height: '165 سم',
    isOnline: true,
    lastSeen: '10:30 ص'
  };

  // Mock messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'client',
      content: 'صباح الخير! كيف حالك اليوم؟',
      timestamp: '09:00',
      isRead: true,
      type: 'text'
    },
    {
      id: 2,
      sender: 'trainer',
      content: 'صباح النور! أنا بخير الحمدلله، كيف كانت جلسة التمرين البارحة؟',
      timestamp: '09:02',
      isRead: true,
      type: 'text'
    },
    {
      id: 3,
      sender: 'client',
      content: 'كانت رائعة! لكن عندي ألم بسيط في الكتف الأيمن.',
      timestamp: '09:05',
      isRead: true,
      type: 'text'
    },
    {
      id: 4,
      sender: 'trainer',
      content: 'هذا طبيعي مع التمرين الجديد. جربي كمادات دافئة وخذي راحة اليوم.',
      timestamp: '09:08',
      isRead: true,
      type: 'text'
    },
    {
      id: 5,
      sender: 'trainer',
      content: 'أرسلت لك تعديل على البرنامج الغذائي، راجعي الفطور الجديد.',
      timestamp: '09:10',
      isRead: false,
      type: 'text'
    },
    {
      id: 6,
      sender: 'client',
      content: 'ممتاز! شكراً جزيلاً لك. سأجربه غداً.',
      timestamp: '09:12',
      isRead: false,
      type: 'text'
    },
    {
      id: 7,
      sender: 'client',
      content: 'هل يمكنك إرسال ملف التمرين الجديد؟',
      timestamp: '09:15',
      isRead: false,
      type: 'text'
    },
    {
      id: 8,
      sender: 'trainer',
      content: 'تمارين_الجديدة.pdf',
      timestamp: '09:20',
      isRead: false,
      type: 'file',
      fileType: 'pdf',
      fileSize: '2.4 MB'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'trainer',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('ar-SA', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      isRead: false,
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate client response after 2 seconds
    setTimeout(() => {
      const responses = [
        'فهمت، شكراً للتوجيه!',
        'سأجرب هذا، شكراً لك',
        'متى موعد الجلسة القادمة؟',
        'لدي سؤال بخصوص التمرين الجديد'
      ];
      
      const response = {
        id: messages.length + 2,
        sender: 'client',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString('ar-SA', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        isRead: false,
        type: 'text'
      };

      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const message = {
        id: messages.length + 1,
        sender: 'trainer',
        content: file.name,
        timestamp: new Date().toLocaleTimeString('ar-SA', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        isRead: false,
        type: 'file',
        fileType: file.type,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      };

      setMessages([...messages, message]);
      e.target.value = null; // Reset input
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`chat-room ${isFullscreen ? 'chat-room--fullscreen' : ''}`}>
      {/* Header */}
      <motion.div
        className="chat-room__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="chat-room__header-main">
          <button 
            className="chat-room__back-btn" 
            onClick={() => navigate('/training/chat')}
            aria-label="العودة إلى المحادثات"
          >
            <ArrowRight size={20} />
          </button>

          <div className="chat-room__client-info" onClick={() => setShowClientInfo(!showClientInfo)}>
            <div className="chat-room__client-avatar">
              {client.image ? (
                <img src={client.image} alt={client.name} />
              ) : (
                <div className="chat-room__client-avatar-placeholder">
                  {client.name.charAt(0)}
                </div>
              )}
              {client.isOnline && <div className="chat-room__online-dot" />}
            </div>

            <div className="chat-room__client-details">
              <h2 className="chat-room__client-name">{client.name}</h2>
              <div className="chat-room__client-status">
                {client.isOnline ? (
                  <>
                    <div className="chat-room__status-dot chat-room__status-dot--online" />
                    <span>متصل الآن</span>
                  </>
                ) : (
                  <>
                    <Clock size={12} />
                    <span>آخر ظهور {client.lastSeen}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="chat-room__header-actions">
          <button 
            className="chat-room__action-btn"
            onClick={() => setShowClientInfo(!showClientInfo)}
            aria-label="معلومات المتدرب"
          >
            <Info size={20} />
          </button>
          
          <button 
            className="chat-room__action-btn chat-room__fullscreen-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "تصغير الشاشة" : "تكبير الشاشة"}
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          
          <button className="chat-room__action-btn" aria-label="المزيد">
            <MoreVertical size={20} />
          </button>
        </div>
      </motion.div>

      {/* Client Info Panel */}
      <AnimatePresence>
        {showClientInfo && (
          <motion.div
            className="client-info-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="client-info-panel__header">
              <h3>معلومات المتدرب</h3>
              <button 
                onClick={() => setShowClientInfo(false)}
                aria-label="إغلاق معلومات المتدرب"
              >
                <X size={20} />
              </button>
            </div>
            <div className="client-info-panel__content">
              <div className="client-info-grid">
                <div className="client-info-item">
                  <span className="client-info-label">الهدف</span>
                  <span className="client-info-value">{client.goal}</span>
                </div>
                <div className="client-info-item">
                  <span className="client-info-label">الوزن</span>
                  <span className="client-info-value">{client.weight}</span>
                </div>
                <div className="client-info-item">
                  <span className="client-info-label">الطول</span>
                  <span className="client-info-value">{client.height}</span>
                </div>
                <div className="client-info-item">
                  <span className="client-info-label">العمر</span>
                  <span className="client-info-value">{client.age} سنة</span>
                </div>
                <div className="client-info-item client-info-item--full">
                  <span className="client-info-label">رقم الهاتف</span>
                  <span className="client-info-value">{client.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <div className="chat-room__window">
        {/* Welcome Message */}
        <div className="chat-room__welcome">
          <div className="welcome-message">
            <h3>أنت تتحدث مع {client.name}</h3>
            <p>{client.isOnline ? 'متصل الآن' : `آخر ظهور ${client.lastSeen}`}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-room__messages">
          <div className="messages-container">
            {messages.map((message, index) => {
              const isTrainer = message.sender === 'trainer';
              const isFirstOfType = index === 0 || messages[index - 1].sender !== message.sender;

              return (
                <motion.div
                  key={message.id}
                  className={`message ${isTrainer ? 'message--trainer' : 'message--client'} ${isFirstOfType ? 'message--first' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {message.type === 'file' ? (
                    <div className="message-file">
                      <FileText size={24} />
                      <div className="message-file__info">
                        <span className="message-file__name">{message.content}</span>
                        <span className="message-file__size">{message.fileSize}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="message__content">{message.content}</div>
                  )}
                  <div className="message__meta">
                    <span className="message__time">{message.timestamp}</span>
                    {isTrainer && (
                      <span className="message__status">
                        {message.isRead ? (
                          <CheckCheck size={12} />
                        ) : (
                          <Check size={12} />
                        )}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} className="messages-end" />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="chat-room__input">
        <div className="message-input">
          <div className="message-input__actions">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              aria-label="رفع ملف"
            />
            
            <motion.button
              className="message-input__action-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFileUpload}
              aria-label="إرفاق ملف"
            >
              <Paperclip size={20} />
            </motion.button>

           
          </div>

          <div className="message-input__field">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              rows="1"
              aria-label="كتابة رسالة"
            />
          </div>

          <div className="message-input__send">
            <motion.button
              className="message-input__send-btn"
              onClick={handleSendMessage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!newMessage.trim()}
              aria-label="إرسال الرسالة"
            >
              <Send size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;