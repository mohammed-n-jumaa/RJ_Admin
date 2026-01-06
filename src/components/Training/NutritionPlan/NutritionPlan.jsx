import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2,
  CheckCircle,
  Circle,
  ChevronDown,
  Apple,
  Clock,
  Upload,
  X,
  Image as ImageIcon,
  Flame,
  Zap,
  Droplets,
  Beef
} from 'lucide-react';
import './NutritionPlan.scss';

const NutritionPlan = ({ clientId, nutritionPlans, setNutritionPlans }) => {
  const [expandedDays, setExpandedDays] = useState([1]);
  const fileInputRefs = useRef({});
  
  const daysOfWeek = [
    { id: 1, name: 'السبت', date: '2025-01-11' },
    { id: 2, name: 'الأحد', date: '2025-01-12' },
    { id: 3, name: 'الإثنين', date: '2025-01-13' },
    { id: 4, name: 'الثلاثاء', date: '2025-01-14' },
    { id: 5, name: 'الأربعاء', date: '2025-01-15' },
    { id: 6, name: 'الخميس', date: '2025-01-16' },
    { id: 7, name: 'الجمعة', date: '2025-01-17' }
  ];
  
  const handleAddMeal = (dayId) => {
    setNutritionPlans(nutritionPlans.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          meals: [...day.meals, {
            id: Date.now(),
            mealType: 'وجبة جديدة',
            time: '12:00',
            items: [],
            image: null
          }]
        };
      }
      return day;
    }));
  };
  
  const handleUpdateMeal = (dayId, mealId, field, value) => {
    setNutritionPlans(nutritionPlans.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          meals: day.meals.map(meal =>
            meal.id === mealId ? { ...meal, [field]: value } : meal
          )
        };
      }
      return day;
    }));
  };
  
  const handleDeleteMeal = (dayId, mealId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الوجبة؟')) {
      setNutritionPlans(nutritionPlans.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            meals: day.meals.filter(meal => meal.id !== mealId)
          };
        }
        return day;
      }));
    }
  };
  
  const handleMealImageUpload = (dayId, mealId, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateMeal(dayId, mealId, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddItem = (dayId, mealId) => {
    setNutritionPlans(nutritionPlans.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          meals: day.meals.map(meal => {
            if (meal.id === mealId) {
              return {
                ...meal,
                items: [...meal.items, {
                  id: Date.now(),
                  name: '',
                  calories: 0,
                  protein: 0,
                  carbs: 0,
                  fats: 0,
                  completed: false
                }]
              };
            }
            return meal;
          })
        };
      }
      return day;
    }));
  };
  
  const handleUpdateItem = (dayId, mealId, itemId, field, value) => {
    setNutritionPlans(nutritionPlans.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          meals: day.meals.map(meal => {
            if (meal.id === mealId) {
              return {
                ...meal,
                items: meal.items.map(item =>
                  item.id === itemId ? { ...item, [field]: value } : item
                )
              };
            }
            return meal;
          })
        };
      }
      return day;
    }));
  };
  
  const handleDeleteItem = (dayId, mealId, itemId) => {
    setNutritionPlans(nutritionPlans.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          meals: day.meals.map(meal => {
            if (meal.id === mealId) {
              return {
                ...meal,
                items: meal.items.filter(item => item.id !== itemId)
              };
            }
            return meal;
          })
        };
      }
      return day;
    }));
  };
  
  const toggleDay = (dayId) => {
    setExpandedDays(prev =>
      prev.includes(dayId)
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };
  
  const getDayProgress = (day) => {
    const totalItems = day.meals.reduce((sum, meal) => sum + meal.items.length, 0);
    if (totalItems === 0) return 0;
    const completedItems = day.meals.reduce((sum, meal) => 
      sum + meal.items.filter(item => item.completed).length, 0
    );
    return Math.round((completedItems / totalItems) * 100);
  };
  
  const getDayTotalCalories = (day) => {
    return day.meals.reduce((sum, meal) => 
      sum + meal.items.reduce((mealSum, item) => mealSum + (parseInt(item.calories) || 0), 0), 0
    );
  };
  
  const getDayData = (dayId) => {
    return nutritionPlans.find(d => d.id === dayId) || {
      id: dayId,
      meals: []
    };
  };
  
  return (
    <div className="nutrition-plan">
      <div className="nutrition-plan__header">
        <div className="nutrition-plan__header-top">
          <h2 className="nutrition-plan__title">
            <Apple size={24} />
            النظام الغذائي اليومي
          </h2>
          
          <div className="nutrition-plan__week-info">
            <span>الأسبوع الحالي: 11 - 17 يناير 2025</span>
          </div>
        </div>
        
        
      </div>
      
      <div className="nutrition-plan__days">
        {daysOfWeek.map((dayInfo, index) => {
          const dayData = getDayData(dayInfo.id);
          const isExpanded = expandedDays.includes(dayInfo.id);
          const progress = getDayProgress(dayData);
          const totalCalories = getDayTotalCalories(dayData);
          const isToday = dayInfo.date === '2025-01-11';
          
          return (
            <motion.div
              key={dayInfo.id}
              className={`nutrition-day ${isToday ? 'nutrition-day--today' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="nutrition-day__header" onClick={() => toggleDay(dayInfo.id)}>
                <div className="nutrition-day__header-top">
                  <motion.div
                    className="nutrition-day__chevron"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                  
                  <div className="nutrition-day__title-section">
                    <div className="nutrition-day__title-wrapper">
                      <h3 className="nutrition-day__title">{dayInfo.name}</h3>
                      {isToday && (
                        <span className="nutrition-day__today-badge">اليوم</span>
                      )}
                    </div>
                    <span className="nutrition-day__date">{dayInfo.date}</span>
                  </div>
                  
                  <div className="nutrition-day__stats">
                    <div className="nutrition-day__stat">
                      <span className="nutrition-day__stat-value">{dayData.meals.length}</span>
                      <span className="nutrition-day__stat-label">وجبة</span>
                    </div>
                    
                    <div className="nutrition-day__stat">
                      <Flame size={12} className="nutrition-day__calorie-icon" />
                      <span className="nutrition-day__stat-value">{totalCalories}</span>
                      <span className="nutrition-day__stat-label">cal</span>
                    </div>
                  </div>
                </div>
                
                <div className="nutrition-day__header-bottom">
                  <div className="nutrition-day__progress">
                    <div
                      className="nutrition-day__progress-bar"
                      style={{ width: `${progress}%` }}
                    />
                    <span className="nutrition-day__progress-text">{progress}%</span>
                  </div>
                  
                  <button 
                    className="nutrition-day__expand-btn"
                    onClick={() => toggleDay(dayInfo.id)}
                    aria-label={isExpanded ? 'طي اليوم' : 'توسيع اليوم'}
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="nutrition-day__content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    {dayData.meals.length > 0 ? (
                      <div className="nutrition-day__meals">
                        {dayData.meals.map((meal, mealIndex) => (
                          <motion.div
                            key={meal.id}
                            className="meal-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: mealIndex * 0.1 }}
                          >
                            <div className="meal-card__header">
                              <div className="meal-card__info">
                                <div className="meal-card__type-wrapper">
                                  <Apple size={14} />
                                  <input
                                    type="text"
                                    className="meal-card__type"
                                    value={meal.mealType}
                                    onChange={(e) => handleUpdateMeal(dayInfo.id, meal.id, 'mealType', e.target.value)}
                                    placeholder="نوع الوجبة"
                                  />
                                </div>
                                
                                <div className="meal-card__time-wrapper">
                                  <Clock size={14} />
                                  <input
                                    type="time"
                                    className="meal-card__time"
                                    value={meal.time}
                                    onChange={(e) => handleUpdateMeal(dayInfo.id, meal.id, 'time', e.target.value)}
                                  />
                                </div>
                              </div>
                              
                              <button
                                className="meal-card__delete-btn"
                                onClick={() => handleDeleteMeal(dayInfo.id, meal.id)}
                                aria-label="حذف الوجبة"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            
                            {/* Meal Image */}
                            <div className="meal-card__image-section">
                              <input
                                ref={el => fileInputRefs.current[`${dayInfo.id}-${meal.id}`] = el}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleMealImageUpload(dayInfo.id, meal.id, e)}
                                style={{ display: 'none' }}
                              />
                              
                              {meal.image ? (
                                <div className="meal-image-preview">
                                  <img src={meal.image} alt="Meal" />
                                  <button
                                    className="meal-image-preview__remove"
                                    onClick={() => handleUpdateMeal(dayInfo.id, meal.id, 'image', null)}
                                    aria-label="إزالة الصورة"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="meal-card__upload-btn"
                                  onClick={() => fileInputRefs.current[`${dayInfo.id}-${meal.id}`]?.click()}
                                >
                                  <Upload size={16} />
                                  <span>رفع صورة الوجبة</span>
                                </button>
                              )}
                            </div>
                            
                            {/* Meal Items */}
                            <div className="meal-card__items">
                              {meal.items.map((item, itemIndex) => (
                                <div key={item.id} className="nutrition-item">
                                  <div className="nutrition-item__left">
                                    <button
                                      className={`nutrition-item__check ${item.completed ? 'nutrition-item__check--completed' : ''}`}
                                      onClick={() => handleUpdateItem(dayInfo.id, meal.id, item.id, 'completed', !item.completed)}
                                      aria-label={item.completed ? 'تم إلغاء الإكمال' : 'تم الإكمال'}
                                    >
                                      {item.completed ? <CheckCircle size={18} /> : <Circle size={18} />}
                                    </button>
                                  </div>
                                  
                                  <div className="nutrition-item__content">
                                    <input
                                      type="text"
                                      className="nutrition-item__name"
                                      value={item.name}
                                      onChange={(e) => handleUpdateItem(dayInfo.id, meal.id, item.id, 'name', e.target.value)}
                                      placeholder="اسم الطعام"
                                    />
                                    
                                    <div className="nutrition-item__macros">
                                      <div className="nutrition-item__macro">
                                        <div className="nutrition-item__macro-icon">
                                          <Flame size={10} />
                                        </div>
                                        <input
                                          type="number"
                                          value={item.calories}
                                          onChange={(e) => handleUpdateItem(dayInfo.id, meal.id, item.id, 'calories', e.target.value)}
                                          min="0"
                                          placeholder="0"
                                        />
                                        <span className="nutrition-item__macro-label">cal</span>
                                      </div>
                                      
                                      <div className="nutrition-item__macro">
                                        <div className="nutrition-item__macro-icon">
                                          <Beef size={10} />
                                        </div>
                                        <input
                                          type="number"
                                          value={item.protein}
                                          onChange={(e) => handleUpdateItem(dayInfo.id, meal.id, item.id, 'protein', e.target.value)}
                                          min="0"
                                          placeholder="0"
                                        />
                                        <span className="nutrition-item__macro-label">بروتين</span>
                                      </div>
                                      
                                      <div className="nutrition-item__macro">
                                        <div className="nutrition-item__macro-icon">
                                          <Zap size={10} />
                                        </div>
                                        <input
                                          type="number"
                                          value={item.carbs}
                                          onChange={(e) => handleUpdateItem(dayInfo.id, meal.id, item.id, 'carbs', e.target.value)}
                                          min="0"
                                          placeholder="0"
                                        />
                                        <span className="nutrition-item__macro-label">كارب</span>
                                      </div>
                                      
                                      <div className="nutrition-item__macro">
                                        <div className="nutrition-item__macro-icon">
                                          <Droplets size={10} />
                                        </div>
                                        <input
                                          type="number"
                                          value={item.fats}
                                          onChange={(e) => handleUpdateItem(dayInfo.id, meal.id, item.id, 'fats', e.target.value)}
                                          min="0"
                                          placeholder="0"
                                        />
                                        <span className="nutrition-item__macro-label">دهون</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="nutrition-item__right">
                                    <button
                                      className="nutrition-item__delete"
                                      onClick={() => handleDeleteItem(dayInfo.id, meal.id, item.id)}
                                      aria-label="حذف العنصر"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <button
                              className="meal-card__add-item"
                              onClick={() => handleAddItem(dayInfo.id, meal.id)}
                            >
                              <Plus size={14} />
                              إضافة عنصر غذائي
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="nutrition-day__empty">
                        <Apple size={40} className="nutrition-day__empty-icon" />
                        <p className="nutrition-day__empty-text">لا توجد وجبات لهذا اليوم</p>
                        <p className="nutrition-day__empty-sub">انقر على "إضافة وجبة" لبدء إنشاء النظام الغذائي</p>
                      </div>
                    )}
                    
                    <button
                      className="nutrition-day__add-meal"
                      onClick={() => handleAddMeal(dayInfo.id)}
                    >
                      <Plus size={16} />
                      إضافة وجبة
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionPlan;