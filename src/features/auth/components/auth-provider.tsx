// ═══════════════════════════════════════════════════════════════════════════════
// AUTH PROVIDER
// Initializes auth state on app load
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '../stores/auth-store';
import type { User } from '../types';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading, setInitialized, logout } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    const initAuth = async () => {
      try {
        setLoading(true);
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          // Fetch profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (profile) {
            const userData: User = {
              id: profile.id,
              email: profile.email,
              fullName: profile.full_name,
              avatarUrl: profile.avatar_url,
              locale: profile.locale || 'en',
              createdAt: profile.created_at,
              updatedAt: profile.updated_at,
            };
            setUser(userData);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('[AuthProvider] Init error:', error);
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Fetch profile on sign in
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const userData: User = {
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            avatarUrl: profile.avatar_url,
            locale: profile.locale || 'en',
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          };
          setUser(userData);
        }
      } else if (event === 'SIGNED_OUT') {
        logout();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, setInitialized, logout]);

  return <>{children}</>;
}
