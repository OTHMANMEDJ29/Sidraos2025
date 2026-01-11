// ═══════════════════════════════════════════════════════════════════════════════
// AUTH FEATURE - TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  locale: 'ar' | 'en';
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: User;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type AuthProvider = 'email' | 'google' | 'github';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
  locale?: 'ar' | 'en';
}

export interface ResetPasswordPayload {
  email: string;
}

export interface UpdatePasswordPayload {
  password: string;
  confirmPassword: string;
}
