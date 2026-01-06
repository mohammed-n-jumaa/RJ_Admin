import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit2,
  CheckCircle,
  Circle,
  ChevronDown,
  Dumbbell,
  Upload,
  Image as ImageIcon,
  Video,
  X,
  Play
} from 'lucide-react';
import './WorkoutPlan.scss';

const WorkoutPlan = ({ clientId, workoutPlans, setWorkoutPlans }) => {
  const [expandedDays, setExpandedDays] = useState([1]);
  const [activeMedia, setActiveMedia] = useState(null);
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
  
  const handleAddExercise = (dayId) => {
    setWorkoutPlans(workoutPlans.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          exercises: [...day.exercises, {
            id: Date.now(),
            name: '',
            sets: 3,
            reps: 12,
            notes: '',
            media: null,
            completed: false
          }]
        };
      }
      return day;
    }));
  };
  
  const handleUpdateExercise = (dayId, exerciseId, field, value) => {
    setWorkoutPlans(workoutPlans.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          exercises: day.exercises.map(ex => 
            ex.id === exerciseId ? { ...ex, [field]: value } : ex
          )
        };
      }
      return day;
    }));
  };
  
  const handleMediaUpload = (dayId, exerciseId, e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      const reader = new FileReader();
      
      reader.onloadend = () => {
        handleUpdateExercise(dayId, exerciseId, 'media', {
          type: fileType,
          url: reader.result,
          name: file.name
        });
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleDeleteExercise = (dayId, exerciseId) => {
    setWorkoutPlans(workoutPlans.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          exercises: day.exercises.filter(ex => ex.id !== exerciseId)
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
    if (day.exercises.length === 0) return 0;
    const completed = day.exercises.filter(ex => ex.completed).length;
    return Math.round((completed / day.exercises.length) * 100);
  };
  
  const getDayData = (dayId) => {
    return workoutPlans.find(d => d.id === dayId) || {
      id: dayId,
      exercises: []
    };
  };
  
  return (
    <div className="workout-plan">
      <div className="workout-plan__header">
        <div className="workout-plan__header-top">
          <h2 className="workout-plan__title">
            <Dumbbell size={24} />
            البرنامج التدريبي اليومي
          </h2>
          
          <div className="workout-plan__week-info">
            <span>الأسبوع الحالي: 11 - 17 يناير 2025</span>
          </div>
        </div>
        
       
      </div>
      
      <div className="workout-plan__days">
        {daysOfWeek.map((dayInfo, index) => {
          const dayData = getDayData(dayInfo.id);
          const isExpanded = expandedDays.includes(dayInfo.id);
          const progress = getDayProgress(dayData);
          const isToday = dayInfo.date === '2025-01-11';
          
          return (
            <motion.div
              key={dayInfo.id}
              className={`workout-day ${isToday ? 'workout-day--today' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="workout-day__header" onClick={() => toggleDay(dayInfo.id)}>
                <div className="workout-day__header-top">
                  <motion.div
                    className="workout-day__chevron"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                  
                  <div className="workout-day__title-section">
                    <div className="workout-day__title-wrapper">
                      <h3 className="workout-day__title">{dayInfo.name}</h3>
                      {isToday && (
                        <span className="workout-day__today-badge">اليوم</span>
                      )}
                    </div>
                    <span className="workout-day__date">{dayInfo.date}</span>
                  </div>
                  
                  <div className="workout-day__count">
                    {dayData.exercises.length} تمرين
                  </div>
                </div>
                
                <div className="workout-day__header-bottom" onClick={(e) => e.stopPropagation()}>
                  <div className="workout-day__progress">
                    <div 
                      className="workout-day__progress-bar"
                      style={{ width: `${progress}%` }}
                    />
                    <span className="workout-day__progress-text">{progress}%</span>
                  </div>
                  
                  <button 
                    className="workout-day__expand-btn"
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
                    className="workout-day__content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="workout-day__exercises">
                      {dayData.exercises.length > 0 ? (
                        dayData.exercises.map((exercise, exIndex) => (
                          <motion.div
                            key={exercise.id}
                            className="exercise-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: exIndex * 0.05 }}
                          >
                            <div className="exercise-item__left">
                              <button
                                className={`exercise-item__check ${exercise.completed ? 'exercise-item__check--completed' : ''}`}
                                onClick={() => handleUpdateExercise(dayInfo.id, exercise.id, 'completed', !exercise.completed)}
                                aria-label={exercise.completed ? 'تم إلغاء الإكمال' : 'تم الإكمال'}
                              >
                                {exercise.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                              </button>
                            </div>
                            
                            <div className="exercise-item__content">
                              <div className="exercise-item__main">
                                <input
                                  type="text"
                                  className="exercise-item__name"
                                  value={exercise.name}
                                  onChange={(e) => handleUpdateExercise(dayInfo.id, exercise.id, 'name', e.target.value)}
                                  placeholder="اسم التمرين"
                                />
                                
                                <div className="exercise-item__details">
                                  <div className="exercise-item__detail">
                                    <label className="exercise-item__detail-label">مجموعات</label>
                                    <input
                                      type="number"
                                      value={exercise.sets}
                                      onChange={(e) => handleUpdateExercise(dayInfo.id, exercise.id, 'sets', e.target.value)}
                                      min="1"
                                    />
                                  </div>
                                  
                                  <div className="exercise-item__detail">
                                    <label className="exercise-item__detail-label">تكرارات</label>
                                    <input
                                      type="number"
                                      value={exercise.reps}
                                      onChange={(e) => handleUpdateExercise(dayInfo.id, exercise.id, 'reps', e.target.value)}
                                      min="1"
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <textarea
                                className="exercise-item__notes"
                                value={exercise.notes}
                                onChange={(e) => handleUpdateExercise(dayInfo.id, exercise.id, 'notes', e.target.value)}
                                placeholder="ملاحظات التمرين (اختياري)"
                                rows="2"
                              />
                              
                              {/* Media Upload/Display */}
                              <div className="exercise-item__media-section">
                                <input
                                  ref={el => fileInputRefs.current[`${dayInfo.id}-${exercise.id}`] = el}
                                  type="file"
                                  accept="image/*,video/*"
                                  onChange={(e) => handleMediaUpload(dayInfo.id, exercise.id, e)}
                                  style={{ display: 'none' }}
                                />
                                
                                {exercise.media ? (
                                  <div className="exercise-media-preview">
                                    {exercise.media.type === 'image' ? (
                                      <div className="exercise-media-preview__image">
                                        <img src={exercise.media.url} alt="Exercise" />
                                        <button
                                          className="exercise-media-preview__remove"
                                          onClick={() => handleUpdateExercise(dayInfo.id, exercise.id, 'media', null)}
                                          aria-label="إزالة الصورة"
                                        >
                                          <X size={16} />
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="exercise-media-preview__video">
                                        <video src={exercise.media.url} controls />
                                        <button
                                          className="exercise-media-preview__remove"
                                          onClick={() => handleUpdateExercise(dayInfo.id, exercise.id, 'media', null)}
                                          aria-label="إزالة الفيديو"
                                        >
                                          <X size={16} />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <button
                                    className="exercise-item__upload-btn"
                                    onClick={() => fileInputRefs.current[`${dayInfo.id}-${exercise.id}`]?.click()}
                                  >
                                    <Upload size={16} />
                                    <span>رفع صورة أو فيديو</span>
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            <div className="exercise-item__right">
                              <button
                                className="exercise-item__delete"
                                onClick={() => handleDeleteExercise(dayInfo.id, exercise.id)}
                                aria-label="حذف التمرين"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="workout-day__empty">
                          <p>لا توجد تمارين لهذا اليوم</p>
                          <p className="workout-day__empty-sub">انقر على "إضافة تمرين" لبدء إنشاء البرنامج</p>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      className="workout-day__add-exercise"
                      onClick={() => handleAddExercise(dayInfo.id)}
                    >
                      <Plus size={16} />
                      إضافة تمرين
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

export default WorkoutPlan;