// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD SIDEBAR
// Navigation sidebar for the dashboard
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { dashboardNavigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  // Remove locale prefix for route matching
  const pathnameWithoutLocale = pathname.replace(/^\/(ar|en)/, '');

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Link href="/overview" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-bold">SidraOS</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {dashboardNavigation.map((group) => (
          <div key={group.titleKey} className="mb-6">
            <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t(group.titleKey.replace('nav.', '') as Parameters<typeof t>[0])}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathnameWithoutLocale.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {t(item.titleKey.replace('nav.', '') as Parameters<typeof t>[0])}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
