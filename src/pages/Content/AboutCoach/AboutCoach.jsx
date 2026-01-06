import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Upload,
  Save,
  Check,
  AlertCircle,
  Eye,
  Image as ImageIcon,
  Trash2,
  Plus,
  X
} from 'lucide-react';
import './AboutCoach.scss';

const AboutCoach = () => {
  // Content State
  const [badge, setBadge] = useState('من أنا');
  const [title, setTitle] = useState('عن المدربة');
  const [mainDescription, setMainDescription] = useState(
    'مدربة لياقة بدنية معتمدة دولياً مع أكثر من 5 سنوات من الخبرة في تحويل حياة النساء. أؤمن بأن كل جسم فريد من نوعه، ولهذا أصمم برامج تدريب وتغذية مخصصة تتناسب احتياجاتك وأهدافك الشخصية.'
  );
  const [highlightText, setHighlightText] = useState(
    'ساعدت أكثر من 500 مدربة على تحقيق أهدافهن في اللياقة والصحة من خلال برامج شاملة تجمع بين التدريب الفعال، التغذية السليمة، والدعم النفسي المستمر.'
  );
  
  // Image State
  const [coachImage, setCoachImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  // Features State
  const [features, setFeatures] = useState([
    { id: 1, icon: '🍎', title: 'أنظمة غذائية مخصصة', description: 'خطط تغذية مصممة خصيصاً لك' },
    { id: 2, icon: '💪', title: 'تدريب شخصي أونلاين', description: 'جلسات تدريب متابعة ومتنوعة يومية' },
    { id: 3, icon: '📊', title: 'متابعة مستمرة', description: 'دعم ومتابعة على مدار الأسبوع' },
    { id: 4, icon: '🏋️‍♀️', title: 'تنشيف، نحت، زيادة عضل', description: 'برامج شاملة لتحقيق أهدافك' }
  ]);
  
  const [editingFeature, setEditingFeature] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle Image Upload
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImage(file);
    }
  };
  
  const processImage = (file) => {
    if (!file.type.startsWith('image/')) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setCoachImage(file);
    };
    reader.readAsDataURL(file);
  };
  
  // Features Management
  const handleAddFeature = () => {
    const newFeature = {
      id: Date.now(),
      icon: '✨',
      title: '',
      description: ''
    };
    setFeatures([...features, newFeature]);
    setEditingFeature(newFeature.id);
  };
  
  const handleUpdateFeature = (id, field, value) => {
    setFeatures(features.map(f => f.id === id ? { ...f, [field]: value } : f));
  };
  
  const handleDeleteFeature = (id) => {
    setFeatures(features.filter(f => f.id !== id));
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
    <div className="about-coach">
      {/* Page Header */}
      <motion.div
        className="about-coach__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="about-coach__header-content">
          <div className="about-coach__title-section">
            <h1 className="about-coach__title">
              <Star size={32} />
              عن المدربة
            </h1>
            <p className="about-coach__subtitle">
              قم بتحرير معلومات المدربة وصورتها الشخصية
            </p>
          </div>
          
          <motion.button
            className="about-coach__save-btn"
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
            className="about-coach__alert about-coach__alert--success"
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
            className="about-coach__alert about-coach__alert--error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle size={20} />
            <span>خطأ: يرجى رفع صورة صالحة (أقل من 5MB)</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="about-coach__content">
        {/* Left Side - Editor */}
        <motion.div
          className="about-coach__editor-panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Image Upload */}
          <div className="image-upload-card">
            <h2 className="image-upload-card__title">صورة المدربة</h2>
            
            {!imagePreview ? (
              <div
                className="image-dropzone"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="image-dropzone__input"
                />
                
                <div className="image-dropzone__content">
                  <div className="image-dropzone__icon">
                    <Upload size={40} />
                  </div>
                  <p className="image-dropzone__text">انقر لرفع صورة</p>
                  <p className="image-dropzone__hint">PNG, JPG (max 5MB)</p>
                </div>
              </div>
            ) : (
              <div className="image-preview">
                <img src={imagePreview} alt="Coach" className="image-preview__img" />
                <div className="image-preview__actions">
                  <button
                    className="image-preview__btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={16} />
                    تغيير
                  </button>
                  <button
                    className="image-preview__btn image-preview__btn--danger"
                    onClick={() => {
                      setImagePreview(null);
                      setCoachImage(null);
                    }}
                  >
                    <Trash2 size={16} />
                    حذف
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Content Editor */}
          <div className="content-editor-card">
            <h2 className="content-editor-card__title">المحتوى</h2>
            
            <div className="form-group">
              <label className="form-label">الشارة</label>
              <input
                type="text"
                className="form-input"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">العنوان الرئيسي</label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">الوصف الرئيسي</label>
              <textarea
                className="form-textarea"
                value={mainDescription}
                onChange={(e) => setMainDescription(e.target.value)}
                rows="4"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">النص المميز (وردي)</label>
              <textarea
                className="form-textarea form-textarea--highlight"
                value={highlightText}
                onChange={(e) => setHighlightText(e.target.value)}
                rows="3"
              />
            </div>
          </div>
          
          {/* Features Editor */}
          <div className="features-editor-card">
            <div className="features-editor-card__header">
              <h2 className="features-editor-card__title">المميزات</h2>
              <button
                className="features-editor-card__add-btn"
                onClick={handleAddFeature}
              >
                <Plus size={18} />
                إضافة ميزة
              </button>
            </div>
            
            <div className="features-list">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`feature-item ${editingFeature === feature.id ? 'feature-item--editing' : ''}`}
                >
                  {editingFeature === feature.id ? (
                    <div className="feature-item__form">
                      <div className="feature-item__form-header">
                        <input
                          type="text"
                          className="feature-item__icon-input"
                          value={feature.icon}
                          onChange={(e) => handleUpdateFeature(feature.id, 'icon', e.target.value)}
                          maxLength="2"
                        />
                        <button
                          className="feature-item__save-btn"
                          onClick={() => setEditingFeature(null)}
                        >
                          <Check size={18} />
                        </button>
                      </div>
                      
                      <input
                        type="text"
                        className="feature-item__input"
                        value={feature.title}
                        onChange={(e) => handleUpdateFeature(feature.id, 'title', e.target.value)}
                        placeholder="العنوان"
                      />
                      
                      <input
                        type="text"
                        className="feature-item__input"
                        value={feature.description}
                        onChange={(e) => handleUpdateFeature(feature.id, 'description', e.target.value)}
                        placeholder="الوصف"
                      />
                    </div>
                  ) : (
                    <div className="feature-item__display">
                      <div className="feature-item__icon">{feature.icon}</div>
                      <div className="feature-item__content">
                        <div className="feature-item__title">{feature.title}</div>
                        <div className="feature-item__description">{feature.description}</div>
                      </div>
                      <div className="feature-item__actions">
                        <button
                          className="feature-item__action-btn"
                          onClick={() => setEditingFeature(feature.id)}
                        >
                          <Star size={16} />
                        </button>
                        <button
                          className="feature-item__action-btn feature-item__action-btn--danger"
                          onClick={() => handleDeleteFeature(feature.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Right Side - Preview */}
        <motion.div
          className="about-coach__preview-panel"
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
            
            <div className="about-preview">
              <div className="about-preview__content">
                {badge && (
                  <div className="about-preview__badge">{badge}</div>
                )}
                
                <h2 className="about-preview__title">{title}</h2>
                
                <div className="about-preview__layout">
                  <div className="about-preview__text">
                    <p className="about-preview__description">
                      {mainDescription}
                    </p>
                    
                    {highlightText && (
                      <p className="about-preview__highlight">
                        {highlightText}
                      </p>
                    )}
                  </div>
                  
                  <div className="about-preview__image-container">
                    {imagePreview ? (
                      <div className="about-preview__image-wrapper">
                        <img src={imagePreview} alt="Coach" className="about-preview__image" />
                        <div className="about-preview__badge-overlay">
                          <Check size={24} />
                          مدربة معتمدة
                        </div>
                      </div>
                    ) : (
                      <div className="about-preview__image-placeholder">
                        <ImageIcon size={48} />
                        <span>صورة المدربة</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {features.length > 0 && (
                  <div className="about-preview__features">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.id}
                        className="about-feature-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="about-feature-card__icon">
                          {feature.icon}
                        </div>
                        <div className="about-feature-card__content">
                          <h3 className="about-feature-card__title">{feature.title}</h3>
                          <p className="about-feature-card__description">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                <button className="about-preview__cta">
                  ابدئي رحلتك الآن
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutCoach;