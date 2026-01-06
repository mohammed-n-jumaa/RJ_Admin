import {
  LayoutDashboard,
  Image,
  Video,
  Star,
  Medal,
  MessageSquare,
  HelpCircle,
  FileText,
  Users,
  Dumbbell,
  BookOpen,
  Calendar,
  TrendingUp,
  Apple,
  Calculator,
  Pill,
  FileText as NotesIcon,
  MessageCircle,
  Bell,
  Send,
  UserCheck,
  CreditCard,
  DollarSign,
  PlayCircle,
  BarChart3,
  Activity,
  ClipboardCheck,
  Settings,
  UserCircle,
  Shield,
  Globe,
  LogOut
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
      { id: 'about', label: 'عن المدربة', icon: Star, path: '/content/about' },
      { id: 'certifications', label: 'الشهادات والدورات', icon: Medal, path: '/content/certifications' },
      { id: 'testimonials', label: 'آراء العملاء', icon: MessageSquare, path: '/content/testimonials' },
      { id: 'faq', label: 'الأسئلة الشائعة', icon: HelpCircle, path: '/content/faq' },
      { id: 'programs-preview', label: 'معاينة البرامج', icon: FileText, path: '/content/programs' },
      { id: 'footer', label: 'محتوى التذييل', icon: LayoutDashboard, path: '/content/footer' }
    ]
  },
  {
    id: 'training',
    title: 'إدارة التدريب',
    icon: Dumbbell,
    color: '#9c27b0',
    items: [
      { id: 'clients-list', label: 'قائمة المتدربين', icon: Users, path: '/training/clients' },
      { id: 'training-programs', label: 'البرامج التدريبية', icon: Dumbbell, path: '/training/programs' },
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
      { id: 'meal-plans', label: 'خطط الوجبات', icon: Apple, path: '/nutrition/meal-plans' },
      { id: 'calories', label: 'إعدادات السعرات', icon: Calculator, path: '/nutrition/calories' },
      { id: 'supplements', label: 'المكملات الغذائية', icon: Pill, path: '/nutrition/supplements' },
      { id: 'nutrition-notes', label: 'ملاحظات للعملاء', icon: NotesIcon, path: '/nutrition/notes' }
    ]
  },
  {
    id: 'communication',
    title: 'التواصل',
    icon: MessageCircle,
    color: '#2196f3',
    items: [
      { id: 'chat', label: 'محادثة العملاء', icon: MessageCircle, path: '/communication/chat' },
      { id: 'announcements', label: 'الإعلانات', icon: Bell, path: '/communication/announcements' },
      { id: 'notifications', label: 'الإشعارات', icon: Send, path: '/communication/notifications' }
    ]
  },
  {
    id: 'users-payments',
    title: 'المستخدمون والمدفوعات',
    icon: Users,
    color: '#ff9800',
    items: [
      { id: 'clients', label: 'قائمة العملاء', icon: Users, path: '/users/clients' },
      { id: 'subscriptions', label: 'حالة الاشتراكات', icon: UserCheck, path: '/users/subscriptions' },
      { id: 'payments', label: 'التحويلات البنكية', icon: CreditCard, path: '/users/payments' },
      { id: 'activation', label: 'التفعيل / التجميد', icon: PlayCircle, path: '/users/activation' }
    ]
  },
  {
    id: 'reports',
    title: 'التقارير',
    icon: BarChart3,
    color: '#00bcd4',
    items: [
      { id: 'client-progress', label: 'تقدم العملاء', icon: Activity, path: '/reports/progress' },
      { id: 'charts', label: 'الرسوم البيانية', icon: BarChart3, path: '/reports/charts' },
      { id: 'checkins', label: 'تسجيلات الحضور', icon: ClipboardCheck, path: '/reports/checkins' }
    ]
  },
  {
    id: 'settings',
    title: 'الإعدادات',
    icon: Settings,
    color: '#607d8b',
    items: [
      { id: 'profile', label: 'الملف الشخصي', icon: UserCircle, path: '/settings/profile' },
      { id: 'security', label: 'الأمان', icon: Shield, path: '/settings/security' },
      { id: 'language', label: 'اللغة', icon: Globe, path: '/settings/language' }
    ]
  },
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