// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD LAYOUT
// Protected layout with sidebar navigation
// ═══════════════════════════════════════════════════════════════════════════════

import { Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { UserNav } from '@/components/layout/user-nav';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-shrink-0 border-e bg-sidebar lg:block">
        <DashboardSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between gap-4 border-b px-4 lg:justify-end lg:px-6">
          <div className="flex items-center gap-4 lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="/overview" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-xl font-bold">SidraOS</span>
            </Link>
          </div>

          {/* User Navigation */}
          <UserNav />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
