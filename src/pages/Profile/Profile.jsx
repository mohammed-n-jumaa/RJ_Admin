import React, { useState } from 'react';
import { 
  UserCircle, 
  Shield, 
  Camera, 
  Mail,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  User,
  Lock,
  Upload,
  X,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Trash2
} from 'lucide-react';
import './Profile.scss';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Profile Data
  const [profileData, setProfileData] = useState({
    name: 'رند جرار',
    email: 'rand@gmail.com'
  });

  // Security Data
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [errors, setErrors] = useState({});

  // Photo Upload State
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Profile Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSuccessMsg('تم حفظ البيانات بنجاح');
    }, 1000);
  };

  // Security Handlers
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!securityData.currentPassword) {
      newErrors.currentPassword = 'كلمة المرور الحالية مطلوبة';
    }
    
    if (securityData.newPassword.length < 8) {
      newErrors.newPassword = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      showSuccessMsg('تم تحديث كلمة المرور بنجاح');
    }, 1000);
  };

  // Photo Handlers
  const handleFileSelect = (file) => {
    if (!file.type.match('image.*')) {
      alert('الرجاء اختيار صورة فقط');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(file);
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleSavePhoto = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showSuccessMsg('تم حفظ الصورة بنجاح');
    }, 1000);
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPreview(null);
  };

  const showSuccessMsg = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const passwordRequirements = [
    { label: '8 أحرف على الأقل', test: val => val.length >= 8 },
    { label: 'حرف كبير واحد', test: val => /[A-Z]/.test(val) },
    { label: 'حرف صغير واحد', test: val => /[a-z]/.test(val) },
    { label: 'رقم واحد', test: val => /\d/.test(val) }
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        
        {/* Header */}
        <div className="profile-header">
          <div className="header-content">
            <UserCircle size={28} />
            <div className="header-text">
              <h1>الملف الشخصي</h1>
              <p>إدارة معلوماتك الشخصية وإعدادات الحساب</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <UserCircle size={18} />
            <span>البيانات</span>
          </button>
          <button
            className={`tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={18} />
            <span>الأمان</span>
          </button>
          <button
            className={`tab ${activeTab === 'photo' ? 'active' : ''}`}
            onClick={() => setActiveTab('photo')}
          >
            <Camera size={18} />
            <span>الصورة</span>
          </button>
        </div>

        {/* Content */}
        <div className="profile-content">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="tab-content">
              <form onSubmit={handleSaveProfile}>
                <div className="form-group">
                  <label>
                    <User size={16} />
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Mail size={16} />
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-save" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="spinner"></div>
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        حفظ التغييرات
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="tab-content">
              <form onSubmit={handleSaveSecurity}>
                <div className="security-section">
                  <h3>
                    <Lock size={18} />
                    تغيير كلمة المرور
                  </h3>

                  <div className="form-group">
                    <label>كلمة المرور الحالية</label>
                    <div className="password-input">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        name="currentPassword"
                        value={securityData.currentPassword}
                        onChange={handleSecurityChange}
                        className={errors.currentPassword ? 'error' : ''}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPasswords(prev => ({
                          ...prev,
                          current: !prev.current
                        }))}
                      >
                        {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <span className="error-msg">{errors.currentPassword}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>كلمة المرور الجديدة</label>
                    <div className="password-input">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        name="newPassword"
                        value={securityData.newPassword}
                        onChange={handleSecurityChange}
                        className={errors.newPassword ? 'error' : ''}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPasswords(prev => ({
                          ...prev,
                          new: !prev.new
                        }))}
                      >
                        {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <span className="error-msg">{errors.newPassword}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>تأكيد كلمة المرور</label>
                    <div className="password-input">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={securityData.confirmPassword}
                        onChange={handleSecurityChange}
                        className={errors.confirmPassword ? 'error' : ''}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPasswords(prev => ({
                          ...prev,
                          confirm: !prev.confirm
                        }))}
                      >
                        {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="error-msg">{errors.confirmPassword}</span>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <div className="password-requirements">
                    <p className="req-title">متطلبات كلمة المرور:</p>
                    <ul>
                      {passwordRequirements.map((req, i) => {
                        const valid = req.test(securityData.newPassword);
                        return (
                          <li key={i} className={valid ? 'valid' : 'invalid'}>
                            {valid ? <CheckCircle size={14} /> : <XCircle size={14} />}
                            {req.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-save" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="spinner"></div>
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        حفظ التغييرات
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Photo Tab */}
          {activeTab === 'photo' && (
            <div className="tab-content">
              <div className="photo-section">
                <h3>
                  <Camera size={18} />
                  الصورة الشخصية
                </h3>

                {/* Preview */}
                <div className="photo-preview">
                  {preview ? (
                    <div className="preview-image">
                      <img src={preview} alt="Profile" />
                    </div>
                  ) : (
                    <div className="no-photo">
                      <User size={64} />
                      <p>لا توجد صورة</p>
                    </div>
                  )}
                </div>

                {/* Upload Area */}
                <div
                  className={`upload-area ${isDragging ? 'dragging' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                    style={{ display: 'none' }}
                    id="photo-input"
                  />
                  <label htmlFor="photo-input" className="upload-label">
                    <Upload size={40} />
                    <div className="upload-text">
                      <p>اسحب وأفلت الصورة هنا</p>
                      <span>أو انقر للاختيار</span>
                    </div>
                    <small>JPG, PNG, GIF - بحد أقصى 5MB</small>
                  </label>
                </div>

                {/* Actions */}
                {preview && (
                  <div className="photo-actions">
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={handleRemovePhoto}
                    >
                      <Trash2 size={18} />
                      حذف الصورة
                    </button>
                    <button
                      type="button"
                      className="btn-save"
                      onClick={handleSavePhoto}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner"></div>
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          حفظ الصورة
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="success-message">
            <CheckCircle size={20} />
            <span>{successMessage}</span>
            <button onClick={() => setShowSuccess(false)}>
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;