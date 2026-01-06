import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Upload,
  Save,
  Check,
  AlertCircle,
  Eye,
  Plus,
  Edit2,
  Trash2,
  Star,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import './Testimonials.scss';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'سارة أحمد',
      title: 'مهندسة معمارية',
      rating: 5,
      text: 'تجربة رائعة! نزلت 12 كيلو في 3 شهور مع برنامج رند المخصص. الدعم والمتابعة المستمرة كانت رائعة',
      image: null
    },
    {
      id: 2,
      name: 'ليلى محمود',
      title: 'طبيبة',
      rating: 5,
      text: 'أفضل مدربة تعاملت معها! برنامج التنشيف كان فعال جداً والنتائج ظهرت بسرعة. شكراً رند',
      image: null
    },
    {
      id: 3,
      name: 'نور الدين',
      title: 'مصممة جرافيك',
      rating: 5,
      text: 'التدريب الأونلاين كان مريح جداً بالنسبة لي. رند محترمة وتفهم احتياجاتك تماماً',
      image: null
    }
  ]);
  
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRefs = useRef({});
  
  // Section Settings
  const [sectionBadge, setSectionBadge] = useState('آراء المتدربات');
  const [sectionTitle, setSectionTitle] = useState('قصص نجاح ملهمة');
  const [sectionDescription, setSectionDescription] = useState(
    'استمعي لتجارب متدرباتنا وكيف غيّرت حياتهن للأفضل'
  );
  
  const handleAddTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: '',
      title: '',
      rating: 5,
      text: '',
      image: null
    };
    setTestimonials([...testimonials, newTestimonial]);
    setEditingTestimonial(newTestimonial.id);
  };
  
  const handleUpdateTestimonial = (id, field, value) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };
  
  const handleDeleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };
  
  const handleImageSelect = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setUploadStatus('error');
        setTimeout(() => setUploadStatus(null), 3000);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateTestimonial(id, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSaveChanges = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(null), 3000);
    }, 2000);
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };
  
  return (
    <div className="testimonials">
      {/* Page Header */}
      <motion.div
        className="testimonials__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="testimonials__header-content">
          <div className="testimonials__title-section">
            <h1 className="testimonials__title">
              <MessageSquare size={32} />
              آراء العملاء
            </h1>
            <p className="testimonials__subtitle">
              قم بإدارة تقييمات وآراء العملاء
            </p>
          </div>
          
          <motion.button
            className="testimonials__save-btn"
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
            className="testimonials__alert testimonials__alert--success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Check size={20} />
            <span>تم حفظ التغييرات بنجاح!</span>
          </motion.div>
        )}
        
        {uploadStatus === 'error' && (
          <motion.div
            className="testimonials__alert testimonials__alert--error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle size={20} />
            <span>خطأ: يرجى رفع صورة صالحة</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="testimonials__content">
        {/* Left Side - Editor */}
        <motion.div
          className="testimonials__editor-panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Section Settings */}
          <div className="section-settings-card">
            <h2 className="section-settings-card__title">إعدادات القسم</h2>
            
            <div className="form-group">
              <label className="form-label">الشارة</label>
              <input
                type="text"
                className="form-input"
                value={sectionBadge}
                onChange={(e) => setSectionBadge(e.target.value)}
              />
            </div>
            
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
              <textarea
                className="form-textarea"
                value={sectionDescription}
                onChange={(e) => setSectionDescription(e.target.value)}
                rows="2"
              />
            </div>
          </div>
          
          {/* Testimonials List */}
          <div className="testimonials-list-card">
            <div className="testimonials-list-card__header">
              <h2 className="testimonials-list-card__title">قائمة الآراء</h2>
              <button
                className="testimonials-list-card__add-btn"
                onClick={handleAddTestimonial}
              >
                <Plus size={18} />
                إضافة رأي
              </button>
            </div>
            
            <div className="testimonials-list">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className={`testimonial-item ${editingTestimonial === testimonial.id ? 'testimonial-item--editing' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {editingTestimonial === testimonial.id ? (
                      <div className="testimonial-item__form">
                        <div className="testimonial-item__form-header">
                          <div className="testimonial-item__image-upload">
                            <input
                              ref={el => fileInputRefs.current[testimonial.id] = el}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageSelect(testimonial.id, e)}
                              className="testimonial-item__image-input"
                            />
                            
                            {testimonial.image ? (
                              <div className="testimonial-item__image-preview">
                                <img src={testimonial.image} alt="" />
                                <button
                                  className="testimonial-item__image-remove"
                                  onClick={() => handleUpdateTestimonial(testimonial.id, 'image', null)}
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <div
                                className="testimonial-item__image-placeholder"
                                onClick={() => fileInputRefs.current[testimonial.id]?.click()}
                              >
                                <Upload size={20} />
                              </div>
                            )}
                          </div>
                          
                          <button
                            className="testimonial-item__save-btn"
                            onClick={() => setEditingTestimonial(null)}
                          >
                            <Check size={18} />
                          </button>
                        </div>
                        
                        <input
                          type="text"
                          className="testimonial-item__input"
                          value={testimonial.name}
                          onChange={(e) => handleUpdateTestimonial(testimonial.id, 'name', e.target.value)}
                          placeholder="الاسم"
                        />
                        
                        <input
                          type="text"
                          className="testimonial-item__input"
                          value={testimonial.title}
                          onChange={(e) => handleUpdateTestimonial(testimonial.id, 'title', e.target.value)}
                          placeholder="المهنة"
                        />
                        
                        <div className="testimonial-item__rating-input">
                          <label>التقييم:</label>
                          <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                className={`rating-star ${star <= testimonial.rating ? 'rating-star--active' : ''}`}
                                onClick={() => handleUpdateTestimonial(testimonial.id, 'rating', star)}
                              >
                                <Star size={20} />
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <textarea
                          className="testimonial-item__textarea"
                          value={testimonial.text}
                          onChange={(e) => handleUpdateTestimonial(testimonial.id, 'text', e.target.value)}
                          placeholder="نص الرأي..."
                          rows="3"
                        />
                      </div>
                    ) : (
                      <div className="testimonial-item__display">
                        <div className="testimonial-item__avatar">
                          {testimonial.image ? (
                            <img src={testimonial.image} alt={testimonial.name} />
                          ) : (
                            <div className="testimonial-item__avatar-placeholder">
                              {testimonial.name.charAt(0) || '?'}
                            </div>
                          )}
                        </div>
                        
                        <div className="testimonial-item__content">
                          <div className="testimonial-item__name">{testimonial.name}</div>
                          <div className="testimonial-item__title">{testimonial.title}</div>
                          <div className="testimonial-item__stars">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} size={14} fill="#ffc107" color="#ffc107" />
                            ))}
                          </div>
                          <p className="testimonial-item__text">{testimonial.text}</p>
                        </div>
                        
                        <div className="testimonial-item__actions">
                          <button
                            className="testimonial-item__action-btn"
                            onClick={() => setEditingTestimonial(testimonial.id)}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            className="testimonial-item__action-btn testimonial-item__action-btn--danger"
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {testimonials.length === 0 && (
              <div className="testimonials-list__empty">
                <MessageSquare size={48} />
                <p>لا توجد آراء حالياً</p>
                <p className="testimonials-list__empty-hint">
                  انقر على "إضافة رأي" لإضافة رأي جديد
                </p>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Right Side - Preview */}
        <motion.div
          className="testimonials__preview-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="preview-card">
            <div className="preview-card__header">
              <h2 className="preview-card__title">
                <Eye size={24} />
                معاينة على الموقع
              </h2>
            </div>
            
            <div className="testimonials-preview">
              {sectionBadge && (
                <div className="testimonials-preview__badge">{sectionBadge}</div>
              )}
              
              <h2 className="testimonials-preview__title">{sectionTitle}</h2>
              <p className="testimonials-preview__description">{sectionDescription}</p>
              
              {testimonials.length > 0 ? (
                <div className="testimonials-preview__slider">
                  <button
                    className="testimonials-preview__nav testimonials-preview__nav--prev"
                    onClick={prevSlide}
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className="testimonials-preview__cards">
                    {testimonials.slice(currentSlide * 3, (currentSlide * 3) + 3).map((testimonial, index) => (
                      <motion.div
                        key={testimonial.id}
                        className="testimonial-preview-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="testimonial-preview-card__header">
                          <div className="testimonial-preview-card__avatar">
                            {testimonial.image ? (
                              <img src={testimonial.image} alt={testimonial.name} />
                            ) : (
                              <div className="testimonial-preview-card__avatar-placeholder">
                                {testimonial.name.charAt(0) || '?'}
                              </div>
                            )}
                          </div>
                          <div className="testimonial-preview-card__info">
                            <h3 className="testimonial-preview-card__name">{testimonial.name}</h3>
                            <p className="testimonial-preview-card__title">{testimonial.title}</p>
                          </div>
                        </div>
                        
                        <div className="testimonial-preview-card__stars">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                          ))}
                        </div>
                        
                        <p className="testimonial-preview-card__text">{testimonial.text}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <button
                    className="testimonials-preview__nav testimonials-preview__nav--next"
                    onClick={nextSlide}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <div className="testimonials-preview__dots">
                    {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
                      <button
                        key={i}
                        className={`testimonials-preview__dot ${currentSlide === i ? 'testimonials-preview__dot--active' : ''}`}
                        onClick={() => setCurrentSlide(i)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="testimonials-preview__empty">
                  <MessageSquare size={64} />
                  <p>لا توجد آراء لعرضها</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;