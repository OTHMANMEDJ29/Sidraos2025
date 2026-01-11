// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import {
  LayoutDashboard,
  Wallet,
  CheckSquare,
  Brain,
  Settings,
  Calendar,
  Target,
  FileText,
  Bookmark,
  BookOpen,
  CreditCard,
  PieChart,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  titleKey: string; // Translation key
  href: string;
  icon: LucideIcon;
  badge?: number;
  children?: NavItem[];
}

export interface NavGroup {
  titleKey: string; // Translation key
  items: NavItem[];
}

export const dashboardNavigation: NavGroup[] = [
  {
    titleKey: 'nav.main',
    items: [
      {
        titleKey: 'nav.overview',
        href: '/overview',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    titleKey: 'nav.productivity',
    items: [
      {
        titleKey: 'nav.tasks',
        href: '/productivity/tasks',
        icon: CheckSquare,
      },
      {
        titleKey: 'nav.calendar',
        href: '/productivity/calendar',
        icon: Calendar,
      },
      {
        titleKey: 'nav.habits',
        href: '/productivity/habits',
        icon: Target,
      },
    ],
  },
  {
    titleKey: 'nav.finance',
    items: [
      {
        titleKey: 'nav.transactions',
        href: '/finance/transactions',
        icon: Wallet,
      },
      {
        titleKey: 'nav.budgets',
        href: '/finance/budgets',
        icon: CreditCard,
      },
      {
        titleKey: 'nav.reports',
        href: '/finance/reports',
        icon: PieChart,
      },
    ],
  },
  {
    titleKey: 'nav.secondBrain',
    items: [
      {
        titleKey: 'nav.notes',
        href: '/second-brain/notes',
        icon: FileText,
      },
      {
        titleKey: 'nav.bookmarks',
        href: '/second-brain/bookmarks',
        icon: Bookmark,
      },
      {
        titleKey: 'nav.journal',
        href: '/second-brain/journal',
        icon: BookOpen,
      },
    ],
  },
  {
    titleKey: 'nav.system',
    items: [
      {
        titleKey: 'nav.settings',
        href: '/settings',
        icon: Settings,
      },
    ],
  },
];

export const publicNavigation: NavItem[] = [
  {
    titleKey: 'nav.features',
    href: '/#features',
    icon: Brain,
  },
  {
    titleKey: 'nav.pricing',
    href: '/#pricing',
    icon: Wallet,
  },
];
