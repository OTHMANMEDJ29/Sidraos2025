// ═══════════════════════════════════════════════════════════════════════════════
// USER NAVIGATION
// User menu with profile and logout
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import { Link } from '@/i18n/routing';

export function UserNav() {
  const router = useRouter();
  const t = useTranslations('auth');
  const tNav = useTranslations('nav');
  const { user, logout: logoutStore } = useAuthStore();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    logoutStore();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
      {/* Settings Link */}
      <Link href="/settings">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">{tNav('settings')}</span>
        </Button>
      </Link>

      {/* User Avatar / Name */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <User className="h-4 w-4 text-primary" />
        </div>
        {user && (
          <span className="hidden text-sm font-medium md:block">
            {user.fullName}
          </span>
        )}
      </div>

      {/* Logout Button */}
      <Button variant="ghost" size="icon" onClick={handleLogout}>
        <LogOut className="h-5 w-5" />
        <span className="sr-only">{t('logout')}</span>
      </Button>
    </div>
  );
}
