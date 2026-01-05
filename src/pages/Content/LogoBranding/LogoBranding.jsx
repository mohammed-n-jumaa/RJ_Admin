import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Check, 
  AlertCircle,
  Download,
  Trash2,
  Eye,
  RefreshCw
} from 'lucide-react';
import './LogoBranding.scss';

const LogoBranding = () => {
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };
  
  // Process and validate file
  const processFile = (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
      setLogo(file);
    };
    reader.readAsDataURL(file);
  };
  
  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };
  
  // Handle logo upload/save
  const handleSaveLogo = async () => {
    if (!logo) return;
    
    setIsUploading(true);
    
    // Simulate upload (replace with actual API call)
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus('success');
      
      // Reset success message after 3 seconds
      setTimeout(() => setUploadStatus(null), 3000);
    }, 2000);
  };
  
  // Handle logo removal
  const handleRemoveLogo = () => {
    setLogo(null);
    setLogoPreview(null);
    setUploadStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Download current logo
  const handleDownloadLogo = () => {
    if (logoPreview) {
      const link = document.createElement('a');
      link.href = logoPreview;
      link.download = 'logo.png';
      link.click();
    }
  };
  
  return (
    <div className="logo-branding">
      {/* Page Header */}
      <motion.div
        className="logo-branding__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="logo-branding__header-content">
          <div className="logo-branding__title-section">
            <h1 className="logo-branding__title">
              <ImageIcon size={32} />
              الشعار والعلامة التجارية
            </h1>
            <p className="logo-branding__subtitle">
              قم برفع شعار الموقع الخاص بك - سيظهر في الهيدر وجميع صفحات الموقع
            </p>
          </div>
          
          {logo && (
            <motion.button
              className="logo-branding__save-btn"
              onClick={handleSaveLogo}
              disabled={isUploading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isUploading ? (
                <>
                  <RefreshCw size={18} className="spinning" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Check size={18} />
                  <span>حفظ التغييرات</span>
                </>
              )}
            </motion.button>
          )}
        </div>
      </motion.div>
      
      {/* Status Messages */}
      <AnimatePresence>
        {uploadStatus === 'success' && (
          <motion.div
            className="logo-branding__alert logo-branding__alert--success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Check size={20} />
            <span>تم حفظ الشعار بنجاح!</span>
          </motion.div>
        )}
        
        {uploadStatus === 'error' && (
          <motion.div
            className="logo-branding__alert logo-branding__alert--error"
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
      <div className="logo-branding__content">
        {/* Upload Section */}
        <motion.div
          className="logo-branding__upload-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="upload-card">
            <h2 className="upload-card__title">رفع الشعار</h2>
            
            {!logoPreview ? (
              <div
                className={`upload-zone ${isDragging ? 'upload-zone--dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="upload-zone__input"
                />
                
                <div className="upload-zone__content">
                  <motion.div
                    className="upload-zone__icon"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Upload size={48} />
                  </motion.div>
                  
                  <h3 className="upload-zone__title">
                    اسحب وأفلت الصورة هنا
                  </h3>
                  <p className="upload-zone__subtitle">أو</p>
                  <button className="upload-zone__button">
                    تصفح الملفات
                  </button>
                  
                  <div className="upload-zone__info">
                    <p>الصيغ المدعومة: PNG, JPG, SVG, WEBP</p>
                    <p>الحجم الأقصى: 5MB</p>
                    <p>الأبعاد الموصى بها: 200x60 بكسل</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="logo-preview">
                <div className="logo-preview__header">
                  <h3 className="logo-preview__title">معاينة الشعار</h3>
                  <div className="logo-preview__actions">
                    <motion.button
                      className="logo-preview__action-btn"
                      onClick={handleDownloadLogo}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="تحميل"
                    >
                      <Download size={18} />
                    </motion.button>
                    <motion.button
                      className="logo-preview__action-btn logo-preview__action-btn--danger"
                      onClick={handleRemoveLogo}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
                
                <div className="logo-preview__image-container">
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="logo-preview__image"
                  />
                </div>
                
                {logo && (
                  <div className="logo-preview__info">
                    <div className="logo-preview__info-item">
                      <span className="logo-preview__info-label">اسم الملف:</span>
                      <span className="logo-preview__info-value">{logo.name}</span>
                    </div>
                    <div className="logo-preview__info-item">
                      <span className="logo-preview__info-label">الحجم:</span>
                      <span className="logo-preview__info-value">
                        {(logo.size / 1024).toFixed(2)} KB
                      </span>
                    </div>
                    <div className="logo-preview__info-item">
                      <span className="logo-preview__info-label">النوع:</span>
                      <span className="logo-preview__info-value">{logo.type}</span>
                    </div>
                  </div>
                )}
                
                <button
                  className="logo-preview__change-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={18} />
                  تغيير الشعار
                </button>
              </div>
            )}
          </div>
          
          {/* Guidelines */}
          <div className="guidelines-card">
            <h3 className="guidelines-card__title">
              💡 إرشادات الشعار
            </h3>
            <ul className="guidelines-card__list">
              <li>استخدم خلفية شفافة (PNG) للحصول على أفضل نتيجة</li>
              <li>تأكد من وضوح الشعار على الخلفيات الداكنة والفاتحة</li>
              <li>يُفضل استخدام شعار أفقي بنسبة 3:1</li>
              <li>تجنب النصوص الصغيرة جداً التي قد لا تظهر بوضوح</li>
              <li>احرص على دقة عالية للشعار (300 DPI على الأقل)</li>
            </ul>
          </div>
        </motion.div>
        
        {/* Preview Section */}
        <motion.div
          className="logo-branding__preview-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="preview-card">
            <div className="preview-card__header">
              <h2 className="preview-card__title">
                <Eye size={24} />
                معاينة الموقع
              </h2>
              <p className="preview-card__subtitle">
                كيف سيظهر الشعار في الموقع
              </p>
            </div>
            
            {/* Website Preview */}
            <div className="website-preview">
              {/* Header Preview */}
              <div className="website-preview__header">
                <div className="website-preview__logo-container">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="website-preview__logo"
                    />
                  ) : (
                    <div className="website-preview__logo-placeholder">
                      <ImageIcon size={32} />
                      <span>RAND JARAR</span>
                    </div>
                  )}
                </div>
                
                <div className="website-preview__nav">
                  <span>الرئيسية</span>
                  <span>الأسئلة الشائعة</span>
                  <span>عن المدربة</span>
                  <span>آراء المتدربات</span>
                </div>
                
                <button className="website-preview__cta">
                  احجزي الآن
                </button>
              </div>
              
              {/* Content Preview */}
              <div className="website-preview__content">
                <div className="website-preview__hero">
                  <div className="website-preview__hero-text">
                    <h1>ابدأي رحلتك نحو جسم أقوى</h1>
                    <p>برامج تدريبية مخصصة مع المدربة رند جرار</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Logo Variations */}
            <div className="logo-variations">
              <h3 className="logo-variations__title">الشعار على خلفيات مختلفة</h3>
              
              <div className="logo-variations__grid">
                <div className="logo-variation logo-variation--light">
                  <span className="logo-variation__label">خلفية فاتحة</span>
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo on light" />
                  ) : (
                    <div className="logo-variation__placeholder">
                      <ImageIcon size={24} />
                    </div>
                  )}
                </div>
                
                <div className="logo-variation logo-variation--dark">
                  <span className="logo-variation__label">خلفية داكنة</span>
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo on dark" />
                  ) : (
                    <div className="logo-variation__placeholder">
                      <ImageIcon size={24} />
                    </div>
                  )}
                </div>
                
                <div className="logo-variation logo-variation--pink">
                  <span className="logo-variation__label">خلفية وردية</span>
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo on pink" />
                  ) : (
                    <div className="logo-variation__placeholder">
                      <ImageIcon size={24} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LogoBranding;