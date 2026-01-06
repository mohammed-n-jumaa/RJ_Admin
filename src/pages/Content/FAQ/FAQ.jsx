import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  Save,
  Check,
  AlertCircle,
  Eye,
  Lock,
  Unlock,
  ChevronDown,
  MapPin,
  MessageSquare,
  Mail,
  Calendar,
  User,
  CheckCircle,
  XCircle
} from 'lucide-react';
import './FAQ.scss';

const FAQ = () => {
  // FAQ Categories with Mind Map
  const [faqCategories, setFaqCategories] = useState([
    {
      id: 1,
      title: 'من وين أبتدئ؟',
      icon: '📍',
      color: '#e91e63',
      questions: [
        {
          id: 101,
          question: 'البداية متى بقولك.',
          answer: 'البداية بقراراتك.',
          isLocked: false
        }
      ]
    },
    {
      id: 2,
      title: 'يخاف ما أكفل...',
      icon: '💪',
      color: '#9c27b0',
      questions: [
        {
          id: 201,
          question: 'أغلب المتدربات بلشين بنفس الشعور.',
          answer: 'بنفس الشعور.',
          isLocked: false
        }
      ]
    },
    {
      id: 3,
      title: 'شو عن خصوصيتي؟',
      icon: '🔒',
      color: '#2196f3',
      questions: [
        {
          id: 301,
          question: 'خصوصيتك خط أحمر',
          answer: 'نحن نحترم خصوصيتك بشكل كامل',
          isLocked: false
        }
      ]
    },
    {
      id: 4,
      title: 'وقتي قليل',
      icon: '⏰',
      color: '#4caf50',
      questions: [
        {
          id: 401,
          question: '30 دقيقة كافية لما تكون صح.',
          answer: 'برامجنا مصممة للمشغولات',
          isLocked: false
        }
      ]
    },
    {
      id: 5,
      title: 'متى أشوف فرق؟',
      icon: '📊',
      color: '#ff9800',
      questions: [
        {
          id: 501,
          question: 'الفرق يبدا قبل ما بيان.',
          answer: 'النتائج تبدأ من الأسبوع الأول',
          isLocked: false
        }
      ]
    },
    {
      id: 6,
      title: 'التدريب أونلاين؟',
      icon: '💻',
      color: '#00bcd4',
      questions: [
        {
          id: 601,
          question: 'أينما من بيتك وبوقتك.',
          answer: 'التدريب أونلاين بالكامل',
          isLocked: false
        }
      ]
    },
    {
      id: 7,
      title: 'النظام الغذائي؟',
      icon: '🍎',
      color: '#8bc34a',
      questions: [
        {
          id: 701,
          question: 'مرن وما فيه حرمان.',
          answer: 'خطة غذائية مرنة ومتوازنة',
          isLocked: false
        }
      ]
    },
    {
      id: 8,
      title: 'يحتاج معدات؟',
      icon: '🏋️',
      color: '#f44336',
      questions: [
        {
          id: 801,
          question: 'لا جسمك وحافزك كافيين.',
          answer: 'تمارين بوزن الجسم متوفرة',
          isLocked: true
        }
      ]
    },
    {
      id: 9,
      title: 'هل التدريب صعب؟',
      icon: '💪',
      color: '#673ab7',
      questions: [
        {
          id: 901,
          question: 'مناسب لكل المستويات',
          answer: 'برامج متدرجة حسب مستواك',
          isLocked: true
        }
      ]
    },
    {
      id: 10,
      title: 'كم المدة للنتيجة؟',
      icon: '⏱️',
      color: '#ff5722',
      questions: [
        {
          id: 1001,
          question: 'تختلف حسب الالتزام',
          answer: 'من 4-12 أسبوع للنتائج الملموسة',
          isLocked: true
        }
      ]
    }
  ]);
  
  // User Questions from Form
  const [userQuestions, setUserQuestions] = useState([
    {
      id: 1,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      question: 'هل يمكنني التدريب أثناء الحمل؟',
      date: '2025-01-05',
      status: 'pending', // pending, answered, archived
      answer: ''
    },
    {
      id: 2,
      name: 'ليلى محمود',
      email: 'layla@example.com',
      question: 'ما هي تكلفة البرنامج الشهري؟',
      date: '2025-01-04',
      status: 'answered',
      answer: 'تكلفة البرنامج الشهري 150$ مع متابعة كاملة'
    },
    {
      id: 3,
      name: 'نور الدين',
      email: 'noor@example.com',
      question: 'هل توجد خصومات للطلاب؟',
      date: '2025-01-03',
      status: 'pending',
      answer: ''
    }
  ]);
  
  // Section Settings
  const [sectionTitle, setSectionTitle] = useState('خريطة رحلتك');
  const [sectionSubtitle, setSectionSubtitle] = useState('كل نقطة سؤال... وكل طريق له جواب 🗺️');
  
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [answeringQuestion, setAnsweringQuestion] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('faq'); // faq, user-questions
  
  // FAQ Management
  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now(),
      title: '',
      icon: '❓',
      color: '#e91e63',
      questions: []
    };
    setFaqCategories([...faqCategories, newCategory]);
    setEditingCategory(newCategory.id);
  };
  
  const handleUpdateCategory = (id, field, value) => {
    setFaqCategories(faqCategories.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  
  const handleDeleteCategory = (id) => {
    setFaqCategories(faqCategories.filter(c => c.id !== id));
  };
  
  const handleAddQuestion = (categoryId) => {
    setFaqCategories(faqCategories.map(c => {
      if (c.id === categoryId) {
        const newQuestion = {
          id: Date.now(),
          question: '',
          answer: '',
          isLocked: false
        };
        return { ...c, questions: [...c.questions, newQuestion] };
      }
      return c;
    }));
  };
  
  const handleUpdateQuestion = (categoryId, questionId, field, value) => {
    setFaqCategories(faqCategories.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          questions: c.questions.map(q => q.id === questionId ? { ...q, [field]: value } : q)
        };
      }
      return c;
    }));
  };
  
  const handleDeleteQuestion = (categoryId, questionId) => {
    setFaqCategories(faqCategories.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          questions: c.questions.filter(q => q.id !== questionId)
        };
      }
      return c;
    }));
  };
  
  // User Questions Management
  const handleAnswerQuestion = (id, answer) => {
    setUserQuestions(userQuestions.map(q => 
      q.id === id ? { ...q, answer, status: 'answered' } : q
    ));
    setAnsweringQuestion(null);
  };
  
  const handleArchiveQuestion = (id) => {
    setUserQuestions(userQuestions.map(q => 
      q.id === id ? { ...q, status: 'archived' } : q
    ));
  };
  
  const handleDeleteUserQuestion = (id) => {
    setUserQuestions(userQuestions.filter(q => q.id !== id));
  };
  
  const handleSaveChanges = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(null), 3000);
    }, 2000);
  };
  
  return (
    <div className="faq">
      {/* Page Header */}
      <motion.div
        className="faq__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="faq__header-content">
          <div className="faq__title-section">
            <h1 className="faq__title">
              <HelpCircle size={32} />
              الأسئلة الشائعة
            </h1>
            <p className="faq__subtitle">
              قم بإدارة الأسئلة الشائعة وأسئلة المستخدمين
            </p>
          </div>
          
          <motion.button
            className="faq__save-btn"
            onClick={handleSaveChanges}
            disabled={isSaving}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSaving ? (
              <>
                <div className="spinner"></div>
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>حفظ التغييرات</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
      
      {/* Status Messages */}
      <AnimatePresence>
        {uploadStatus === 'success' && (
          <motion.div
            className="faq__alert faq__alert--success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Check size={20} />
            <span>تم حفظ التغييرات بنجاح!</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tabs */}
      <div className="faq__tabs">
        <button
          className={`faq__tab ${activeTab === 'faq' ? 'faq__tab--active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          <HelpCircle size={20} />
          الأسئلة الشائعة
        </button>
        <button
          className={`faq__tab ${activeTab === 'user-questions' ? 'faq__tab--active' : ''}`}
          onClick={() => setActiveTab('user-questions')}
        >
          <MessageSquare size={20} />
          أسئلة المستخدمين
          {userQuestions.filter(q => q.status === 'pending').length > 0 && (
            <span className="faq__tab-badge">
              {userQuestions.filter(q => q.status === 'pending').length}
            </span>
          )}
        </button>
      </div>
      
      {/* Main Content */}
      {activeTab === 'faq' && (
        <div className="faq__content">
          {/* Left Side - Editor */}
          <motion.div
            className="faq__editor-panel"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Section Settings */}
            <div className="section-settings-card">
              <h2 className="section-settings-card__title">إعدادات القسم</h2>
              
              <div className="form-group">
                <label className="form-label">العنوان</label>
                <input
                  type="text"
                  className="form-input"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">الوصف</label>
                <input
                  type="text"
                  className="form-input"
                  value={sectionSubtitle}
                  onChange={(e) => setSectionSubtitle(e.target.value)}
                />
              </div>
            </div>
            
            {/* Categories List */}
            <div className="categories-list-card">
              <div className="categories-list-card__header">
                <h2 className="categories-list-card__title">الفئات والأسئلة</h2>
                <button
                  className="categories-list-card__add-btn"
                  onClick={handleAddCategory}
                >
                  <Plus size={18} />
                  إضافة فئة
                </button>
              </div>
              
              <div className="categories-list">
                {faqCategories.map((category, index) => (
                  <div key={category.id} className="category-item">
                    {editingCategory === category.id ? (
                      <div className="category-item__form">
                        <div className="category-item__form-header">
                          <input
                            type="text"
                            className="category-item__icon-input"
                            value={category.icon}
                            onChange={(e) => handleUpdateCategory(category.id, 'icon', e.target.value)}
                            maxLength="2"
                          />
                          <input
                            type="color"
                            className="category-item__color-input"
                            value={category.color}
                            onChange={(e) => handleUpdateCategory(category.id, 'color', e.target.value)}
                          />
                          <button
                            className="category-item__save-btn"
                            onClick={() => setEditingCategory(null)}
                          >
                            <Check size={18} />
                          </button>
                        </div>
                        
                        <input
                          type="text"
                          className="category-item__input"
                          value={category.title}
                          onChange={(e) => handleUpdateCategory(category.id, 'title', e.target.value)}
                          placeholder="عنوان الفئة"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="category-item__header">
                          <div 
                            className="category-item__icon"
                            style={{ background: category.color }}
                          >
                            {category.icon}
                          </div>
                          <div className="category-item__info">
                            <h3 className="category-item__title">{category.title}</h3>
                            <span className="category-item__count">
                              {category.questions.length} سؤال
                            </span>
                          </div>
                          <div className="category-item__actions">
                            <button
                              className="category-item__action-btn"
                              onClick={() => setEditingCategory(category.id)}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="category-item__action-btn category-item__action-btn--danger"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="category-item__questions">
                          {category.questions.map(question => (
                            <div key={question.id} className="question-item">
                              {editingQuestion === question.id ? (
                                <div className="question-item__form">
                                  <input
                                    type="text"
                                    className="question-item__input"
                                    value={question.question}
                                    onChange={(e) => handleUpdateQuestion(category.id, question.id, 'question', e.target.value)}
                                    placeholder="السؤال"
                                  />
                                  <textarea
                                    className="question-item__textarea"
                                    value={question.answer}
                                    onChange={(e) => handleUpdateQuestion(category.id, question.id, 'answer', e.target.value)}
                                    placeholder="الجواب"
                                    rows="2"
                                  />
                                  <label className="question-item__checkbox">
                                    <input
                                      type="checkbox"
                                      checked={question.isLocked}
                                      onChange={(e) => handleUpdateQuestion(category.id, question.id, 'isLocked', e.target.checked)}
                                    />
                                    <span>مقفل 🔒</span>
                                  </label>
                                  <button
                                    className="question-item__save-btn"
                                    onClick={() => setEditingQuestion(null)}
                                  >
                                    <Check size={16} />
                                  </button>
                                </div>
                              ) : (
                                <div className="question-item__display">
                                  <div className="question-item__icon">
                                    {question.isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                                  </div>
                                  <div className="question-item__content">
                                    <div className="question-item__question">{question.question}</div>
                                    <div className="question-item__answer">{question.answer}</div>
                                  </div>
                                  <div className="question-item__actions">
                                    <button
                                      className="question-item__action-btn"
                                      onClick={() => setEditingQuestion(question.id)}
                                    >
                                      <Edit2 size={14} />
                                    </button>
                                    <button
                                      className="question-item__action-btn question-item__action-btn--danger"
                                      onClick={() => handleDeleteQuestion(category.id, question.id)}
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          
                          <button
                            className="category-item__add-question-btn"
                            onClick={() => handleAddQuestion(category.id)}
                          >
                            <Plus size={16} />
                            إضافة سؤال
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right Side - Preview */}
          <motion.div
            className="faq__preview-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="preview-card">
              <div className="preview-card__header">
                <h2 className="preview-card__title">
                  <Eye size={24} />
                  معاينة الخريطة الذهنية
                </h2>
              </div>
              
              <div className="faq-preview">
                <h2 className="faq-preview__title">{sectionTitle}</h2>
                <p className="faq-preview__subtitle">{sectionSubtitle}</p>
                
                <div className="mind-map">
                  {faqCategories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      className="mind-map-node"
                      style={{
                        '--node-color': category.color,
                        '--node-delay': `${index * 0.1}s`
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="mind-map-node__card">
                        <div className="mind-map-node__title">{category.title}</div>
                      </div>
                      
                      <div 
                        className="mind-map-node__icon"
                        style={{ background: category.color }}
                      >
                        <MapPin size={20} color="#ffffff" />
                      </div>
                      
                      <div className="mind-map-node__popup">
                        {category.questions[0]?.question || 'لا توجد أسئلة'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {activeTab === 'user-questions' && (
        <motion.div
          className="user-questions-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="user-questions-card">
            <h2 className="user-questions-card__title">
              أسئلة المستخدمين من الفورم
            </h2>
            
            <div className="user-questions-list">
              {userQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  className={`user-question-item user-question-item--${question.status}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="user-question-item__header">
                    <div className="user-question-item__user">
                      <div className="user-question-item__avatar">
                        <User size={20} />
                      </div>
                      <div className="user-question-item__info">
                        <h3 className="user-question-item__name">{question.name}</h3>
                        <div className="user-question-item__meta">
                          <Mail size={14} />
                          <span>{question.email}</span>
                        </div>
                        <div className="user-question-item__meta">
                          <Calendar size={14} />
                          <span>{question.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`user-question-item__status user-question-item__status--${question.status}`}>
                      {question.status === 'pending' && (
                        <>
                          <AlertCircle size={16} />
                          <span>قيد الانتظار</span>
                        </>
                      )}
                      {question.status === 'answered' && (
                        <>
                          <CheckCircle size={16} />
                          <span>تمت الإجابة</span>
                        </>
                      )}
                      {question.status === 'archived' && (
                        <>
                          <XCircle size={16} />
                          <span>مؤرشف</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="user-question-item__question">
                    <strong>السؤال:</strong> {question.question}
                  </div>
                  
                  {answeringQuestion === question.id ? (
                    <div className="user-question-item__answer-form">
                      <textarea
                        className="user-question-item__textarea"
                        value={question.answer}
                        onChange={(e) => setUserQuestions(userQuestions.map(q => 
                          q.id === question.id ? { ...q, answer: e.target.value } : q
                        ))}
                        placeholder="اكتب الإجابة..."
                        rows="3"
                      />
                      <div className="user-question-item__answer-actions">
                        <button
                          className="user-question-item__answer-btn"
                          onClick={() => handleAnswerQuestion(question.id, question.answer)}
                        >
                          <Check size={16} />
                          حفظ الإجابة
                        </button>
                        <button
                          className="user-question-item__cancel-btn"
                          onClick={() => setAnsweringQuestion(null)}
                        >
                          إلغاء
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {question.answer && (
                        <div className="user-question-item__answer">
                          <strong>الإجابة:</strong> {question.answer}
                        </div>
                      )}
                      
                      <div className="user-question-item__actions">
                        {question.status === 'pending' && (
                          <button
                            className="user-question-item__action-btn user-question-item__action-btn--primary"
                            onClick={() => setAnsweringQuestion(question.id)}
                          >
                            <MessageSquare size={16} />
                            إجابة
                          </button>
                        )}
                        {question.status === 'answered' && (
                          <button
                            className="user-question-item__action-btn"
                            onClick={() => setAnsweringQuestion(question.id)}
                          >
                            <Edit2 size={16} />
                            تعديل الإجابة
                          </button>
                        )}
                        <button
                          className="user-question-item__action-btn"
                          onClick={() => handleArchiveQuestion(question.id)}
                        >
                          أرشفة
                        </button>
                        <button
                          className="user-question-item__action-btn user-question-item__action-btn--danger"
                          onClick={() => handleDeleteUserQuestion(question.id)}
                        >
                          <Trash2 size={16} />
                          حذف
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
            
            {userQuestions.length === 0 && (
              <div className="user-questions-list__empty">
                <MessageSquare size={64} />
                <p>لا توجد أسئلة من المستخدمين</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FAQ;