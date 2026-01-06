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
  LogOut,
  // Add Chat icon
  MessageCircleMore
} from 'lucide-react';

export const sidebarSections = [
  {
    id: 'content',
    title: 'إدارة المحتوى',
    icon: LayoutDashboard,
    color: '#e91e63',
    items: [
      { id: 'logo', label: 'الشعار والعلامة', icon: Image, path: '/content/logo' },
      { id: 'hero', label: ' واجهة الموقع', icon: Video, path: '/content/hero' },
      { id: 'AboutCoach', label: 'عن المدربة', icon: Star, path: '/content/AboutCoach' },
      { id: 'certifications', label: 'الشهادات والدورات', icon: Medal, path: '/content/certifications' },
      { id: 'testimonials', label: 'آراء العملاء', icon: MessageSquare, path: '/content/testimonials' },
      { id: 'faq', label: 'الأسئلة الشائعة', icon: HelpCircle, path: '/content/faq' }
    ]
  },
  {
    id: 'training',
    title: 'إدارة التدريب',
    icon: Dumbbell,
    color: '#9c27b0',
    items: [
      { id: 'clients-list', label: 'قائمة المتدربين', icon: Users, path: '/training/clients' },
      // Add Chat link to training section
      { id: 'chat', label: 'محادثات المتدربين', icon: MessageCircleMore, path: '/training/chat' }
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
      { id: 'subscriptions', label: 'حالة الاشتراكات', icon: UserCheck, path: '/users/subscriptions' },
      { id: 'payments', label: 'التحويلات البنكية', icon: CreditCard, path: '/users/payments' },
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