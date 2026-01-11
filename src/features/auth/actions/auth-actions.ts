// ═══════════════════════════════════════════════════════════════════════════════
// AUTH SERVER ACTIONS
// ═══════════════════════════════════════════════════════════════════════════════

'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from '@/lib/validations/auth';
import type { Result } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────────────────────
export async function loginAction(formData: FormData): Promise<Result<{ redirectTo: string }>> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Validate input
  const validated = loginSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  });

  if (error) {
    console.error('[loginAction]', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: { redirectTo: '/overview' } };
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────────────────────────────────────────
export async function registerAction(formData: FormData): Promise<Result<{ redirectTo: string }>> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    fullName: formData.get('fullName') as string,
    locale: (formData.get('locale') as 'ar' | 'en') || 'en',
  };

  // Validate input
  const validated = registerSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get('origin') || 'http://localhost:3000';

  const { error } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback`,
      data: {
        full_name: validated.data.fullName,
        locale: validated.data.locale,
      },
    },
  });

  if (error) {
    console.error('[registerAction]', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: { redirectTo: '/overview' } };
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────────────────────────────────────────
export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

// ─────────────────────────────────────────────────────────────────────────────
// FORGOT PASSWORD
// ─────────────────────────────────────────────────────────────────────────────
export async function forgotPasswordAction(formData: FormData): Promise<Result<{ message: string }>> {
  const rawData = {
    email: formData.get('email') as string,
  };

  // Validate input
  const validated = forgotPasswordSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get('origin') || 'http://localhost:3000';

  const { error } = await supabase.auth.resetPasswordForEmail(validated.data.email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    console.error('[forgotPasswordAction]', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: { message: 'Password reset email sent' } };
}

// ─────────────────────────────────────────────────────────────────────────────
// RESET PASSWORD
// ─────────────────────────────────────────────────────────────────────────────
export async function resetPasswordAction(formData: FormData): Promise<Result<{ redirectTo: string }>> {
  const rawData = {
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  // Validate input
  const validated = resetPasswordSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: validated.data.password,
  });

  if (error) {
    console.error('[resetPasswordAction]', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: { redirectTo: '/login' } };
}

// ─────────────────────────────────────────────────────────────────────────────
// OAUTH LOGIN
// ─────────────────────────────────────────────────────────────────────────────
export async function oAuthLoginAction(provider: 'google' | 'github'): Promise<Result<{ url: string }>> {
  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get('origin') || 'http://localhost:3000';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.error('[oAuthLoginAction]', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: { url: data.url } };
}

// ─────────────────────────────────────────────────────────────────────────────
// GET CURRENT USER
// ─────────────────────────────────────────────────────────────────────────────
export async function getCurrentUser() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
}
