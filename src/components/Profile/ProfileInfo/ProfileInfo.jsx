import React from 'react';
import { Mail } from 'lucide-react';
import './ProfileInfo.scss';

const ProfileInfo = ({ isEditing }) => {
  const FIXED_NAME = 'رند جرار';
  const FIXED_EMAIL = 'rand@gmail.com';

  return (
    <div className="profile-info-container">
      {isEditing ? (
        <form className="info-form">
          <div className="form-fields">
            {/* الاسم */}
            <div className="field-wrapper">
              <label className="field-label">الاسم الكامل</label>
              <input
                type="text"
                className="field-input"
                value={FIXED_NAME}
                disabled
              />
            </div>

            {/* البريد الإلكتروني */}
            <div className="field-wrapper">
              <label className="field-label">البريد الإلكتروني</label>
              <input
                type="email"
                className="field-input"
                value={FIXED_EMAIL}
                disabled
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="info-display">
          <div className="info-row">
            <Mail className="info-icon" />
            <div className="info-details">
              <span className="info-title">الاسم</span>
              <span className="info-text">{FIXED_NAME}</span>
            </div>
          </div>

          <div className="info-row">
            <Mail className="info-icon" />
            <div className="info-details">
              <span className="info-title">البريد الإلكتروني</span>
              <span className="info-text">{FIXED_EMAIL}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;