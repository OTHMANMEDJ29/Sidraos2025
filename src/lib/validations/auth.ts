// ═══════════════════════════════════════════════════════════════════════════════
// AUTH VALIDATION SCHEMAS
// Enhanced with detailed, user-friendly error messages for better UX
// ═══════════════════════════════════════════════════════════════════════════════

import { z } from 'zod';

// Password validation with detailed error messages
const passwordValidation = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password too short: Use at least 8 characters for security')
  .max(72, 'Password too long: Maximum 72 characters allowed')
  .refine(
    (password) => /[a-z]/.test(password),
    'Missing lowercase letter: Add at least one lowercase letter (a-z)'
  )
  .refine(
    (password) => /[A-Z]/.test(password),
    'Missing uppercase letter: Add at least one uppercase letter (A-Z)'
  )
  .refine(
    (password) => /\d/.test(password),
    'Missing number: Add at least one digit (0-9)'
  )
  .refine(
    (password) => /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;'/`~]/.test(password),
    'Tip: Add a special character (!@#$%^&*) for extra security'
  );

// Common password check (basic list - in production, use a proper library)
const commonPasswords = ['password', '12345678', 'qwerty12', 'password1', 'Password1'];

const strongPasswordValidation = passwordValidation.refine(
  (password) => !commonPasswords.some(common => 
    password.toLowerCase().includes(common.toLowerCase())
  ),
  'This password is too common. Please choose a more unique password.'
);

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address (e.g., you@example.com)'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Name too short: Use at least 2 characters')
      .max(100, 'Name too long: Maximum 100 characters allowed')
      .regex(
        /^[a-zA-Z\u0600-\u06FF\s'-]+$/,
        'Name can only contain letters, spaces, hyphens, and apostrophes'
      ),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address (e.g., you@example.com)')
      .refine(
        (email) => !email.endsWith('.con'),
        'Did you mean .com? Please check your email address.'
      ),
    password: strongPasswordValidation,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    locale: z.enum(['ar', 'en']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match. Please ensure both passwords are identical.',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address (e.g., you@example.com)'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: strongPasswordValidation,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match. Please ensure both passwords are identical.',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name too short: Use at least 2 characters')
    .max(100, 'Name too long: Maximum 100 characters allowed')
    .regex(
      /^[a-zA-Z\u0600-\u06FF\s'-]+$/,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    ),
  locale: z.enum(['ar', 'en']),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
