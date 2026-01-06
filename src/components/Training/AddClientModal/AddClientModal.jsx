import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Save, User } from 'lucide-react';
import './AddClientModal.scss';

const AddClientModal = ({ isOpen, onClose, onSave, editClient }) => {
  const [formData, setFormData] = useState(editClient || {
    name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    startDate: '',
    endDate: '',
    status: 'active',
    image: null
  });
  
  const fileInputRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="add-client-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="add-client-modal__header">
            <h2 className="add-client-modal__title">
              {editClient ? 'تعديل بيانات المتدرب' : 'إضافة متدرب جديد'}
            </h2>
            <button className="add-client-modal__close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          
          <form className="add-client-modal__form" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="add-client-modal__image-section">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />
              
              <div 
                className="add-client-modal__image-upload"
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.image ? (
                  <img src={formData.image} alt="Client" />
                ) : (
                  <div className="add-client-modal__image-placeholder">
                    <User size={40} />
                    <span>انقر لرفع الصورة</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Form Grid */}
            <div className="add-client-modal__grid">
              <div className="form-group">
                <label className="form-label">الاسم الكامل *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">البريد الإلكتروني *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">رقم الهاتف *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">العمر *</label>
                <input
                  type="number"
                  name="age"
                  className="form-input"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">الوزن (كغ) *</label>
                <input
                  type="number"
                  name="weight"
                  className="form-input"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">الطول (سم) *</label>
                <input
                  type="number"
                  name="height"
                  className="form-input"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">الهدف *</label>
                <select
                  name="goal"
                  className="form-input"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر الهدف</option>
                  <option value="إنقاص الوزن">إنقاص الوزن</option>
                  <option value="بناء العضلات">بناء العضلات</option>
                  <option value="تنشيف">تنشيف</option>
                  <option value="لياقة عامة">لياقة عامة</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">حالة الاشتراك *</label>
                <select
                  name="status"
                  className="form-input"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="active">مفعّل</option>
                  <option value="expired">منتهي</option>
                  <option value="pending">معلّق</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">تاريخ البداية *</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-input"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">تاريخ النهاية *</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-input"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="add-client-modal__actions">
              <button type="button" className="add-client-modal__cancel" onClick={onClose}>
                إلغاء
              </button>
              <button type="submit" className="add-client-modal__submit">
                <Save size={18} />
                <span>{editClient ? 'حفظ التعديلات' : 'إضافة المتدرب'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddClientModal;