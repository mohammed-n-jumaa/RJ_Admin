import React, { useState } from 'react';
import {
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle,
    User,
    Mail
} from 'lucide-react';
import './SecuritySettings.scss';

const SecuritySettings = ({ onSave, isLoading }) => {
    const [formData, setFormData] = useState({
        name: 'رند جرار',
        email: 'rand@gmail.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'الاسم مطلوب';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'البريد الإلكتروني مطلوب';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'البريد الإلكتروني غير صالح';
        }

        if (formData.newPassword) {
            if (!formData.currentPassword) {
                newErrors.currentPassword = 'كلمة المرور الحالية مطلوبة';
            }
            if (formData.newPassword.length < 8) {
                newErrors.newPassword = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
            }
            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        onSave(formData);
        setFormData(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }));
    };

    const passwordRequirements = [
        { label: '8 أحرف على الأقل', test: val => val.length >= 8 },
        { label: 'حرف كبير واحد على الأقل', test: val => /[A-Z]/.test(val) },
        { label: 'حرف صغير واحد على الأقل', test: val => /[a-z]/.test(val) },
        { label: 'رقم واحد على الأقل', test: val => /\d/.test(val) }
    ];

    return (
        <div className="security-settings-container">
            <div className="security-header-section">
                <Lock className="header-icon" />
                <div className="header-text">
                    <h2 className="header-title">إعدادات الحساب</h2>
                    <p className="header-subtitle">تحديث بياناتك وكلمة المرور</p>
                </div>
            </div>

            <form className="security-form-container" onSubmit={handleSubmit}>
                {/* الاسم والإيميل */}
                <div className="basic-info-section">
                    <div className="input-group">
                        <label className="input-label">
                            <User className="label-icon" />
                            الاسم
                        </label>
                        <input
                            type="text"
                            name="name"
                            className={`input-field ${errors.name ? 'error' : ''}`}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="input-group">
                        <label className="input-label">
                            <Mail className="label-icon" />
                            البريد الإلكتروني
                        </label>
                        <input
                            type="email"
                            name="email"
                            className={`input-field ${errors.email ? 'error' : ''}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                </div>

                {/* تغيير كلمة المرور */}
                <div className="password-section">
                    <h3 className="section-heading">
                        <Lock className="heading-icon" />
                        تغيير كلمة المرور
                    </h3>

                    <div className="password-fields">
                        {/* كلمة المرور الحالية */}
                        <div className="input-group">
                            <label className="input-label">كلمة المرور الحالية</label>
                            <div className="password-input-container">
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    name="currentPassword"
                                    className={`input-field password-field ${errors.currentPassword ? 'error' : ''}`}
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? <EyeOff className="eye-icon" /> : <Eye className="eye-icon" />}
                                </button>
                            </div>
                            {errors.currentPassword && (
                                <span className="error-text">{errors.currentPassword}</span>
                            )}
                        </div>

                        {/* كلمة المرور الجديدة */}
                        <div className="input-group">
                            <label className="input-label">كلمة المرور الجديدة</label>
                            <div className="password-input-container">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    className={`input-field password-field ${errors.newPassword ? 'error' : ''}`}
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <EyeOff className="eye-icon" /> : <Eye className="eye-icon" />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <span className="error-text">{errors.newPassword}</span>
                            )}
                        </div>

                        {/* تأكيد كلمة المرور */}
                        <div className="input-group">
                            <label className="input-label">تأكيد كلمة المرور</label>
                            <div className="password-input-container">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    className={`input-field password-field ${errors.confirmPassword ? 'error' : ''}`}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="eye-icon" /> : <Eye className="eye-icon" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <span className="error-text">{errors.confirmPassword}</span>
                            )}
                        </div>

                        {/* متطلبات كلمة المرور */}
                        {formData.newPassword && (
                            <div className="requirements-box">
                                <p className="requirements-heading">متطلبات كلمة المرور:</p>
                                <ul className="requirements-list">
                                    {passwordRequirements.map((req, i) => {
                                        const valid = req.test(formData.newPassword);
                                        return (
                                            <li key={i} className={`requirement ${valid ? 'valid' : 'invalid'}`}>
                                                {valid ? <CheckCircle className="req-icon" /> : <XCircle className="req-icon" />}
                                                {req.label}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* زر الحفظ */}
                <div className="form-footer">
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <div className="spinner-btn"></div>
                                جاري الحفظ...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="btn-icon" />
                                حفظ التغييرات
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SecuritySettings;