import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  MessageSquare,
  Users,
  TrendingUp,
  Settings,
  Image,
  Award,
  Star,
  FileText,
  Calendar,
  Target,
  BookOpen,
  Utensils,
  Pill,
  StickyNote,
  Bell,
  CreditCard,
  UserCheck,
  BarChart3,
  Activity,
  Shield,
  Globe,
  LogOut,
  Video,
  Medal 
} from 'lucide-react';

export const sidebarSections = [
  {
    id: 'content',
    title: 'إدارة المحتوى',
    icon: LayoutDashboard,
    color: '#e91e63',
    items: [
      { id: 'logo', label: 'الشعار والعلامة', icon: Image, path: '/content/logo' },
      { id: 'hero', label: 'قسم البطل', icon: Video, path: '/content/hero' },
        { id: 'certifications', label: 'الشهادات والدورات', icon: Medal, path: '/content/certifications' }, // جديد
      { id: 'about', label: 'عن المدربة', icon: Star, path: '/content/about' },
      { id: 'testimonials', label: 'آراء العملاء', icon: MessageSquare, path: '/content/testimonials' },
      { id: 'programs-preview', label: 'معاينة البرامج', icon: FileText, path: '/content/programs' },
      { id: 'footer', label: 'محتوى التذييل', icon: LayoutDashboard, path: '/content/footer' }
    ]
  },
  {
    id: 'training',
    title: 'إدارة التدريب',
    icon: Dumbbell,
    color: '#ff5722',
    items: [
      { id: 'programs', label: 'البرامج التدريبية', icon: Target, path: '/training/programs' },
      { id: 'workout-library', label: 'مكتبة التمارين', icon: BookOpen, path: '/training/library' },
      { id: 'weekly-plans', label: 'الخطط الأسبوعية', icon: Calendar, path: '/training/weekly-plans' },
      { id: 'levels', label: 'المستويات', icon: TrendingUp, path: '/training/levels' }
    ]
  },
  {
    id: 'nutrition',
    title: 'إدارة التغذية',
    icon: Apple,
    color: '#4caf50',
    items: [
      { id: 'meal-plans', label: 'خطط الوجبات', icon: Utensils, path: '/nutrition/meal-plans' },
      { id: 'calories', label: 'إعدادات السعرات', icon: Activity, path: '/nutrition/calories' },
      { id: 'supplements', label: 'المكملات الغذائية', icon: Pill, path: '/nutrition/supplements' },
      { id: 'notes', label: 'ملاحظات للعملاء', icon: StickyNote, path: '/nutrition/notes' }
    ]
  },
  {
    id: 'communication',
    title: 'التواصل',
    icon: MessageSquare,
    color: '#2196f3',
    badge: 5,
    items: [
      { id: 'chat', label: 'محادثات العملاء', icon: MessageSquare, path: '/communication/chat', badge: 3 },
      { id: 'announcements', label: 'الإعلانات', icon: Bell, path: '/communication/announcements' },
      { id: 'notifications', label: 'الإشعارات', icon: Bell, path: '/communication/notifications', badge: 2 }
    ]
  },
  {
    id: 'users',
    title: 'المستخدمون والمدفوعات',
    icon: Users,
    color: '#9c27b0',
    items: [
      { id: 'clients', label: 'قائمة العملاء', icon: Users, path: '/users/clients' },
      { id: 'subscriptions', label: 'حالة الاشتراكات', icon: UserCheck, path: '/users/subscriptions' },
      { id: 'payments', label: 'التحويلات البنكية', icon: CreditCard, path: '/users/payments' },
      { id: 'activation', label: 'التفعيل / التجميد', icon: Shield, path: '/users/activation' }
    ]
  },
  {
    id: 'reports',
    title: 'التقدم والتقارير',
    icon: TrendingUp,
    color: '#ff9800',
    items: [
      { id: 'progress', label: 'تقدم العملاء', icon: TrendingUp, path: '/reports/progress' },
      { id: 'charts', label: 'الرسوم البيانية', icon: BarChart3, path: '/reports/charts' },
      { id: 'checkins', label: 'تسجيلات الدخول', icon: Activity, path: '/reports/checkins' }
    ]
  },
  {
    id: 'settings',
    title: 'إعدادات النظام',
    icon: Settings,
    color: '#607d8b',
    items: [
      { id: 'profile', label: 'الملف الشخصي', icon: Users, path: '/settings/profile' },
      { id: 'security', label: 'الأمان', icon: Shield, path: '/settings/security' },
      { id: 'language', label: 'اللغة', icon: Globe, path: '/settings/language' },
      { id: 'logout', label: 'تسجيل الخروج', icon: LogOut, path: '/logout', danger: true }
    ]
  }
];