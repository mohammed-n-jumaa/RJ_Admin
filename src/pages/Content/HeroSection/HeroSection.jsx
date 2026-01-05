import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  Upload,
  Play,
  Pause,
  Eye,
  Save,
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import './HeroSection.scss';

const HeroSection = () => {
  // Video State
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Content State
  const [badge, setBadge] = useState('برنامج تدريبي مخصص لكِ');
  const [mainTitle, setMainTitle] = useState('درّبي جسمك بثقة');
  const [subTitle, setSubTitle] = useState('برنامج مصمم خصيصًا لك');
  const [description, setDescription] = useState(
    'تدريب وتغذية مبنية على جسمك، هدفك، ونمط حياتك\nابدئي رحلتك نحو النسخة الأفضل منك'
  );
  
  // Stats State
  const [stats, setStats] = useState([
    { id: 1, value: '500+', label: 'متدربة سعيدة' },
    { id: 2, value: '5+', label: 'سنوات خبرة' },
    { id: 3, value: '98%', label: 'نسبة النجاح' }
  ]);
  
  const [editingStat, setEditingStat] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Handle Video Upload
  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processVideo(file);
    }
  };
  
  const processVideo = (file) => {
    // Validate file type
    if (!file.type.startsWith('video/')) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
      return;
    }
    
    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setVideoPreview(reader.result);
      setVideo(file);
    };
    reader.readAsDataURL(file);
  };
  
  // Handle Drag and Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processVideo(file);
    }
  };
  
  // Video Controls
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };
  
  // Stats Management
  const handleAddStat = () => {
    const newStat = {
      id: Date.now(),
      value: '',
      label: ''
    };
    setStats([...stats, newStat]);
    setEditingStat(newStat.id);
  };
  
  const handleEditStat = (id) => {
    setEditingStat(id);
  };
  
  const handleUpdateStat = (id, field, value) => {
    setStats(stats.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };
  
  const handleDeleteStat = (id) => {
    setStats(stats.filter(stat => stat.id !== id));
  };
  
  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(null), 3000);
    }, 2000);
  };
  
  return (
    <div className="hero-section">
      {/* Page Header */}
      <motion.div
        className="hero-section__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="hero-section__header-content">
          <div className="hero-section__title-section">
            <h1 className="hero-section__title">
              <Video size={32} />
              قسم البطل (Hero Section)
            </h1>
            <p className="hero-section__subtitle">
              قم بتحرير محتوى القسم الرئيسي وفيديو الخلفية
            </p>
          </div>
          
          <motion.button
            className="hero-section__save-btn"
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
            className="hero-section__alert hero-section__alert--success"
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
            className="hero-section__alert hero-section__alert--error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle size={20} />
            <span>خطأ: يرجى رفع فيديو صالح (أقل من 50MB)</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="hero-section__content">
        {/* Left Side - Video & Preview */}
        <motion.div
          className="hero-section__video-panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Video Upload */}
          <div className="video-upload-card">
            <h2 className="video-upload-card__title">
              <Video size={24} />
              فيديو الخلفية
            </h2>
            
            {!videoPreview ? (
              <div
                className="video-dropzone"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                  className="video-dropzone__input"
                />
                
                <div className="video-dropzone__content">
                  <motion.div
                    className="video-dropzone__icon"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Upload size={48} />
                  </motion.div>
                  
                  <h3 className="video-dropzone__title">
                    اسحب وأفلت الفيديو هنا
                  </h3>
                  <p className="video-dropzone__subtitle">أو</p>
                  <button className="video-dropzone__button">
                    تصفح الملفات
                  </button>
                  
                  <div className="video-dropzone__info">
                    <p>الصيغ المدعومة: MP4, WEBM, MOV</p>
                    <p>الحجم الأقصى: 50MB</p>
                    <p>الأبعاد الموصى بها: 1920x1080</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="video-preview">
                <div className="video-preview__container">
                  <video
                    ref={videoRef}
                    src={videoPreview}
                    className="video-preview__video"
                    loop
                    muted
                    playsInline
                  />
                  
                  <div className="video-preview__overlay">
                    <button
                      className="video-preview__play-btn"
                      onClick={toggleVideo}
                    >
                      {isVideoPlaying ? <Pause size={32} /> : <Play size={32} />}
                    </button>
                  </div>
                </div>
                
                <div className="video-preview__actions">
                  <button
                    className="video-preview__action-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={18} />
                    تغيير الفيديو
                  </button>
                  
                  <button
                    className="video-preview__action-btn video-preview__action-btn--danger"
                    onClick={() => {
                      setVideo(null);
                      setVideoPreview(null);
                      setIsVideoPlaying(false);
                    }}
                  >
                    <Trash2 size={18} />
                    حذف
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Live Preview */}
          <div className="live-preview-card">
            <div className="live-preview-card__header">
              <h2 className="live-preview-card__title">
                <Eye size={24} />
                معاينة مباشرة
              </h2>
            </div>
            
            <div className="hero-preview">
              <div className="hero-preview__video-bg">
                {videoPreview ? (
                  <video
                    src={videoPreview}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-preview__video"
                  />
                ) : (
                  <div className="hero-preview__placeholder">
                    <ImageIcon size={48} />
                    <span>فيديو الخلفية</span>
                  </div>
                )}
                <div className="hero-preview__overlay"></div>
              </div>
              
              <div className="hero-preview__content">
                {badge && (
                  <div className="hero-preview__badge">
                    <span className="hero-preview__badge-dot"></span>
                    {badge}
                  </div>
                )}
                
                <h1 className="hero-preview__main-title">{mainTitle}</h1>
                <h2 className="hero-preview__sub-title">{subTitle}</h2>
                
                <p className="hero-preview__description">
                  {description.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < description.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                
                <div className="hero-preview__buttons">
                  <button className="hero-preview__btn hero-preview__btn--primary">
                    ابدئي الآن ←
                  </button>
                  <button className="hero-preview__btn hero-preview__btn--secondary">
                    ▶ تعرّفي على البرامج
                  </button>
                </div>
                
                {stats.length > 0 && (
                  <div className="hero-preview__stats">
                    {stats.map(stat => (
                      <div key={stat.id} className="hero-preview__stat">
                        <div className="hero-preview__stat-value">{stat.value}</div>
                        <div className="hero-preview__stat-label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Right Side - Content Editor */}
        <motion.div
          className="hero-section__editor-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Content Editor */}
          <div className="content-editor-card">
            <h2 className="content-editor-card__title">
              <Edit2 size={24} />
              تحرير المحتوى
            </h2>
            
            <div className="form-group">
              <label className="form-label">الشارة العلوية</label>
              <input
                type="text"
                className="form-input"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="برنامج تدريبي مخصص لكِ"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">العنوان الرئيسي</label>
              <input
                type="text"
                className="form-input"
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
                placeholder="درّبي جسمك بثقة"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">العنوان الفرعي</label>
              <input
                type="text"
                className="form-input form-input--highlight"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="برنامج مصمم خصيصًا لك"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">الوصف</label>
              <textarea
                className="form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="أدخل الوصف..."
                rows="4"
              />
              <p className="form-hint">
                استخدم Enter للانتقال إلى سطر جديد
              </p>
            </div>
          </div>
          
          {/* Stats Editor */}
          <div className="stats-editor-card">
            <div className="stats-editor-card__header">
              <h2 className="stats-editor-card__title">الإحصائيات</h2>
              <button
                className="stats-editor-card__add-btn"
                onClick={handleAddStat}
              >
                <Plus size={18} />
                إضافة إحصائية
              </button>
            </div>
            
            <div className="stats-list">
              <AnimatePresence>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    className={`stat-item ${editingStat === stat.id ? 'stat-item--editing' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {editingStat === stat.id ? (
                      <div className="stat-item__form">
                        <div className="stat-item__inputs">
                          <input
                            type="text"
                            className="stat-item__input"
                            value={stat.value}
                            onChange={(e) => handleUpdateStat(stat.id, 'value', e.target.value)}
                            placeholder="500+"
                          />
                          <input
                            type="text"
                            className="stat-item__input"
                            value={stat.label}
                            onChange={(e) => handleUpdateStat(stat.id, 'label', e.target.value)}
                            placeholder="متدربة سعيدة"
                          />
                        </div>
                        <button
                          className="stat-item__save-btn"
                          onClick={() => setEditingStat(null)}
                        >
                          <Check size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="stat-item__display">
                        <div className="stat-item__content">
                          <div className="stat-item__value">{stat.value}</div>
                          <div className="stat-item__label">{stat.label}</div>
                        </div>
                        <div className="stat-item__actions">
                          <button
                            className="stat-item__action-btn"
                            onClick={() => handleEditStat(stat.id)}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            className="stat-item__action-btn stat-item__action-btn--danger"
                            onClick={() => handleDeleteStat(stat.id)}
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
            
            {stats.length === 0 && (
              <div className="stats-list__empty">
                <p>لا توجد إحصائيات. انقر على "إضافة إحصائية" للبدء.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;