import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity,
  TrendingUp,
  CheckCircle,
  Dumbbell,
  Apple,
  Calendar,
  Award,
  Flame,
  Target
} from 'lucide-react';
import './ProgressTracker.scss';

const ProgressTracker = ({ clientId, workoutPlans, nutritionPlans }) => {
  // Calculate daily statistics
  const getDailyStats = () => {
    const stats = [];
    const daysOfWeek = [
      { id: 1, name: 'السبت', date: '2025-01-11' },
      { id: 2, name: 'الأحد', date: '2025-01-12' },
      { id: 3, name: 'الإثنين', date: '2025-01-13' },
      { id: 4, name: 'الثلاثاء', date: '2025-01-14' },
      { id: 5, name: 'الأربعاء', date: '2025-01-15' },
      { id: 6, name: 'الخميس', date: '2025-01-16' },
      { id: 7, name: 'الجمعة', date: '2025-01-17' }
    ];
    
    daysOfWeek.forEach(day => {
      const workoutDay = workoutPlans.find(w => w.id === day.id) || { exercises: [] };
      const nutritionDay = nutritionPlans.find(n => n.id === day.id) || { meals: [] };
      
      const totalExercises = workoutDay.exercises.length;
      const completedExercises = workoutDay.exercises.filter(ex => ex.completed).length;
      
      const totalMealItems = nutritionDay.meals.reduce((sum, meal) => sum + meal.items.length, 0);
      const completedMealItems = nutritionDay.meals.reduce((sum, meal) => 
        sum + meal.items.filter(item => item.completed).length, 0
      );
      
      const totalCalories = nutritionDay.meals.reduce((sum, meal) => 
        sum + meal.items.reduce((mealSum, item) => mealSum + (parseInt(item.calories) || 0), 0), 0
      );
      
      const workoutProgress = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
      const nutritionProgress = totalMealItems > 0 ? Math.round((completedMealItems / totalMealItems) * 100) : 0;
      const overallProgress = Math.round((workoutProgress + nutritionProgress) / 2);
      
      stats.push({
        ...day,
        workoutProgress,
        nutritionProgress,
        overallProgress,
        totalExercises,
        completedExercises,
        totalMealItems,
        completedMealItems,
        totalCalories
      });
    });
    
    return stats;
  };
  
  // Calculate weekly statistics
  const getWeeklyStats = () => {
    const dailyStats = getDailyStats();
    
    const totalExercises = dailyStats.reduce((sum, day) => sum + day.totalExercises, 0);
    const completedExercises = dailyStats.reduce((sum, day) => sum + day.completedExercises, 0);
    const totalMeals = dailyStats.reduce((sum, day) => sum + day.totalMealItems, 0);
    const completedMeals = dailyStats.reduce((sum, day) => sum + day.completedMealItems, 0);
    const totalCalories = dailyStats.reduce((sum, day) => sum + day.totalCalories, 0);
    const avgCaloriesPerDay = Math.round(totalCalories / 7);
    
    const workoutProgress = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
    const nutritionProgress = totalMeals > 0 ? Math.round((completedMeals / totalMeals) * 100) : 0;
    const overallProgress = Math.round((workoutProgress + nutritionProgress) / 2);
    
    return {
      totalExercises,
      completedExercises,
      totalMeals,
      completedMeals,
      totalCalories,
      avgCaloriesPerDay,
      workoutProgress,
      nutritionProgress,
      overallProgress
    };
  };
  
  // Get achievements
  const getAchievements = () => {
    const achievements = [];
    const weeklyStats = getWeeklyStats();
    
    if (weeklyStats.completedExercises >= 10) {
      achievements.push({
        id: 1,
        title: 'محارب مبتدئ',
        description: 'أكمل 10 تمارين',
        icon: '💪',
        color: '#4caf50'
      });
    }
    
    if (weeklyStats.completedMeals >= 20) {
      achievements.push({
        id: 2,
        title: 'خبير تغذية',
        description: 'أكمل 20 وجبة صحية',
        icon: '🥗',
        color: '#ff9800'
      });
    }
    
    if (weeklyStats.workoutProgress === 100) {
      achievements.push({
        id: 3,
        title: 'البطل الأسبوعي',
        description: 'أكمل جميع التمارين الأسبوعية',
        icon: '🏆',
        color: '#e91e63'
      });
    }
    
    if (weeklyStats.nutritionProgress === 100) {
      achievements.push({
        id: 4,
        title: 'نظام متكامل',
        description: 'التزم بالنظام الغذائي بالكامل',
        icon: '⭐',
        color: '#2196f3'
      });
    }
    
    const dailyStats = getDailyStats();
    const perfectDays = dailyStats.filter(day => day.overallProgress === 100).length;
    
    if (perfectDays >= 5) {
      achievements.push({
        id: 5,
        title: 'الأسبوع الذهبي',
        description: `أكمل ${perfectDays} أيام مثالية`,
        icon: '🌟',
        color: '#ffc107'
      });
    }
    
    return achievements;
  };
  
  const dailyStats = getDailyStats();
  const weeklyStats = getWeeklyStats();
  const achievements = getAchievements();
  
  return (
    <div className="progress-tracker">
      <div className="progress-tracker__header">
        <h2 className="progress-tracker__title">
          <Activity size={24} />
          التقدم اليومي والإنجازات
        </h2>
      </div>
      
      {/* Weekly Overall Progress */}
      <motion.div
        className="weekly-overview-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="weekly-overview-card__title">نظرة عامة على الأسبوع</h3>
        
        <div className="weekly-overview-card__progress">
          <div className="weekly-overview-card__progress-header">
            <span>التقدم الإجمالي</span>
            <span className="weekly-overview-card__percentage">{weeklyStats.overallProgress}%</span>
          </div>
          <div className="weekly-overview-card__progress-bar">
            <motion.div
              className="weekly-overview-card__progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${weeklyStats.overallProgress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
        
        <div className="weekly-overview-card__stats">
          <div className="weekly-stat">
            <div className="weekly-stat__icon weekly-stat__icon--workout">
              <Dumbbell size={24} />
            </div>
            <div className="weekly-stat__content">
              <span className="weekly-stat__value">{weeklyStats.completedExercises}/{weeklyStats.totalExercises}</span>
              <span className="weekly-stat__label">تمارين مكتملة</span>
            </div>
          </div>
          
          <div className="weekly-stat">
            <div className="weekly-stat__icon weekly-stat__icon--nutrition">
              <Apple size={24} />
            </div>
            <div className="weekly-stat__content">
              <span className="weekly-stat__value">{weeklyStats.completedMeals}/{weeklyStats.totalMeals}</span>
              <span className="weekly-stat__label">وجبات مكتملة</span>
            </div>
          </div>
          
          <div className="weekly-stat">
            <div className="weekly-stat__icon weekly-stat__icon--calories">
              <Flame size={24} />
            </div>
            <div className="weekly-stat__content">
              <span className="weekly-stat__value">{weeklyStats.avgCaloriesPerDay}</span>
              <span className="weekly-stat__label">متوسط السعرات/يوم</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Daily Progress */}
      <motion.div
        className="daily-progress-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="daily-progress-section__title">
          <Calendar size={20} />
          التقدم اليومي
        </h3>
        
        <div className="daily-progress-grid">
          {dailyStats.map((day, index) => (
            <motion.div
              key={day.id}
              className="daily-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className="daily-card__header">
                <span className="daily-card__day">{day.name}</span>
                <span className="daily-card__date">{day.date}</span>
              </div>
              
              <div className="daily-card__progress-ring">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="var(--bg-hover)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ 
                      strokeDashoffset: 2 * Math.PI * 45 * (1 - day.overallProgress / 100)
                    }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e91e63" />
                      <stop offset="100%" stopColor="#9c27b0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="daily-card__progress-text">{day.overallProgress}%</div>
              </div>
              
              <div className="daily-card__details">
                <div className="daily-card__detail">
                  <Dumbbell size={14} />
                  <span>{day.completedExercises}/{day.totalExercises}</span>
                </div>
                <div className="daily-card__detail">
                  <Apple size={14} />
                  <span>{day.completedMealItems}/{day.totalMealItems}</span>
                </div>
                <div className="daily-card__detail">
                  <Flame size={14} />
                  <span>{day.totalCalories} cal</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Achievements */}
      {achievements.length > 0 && (
        <motion.div
          className="achievements-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="achievements-section__title">
            <Award size={24} />
            الإنجازات المحققة
          </h3>
          
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="achievement-card"
                style={{ '--achievement-color': achievement.color }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className="achievement-card__icon">{achievement.icon}</div>
                <h4 className="achievement-card__title">{achievement.title}</h4>
                <p className="achievement-card__description">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressTracker;