import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Dumbbell } from 'lucide-react';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // هنا يمكنك إضافة API call للتحقق من بيانات تسجيل الدخول
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // للتجربة - تحقق بسيط
      if (formData.email === 'admin@randjarar.com' && formData.password === 'admin123') {
        // حفظ معلومات المستخدم في localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        
        // الانتقال إلى لوحة التحكم
        navigate('/dashboard');
      } else {
        setErrors({
          submit: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        });
      }
    } catch (error) {
      setErrors({
        submit: 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Brand */}
        <div className="login-brand">
          <div className="brand-content">
            <div className="brand-logo">
              <Dumbbell size={48} />
            </div>
            <h1>Rand Jarar</h1>
            <p className="brand-subtitle">Personal Trainer Dashboard</p>
            
            {/* Feature Cards - ستختفي تلقائياً في الموبايل */}
            <div className="brand-features">
              <div className="feature-item">
                <div className="feature-icon">💪</div>
                <span>إدارة العملاء</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <span>تتبع التقدم</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💬</div>
                <span>التواصل المباشر</span>
              </div>
            </div>
          </div>
          <div className="brand-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="login-form-container">
            <div className="login-header">
              <h2>تسجيل الدخول</h2>
              <p>مرحباً بك مجدداً! سجل دخولك للوصول إلى لوحة التحكم</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="admin@randjarar.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password">كلمة المرور</label>
                <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="أدخل كلمة المرور"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="submit-error">
                  {errors.submit}
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>تذكرني</span>
                </label>
                <button type="button" className="forgot-password">
                  نسيت كلمة المرور؟
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  'تسجيل الدخول'
                )}
              </button>

              {/* Demo Credentials */}
              <div className="demo-credentials">
                <p>بيانات تجريبية:</p>
                <p><strong>Email:</strong> admin@randjarar.com</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;