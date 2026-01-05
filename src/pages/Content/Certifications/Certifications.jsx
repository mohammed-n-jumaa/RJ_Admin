import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Medal,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Check,
  AlertCircle,
  Eye,
  GripVertical
} from 'lucide-react';
import './Certifications.scss';

const Certifications = () => {
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      title: 'موثق من قبل (International)',
      organization: 'ISSA - International Sports Sciences Association',
      verified: true,
      icon: '🏆'
    },
    {
      id: 2,
      title: 'موثق من قبل',
      organization: 'ACE - American Council on Exercise',
      verified: true,
      icon: '💪'
    },
    {
      id: 3,
      title: 'موثق من قبل',
      organization: 'NSCA - National Strength & Conditioning Association',
      verified: true,
      icon: '⚡'
    }
  ]);
  
  const [editingCert, setEditingCert] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  
  const handleAddCertification = () => {
    const newCert = {
      id: Date.now(),
      title: '',
      organization: '',
      verified: false,
      icon: '🎖️'
    };
    setCertifications([...certifications, newCert]);
    setEditingCert(newCert.id);
  };
  
  const handleEditCert = (id) => {
    setEditingCert(id);
  };
  
  const handleUpdateCert = (id, field, value) => {
    setCertifications(certifications.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };
  
  const handleDeleteCert = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };
  
  const handleSaveCert = (id) => {
    setEditingCert(null);
  };
  
  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(null), 3000);
    }, 2000);
  };
  
  // Drag and Drop functionality
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };
  
  const handleDragOver = (e, index) => {
    e.preventDefault();
  };
  
  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newCertifications = [...certifications];
    const [draggedItem] = newCertifications.splice(draggedIndex, 1);
    newCertifications.splice(index, 0, draggedItem);
    
    setCertifications(newCertifications);
    setDraggedIndex(null);
  };
  
  return (
    <div className="certifications">
      {/* Page Header */}
      <motion.div
        className="certifications__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="certifications__header-content">
          <div className="certifications__title-section">
            <h1 className="certifications__title">
              <Medal size={32} />
              الشهادات والدورات
            </h1>
            <p className="certifications__subtitle">
              قم بإدارة شهاداتك المهنية والدورات التدريبية المعتمدة
            </p>
          </div>
          
          <motion.button
            className="certifications__save-btn"
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
            className="certifications__alert certifications__alert--success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Check size={20} />
            <span>تم حفظ التغييرات بنجاح!</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="certifications__content">
        {/* Left Side - Certifications List */}
        <motion.div
          className="certifications__list-panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="certifications-card">
            <div className="certifications-card__header">
              <h2 className="certifications-card__title">قائمة الشهادات</h2>
              <button
                className="certifications-card__add-btn"
                onClick={handleAddCertification}
                aria-label="إضافة شهادة جديدة"
              >
                <Plus size={18} />
                إضافة شهادة
              </button>
            </div>
            
            <div className="certifications-list">
              <AnimatePresence>
                {certifications.length === 0 ? (
                  <motion.div
                    className="certifications-list__empty"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Medal size={48} />
                    <p>لا توجد شهادات حالياً</p>
                    <p className="certifications-list__empty-hint">
                      انقر على "إضافة شهادة" لإضافة شهادة جديدة
                    </p>
                  </motion.div>
                ) : (
                  certifications.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      className={`cert-item ${editingCert === cert.id ? 'cert-item--editing' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                      draggable={editingCert !== cert.id}
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={() => handleDrop(index)}
                    >
                      {editingCert === cert.id ? (
                        <div className="cert-item__form">
                          <div className="cert-item__form-header">
                            <input
                              type="text"
                              className="cert-item__icon-input"
                              value={cert.icon}
                              onChange={(e) => handleUpdateCert(cert.id, 'icon', e.target.value)}
                              placeholder="🏆"
                              maxLength="2"
                              aria-label="أيقونة الشهادة"
                            />
                            <button
                              className="cert-item__save-btn"
                              onClick={() => handleSaveCert(cert.id)}
                              aria-label="حفظ التعديلات"
                            >
                              <Check size={18} />
                            </button>
                          </div>
                          
                          <input
                            type="text"
                            className="cert-item__input"
                            value={cert.title}
                            onChange={(e) => handleUpdateCert(cert.id, 'title', e.target.value)}
                            placeholder="موثق من قبل"
                            aria-label="عنوان الشهادة"
                          />
                          
                          <input
                            type="text"
                            className="cert-item__input cert-item__input--org"
                            value={cert.organization}
                            onChange={(e) => handleUpdateCert(cert.id, 'organization', e.target.value)}
                            placeholder="اسم المنظمة"
                            aria-label="اسم المنظمة"
                          />
                          
                          <label className="cert-item__checkbox">
                            <input
                              type="checkbox"
                              checked={cert.verified}
                              onChange={(e) => handleUpdateCert(cert.id, 'verified', e.target.checked)}
                              aria-label="شهادة معتمدة"
                            />
                            <span>معتمد ✓</span>
                          </label>
                        </div>
                      ) : (
                        <div className="cert-item__display">
                          <div 
                            className="cert-item__drag"
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('text/plain', index);
                              handleDragStart(index);
                            }}
                          >
                            <GripVertical size={20} />
                          </div>
                          
                          <div className="cert-item__icon-badge">
                            {cert.icon}
                          </div>
                          
                          <div className="cert-item__content">
                            <div className="cert-item__title">
                              {cert.title}
                              {cert.verified && (
                                <span className="cert-item__verified">✓</span>
                              )}
                            </div>
                            <div className="cert-item__organization" title={cert.organization}>
                              {cert.organization}
                            </div>
                          </div>
                          
                          <div className="cert-item__actions">
                            <button
                              className="cert-item__action-btn"
                              onClick={() => handleEditCert(cert.id)}
                              aria-label="تعديل الشهادة"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="cert-item__action-btn cert-item__action-btn--danger"
                              onClick={() => {
                                if (window.confirm('هل أنت متأكد من حذف هذه الشهادة؟')) {
                                  handleDeleteCert(cert.id);
                                }
                              }}
                              aria-label="حذف الشهادة"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Guidelines */}
          <div className="guidelines-card">
            <h3 className="guidelines-card__title">
              💡 نصائح لعرض الشهادات
            </h3>
            <ul className="guidelines-card__list">
              <li>استخدم أيقونات تعبيرية (Emoji) مناسبة لكل شهادة</li>
              <li>اكتب اسم المنظمة بالكامل باللغة الإنجليزية</li>
              <li>ضع علامة "معتمد" للشهادات الموثقة فقط</li>
              <li>رتّب الشهادات حسب الأهمية (الأعلى أولاً)</li>
              <li>تأكد من صحة أسماء المنظمات</li>
            </ul>
          </div>
        </motion.div>
        
        {/* Right Side - Preview */}
        <motion.div
          className="certifications__preview-panel"
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
              <p className="preview-card__subtitle">
                كيف ستظهر الشهادات للزوار
              </p>
            </div>
            
            <div className="certifications-preview">
              <div className="certifications-preview__container">
                {certifications.length > 0 ? (
                  certifications.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      className="cert-preview-card"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="cert-preview-card__icon">
                        {cert.icon}
                      </div>
                      <div className="cert-preview-card__content">
                        <p className="cert-preview-card__title">{cert.title}</p>
                        <h3 className="cert-preview-card__organization">
                          {cert.organization}
                        </h3>
                        {cert.verified && (
                          <div className="cert-preview-card__badge">
                            <Check size={14} />
                            <span>معتمد</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="certifications-preview__empty"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Medal size={64} />
                    <p>لا توجد شهادات لعرضها</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;