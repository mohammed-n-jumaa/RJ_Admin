import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  User,
  Calendar,
  Target,
  Weight,
  Ruler,
  Mail,
  Phone,
  TrendingUp,
  Dumbbell,
  Apple,
  Activity
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import WorkoutPlan from '../../../components/Training/WorkoutPlan';
import NutritionPlan from '../../../components/Training/NutritionPlan';
import ProgressTracker from '../../../components/Training/ProgressTracker';
import './ClientDetails.scss';

const ClientDetails = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('workout'); // workout, nutrition, progress
  
  // Mock client data - في التطبيق الحقيقي سيتم جلبها من API
  const client = {
    id: clientId,
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '0791234567',
    age: 28,
    weight: 65,
    height: 165,
    goal: 'إنقاص الوزن',
    startDate: '2025-01-01',
    endDate: '2025-04-01',
    status: 'active',
    image: null
  };
  
  // Workout Plans - Daily Structure
  const [workoutPlans, setWorkoutPlans] = useState([
    {
      id: 1, // السبت
      exercises: [
        { 
          id: 101, 
          name: 'سكوات', 
          sets: 3, 
          reps: 12, 
          notes: 'ركز على النزول الكامل والحفاظ على استقامة الظهر',
          media: null,
          completed: true 
        },
        { 
          id: 102, 
          name: 'ضغط صدر', 
          sets: 3, 
          reps: 10, 
          notes: 'استخدمي أوزان متوسطة',
          media: null,
          completed: true 
        },
        { 
          id: 103, 
          name: 'تمديد ظهر', 
          sets: 3, 
          reps: 15, 
          notes: '',
          media: null,
          completed: false 
        }
      ]
    },
    {
      id: 2, // الأحد
      exercises: [
        { 
          id: 201, 
          name: 'رفع أثقال', 
          sets: 4, 
          reps: 10, 
          notes: 'ركزي على التحكم بالحركة',
          media: null,
          completed: false 
        },
        { 
          id: 202, 
          name: 'بلانك', 
          sets: 3, 
          reps: 30, 
          notes: 'احتفظي بالوضعية 30 ثانية',
          media: null,
          completed: false 
        }
      ]
    },
    {
      id: 3, // الإثنين
      exercises: [
        { 
          id: 301, 
          name: 'كارديو', 
          sets: 1, 
          reps: 20, 
          notes: '20 دقيقة جري أو مشي سريع',
          media: null,
          completed: false 
        }
      ]
    },
    {
      id: 4, // الثلاثاء
      exercises: []
    },
    {
      id: 5, // الأربعاء
      exercises: [
        { 
          id: 501, 
          name: 'تمارين البطن', 
          sets: 4, 
          reps: 15, 
          notes: 'كرانش متنوع',
          media: null,
          completed: false 
        }
      ]
    },
    {
      id: 6, // الخميس
      exercises: []
    },
    {
      id: 7, // الجمعة - يوم راحة
      exercises: []
    }
  ]);
  
  // Nutrition Plans - Daily Structure
  const [nutritionPlans, setNutritionPlans] = useState([
    {
      id: 1, // السبت
      meals: [
        {
          id: 101,
          mealType: 'الإفطار',
          time: '08:00',
          image: null,
          items: [
            { 
              id: 1011, 
              name: 'شوفان مع حليب', 
              calories: 250, 
              protein: 10, 
              carbs: 40, 
              fats: 5, 
              completed: true 
            },
            { 
              id: 1012, 
              name: 'موز', 
              calories: 90, 
              protein: 1, 
              carbs: 23, 
              fats: 0, 
              completed: true 
            },
            { 
              id: 1013, 
              name: 'بيض مسلوق', 
              calories: 150, 
              protein: 13, 
              carbs: 1, 
              fats: 10, 
              completed: true 
            }
          ]
        },
        {
          id: 102,
          mealType: 'الغداء',
          time: '13:00',
          image: null,
          items: [
            { 
              id: 1021, 
              name: 'دجاج مشوي', 
              calories: 300, 
              protein: 40, 
              carbs: 0, 
              fats: 15, 
              completed: false 
            },
            { 
              id: 1022, 
              name: 'أرز بني', 
              calories: 200, 
              protein: 4, 
              carbs: 45, 
              fats: 2, 
              completed: false 
            },
            { 
              id: 1023, 
              name: 'سلطة خضراء', 
              calories: 50, 
              protein: 2, 
              carbs: 10, 
              fats: 1, 
              completed: false 
            }
          ]
        },
        {
          id: 103,
          mealType: 'العشاء',
          time: '19:00',
          image: null,
          items: [
            { 
              id: 1031, 
              name: 'سمك مشوي', 
              calories: 250, 
              protein: 35, 
              carbs: 0, 
              fats: 12, 
              completed: false 
            },
            { 
              id: 1032, 
              name: 'خضار مطبوخة', 
              calories: 100, 
              protein: 3, 
              carbs: 20, 
              fats: 2, 
              completed: false 
            }
          ]
        },
        {
          id: 104,
          mealType: 'سناك',
          time: '16:00',
          image: null,
          items: [
            { 
              id: 1041, 
              name: 'مكسرات', 
              calories: 180, 
              protein: 6, 
              carbs: 8, 
              fats: 15, 
              completed: false 
            }
          ]
        }
      ]
    },
    {
      id: 2, // الأحد
      meals: [
        {
          id: 201,
          mealType: 'الإفطار',
          time: '08:00',
          image: null,
          items: [
            { 
              id: 2011, 
              name: 'توست أسمر مع زبدة فول سوداني', 
              calories: 280, 
              protein: 12, 
              carbs: 35, 
              fats: 10, 
              completed: false 
            }
          ]
        },
        {
          id: 202,
          mealType: 'الغداء',
          time: '13:00',
          image: null,
          items: [
            { 
              id: 2021, 
              name: 'برجر لحم قليل الدسم', 
              calories: 350, 
              protein: 30, 
              carbs: 35, 
              fats: 12, 
              completed: false 
            }
          ]
        }
      ]
    },
    {
      id: 3, // الإثنين
      meals: [
        {
          id: 301,
          mealType: 'الإفطار',
          time: '08:00',
          image: null,
          items: [
            { 
              id: 3011, 
              name: 'عجة بياض بيض', 
              calories: 200, 
              protein: 20, 
              carbs: 5, 
              fats: 8, 
              completed: false 
            }
          ]
        }
      ]
    },
    {
      id: 4, // الثلاثاء
      meals: []
    },
    {
      id: 5, // الأربعاء
      meals: [
        {
          id: 501,
          mealType: 'الإفطار',
          time: '08:00',
          image: null,
          items: []
        }
      ]
    },
    {
      id: 6, // الخميس
      meals: []
    },
    {
      id: 7, // الجمعة
      meals: []
    }
  ]);
  
  return (
    <div className="client-details">
      {/* Header with Back Button */}
      <motion.div
        className="client-details__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button className="client-details__back-btn" onClick={() => navigate('/training/clients')}>
          <ArrowRight size={20} />
          <span>العودة للقائمة</span>
        </button>
      </motion.div>
      
      {/* Client Info Card */}
      <motion.div
        className="client-info-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="client-info-card__main">
          <div className="client-info-card__avatar">
            {client.image ? (
              <img src={client.image} alt={client.name} />
            ) : (
              <div className="client-info-card__avatar-placeholder">
                {client.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="client-info-card__details">
            <h1 className="client-info-card__name">{client.name}</h1>
            
            <div className="client-info-card__meta">
              <div className="client-info-card__meta-item">
                <Mail size={16} />
                <span>{client.email}</span>
              </div>
              <div className="client-info-card__meta-item">
                <Phone size={16} />
                <span>{client.phone}</span>
              </div>
            </div>
          </div>
          
          <div 
            className={`client-info-card__status client-info-card__status--${client.status}`}
          >
            {client.status === 'active' ? 'نشط' : client.status === 'expired' ? 'منتهي' : 'معلّق'}
          </div>
        </div>
        
        <div className="client-info-card__stats">
          <div className="info-stat">
            <div className="info-stat__icon">
              <Weight size={20} />
            </div>
            <div className="info-stat__content">
              <span className="info-stat__label">الوزن</span>
              <span className="info-stat__value">{client.weight} كغ</span>
            </div>
          </div>
          
          <div className="info-stat">
            <div className="info-stat__icon">
              <Ruler size={20} />
            </div>
            <div className="info-stat__content">
              <span className="info-stat__label">الطول</span>
              <span className="info-stat__value">{client.height} سم</span>
            </div>
          </div>
          
          <div className="info-stat">
            <div className="info-stat__icon">
              <TrendingUp size={20} />
            </div>
            <div className="info-stat__content">
              <span className="info-stat__label">العمر</span>
              <span className="info-stat__value">{client.age} سنة</span>
            </div>
          </div>
          
          <div className="info-stat">
            <div className="info-stat__icon">
              <Target size={20} />
            </div>
            <div className="info-stat__content">
              <span className="info-stat__label">الهدف</span>
              <span className="info-stat__value">{client.goal}</span>
            </div>
          </div>
          
          <div className="info-stat">
            <div className="info-stat__icon">
              <Calendar size={20} />
            </div>
            <div className="info-stat__content">
              <span className="info-stat__label">البداية</span>
              <span className="info-stat__value">{client.startDate}</span>
            </div>
          </div>
          
          <div className="info-stat">
            <div className="info-stat__icon">
              <Calendar size={20} />
            </div>
            <div className="info-stat__content">
              <span className="info-stat__label">النهاية</span>
              <span className="info-stat__value">{client.endDate}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Tabs */}
      <motion.div
        className="client-details__tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className={`client-details__tab ${activeTab === 'workout' ? 'client-details__tab--active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          <Dumbbell size={20} />
          <span>البرنامج التدريبي</span>
        </button>
        
        <button
          className={`client-details__tab ${activeTab === 'nutrition' ? 'client-details__tab--active' : ''}`}
          onClick={() => setActiveTab('nutrition')}
        >
          <Apple size={20} />
          <span>النظام الغذائي</span>
        </button>
        
        <button
          className={`client-details__tab ${activeTab === 'progress' ? 'client-details__tab--active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <Activity size={20} />
          <span>التقدم والإنجازات</span>
        </button>
      </motion.div>
      
      {/* Tab Content */}
      <motion.div
        className="client-details__content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {activeTab === 'workout' && (
          <WorkoutPlan 
            clientId={client.id}
            workoutPlans={workoutPlans}
            setWorkoutPlans={setWorkoutPlans}
          />
        )}
        
        {activeTab === 'nutrition' && (
          <NutritionPlan
            clientId={client.id}
            nutritionPlans={nutritionPlans}
            setNutritionPlans={setNutritionPlans}
          />
        )}
        
        {activeTab === 'progress' && (
          <ProgressTracker
            clientId={client.id}
            workoutPlans={workoutPlans}
            nutritionPlans={nutritionPlans}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ClientDetails;