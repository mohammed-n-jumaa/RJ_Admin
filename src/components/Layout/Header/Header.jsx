import React from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../../../contexts';
import Badge from '../../common/Badge';
import './Header.scss';

const Header = ({ currentSection = 'لوحة التحكم' }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [notifications] = React.useState(7);

  const handleSave = () => {
    console.log('Saving changes...');
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__right">
          <motion.div
            className="header__logo"
            whileHover={{ scale: 1.05 }}
          >
            <span className="header__logo-emoji">💪</span>
          </motion.div>

          <div className="header__section">
            <span className="header__section-label">القسم الحالي</span>
            <h1 className="header__section-title">{currentSection}</h1>
          </div>
        </div>

        <div className="header__center">
          <div className="header__mode-capsule">
            <div className="header__mode-indicator"></div>
            <span className="header__mode-text">وضع المحتوى</span>
          </div>
        </div>

        <div className="header__left">
          {/* Theme Toggle Button */}
          <motion.button
            className="header__action-btn header__theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isDarkMode ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </motion.button>
          <motion.button
            className="header__action-btn header__notifications"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            {notifications > 0 && <Badge count={notifications} pulse />}
          </motion.button>



          <motion.button
            className="header__btn header__btn--secondary"
            onClick={() => window.open('https://rj-website-murex.vercel.app/', '_blank')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye size={18} />
            <span>معاينة الموقع</span>
          </motion.button>



        </div>
      </div>
    </header>
  );
};

export default Header;