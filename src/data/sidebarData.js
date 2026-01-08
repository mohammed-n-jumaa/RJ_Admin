import {
  LayoutDashboard,
  Image,
  Video,
  Star,
  Medal,
  MessageSquare,
  HelpCircle,
  Users,
  Dumbbell,
  UserCheck,
  Settings,
  UserCircle,
  LogOut,
  MessageCircleMore
} from 'lucide-react';

export const sidebarSections = [
  // ✅ الصفحة الرئيسية - الداش بورد
  {
    id: 'dashboard',
    title: 'لوحة التحكم',
    icon: LayoutDashboard,
    color: '#e91e63',
    items: [
      {
        id: 'dashboard-home',
        label: 'نظرة عامة',
        icon: LayoutDashboard,
        path: '/dashboard'
      }
    ]
  },

  // إدارة المحتوى
  {
    id: 'content',
    title: 'إدارة المحتوى',
    icon: LayoutDashboard,
    color: '#9c27b0',
    items: [
      { id: 'logo', label: 'الشعار والعلامة', icon: Image, path: '/content/logo' },
      { id: 'hero', label: 'واجهة الموقع', icon: Video, path: '/content/hero' },
      { id: 'AboutCoach', label: 'عن المدربة', icon: Star, path: '/content/AboutCoach' },
      { id: 'certifications', label: 'الشهادات والدورات', icon: Medal, path: '/content/certifications' },
      { id: 'testimonials', label: 'آراء العملاء', icon: MessageSquare, path: '/content/testimonials' },
      { id: 'faq', label: 'الأسئلة الشائعة', icon: HelpCircle, path: '/content/faq' }
    ]
  },

  // إدارة التدريب
  {
    id: 'training',
    title: 'إدارة التدريب',
    icon: Dumbbell,
    color: '#3f51b5',
    items: [
      { id: 'clients-list', label: 'قائمة المتدربين', icon: Users, path: '/training/clients' },
      { id: 'chat', label: 'محادثات المتدربين', icon: MessageCircleMore, path: '/training/chat' }
    ]
  },

  // المدفوعات
  {
    id: 'subscriptions',
    title: 'المدفوعات',
    icon: Users,
    color: '#ff9800',
    items: [
      { id: 'subscriptions-status', label: 'حالة الاشتراكات', icon: UserCheck, path: '/subscriptions' }
    ]
  },

  // الإعدادات
  {
    id: 'settings',
    title: 'الإعدادات',
    icon: Settings,
    color: '#607d8b',
    items: [
      { id: 'profile', label: 'الملف الشخصي', icon: UserCircle, path: '/settings/profile' }
    ]
  },

  // تسجيل الخروج
  {
    id: 'logout',
    title: 'تسجيل الخروج',
    icon: LogOut,
    color: '#f44336',
    items: [],
    action: 'logout',
    path: '/logout'
  }
];
