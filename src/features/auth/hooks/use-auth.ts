// ═══════════════════════════════════════════════════════════════════════════════
// USE AUTH HOOK
// Provides auth functionality with Supabase listener
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '../stores/auth-store';
import type { User } from '../types';

export function useAuth() {
  const router = useRouter();
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    isInitialized,
    setUser, 
    setLoading,
    setInitialized,
    logout: logoutStore 
  } = useAuthStore();

  // Initialize auth state and listen for changes
  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    const initAuth = async () => {
      try {
        setLoading(true);
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
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
        console.error('[useAuth] Init error:', error);
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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
          logoutStore();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, setInitialized, logoutStore]);

  // Logout function
  const logout = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    logoutStore();
    router.push('/login');
  }, [router, logoutStore]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    logout,
  };
}
