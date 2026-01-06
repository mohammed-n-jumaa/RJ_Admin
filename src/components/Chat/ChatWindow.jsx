// src/components/Chat/ChatWindow.jsx
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock, Image as ImageIcon, FileText } from 'lucide-react';
import './ChatWindow.scss';

const ChatWindow = ({ messages, client }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (time) => {
    return time;
  };

  return (
    <div className="chat-window">
      {/* Welcome Message */}
      <div className="chat-window__welcome">
        <motion.div
          className="welcome-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="welcome-message__avatar">
            {client.image ? (
              <img src={client.image} alt={client.name} />
            ) : (
              <div className="welcome-message__avatar-placeholder">
                {client.name.charAt(0)}
              </div>
            )}
          </div>
          <h3 className="welcome-message__title">أنت تتحدث مع {client.name}</h3>
          <p className="welcome-message__subtitle">
            {client.isOnline ? 'متصل الآن' : `آخر ظهور ${client.lastSeen}`}
          </p>
        </motion.div>
      </div>

      {/* Messages Container */}
      <div className="chat-window__messages">
        <div className="messages-container">
          {messages.map((message, index) => {
            const isTrainer = message.sender === 'trainer';
            const showDate = index === 0 || 
              new Date(message.timestamp).toDateString() !== 
              new Date(messages[index - 1].timestamp).toDateString();

            return (
              <React.Fragment key={message.id}>
                {showDate && (
                  <div className="message-date">
                    {new Date(message.timestamp).toLocaleDateString('ar-SA', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}

                <motion.div
                  className={`message ${isTrainer ? 'message--trainer' : 'message--client'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="message__content">
                    {message.content}
                    <div className="message__meta">
                      <span className="message__time">{formatTime(message.timestamp)}</span>
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
                  </div>
                </motion.div>
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;