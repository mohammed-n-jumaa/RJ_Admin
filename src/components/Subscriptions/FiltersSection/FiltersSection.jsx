import React from 'react';
import { Filter, Search } from 'lucide-react';
import './FiltersSection.scss';

const FiltersSection = ({ filters, setFilters }) => {
  const statusOptions = [
    { value: 'all', label: 'جميع الاشتراكات' },
    { value: 'active', label: 'نشطة' },
    { value: 'expiring', label: 'قرب الانتهاء' },
    { value: 'expired', label: 'منتهية' },
    { value: 'pending', label: 'بانتظار الدفع' }
  ];

  const programOptions = [
    { value: 'all', label: 'جميع البرامج' },
    { value: 'weight_loss', label: 'خسارة وزن' },
    { value: 'muscle_gain', label: 'زيادة كتلة عضلية' },
    { value: 'body_toning', label: 'نحت الجسم' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchChange = (e) => {
    handleFilterChange('searchTerm', e.target.value);
  };

  const handleApplyFilters = () => {
    // سيتم تطبيق الفلاتر تلقائياً عبر useEffect
    console.log('تم تطبيق الفلاتر:', filters);
  };

  return (
    <div className="filters-section">
      <div className="filters-header">
        <Filter size={20} />
        <h4>فلاتر البحث</h4>
      </div>

      <div className="filters-grid">
        {/* بحث سريع */}
        <div className="filter-group">
          <div className="filter-label">
            <Search size={18} />
            <span>بحث سريع:</span>
          </div>
          <div className="search-input">
            <input
              type="text"
              placeholder="ابحث عن متدربة أو برنامج..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* فلتر الحالة */}
        <div className="filter-group">
          <div className="filter-label">
            <span>الحالة:</span>
          </div>
          <div className="filter-options">
            {statusOptions.map(option => (
              <button
                key={option.value}
                className={`filter-option ${filters.status === option.value ? 'active' : ''}`}
                onClick={() => handleFilterChange('status', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* فلتر نوع البرنامج */}
        <div className="filter-group">
          <div className="filter-label">
            <span>نوع البرنامج:</span>
          </div>
          <div className="filter-options">
            {programOptions.map(option => (
              <button
                key={option.value}
                className={`filter-option ${filters.programType === option.value ? 'active' : ''}`}
                onClick={() => handleFilterChange('programType', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="apply-filters-btn" onClick={handleApplyFilters}>
        🔍 تطبيق الفلاتر
      </button>
    </div>
  );
};

export default FiltersSection;